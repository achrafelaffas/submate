import { PaymentResponse, StatisticsApi } from "@/api";
import useAuth from "@/hooks/useAuth";
import { columns } from "./payments/Columns";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MinimalDataTable from "@/components/MinimalDataTable";

const RecentPayments = () => {
  const config = useAuth();
  const statisticsApi = new StatisticsApi(config);
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [isloading, setIsloading] = useState(false);

  const fecthRecentPayments = async () => {
    setIsloading(true);
    await statisticsApi.getRecentPayments().then(
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

  return (
    <Card className="border p-2 min-h-full">
      <CardHeader className="flex justify-center text-sm">
        <div className="flex items-center gap-2 font-medium text-xl">
          Subscriptions per category
        </div>
      </CardHeader>
      <CardContent>
        <MinimalDataTable columns={columns} data={payments} isloading={isloading} />
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
