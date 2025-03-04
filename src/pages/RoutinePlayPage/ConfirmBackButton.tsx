import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Routes from "@/constants/routes";

export default function ConfirmBackButton() {
  const navigate = useNavigate();

  const handleBackToRoutine = () => {
    navigate(`/${Routes.Routine}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <ChevronLeft />
          루틴 목록으로
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            루틴을 종료하고 목록으로 돌아갈까요?
          </AlertDialogTitle>
          <AlertDialogDescription>
            진행중인 내용이 없어지게 돼요. 확인을 누르면 목록으로 돌아가져요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleBackToRoutine}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
