import { Routine } from "../../types/routine";

interface Props {
  routine: Routine;
}

export default function PlayView({ routine }: Props) {
  return (
    <div>
      <h1>Play View</h1>
    </div>
  );
}
