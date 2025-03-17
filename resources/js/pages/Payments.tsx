import { columns } from '@/components/payments/columns';
import { DataTable } from '@/components/payments/data-table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "ashly@example.com",
          },
          {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "lisly@gmail.com",
          },
          {
              id: "489e1d43",
              amount: 125,
              status: "processing",
              email: "rakesh@gmail.com",
            },
            {
              id: "489e1d44",
              amount: 125,
              status: "processing",
              email: "lisly@gmail.com",
            },
            {
              id: "489e1d45",
              amount: 125,
              status: "pending",
              email: "prasanth@gmail.com",
            },
            {
              id: "489e1d46",
              amount: 125,
              status: "success",
              email: "lisly@gmail.com",
            },
            {
              id: "489e1d47",
              amount: 125,
              status: "failed",
              email: "nikhil@gmail.com",
            },
            {
              id: "489e1d48",
              amount: 125,
              status: "success",
              email: "reshma@gmail.com",
            },
            {
              id: "489e1d49",
              amount: 125,
              status: "processing",
              email: "divya@gmail.com",
            },
            {
              id: "489e1d50",
              amount: 125,
              status: "pending",
              email: "arun@gmail.com",
            },
            {
              id: "728ed52g",
              amount: 100,
              status: "pending",
              email: "sradha@example.com",
            },
            {
              id: "489e1d51",
              amount: 125,
              status: "processing",
              email: "sravan@gmail.com",
            },
            {
                id: "489e1d52",
                amount: 125,
                status: "processing",
                email: "prasanthsoorya@gmail.com",
              },
              {
                id: "489e1d53",
                amount: 125,
                status: "processing",
                email: "sreejith@gmail.com",
              },
              {
                id: "489e1d54",
                amount: 125,
                status: "pending",
                email: "sijoshima@gmail.com",
              },
              {
                id: "489e1d55",
                amount: 125,
                status: "success",
                email: "deva@gmail.com",
              },
              {
                id: "489e1d56",
                amount: 125,
                status: "success",
                email: "surya@gmail.com",
              },
              {
                id: "489e1d57",
                amount: 125,
                status: "success",
                email: "sanjay@gmail.com",
              },
              {
                id: "489e1d58",
                amount: 125,
                status: "processing",
                email: "adhvik@gmail.com",
              },
              {
                id: "489e1d59",
                amount: 125,
                status: "pending",
                email: "advay@gmail.com",
              },
        
    ]
  }
   


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

export default function Payments() {
    const [data, setData] = useState<Payment[]>([]);
    useEffect(()=>{
        getData().then(setData);
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
        </AppLayout>
    );
}
