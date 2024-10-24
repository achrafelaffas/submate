import { SubscriptionResponse } from "@/api";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface SubscriptionCardProps {
  subscription: SubscriptionResponse;
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <Link to={`/subscriptions/${subscription.id}/details`}>
      <Card className="flex flex-col gap-1 items-center justify-center p-4">
        <div className="h-20 w-20 rounded-none border">
          <img src={subscription.image} />
        </div>
        <h1 className="text-center">{subscription.plateform}</h1>
      </Card>
    </Link>
  );
};

export default SubscriptionCard;
