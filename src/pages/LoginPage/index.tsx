import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { authApi } from "../../api/client";
import useMutation from "../../hooks/useMutation";

import { ResponseLoginOutput } from "../../api/generated";
import { useAuthStore } from "../../state/useAuthStore";
import { useNavigate } from "react-router-dom";
import Routes from "../../constants/routes";
import { useMessageStore } from "../../state/useMessageStore";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { setTokenWithUser } = useAuthStore((state) => state);
  const { addMessage } = useMessageStore((state) => state);

  const navigate = useNavigate();

  const handleLoginSuccess = (response: AxiosResponse<ResponseLoginOutput>) => {
    if (rememberMe) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }

    const data = response.data.data;

    if (!data) return;

    setTokenWithUser(data.access_token, data.user);
    navigate(`/${Routes.MAIN}`);
  };

  const handleLoginError = () => {
    addMessage({
      message: "로그인에 실패했습니다. 아이디 혹은 비밀번호를 확인해주세요.",
      type: "error",
    });
  };

  const { mutation, isLoading } = useMutation({
    mutationFn: () =>
      authApi.login({
        username,
        password,
      }),
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="form-control">
          <div className="label">
            <span className="label-text">아이디를 입력하세요.</span>
          </div>
          <input
            required
            type="text"
            placeholder="ID"
            className="input input-bordered"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">비밀번호를 입력하세요.</span>
          </div>
          <input
            required
            type="password"
            placeholder="Password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="flex mt-3 items-center justify-between">
          <div className="flex items-center">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="label-text">아이디 기억하기</span>
              </label>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium text-primary">비밀번호 찾기</p>
          </div>
        </div>

        <input
          type="submit"
          value="로그인"
          className="btn btn-primary btn-block mt-5"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default LoginPage;
