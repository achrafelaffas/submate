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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import Spinner from "@/components/ui/spinner";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useApi from "@/hooks/UseApi";

const AuthRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password should have 8 characters minimum"),
});

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const api = useApi();
  const form = useForm<z.infer<typeof AuthRequestSchema>>({
    resolver: zodResolver(AuthRequestSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const [error, setError] = useState("");

  const onSubmit = async (authRequest: z.infer<typeof AuthRequestSchema>) => {
    await api.authApi.authenticate(authRequest).then(
      (response) => {
        const authenticationResponse = response.data;
        const token = authenticationResponse.token
          ? authenticationResponse.token
          : "";
        signIn({
          auth: {
            token: token,
            type: "Bearer",
          },
          userState: { id: authenticationResponse.id },
        });
        navigate("/me");
      },
      () => setError("Your email or password is incorrect")
    );
  };

  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto max-w-sm lg:w-1/4 w-full bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {!error && <span>Enter your email to login</span>}
            {error && <span className="text-red-500">{error}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form
                className="grid gap-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={cn(error && "border border-red-500")}
                          placeholder="m@example.com"
                        />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className={cn(error && "border border-red-500")}
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
                    "Login to your account"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>

          <div className="mt-4 text-center text-sm">
            forgot password?{" "}
            <Link to="/forgot-password" className="underline">
              Reset password
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
