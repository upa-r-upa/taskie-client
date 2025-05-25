import { cn } from "@/lib/utils";

interface Props {
  label: string;

  children?: React.ReactNode;
  classNames?: string;
}

export default function EmptyCard({ label, children, classNames }: Props) {
  return (
    <div
      className={cn(
        "flex h-36 shrink-0 items-center justify-center rounded-md border",
        classNames
      )}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="mt-4 text-lg font-semibold">{label} 목록이 비었어요.</h3>
        <div className="mb-4 mt-2 text-sm text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
