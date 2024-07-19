interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export default function Loading({
  message,
  className,
  ...props
}: LoadingProps) {
  return (
    <div className={`flex-1 items-center ${className}`} {...props}>
      <div className="text-center w-full">
        <span className="loading loading-dots loading-lg"></span>

        <p>{message ?? "로딩 중입니다."}</p>
      </div>
    </div>
  );
}
