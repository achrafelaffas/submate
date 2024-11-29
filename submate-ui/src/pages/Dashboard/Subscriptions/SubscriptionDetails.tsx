import { SubscriptionResponse, PaymentResponse } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extractColors } from "extract-colors";
import Spinner from "@/components/ui/spinner";
import { Calendar, DollarSign, Group, RotateCcw } from "lucide-react";
import PaymentHistory from "../payments/PaymentHistory";
import { formatAmount } from "@/lib/utils";
import useApi from "@/hooks/UseApi";

const SubscriptionDetails = () => {
  const { id } = useParams();
  const api = useApi();
  const [subscription, setSubscription] = useState<SubscriptionResponse>({});
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [color, setColor] = useState("");

  const options = {
    pixels: 64000,
    distance: 0,
    saturationDistance: 1,
    lightnessDistance: 0,
    hueDistance: 0.083333333,
  };

  const fecthSubscription = async (id: number) => {
    setIsLoading(true);
    await api.subscriptionApi.getSubscriptionById(id).then(
      (response) => {
        const data = response.data;
        setSubscription(data);
        if (data.payments) {
          setPayments(data.payments);
        }

        if (data.image) {
          extractColors(data.image, options).then((r) => {
            setColor(r[0].hex);
          });
        }

        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        setError("We couldn't load your data! Please try again later.");
      }
    );
  };

  useEffect(() => {
    if (id) fecthSubscription(Number(id));
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex md:flex-row flex-col justify-between">
      <div className="md:w-1/3 w-full">
        <div className="flex flex-row items-center w-full gap-4 mb-10">
          <div className="h-12 w-12 md:h-20 md:w-20">
            <img src={subscription.image} />
          </div>
          <h1 className="text-3xl" style={{ color: color }}>
            {subscription.plateform}
          </h1>
        </div>
        <Card>
          <CardHeader className="p-0">
            <CardTitle className="font-normal mb-5">Informtaion</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2 text-sm p-0">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: color }} />{" "}
              <span className="font-bold hidden md:flex">Next payment</span>
              {subscription.dueDate &&
                new Date(subscription.dueDate).toDateString()}
            </div>

            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" style={{ color: color }} />{" "}
              <span className="font-bold hidden md:flex">Cycle</span>
              <span>{subscription.billing}</span>
            </div>

            <div className="flex items-center gap-2">
              <Group className="h-4 w-4" style={{ color: color }} />{" "}
              <span className="font-bold hidden md:flex">Category</span>
              {subscription.category?.name}
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" style={{ color: color }} />{" "}
              <span className="font-bold hidden md:flex">Price</span>
              {subscription.price && formatAmount(subscription.price)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:w-2/3 w-full">
        <h1 className="text-sm md:text-xl mb-5">Payments</h1>
        <PaymentHistory payments={payments} />
      </div>
    </div>
  );
};

export default SubscriptionDetails;
