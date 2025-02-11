import { PropsWithChildren, useEffect } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import usePrevious from "@/hooks/usePrevious";

import { ScrollArea } from "./scroll-area";

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
  onModalInvisible,
  onModalOpen,
  children,
}: Props & PropsWithChildren) {
  const previousIsOpened = usePrevious(isOpened);

  useEffect(() => {
    if (isOpened !== previousIsOpened && isOpened) {
      onModalOpen?.();
    }
  }, [isOpened, previousIsOpened, onModalOpen]);

  // const isDesktop = useMediaQuery("(min-width: 640px)");

  // if (isDesktop) {
  //   return (
  //     <Dialog open={isOpened} onOpenChange={setIsOpened}>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>{title}</DialogTitle>
  //           {description && (
  //             <DialogDescription>{description}</DialogDescription>
  //           )}
  //         </DialogHeader>

  //         <div className="grid gap-4 py-4">{children}</div>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  const handleAnimationEnd = (isOpen: boolean) => {
    if (!isOpen) {
      onModalInvisible?.();
    }
  };

  return (
    <Drawer
      open={isOpened}
      onOpenChange={setIsOpened}
      onAnimationEnd={handleAnimationEnd}
    >
      <DrawerContent className="p-6 pt-0 max-h-[95vh]">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        <ScrollArea className="p-4 pb-0 overflow-auto">{children}</ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
