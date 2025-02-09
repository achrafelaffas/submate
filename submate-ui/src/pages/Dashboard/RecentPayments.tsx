import { PaymentResponse } from "@/api";
import { columns } from "./payments/Columns";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MinimalDataTable from "@/components/MinimalDataTable";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/UseApi";

const RecentPayments = () => {
  const api = useApi();
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [isloading, setIsloading] = useState(false);

  const fecthRecentPayments = async () => {
    setIsloading(true);
    await api.statisticsApi.getRecentPayments().then(
      (response) => {
        const payments = response.data;
        setPayments(payments);
        setIsloading(false);
      },
      (error) => {
        console.log(error);
        setIsloading(false);
      }
    );
  };

  useEffect(() => {
    fecthRecentPayments();
  }, []);

  if (payments.length < 1) return null;

  return (
    <Card className="border p-1 min-h-[14vh]">
      <CardHeader className="flex flex-row justify-between text-sm">
        <div className="flex items-center gap-2 font-medium text-base md:text-xl">
          Recent Payments
        </div>
        <Link to="/me/subscriptions">
          <Button variant="ghost" className="text-primary">
            All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <MinimalDataTable
          columns={columns}
          data={payments}
          isloading={isloading}
        />
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
