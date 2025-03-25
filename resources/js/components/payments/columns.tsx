'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CheckCircle2Icon, Hourglass, LoaderIcon, MoreHorizontal, XCircleIcon } from 'lucide-react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};

const handleDelete = (id: string) => {
    router.delete(`/payments/${id}`, {
        preserveScroll: true,
    });
};

export const columns = (
    setIsModalOpen: (open: boolean) => void,
    setEditModalOpen: (open: boolean) => void,
    setSelectedPayment: (payment: Payment | null) => void,
): ColumnDef<Payment>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <Badge variant={'outline'} className="text-muted-foreground flex gap-1 px-1.5 [&_svg]:size-3">
                {row.original.status === 'success' && <CheckCircle2Icon className="text-green-500 dark:text-green-400" />}
                {row.original.status === 'processing' && <LoaderIcon />}
                {row.original.status === 'pending' && <Hourglass />}
                {row.original.status === 'failed' && <XCircleIcon className="text-red-500 dark:text-red-400" />}
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: () => <div>Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleDelete(payment.id)}>Delete</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setSelectedPayment(payment);
                                setEditModalOpen(true);
                            }}
                        >
                            Update
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
