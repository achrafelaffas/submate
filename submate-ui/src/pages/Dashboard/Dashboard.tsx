import SubscriptionsPerCategoryChart from "./SubscriptionsPerCategoryChart";
import RecentPayments from "./RecentPayments";
import SubscriptionStatsCard from "./SubscriptionStats";
import TotalExpenses from "./TotalExpenses";
import UpComingThisWeek from "./UpComingThisWeek";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row mb-3 gap-4">
        <SubscriptionStatsCard className="md:w-1/3 w-full" />
        <TotalExpenses className="md:w-1/3 w-full" />
        <UpComingThisWeek className="md:w-1/3 w-full" />
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
