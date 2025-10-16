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
import { RadioGroup, RadioGroupItem } from "@altha/core/components/ui/radio-group";
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
  const { levelActivities, position, isEditing, form, mutation, submitHandler } = useForm({
    initialData,
    onSubmit,
  });

  return (
    <div className="flex flex-col gap-4">
      <AlertDrawerHeader>
        <AlertDrawerTitle>
          {!isEditing ? "Add RASCI Mapping" : "Edit RASCI Mapping"}
        </AlertDrawerTitle>
        <AlertDrawerDescription>
          {!isEditing
            ? "Add new RASCI Mapping to master data"
            : "Edit current RASCI Mapping details in master data."}
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
                name="level_activities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level Activity</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={levelActivities.isLoading}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a level activity" />
                        </SelectTrigger>
                      </FormControl>
                      {levelActivities.data && (
                        <SelectContent>
                          {levelActivities.data.data.records.length > 0 ? (
                            levelActivities.data.data.records.map((activity: any) => (
                              <SelectItem key={activity.id} value={activity.id}>
                                {activity.index} - {activity.level}
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Name</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={position.isLoading}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a level activity" />
                        </SelectTrigger>
                      </FormControl>
                      {position.data && (
                        <SelectContent>
                          {position.data.data.records.length > 0 ? (
                            position.data.data.records.map((value: any) => (
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
              <FormField
                control={form.control}
                name="rasci"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>RASCI Activity</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a rasci activity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="R">R (Responsible)</SelectItem>
                        <SelectItem value="A">A (Accountable)</SelectItem>
                        <SelectItem value="S">S (Supportive)</SelectItem>
                        <SelectItem value="C">C (Consulted)</SelectItem>
                        <SelectItem value="I">I (Informed)</SelectItem>
                      </SelectContent>
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
