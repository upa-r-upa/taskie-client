import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/client";
import { Message, useMessageStore } from "../../state/useMessageStore";

import Routes from "../../constants/routes";
import useMutation from "../../hooks/useMutation";
import InputField from "../../components/InputField";

const messages: { [key: string]: { [key: string]: string } } = {
  username: {
    VALUE_TOO_SHORT: "아이디는 4자 이상이어야 합니다.",
    VALUE_TOO_LONG: "아이디는 20자 이하이어야 합니다.",
    VALUE_MUST_BE_ALPHANUM: "아이디는 영문 혹은 영문과 숫자를 조합해주세요.",
    USERNAME_ALREADY_EXISTS:
      "이미 사용중인 아이디입니다. 다른 아이디를 입력해주세요.",
  },
  password: {
    VALUE_TOO_SHORT: "비밀번호는 6자 이상이어야 합니다.",
    VALUE_TOO_LONG: "비밀번호는 20자 이하이어야 합니다.",
    VALUE_MUST_BE_ALPHANUM: "비밀번호는 영문 혹은 영문과 숫자를 조합해주세요.",
  },
  password_confirm: {
    PASSWORD_NOT_MATCH:
      "비밀번호 확인란과 비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
  },
  email: {
    VALUE_TOO_LONG: "이메일은 100자 이하여야 합니다. 다시 입력해주세요.",
    INVALID_EMAIL_FORMAT: "이메일 형식이 올바르지 않습니다. 다시 입력해주세요.",
    EMAIL_ALREADY_EXISTS:
      "이미 사용중인 이메일입니다. 다른 이메일을 입력해주세요.",
  },
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const addMessage = useMessageStore((state) => state.addMessage);

  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  const { mutation, isLoading } = useMutation({
    mutationFn: () =>
      authApi.signup({
        username: form.username,
        password: form.password,
        password_confirm: form.passwordConfirm,
        email: form.email,
      }),
    onSuccess: () => {
      navigate(`/${Routes.LOGIN}`);
      addMessage({
        message: "회원가입이 완료되었습니다. 로그인을 해주세요.",
        type: "success",
      });
    },
    onError: (error) => {
      const extraErrorMessage: Message = {
        message: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
        type: "error",
      };

      if (error.response?.status === 422 && error.response?.data.location) {
        const { location, error_type } = error.response.data;

        if (location == "username" && messages.username[error_type] != null) {
          addMessage({
            message: messages.username[error_type],
            type: "warning",
          });
        } else if (location == "password") {
          addMessage({
            message: messages.password[error_type],
            type: "warning",
          });
        } else if (location == "password_confirm") {
          addMessage({
            message: messages.password_confirm[error_type],
            type: "warning",
          });
        } else if (location == "email") {
          addMessage({ message: messages.email[error_type], type: "warning" });
        } else {
          addMessage(extraErrorMessage);
        }
      } else if (error.response?.status === 409) {
        const { error_type } = error.response.data;
        if (error_type == "USERNAME_ALREADY_EXISTS") {
          addMessage({
            message: messages.username[error_type],
            type: "warning",
          });
        } else if (error_type == "EMAIL_ALREADY_EXISTS") {
          addMessage({
            message: messages.email[error_type],
            type: "warning",
          });
        } else {
          addMessage(extraErrorMessage);
        }
      } else {
        addMessage(extraErrorMessage);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation();
      }}
    >
      <InputField
        label="사용할 아이디를 입력하세요."
        type="text"
        value={form.username}
        onChange={handleChange}
        placeholder="ID"
        extraText="* 최소 4자 이상, 최대 20자 이하, 영문 혹은 영문과 숫자를 조합해주세요."
        name="username"
        isRequired
      />
      <InputField
        label="사용할 비밀번호를 입력하세요."
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        extraText="* 최소 6자 이상, 최대 20자 이하, 영문 혹은 영문과 숫자를 조합해주세요."
        name="password"
        isRequired
      />
      <InputField
        label="비밀번호를 한번 더 입력하세요."
        type="password"
        value={form.passwordConfirm}
        onChange={handleChange}
        placeholder="Confirm Password"
        name="passwordConfirm"
        isRequired
      />
      <div>
        <InputField
          label="이메일을 입력하세요."
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          name="email"
          isRequired
        />
      </div>
      <input
        type="submit"
        value="회원가입"
        disabled={isLoading}
        className="btn btn-primary btn-block mt-5"
      />
    </form>
  );
};

export default SignUpPage;
