import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authApi } from "@/api/client";
import Routes from "@/constants/routes";
import InputField from "@/components/InputField";
import { ErrorResponse } from "@/api/generated";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z
  .object({
    username: z
      .string()
      .min(4, "아이디는 4자 이상이어야 합니다.")
      .max(20, "아이디는 20자 이하이어야 합니다.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "아이디는 영문 혹은 영문과 숫자를 조합해주세요."
      ),
    password: z
      .string()
      .min(6, "비밀번호는 6자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하이어야 합니다.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "비밀번호는 영문 혹은 영문과 숫자를 조합해주세요."
      ),
    passwordConfirm: z
      .string()
      .min(6, "비밀번호는 6자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하이어야 합니다.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "비밀번호는 영문 혹은 영문과 숫자를 조합해주세요."
      ),
    email: z
      .string()
      .max(100, "이메일은 100자 이하여야 합니다.")
      .email("이메일 형식이 올바르지 않습니다."),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호 확인란과 비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
      });
    }
  });

const SignUpPage = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      navigate(`/${Routes.Login}`);
      // addMessage({
      //   message: "회원가입이 완료되었습니다. 로그인을 해주세요.",
      //   type: "success",
      // });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // if (error.response?.status === 422 && error.response?.data.location) {
      //   const { location, error_type } = error.response.data;
      //   if (location == "username" && messages.username[error_type] != null) {
      //     addMessage({
      //       message: messages.username[error_type],
      //       type: "warning",
      //     });
      //   } else if (location == "password") {
      //     addMessage({
      //       message: messages.password[error_type],
      //       type: "warning",
      //     });
      //   } else if (location == "password_confirm") {
      //     addMessage({
      //       message: messages.password_confirm[error_type],
      //       type: "warning",
      //     });
      //   } else if (location == "email") {
      //     addMessage({ message: messages.email[error_type], type: "warning" });
      //   }
      // } else if (error.response?.status === 409) {
      //   const { error_type } = error.response.data;
      //   if (error_type == "USERNAME_ALREADY_EXISTS") {
      //     addMessage({
      //       message: messages.username[error_type],
      //       type: "warning",
      //     });
      //   } else if (error_type == "EMAIL_ALREADY_EXISTS") {
      //     addMessage({
      //       message: messages.email[error_type],
      //       type: "warning",
      //     });
      //   }
      // }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      username: values.username,
      password: values.password,
      password_confirm: values.passwordConfirm,
      email: values.email,
    });
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">계정 생성하기</CardTitle>
        <CardDescription>Taskie를 이용할 계정을 만들어주세요.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormDescription>
                    최소 4자 이상, 최대 20자 이하, 영문 혹은 숫자를
                    조합해주세요.
                  </FormDescription>

                  <FormControl>
                    <Input
                      className="text-sm"
                      placeholder="사용할 아이디를 입력하세요."
                      {...field}
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
                  <FormLabel>비밀번호</FormLabel>
                  <FormDescription>
                    최소 6자 이상, 최대 20자 이하, 영문 혹은 숫자를
                    조합해주세요.
                  </FormDescription>

                  <FormControl>
                    <Input
                      className="text-sm"
                      type="password"
                      placeholder="사용할 비밀번호를 입력하세요."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>

                  <FormControl>
                    <Input
                      className="text-sm"
                      type="password"
                      placeholder="사용할 비밀번호를 한번 더 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>

                  <FormControl>
                    <Input
                      className="text-sm"
                      placeholder="사용할 이메일을 입력하세요."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isPending} type="submit">
              회원가입
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
