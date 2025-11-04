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
  FormDescription,
} from "@altha/core/components/ui/form";
import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@altha/core/components/ui/select";
import { Input } from "@altha/core/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@altha/core/components/ui/radio-group";
import { useForm } from "./use-form";
import { FileUploader } from "@altha/core/components/ui/file-uploader";

export const Form = ({
  initialData,
  onSubmit,
}: {
  initialData?: City;
  onSubmit?: () => void;
}) => {
  const { level, position, isEditing, form, mutation, submitHandler } = useForm({
    initialData,
    onSubmit,
  });

  return (
    <div className="flex flex-col gap-4">
      <AlertDrawerHeader>
        <AlertDrawerTitle>
          {!isEditing ? "Add Position" : "Edit Position"}
        </AlertDrawerTitle>
        <AlertDrawerDescription>
          {!isEditing
            ? "Add new position to master data"
            : "Edit current Position details in master data."}
        </AlertDrawerDescription>
      </AlertDrawerHeader>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          {!isEditing && (
            <FormField
              name="entry"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex items-center gap-5"
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="manual" />
                        </FormControl>
                        <FormLabel>Manual Entry</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="import" />
                        </FormControl>
                        <FormLabel>Import Data</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {form.watch("entry") === "manual" ? (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Position Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter position name here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />  
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Level</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={position.isLoading}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a job level" />
                        </SelectTrigger>
                      </FormControl>
                      {level.data && (
                        <SelectContent>
                          {level.data.data.records.length > 0 ? (
                            level.data.data.records.map((value: any) => (
                              <SelectItem key={value.id} value={value.id}>
                                {value.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectEmpty />
                          )}
                        </SelectContent>
                      )}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Level Activities File</FormLabel> */}
                  <FormControl>
                    <FileUploader
                      ref={field.ref}
                      accept={{
                        "text/csv": [],
                        ".csv": [],
                      }}
                      name={field.name}
                      onBlur={field.onBlur}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Upload CSV file with a maximum size of 1MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
            {isEditing ? "Update" : "Create"}
          </Button>
        </AlertDrawerAction>
      </AlertDrawerFooter>
    </div>
  );
};
