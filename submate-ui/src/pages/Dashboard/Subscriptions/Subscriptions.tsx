import { SubscriptionResponse } from "@/api";
import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import Spinner from "@/components/ui/spinner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import useApi from "@/hooks/UseApi";

const Subscriptions = () => {
  const api = useApi();
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fecthSubscriptions = async () => {
    setIsLoading(true);
    await api.subscriptionApi.getSubscriptions().then(
      (response) => {
        const data = response.data;
        setSubscriptions(data);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        setError("We couldn't load your data! Please try again later.");
      }
    );
  };

  useEffect(() => {
    fecthSubscriptions();
  }, []);

  if (error)
    return (
      <div className="h-[75vh] w-full flex justify-center items-center">
        <p>{error}</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="h-[75vh] w-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl">My Subscriptions</h1>
        <Link to={`/me/subscriptions/new`}>
          <Button>
            <PlusIcon /> <span className="hidden md:inline">Add New</span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {subscriptions.map((s) => (
          <SubscriptionCard key={s.id} subscription={s} />
        ))}
      </div>
    </>
  );
};

export default Subscriptions;
