const LoginPage = () => {
  return (
    <div>
      <form>
        <label className="form-control">
          <div className="label">
            <span className="label-text">아이디를 입력하세요.</span>
          </div>
          <input
            required
            type="text"
            placeholder="ID"
            className="input input-bordered"
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
          />
        </label>

        <div className="flex mt-3 items-center justify-between">
          <div className="flex items-center">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox mr-2" />
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
        />
      </form>
    </div>
  );
};

export default LoginPage;
