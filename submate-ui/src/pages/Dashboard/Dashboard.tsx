import SubscriptionsPerCategoryChart from "./SubscriptionsPerCategoryChart";
import RecentPayments from "./RecentPayments";
import SubscriptionStatsCard from "./SubscriptionStats";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-row mb-3 gap-4">
        <SubscriptionStatsCard className="w-1/4" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1">
          <SubscriptionsPerCategoryChart />
        </div>
        <div className="col-span-1">
          <RecentPayments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
