const SignUpPage = () => {
  return (
    <div>
      <form>
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">사용할 아이디를 입력하세요.</span>
            <span className="label-text-alt text-warning">* 필수 입력</span>
          </div>
          <input
            required
            type="text"
            placeholder="ID"
            className="input input-bordered"
          />
        </label>

        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">사용할 비밀번호를 입력하세요.</span>
            <span className="label-text-alt text-warning">* 필수 입력</span>
          </div>
          <input
            required
            type="password"
            placeholder="Password"
            className="input input-bordered"
          />
        </label>

        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">
              사용할 비밀번호를 한번 더 입력하세요.
            </span>
            <span className="label-text-alt text-warning">* 필수 입력</span>
          </div>
          <input
            required
            type="password"
            placeholder="Password Again"
            className="input input-bordered"
          />
        </label>

        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">이메일을 입력하세요.</span>
            <span className="label-text-alt text-warning">* 필수 입력</span>
          </div>
          <input
            required
            type="email"
            placeholder="Email"
            className="input input-bordered"
          />
        </label>

        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text">프로필 이미지를 업로드하세요.</span>
            <span className="label-text-alt text-info">* 선택 입력</span>
          </div>

          <div className="avatar mb-1">
            <div className="w-24 mask mask-squircle">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </label>

        <input
          type="submit"
          value="회원가입"
          className="btn btn-primary btn-block mt-5"
        />
      </form>
    </div>
  );
};

export default SignUpPage;
