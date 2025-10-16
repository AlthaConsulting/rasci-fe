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
import { Input } from "@altha/core/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@altha/core/components/ui/radio-group";
import { Textarea } from "@altha/core/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@altha/core/components/ui/select";
import { useForm } from "./use-form";
import { FileUploader } from "@altha/core/components/ui/file-uploader";

export const Form = ({
  initialData,
  onSubmit,
}: {
  initialData?: City;
  onSubmit?: () => void;
}) => {
  const { levelActivities, isEditing, form, mutation, submitHandler } = useForm({
    initialData,
    onSubmit,
  });

  return (
    <div className="flex flex-col gap-4">
      <AlertDrawerHeader>
        <AlertDrawerTitle>
          {!isEditing ? "Add Level Activity" : "Edit Level Activity"}
        </AlertDrawerTitle>
        <AlertDrawerDescription>
          {!isEditing
            ? "Add new level activity to master data"
            : "Edit current level activity details in master data."}
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
                name="index"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Index</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter index here" {...field} />
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
                    <FormLabel required>Level</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="L1">L1</SelectItem>
                        <SelectItem value="L2">L2</SelectItem>
                        <SelectItem value="L3">L3</SelectItem>
                        <SelectItem value="L4">L4</SelectItem>
                        <SelectItem value="L5">L5</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Index</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={levelActivities.isLoading}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a parent index" />
                        </SelectTrigger>
                      </FormControl>
                      {levelActivities.data && (
                        <SelectContent>
                          {levelActivities.data.data.records.length > 0 ? (
                            levelActivities.data.data.records.map((activity: any) => (
                              <SelectItem key={activity.id} value={activity.id}>
                                {activity.index}
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Description Activity</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description activity here"
                        {...field}
                      />
                    </FormControl>
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
