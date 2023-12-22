import { useState } from "react";
import routine from "../../mock/routine";
import ThumbnailView from "./ThumbnailView";
import PlayView from "./PlayView";
import DoneView from "./DoneView";

interface Props {}

const mockRoutine = routine[0];

type PlayViewStepType = 0 | 1 | 2;

export default function RoutinePlayPage({}: Props) {
  const [playViewStep, setPlayViewStep] = useState<PlayViewStepType>(0);

  const renderStepView = () => {
    switch (playViewStep) {
      case 0:
        return (
          <ThumbnailView
            routine={mockRoutine}
            goToNextStep={() => setPlayViewStep(1)}
          />
        );
      case 1:
        return (
          <PlayView
            routine={mockRoutine}
            goToNextStep={() => setPlayViewStep(2)}
          />
        );
      case 2:
        return (
          <DoneView
            routine={mockRoutine}
            goToInitialStep={() => setPlayViewStep(1)}
          />
        );
        return null;
    }
  };

  return <>{renderStepView()}</>;
}
