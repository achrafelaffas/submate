import { UpcomingThisWeek } from "@/api";
import { Card } from "@/components/ui/card";
import useApi from "@/hooks/UseApi";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const UpComingThisWeek = ({ className }: { className?: string }) => {
  const api = useApi();
  const [upcoming, setUpcoming] = useState<UpcomingThisWeek>();

  const fecthData = async () => {
    await api.statisticsApi.getDueThisWeek().then(
      (response) => setUpcoming(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <Card className={cn("border py-3 px-5 w-full", className)}>
      <h1 className="text-lg">Upcoming This Week</h1>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-primary text-3xl">
          <span className="text-xs">Amount</span> $12{upcoming?.total}
        </h1>
        <h1 className="flex flex-row justify-between items-center gap-2">
          <span className="text-primary text-3xl">
            <span className="text-xs">Count</span> 1{upcoming?.count}
          </span>
        </h1>
      </div>
    </Card>
  );
};

export default UpComingThisWeek;
