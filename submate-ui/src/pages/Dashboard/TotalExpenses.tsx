import { TotalExpenses as Total } from "@/api";
import { Card } from "@/components/ui/card";
import useApi from "@/hooks/UseApi";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const TotalExpenses = ({ className }: { className?: string }) => {
  const api = useApi();
  const [totalExpenses, setTotalExpenses] = useState<Total>();

  const fecthData = async () => {
    await api.statisticsApi.getPaymentsTotal().then(
      (response) => setTotalExpenses(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <Card className={cn("border py-3 px-5 w-full", className)}>
      <h1 className="text-lg ">Total Expenses</h1>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl text-primary">${totalExpenses?.total}</h1>
        <h1 className="flex flex-row justify-between items-center gap-2 text-xs">
          <span>Last week</span>
          <span className="text-primary">${totalExpenses?.lastWeekTotal}</span>
          <span>
            <TrendingUp className="h-4 w-4" />
          </span>
        </h1>
      </div>
    </Card>
  );
};

export default TotalExpenses;
