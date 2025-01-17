import { PropsWithChildren } from "react";

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

import { ScrollArea } from "./scroll-area";

interface Props {
  isOpened: boolean;
  title: string;

  setIsOpened: (open: boolean) => void;

  description?: string;
}

export default function Modal({
  isOpened,
  setIsOpened,
  title,
  description,
  children,
}: Props & PropsWithChildren) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <div className="grid gap-4 py-4">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpened} onOpenChange={setIsOpened}>
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
