import { ResetPasswordRequest } from "@/api";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import Spinner from "@/components/ui/spinner";
import useApi from "@/hooks/UseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

const requestValidation = z.object({
  token: z
    .string({ message: "The email is required." })
    .length(6, { message: " The code is 6 figures" }),

  password: z
    .string({ message: "The password is required." })
    .min(8, "Password should have 8 characters"),
});

const ResetPassword = () => {
  const api = useApi();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(requestValidation),
    defaultValues: {
      token: "",
      password: "",
    },
  });

  const onSubmit = async (request: ResetPasswordRequest) => {
    await api.authApi.resetPassword(request).then(
      () => {
        setMessage("Your password has been updated");
      },
      () => {
        setError("An error occurred, plase try again");
      }
    );
  };

  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto max-w-sm bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl">Reset password</CardTitle>
          <CardDescription>
            Please check your email for the code.
          </CardDescription>
          {error && <span className="text-sm text-red-400">{error}</span>}
        </CardHeader>
        <CardContent>
          {!message && (
            <Form {...form}>
              <form
                className="grid gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSeparator />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="password"
                        />
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
                  {form.formState.isSubmitting ? (
                    <Spinner />
                  ) : (
                    "Reset my password"
                  )}
                </Button>
              </form>
            </Form>
          )}

          {message && <p className="text-sm text-green-400 mb-3">{message}</p>}
          {message && (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
