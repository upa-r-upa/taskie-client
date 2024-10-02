interface Props {
  label: string;

  children?: React.ReactNode;
}

export default function EmptyCard({ label, children }: Props) {
  return (
    <div className="card card-bordered card-compact">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{label} 목록이 비었어요!</h2>
        <div className="card-actions justify-end">{children}</div>
      </div>
    </div>
  );
}
