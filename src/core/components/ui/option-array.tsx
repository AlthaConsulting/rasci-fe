import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "@altha/core/components/ui/form";
import { Input } from "@altha/core/components/ui/input";
import { Button } from "@altha/core/components/ui/button";
import { Plus, X } from "@phosphor-icons/react";

type Props = {
  nestIndex: number;
  qIndex: number;
  control: any;
};

export const OptionsFieldArray = ({ nestIndex, qIndex, control }: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `sections.${nestIndex}.questions.${qIndex}.options`,
  });

  const { watch } = useFormContext();
  const options = watch(`sections.${nestIndex}.questions.${qIndex}.options`);

  const handleSelectAnswer = (oIndex: number) => {
    fields.forEach((f, idx) => {
      update(idx, {
        ...options[idx],
        is_answer: idx === oIndex, 
      });
    });
  };

  return (
    <div className="space-y-2">
      {fields.map((field, oIndex) => (
        <div key={field.id} className="flex items-center gap-2">
          <input
            type="radio"
            checked={options?.[oIndex]?.is_answer || false}
            onChange={() => handleSelectAnswer(oIndex)}
          />

          {/* input option */}
          <FormField
            control={control}
            name={`sections.${nestIndex}.questions.${qIndex}.options.${oIndex}.name`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder={`Option ${oIndex + 1}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* delete option */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(oIndex)}
          >
            <X className="w-4 h-4 text-gray-500 hover:text-red-600" />
          </Button>
        </div>
      ))}

      {/* add option */}
      <Button
        type="button"
        variant="ghost"
        className="text-sm text-gray-400 flex items-center gap-1"
        onClick={() => append({ name: "", is_answer: false })}
      >
        <Plus className="w-4 h-4" /> Add option
      </Button>
    </div>
  );
};
