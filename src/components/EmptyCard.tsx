interface Props {
  label: string;

  children?: React.ReactNode;
}

export default function EmptyCard({ label, children }: Props) {
  return (
    <div className="flex h-36 shrink-0 items-center justify-center rounded-md border">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="mt-4 text-lg font-semibold">{label} 목록이 비었어요.</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
