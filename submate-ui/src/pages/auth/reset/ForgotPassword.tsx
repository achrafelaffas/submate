import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import useApi from "@/hooks/UseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface Request {
  email: string;
}

const RequestValidation = z.object({
  email: z
    .string({ message: "The email is required." })
    .email({ message: "The provided email is invalid." }),
});

const ForgotPassword = () => {
  const api = useApi();
  const navigate = useNavigate();
  const form = useForm<Request>({
    resolver: zodResolver(RequestValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (request: Request) => {
    await api.authApi.requestRestPassword(request.email);
    navigate("/reset-password");
  };

  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto max-w-sm bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="m@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? <Spinner /> : "Send email"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
