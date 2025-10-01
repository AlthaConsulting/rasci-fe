"use client";

import {
  type ComponentPropsWithoutRef,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useMediaQuery } from "@altha/core/hooks/use-media-query";

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
} from "./alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

type AlertDrawerContextValue = {
  isDesktop: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AlertDrawerContext = createContext<AlertDrawerContextValue | null>(null);

export function AlertDrawer(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialog>
    | ComponentPropsWithoutRef<typeof Drawer>
) {
  const [open, setOpen] = useState(props.open || props.defaultOpen || false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setOpen(props.open || props.defaultOpen || false);
  }, [props.defaultOpen, props.open]);

  if (isDesktop === undefined) return null;

  return (
    <AlertDrawerContext.Provider
      value={{ isDesktop, open, onOpenChange: setOpen }}
    >
      {isDesktop ? (
        <AlertDialog open={open} onOpenChange={setOpen} {...props} />
      ) : (
        <Drawer open={open} onOpenChange={setOpen} {...props} />
      )}
    </AlertDrawerContext.Provider>
  );
}
export function AlertDrawerTrigger(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialogTrigger>
    | ComponentPropsWithoutRef<typeof DrawerTrigger>
) {
  const context = useContext(AlertDrawerContext);

  if (!context)
    throw new Error("AlertDrawerTrigger must be used within AlertDrawer");

  const { isDesktop } = context;
  const Trigger = isDesktop ? AlertDialogTrigger : DrawerTrigger;
  return <Trigger {...props} />;
}
export function AlertDrawerContent(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialogContent>
    | ComponentPropsWithoutRef<typeof DrawerContent>
) {
  const context = useContext(AlertDrawerContext);

  if (!context)
    throw new Error("AlertDrawerContent must be used within AlertDrawer");

  const { isDesktop } = context;
  const Content = isDesktop ? AlertDialogContent : DrawerContent;
  return <Content {...props} />;
}
export function AlertDrawerHeader(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialogHeader>
    | ComponentPropsWithoutRef<typeof DrawerHeader>
) {
  const context = useContext(AlertDrawerContext);
  if (!context)
    throw new Error("AlertDrawerHeader must be used within AlertDrawer");

  const { isDesktop } = context;
  const Header = isDesktop ? AlertDialogHeader : DrawerHeader;

  return <Header {...props} />;
}

export function AlertDrawerTitle(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialogTitle>
    | ComponentPropsWithoutRef<typeof DrawerTitle>
) {
  const context = useContext(AlertDrawerContext);
  if (!context)
    throw new Error("AlertDrawerTitle must be used within AlertDrawer");

  const { isDesktop } = context;
  const Title = isDesktop ? AlertDialogTitle : DrawerTitle;

  return <Title {...props} />;
}

export function AlertDrawerDescription(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialogDescription>
    | ComponentPropsWithoutRef<typeof DrawerDescription>
) {
  const context = useContext(AlertDrawerContext);

  if (!context)
    throw new Error("AlertDrawerDescription must be used within AlertDrawer");

  const { isDesktop } = context;
  const Description = isDesktop ? AlertDialogDescription : DrawerDescription;

  return <Description {...props} />;
}

export function AlertDrawerFooter(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialogFooter>
    | ComponentPropsWithoutRef<typeof DrawerFooter>
) {
  const context = useContext(AlertDrawerContext);

  if (!context)
    throw new Error("AlertDrawerFooter must be used within AlertDrawer");

  const { isDesktop } = context;
  const Footer = isDesktop ? AlertDialogFooter : DrawerFooter;

  return <Footer {...props} />;
}

export function AlertDrawerClose(
  props:
    | ComponentPropsWithoutRef<typeof AlertDialogCancel>
    | ComponentPropsWithoutRef<typeof DrawerClose>
) {
  const context = useContext(AlertDrawerContext);

  if (!context)
    throw new Error("AlertDrawerClose must be used within AlertDrawer");

  const { isDesktop } = context;
  const Close = isDesktop ? AlertDialogCancel : DrawerClose;

  return <Close {...props} />;
}

export function AlertDrawerAction(
  props: ComponentPropsWithoutRef<typeof AlertDialogAction>
) {
  const context = useContext(AlertDrawerContext);

  if (!context)
    throw new Error("AlertDrawerAction must be used within AlertDrawer");

  const { isDesktop } = context;

  if (isDesktop) {
    return <AlertDialogAction {...props} />;
  }

  return props.children;
}
