import { PropsWithChildren, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePrevious from "@/hooks/usePrevious";
import { useMounted } from "@/hooks/useMounted";

export interface ModalOpenProps {
  isOpened: boolean;
  setIsOpened: (open: boolean) => void;

  onModalInvisible?: () => void;
  onModalOpen?: () => void;
}

interface Props extends ModalOpenProps {
  title: string;
  description?: string;
}

export default function Modal({
  isOpened,
  title,
  description,
  setIsOpened,
  onModalOpen,
  children,
}: Props & PropsWithChildren) {
  const previousIsOpened = usePrevious(isOpened);
  const isMounted = useMounted();

  useEffect(() => {
    if (isOpened !== previousIsOpened && isOpened) {
      onModalOpen?.();
    }
  }, [isOpened, previousIsOpened, onModalOpen]);

  if (!isMounted) return null;

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent className="overflow-y-auto max-h-device">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="grid gap-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
