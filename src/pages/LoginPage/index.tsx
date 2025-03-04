import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { authApi } from "@/api/client";
import { useAuthStore } from "@/state/useAuthStore";
import Routes from "@/constants/routes";
import { LoginOutput } from "@/api/generated";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [rememberMe, setRememberMe] = useState(false);

  const { setToken, setUser } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const handleLoginSuccess = (response: AxiosResponse<LoginOutput>) => {
    if (rememberMe) {
      localStorage.setItem("username", form.getValues().username);
    } else {
      localStorage.removeItem("username");
    }

    const data = response.data;

    if (!data) return;

    setToken(data.access_token);
    setUser(data.user);
    navigate(`/${Routes.Main}`, {
      replace: true,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: handleLoginSuccess,
    onError: () =>
      toast.error(
        "로그인에 실패했습니다. 아이디 혹은 비밀번호를 확인해주세요."
      ),
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");

    if (savedUsername) {
      form.setValue("username", savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
          로그인하고 태스키로 간편하게 일정을 관리해보세요.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>

                  <FormControl>
                    <Input
                      className="text-sm"
                      placeholder="아이디를 입력하세요."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>

                  <FormControl>
                    <Input
                      className="text-sm"
                      type="password"
                      placeholder="비밀번호를 입력하세요."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={rememberMe}
                onCheckedChange={(e) => setRememberMe(e as boolean)}
              />
              <Label htmlFor="terms">아이디 기억하기</Label>
            </div>

            <Button className="w-full" disabled={isPending} type="submit">
              로그인
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Link className="w-full" to={`/${Routes.SignUp}`}>
          <Button
            variant="outline"
            className="w-full"
            disabled={isPending}
            type="submit"
          >
            회원가입 페이지로 이동하기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
