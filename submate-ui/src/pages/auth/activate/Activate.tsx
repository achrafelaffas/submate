import { AuthenticationControllerApi } from "@/api";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sucess from "./Sucess";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Token = z.object({
  token: z
    .string()
    .min(6, "code mast be 6 digits")
    .max(6, "code mast be 6 digits"),
});

const Activate = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const auth = new AuthenticationControllerApi();
  const form = useForm<z.infer<typeof Token>>({
    resolver: zodResolver(Token),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = async (token: z.infer<typeof Token>) => {
    console.log(token);
    await auth.activate(token.token.toString()).then(
      () => console.log("activated"),
      () => console.log("eroor")
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm px-4">
        <CardHeader>
          <CardTitle className="text-2xl">Activate Your Account</CardTitle>
          <CardDescription>
            Enter the code we sent to your email address : {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col gap-4 justify-center">
            {form.formState.isSubmitSuccessful && (
              <Sucess message="Your account has been activated" />
            )}
            {!form.formState.isSubmitSuccessful && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full flex flex-col items-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activation code</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSeparator />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSeparator />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Spinner />
                    ) : (
                      "Activate my account"
                    )}
                  </Button>
                </form>
              </Form>
            )}
            {form.formState.isSubmitSuccessful && (
              <Button>
                <Link to="/login">Login to my account</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activate;
