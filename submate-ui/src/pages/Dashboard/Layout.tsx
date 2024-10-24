import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col pb-5">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-5 md:pt-5 md:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
