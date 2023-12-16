import { Routine } from "../../types/routine";

interface Props {
  routine: Routine;
}

export default function DoneView({ routine }: Props) {
  return (
    <div>
      <h1>Done view</h1>
    </div>
  );
}
