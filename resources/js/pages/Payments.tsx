import AddPaymentModal from '@/components/AddPaymentModal';
import EditPaymentModal from '@/components/EditPaymentModal';
import { columns } from '@/components/payments/columns';
import { DataTable } from '@/components/payments/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

export default function Payments({ payments }: { payments: Payment[] }) {
    const [data, setData] = useState<Payment[]>(payments);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

    const handleUpdate = (updatedPayment: Payment) => {
        setData((prevData) => prevData.map((payment) => (payment.id === updatedPayment.id ? updatedPayment : payment)));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />
            <DataTable columns={columns(() => {}, setEditModalOpen, setSelectedPayment)} data={payments} />
            <EditPaymentModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} payment={selectedPayment} onUpdate={handleUpdate} />
            <AddPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </AppLayout>
    );
}
