import {
  AlertDrawerAction,
  AlertDrawerClose,
  AlertDrawerDescription,
  AlertDrawerFooter,
  AlertDrawerHeader,
  AlertDrawerTitle,
} from "@altha/core/components/ui/alert-drawer";
import { Button } from "@altha/core/components/ui/button";
import {
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@altha/core/components/ui/form";
import { RichTextEditor } from "@altha/core/components/ui/rich-text-editor";
import { useForm } from "../hooks/use-form";

export const FormJobPurpose = ({
  initialData,
  onSubmit
}: {
  initialData?: any;
  onSubmit?: () => void;
}) => {
  const { 
    form, 
    mutation, 
    submitHandler 
  } = useForm({
    initialData,
    onSubmit,
  });
  
  return (
    <div className="flex flex-col gap-4">
      <AlertDrawerHeader>
        <AlertDrawerTitle>
          Edit Job Purpose
        </AlertDrawerTitle>
        <AlertDrawerDescription>
          Modify the job purpose in the form fields below.
        </AlertDrawerDescription>
      </AlertDrawerHeader>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          
          <div className="flex flex-col lg:flex-row item-start gap-2 mb-4 mt-4">
            <FormField
              control={form.control}
              name={"job_purpose"}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <RichTextEditor
                      editable={!field.disabled}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      placeholder="Input job purpose here"
                      throttleDelay={200}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </FormProvider>
      <AlertDrawerFooter>
        <AlertDrawerClose
          disabled={mutation.isPending}
          onClick={() => form.reset()}
        >
          Cancel
        </AlertDrawerClose>
        <AlertDrawerAction asChild onClick={form.handleSubmit(submitHandler)}>
          <Button loading={mutation.isPending}>
            Save
          </Button>
        </AlertDrawerAction>
      </AlertDrawerFooter>
    </div>
  );
};
