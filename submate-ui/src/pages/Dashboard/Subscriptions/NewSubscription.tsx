import {
  SubscriptionRequest,
  SubscriptionRequestBillingEnum as Billing,
  CategoryDTO,
} from "@/api";

import BrandAutocomplete, { Brand } from "@/components/BrandAutocomplete";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useApi from "@/hooks/UseApi";
import { subscriptionRequestSchema } from "@/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewSubscription = () => {
  const clientId = "1iddgnnxg141uPYC3NF";
  const api = useApi();
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const navigate = useNavigate();

  const form = useForm<SubscriptionRequest>({
    resolver: zodResolver(subscriptionRequestSchema),
    defaultValues: {
      image: "",
      plateform: "",
      price: 0,
      billing: "MONTHLY",
    },
  });

  const handleClick = (brand: Brand) => {
    form.setValue("plateform", brand.name);
    form.setValue("image", brand.icon || "none");
  };

  const submit = async (request: SubscriptionRequest) => {
    const url = request.image.replace(/(\?c=)[^&]+/, `$1${clientId}`);
    request.image = url;
    console.log(request.image);
    await api.subscriptionApi.createSubscription(request).then(
      () => navigate("/me/subscriptions", { replace: true }),
      (e) => console.log(e)
    );
  };

  const getCategories = async () => {
    await api.categoryApi.getAllCategories().then(
      (response) => setCategories(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Card className="lg:w-1/2 md:w-2/3 flex flex-col gap-5 bg-transparent mx-auto">
      <div>
        <BrandAutocomplete onSelect={handleClick} />
        {form.formState.errors.plateform?.message && (
          <p className="text-sm mt-2 font-medium text-red-500">
            {form.formState.errors.plateform.message}
          </p>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input placeholder="Subscrption price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plateform"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input placeholder="Subscrption price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscrption price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Subscrption price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing cycle</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a billing cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Billing.Monthly}>
                          {Billing.Monthly}
                        </SelectItem>
                        <SelectItem value={Billing.Yearly}>
                          {Billing.Yearly}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full mt-7 flex md:justify-end">
            <Button className=" w-full md:w-1/6">Save</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default NewSubscription;
