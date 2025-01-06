import { Weeks } from "@/utils/time";

interface Props {
  weekList: Array<number>;

  onWeekChange?: (repeatDays: Array<number>, checked: boolean) => void;
}

export default function CheckableWeekList({ weekList, onWeekChange }: Props) {
  const handleWeekCheckboxChange = (checked: boolean, index: number) => {
    const nextWeekList = weekList.map((v, i) =>
      i === index ? Number(checked) : v
    );

    onWeekChange?.(nextWeekList, checked);
  };

  return (
    <div className="flex gap-2">
      {weekList.map((value, idx) => {
        return (
          <label key={idx} className="swap swap-indeterminate">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleWeekCheckboxChange(e.target.checked, idx)}
            />

            <div className="swap-on py-1 px-2 card-bordered shadow-sm rounded-badge border-primary text-primary">
              <p>{Weeks[idx]}</p>
            </div>
            <div className="swap-off py-1 px-2 card-bordered shadow-sm rounded-badge bg-slate-50 ">
              <p>{Weeks[idx]}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
