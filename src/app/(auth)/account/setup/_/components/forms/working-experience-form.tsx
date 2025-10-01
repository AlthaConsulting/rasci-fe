"use client";

import { Plus, Trash } from "@phosphor-icons/react";
import { useFieldArray } from "react-hook-form";
import { useState } from "react";

import { Button } from "@altha/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@altha/core/components/ui/card";
import { Form } from "@altha/core/components/ui/form";
import { Separator } from "@altha/core/components/ui/separator";

import { CompanyNameField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/company-name-field";
import { EndDateField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/end-date-field";
import { PositionField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/position-field";
import { StartDateField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/start-date-field";
import { StillWorkingField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/still-working-field";

import { useWorkingExperienceForm } from "../../hooks/use-working-experience-form";

export const WorkingExperienceForm = ({
  backFn,
  nextFn,
}: {
  backFn: () => void;
  nextFn: () => void;
}) => {
  const [addNow, setAddNow] = useState<boolean>(true);

  const { form, loading, submitHandler } = useWorkingExperienceForm({
    onSubmitted: () => {
      nextFn();
    },
  });

  const experienceFields = useFieldArray({
    name: "experiences",
    control: form.control,
  });

  const addExperience = () => {
    experienceFields.append({
      company_name: "",
      position: "",
      start_date: undefined as unknown as Date,
      end_date: undefined,
      still_working: false,
    });
  };

  const Header = () => {
    return (
      <CardHeader>
        <CardTitle>Working Experience</CardTitle>
        <CardDescription>List your previous roles.</CardDescription>
      </CardHeader>
    );
  };

  if (!addNow) {
    return (
      <div className="flex flex-col gap-8">
        <Card>
          {Header()}
          <CardFooter className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
            <Button
              className="order-2 md:order-1 flex-1"
              variant="outline"
              onClick={nextFn}
            >
              Add Later
            </Button>
            <Button
              className="order-1 md:order-2 flex-1"
              onClick={() => setAddNow(true)}
            >
              Add Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={submitHandler}>
        <Card>
          {Header()}
          <CardContent className="space-y-4">
            {experienceFields.fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4">
                <header className="flex items-center gap-6 lg:py-2">
                  <p className="text-base font-semibold">
                    Experience {index + 1}
                  </p>
                  <Separator className="flex-1" />
                  {index !== 0 && (
                    <Button
                      className="text-destructive hover:text-destructive hover:bg-destructive/5"
                      onClick={() => experienceFields.remove(index)}
                      type="button"
                      variant="ghost"
                    >
                      <Trash /> Delete
                    </Button>
                  )}
                </header>
                <CompanyNameField name={`experiences.${index}.company_name`} />
                <PositionField name={`experiences.${index}.position`} />
                <div className="grid xl:grid-cols-2 gap-[inherit]">
                  <StartDateField name={`experiences.${index}.start_date`} />
                  <div className="flex flex-col gap-1.5">
                    <EndDateField
                      disabledIf={form.watch(
                        `experiences.${index}.still_working`
                      )}
                      name={`experiences.${index}.end_date`}
                    />
                    <StillWorkingField
                      name={`experiences.${index}.still_working`}
                      relatedTo={`experiences.${index}.end_Date`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-6 lg:py-2">
              <div className="flex-1 border-b border-dashed" />
              <Button
                className="text-primary hover:text-primary hover:bg-primary/5"
                onClick={addExperience}
                type="button"
                variant="ghost"
              >
                <Plus /> Add experience
              </Button>
            </div>
          </CardContent>
        </Card>
        <footer className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <Button
            className="order-2 md:order-1 flex-1"
            disabled={loading}
            type="button"
            variant="outline"
            onClick={backFn}
          >
            Back
          </Button>
          <Button
            className="order-1 md:order-2 flex-1"
            disabled={loading}
            loading={loading}
          >
            Next
          </Button>
        </footer>
      </form>
    </Form>
  );
};
