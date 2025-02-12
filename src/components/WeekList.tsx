import { getDayName } from "@/utils/time";

interface Props {
  weekList: number[];

  className?: string;
}

export default function WeekList({ weekList, className }: Props) {
  return (
    <div
      className={`flex ${className} tracking-wider font-normal gap-1 text-xs`}
    >
      <span className="text-muted-foreground">매주</span>
      <span>{weekList.map((week) => getDayName(week)).join("")}</span>
    </div>
  );
}
