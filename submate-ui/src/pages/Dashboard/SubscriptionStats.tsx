import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { StatisticsApi, SubscriptionStats } from "@/api";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const SubscriptionStatsCard = ({ className }: { className?: string }) => {
  const config = useAuth();
  const statisticsApi = new StatisticsApi(config);
  const [stats, setStats] = useState<SubscriptionStats>();

  const fecthData = async () => {
    await statisticsApi.getSubscriptionStats().then(
      (response) => setStats(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <Card className={cn("border py-3 px-5", className)}>
      <h1 className="text-lg ">Subscriptions</h1>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl">{stats?.count}</h1>
        <h1 className="flex flex-row justify-between items-center gap-2 text-xs">
          <span>Last week</span>
          <span>{stats?.lastweekCount}</span>
          <span>
            <TrendingUp className="h-4 w-4" />
          </span>
        </h1>
      </div>
    </Card>
  );
};

export default SubscriptionStatsCard;
