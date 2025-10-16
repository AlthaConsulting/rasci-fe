import {
  DotsThreeVertical as DotsThreeVerticalIcon,
  Plus as PlusIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import {
  AlertDrawer,
  AlertDrawerAction,
  AlertDrawerClose,
  AlertDrawerContent,
  AlertDrawerDescription,
  AlertDrawerFooter,
  AlertDrawerHeader,
  AlertDrawerTitle,
  AlertDrawerTrigger,
} from "@altha/core/components/ui/alert-drawer";
import { Button } from "@altha/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@altha/core/components/ui/dropdown-menu";

import { DataTable, DataTableProps } from "../ui/data-table";

function HeaderModal<T>({
  form: Form,
  title,
}: {
  form: (props: {
    initialData?: T;
    onSubmit?: () => void;
  }) => React.JSX.Element;
  title: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section>
      <header className="container mx-auto flex items-center justify-between px-4 md:px-5 lg:px-8 py-3 md:py-4 lg:py-8">
        <h1 className="text-headings-medium-semibold lg:text-headings-large">
          {title}
        </h1>
        <AlertDrawer open={open} onOpenChange={setOpen}>
          <AlertDrawerTrigger asChild>
            <Button>
              <PlusIcon />
              New Entry
            </Button>
          </AlertDrawerTrigger>
          <AlertDrawerContent className="!max-w-4xl !w-full">
            <Form onSubmit={() => setOpen(false)} />
          </AlertDrawerContent>
        </AlertDrawer>
      </header>
    </section>  
  );
}

function MasterData<T>({
  form: Form,
  table,
}: {
  form: (props: {
    initialData?: T;
    onSubmit?: () => void;
  }) => React.JSX.Element;
  table: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <section>
        <header className="container mx-auto flex items-center justify-between py-2">
          <AlertDrawer open={open} onOpenChange={setOpen}>
            <AlertDrawerTrigger asChild>
              <Button>
                <PlusIcon />
                New Entry
              </Button>
            </AlertDrawerTrigger>
            <AlertDrawerContent>
              <Form onSubmit={() => setOpen(false)} />
            </AlertDrawerContent>
          </AlertDrawer>
        </header>
      </section>
      <section className="container mx-auto py-4">{table}</section>
    </>
  );
}

function MasterDataTable<T>({ ...props }: DataTableProps<T>) {
  return <DataTable {...props} />;
}

// function MasterDataForm() {}

function MasterDataActionColumn<T>({
  form: Form,
  initialData,
  onDelete,
}: {
  form: (props: {
    initialData?: T;
    onSubmit?: () => void;
  }) => React.JSX.Element;
  initialData: T;
  onDelete: () => void;
}) {
  const [content, setContent] = useState<string>("edit");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AlertDrawer open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <AlertDrawerTrigger asChild>
            <DropdownMenuItem onClick={() => setContent("edit")}>
              Edit
            </DropdownMenuItem>
          </AlertDrawerTrigger>
          <AlertDrawerTrigger asChild>
            <DropdownMenuItem onClick={() => setContent("delete")}>
              Delete
            </DropdownMenuItem>
          </AlertDrawerTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDrawerContent>
        <div style={{ display: content === "edit" ? "block" : "none" }}>
          <Form initialData={initialData} onSubmit={() => setOpen(false)} />
        </div>
        {content === "delete" && (
          <DeleteConfirmation
            onDelete={() => {
              setOpen(false);
              onDelete();
            }}
          />
        )}
      </AlertDrawerContent>
    </AlertDrawer>
  );
}

function DeleteConfirmation({ onDelete }: { onDelete: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <AlertDrawerHeader>
        <AlertDrawerTitle>Are you sure you want to delete?</AlertDrawerTitle>
        <AlertDrawerDescription>
          This action cannot be undone.
        </AlertDrawerDescription>
      </AlertDrawerHeader>
      <AlertDrawerFooter>
        <AlertDrawerClose>Cancel</AlertDrawerClose>
        <AlertDrawerAction
          className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
          onClick={onDelete}
        >
          Delete
        </AlertDrawerAction>
      </AlertDrawerFooter>
    </div>
  );
}

export { MasterData, MasterDataTable, MasterDataActionColumn, HeaderModal };
