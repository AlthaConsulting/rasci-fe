"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@altha/core/components/ui/card";
import {
  AlertDrawer,
  AlertDrawerContent,
  AlertDrawerTrigger,
} from "@altha/core/components/ui/alert-drawer";
import { useDetailPosition } from "./_/use-generated-ai";
import { Button, buttonVariants } from "@altha/core/components/ui/button";
import { cn } from "@altha/core/libs/utils";
import html2pdf from "html2pdf.js";
import { DownloadIcon, Sparkles, Edit, FileEdit } from "lucide-react";
import { useState } from "react";
import { FormJobDescription } from "./_/components/form-job-description";
import { FormJobPurpose } from "./_/components/form-job-purpose";
import { FormKpi } from "./_/components/form-job-kpi";
import { FormKeyResponsibility } from "./_/components/form-key-reponsibility";
import { FormJobOutput } from "./_/components/form-job-output";

export default function PageAiGenerated() {
  const { data, error, loading } = useDetailPosition();
  const [openPurpose, setOpenPurpose] = useState(false);
  const [openResponsibility, setOpenResponsibility] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [openKpi, setOpenKpi] = useState(false);
  const [openOutput, setOpenOutput] = useState(false);

  const handleExportPDF = async () => {
    const hiddenButtons = document.querySelectorAll<HTMLButtonElement>(
      ".edit-button, .ai-status-button"
    );
    hiddenButtons.forEach((btn) => (btn.style.display = "none"));

    const element = document.getElementById("job-description-content") as HTMLElement | null;
    if (!element) return; 

    const opt = {
      margin: 0.5,
      filename: `AI_Description_${data?.position?.name || "Unknown"}.pdf`,
      pagebreak: { mode: ["avoid-all", "css", "legacy"] as const },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" as "portrait" },
    };

    await html2pdf().from(element).set(opt).save();
    hiddenButtons.forEach((btn) => (btn.style.display = ""));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{data?.position?.name}</CardTitle>
            <Button
              onClick={handleExportPDF}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex items-center gap-2"
              )}
            >
              <DownloadIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Export Job Description</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="!-mt-0 flex flex-col lg:flex-row gap-6 relative">

          {/* ====================== MAIN CONTENT ====================== */}
          <div id="job-description-content" className="flex-1 space-y-6">

            {/* Job Purpose */}
            <Card
              style={{
                pageBreakInside: "avoid",
                breakInside: "avoid",
                marginBottom: "24px",
              }}
              id="job-purpose"
            >
              <CardHeader className="bg-gray-100 rounded-md !p-0 !px-3 !py-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Job Purpose</span>
                    {data?.is_edited_purpose ? (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <FileEdit className="w-3 h-3" />
                        Edited
                      </button>
                    ) : (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Generated
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openPurpose} onOpenChange={setOpenPurpose}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-6xl !w-full">
                        <FormJobPurpose
                          initialData={data}
                          onSubmit={() => setOpenPurpose(false)}
                        />
                      </AlertDrawerContent>
                    </AlertDrawer>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="!p-3 !-mt-0">
                <div className="py-1">
                  {data?.job_purpose ? (
                    /<\/?[a-z][\s\S]*>/i.test(data?.job_purpose) ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data?.job_purpose }}
                      />
                    ) : (
                      <span>{data?.job_purpose}</span>
                    )
                  ) : (
                    <span className="text-gray-400 italic">No job purpose available</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Key Responsibility */}
            <Card 
              style={{
                pageBreakInside: "avoid",
                breakInside: "avoid",
                marginBottom: "24px",
              }}
              id="key-responsibility"
            >
              <CardHeader className="bg-gray-100 rounded-md !p-0 !px-3 !py-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Key Responsibility</span>
                    {data?.is_edited_responsibility ? (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <FileEdit className="w-3 h-3" />
                        Edited
                      </button>
                    ) : (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Generated
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openResponsibility} onOpenChange={setOpenResponsibility}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-6xl !w-full">
                        <FormKeyResponsibility
                          initialData={data}
                          onSubmit={() => setOpenResponsibility(false)}
                        />
                      </AlertDrawerContent>
                    </AlertDrawer>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="!p-3 !-mt-0">
                <div className="py-1">
                  {data?.key_responsibility ? (
                    /<\/?[a-z][\s\S]*>/i.test(data?.key_responsibility) ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data?.key_responsibility }}
                      />
                    ) : (
                      <span>{data?.key_responsibility}</span>
                    )
                  ) : (
                    <span className="text-gray-400 italic">No key responsibility available</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card 
              style={{
                pageBreakInside: "avoid",
                breakInside: "avoid",
                marginBottom: "24px",
              }}
              id="job-description"
            >
              <CardHeader className="bg-gray-100 rounded-md !p-0 !px-3 !py-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Job Description</span>
                    {data?.is_edited_description ? (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <FileEdit className="w-3 h-3" />
                        Edited
                      </button>
                    ) : (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Generated
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openDescription} onOpenChange={setOpenDescription}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-6xl !w-full">
                        <FormJobDescription
                          initialData={data}
                          onSubmit={() => setOpenDescription(false)}
                        />
                      </AlertDrawerContent>
                    </AlertDrawer>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="!p-3 !-mt-0">
                <div className="py-1">
                  {data?.job_description ? (
                    /<\/?[a-z][\s\S]*>/i.test(data?.job_description) ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data?.job_description }}
                      />
                    ) : (
                      <span>{data?.job_description}</span>
                    )
                  ) : (
                    <span className="text-gray-400 italic">No job description available</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* KPIs */}
            <Card 
              style={{
                pageBreakInside: "avoid",
                breakInside: "avoid",
                marginBottom: "24px",
              }}
              id="kpi"
            >
              <CardHeader className="bg-gray-100 rounded-md !p-0 !px-3 !py-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Performance Index</span>
                    {data?.is_edited_kpi ? (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <FileEdit className="w-3 h-3" />
                        Edited
                      </button>
                    ) : (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Generated
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openKpi} onOpenChange={setOpenKpi}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-6xl !w-full">
                        <FormKpi
                          initialData={data}
                          onSubmit={() => setOpenKpi(false)}
                        />
                      </AlertDrawerContent>
                    </AlertDrawer>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="!p-3 !-mt-0">
                <div className="py-1">
                  {data?.kpi ? (
                    /<\/?[a-z][\s\S]*>/i.test(data?.kpi) ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data?.kpi }}
                      />
                    ) : (
                      <span>{data?.kpi}</span>
                    )
                  ) : (
                    <span className="text-gray-400 italic">No KPIs available</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Output */}
            <Card 
              style={{
                pageBreakInside: "avoid",
                breakInside: "avoid",
                marginBottom: "24px",
              }}
              id="job-output"
            >
              <CardHeader className="bg-gray-100 rounded-md !p-0 !px-3 !py-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Job Output</span>
                    {data?.is_edited_output ? (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <FileEdit className="w-3 h-3" />
                        Edited
                      </button>
                    ) : (
                      <button disabled
                        className={cn(
                          "ai-status-button flex items-center rounded-full text-blue-900 border border-blue-900 px-3 py-1 gap-2 text-sm font-medium"
                        )}
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Generated
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openOutput} onOpenChange={setOpenOutput}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-6xl !w-full">
                        <FormJobOutput
                          initialData={data}
                          onSubmit={() => setOpenOutput(false)}
                        />
                      </AlertDrawerContent>
                    </AlertDrawer>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="!p-3 !-mt-0">
                <div className="py-1">
                  {data?.job_output ? (
                    /<\/?[a-z][\s\S]*>/i.test(data?.job_output) ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data?.job_output }}
                      />
                    ) : (
                      <span>{data?.job_output}</span>
                    )
                  ) : (
                    <span className="text-gray-400 italic">No job output available</span>
                  )}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* ====================== STICKY TABLE OF CONTENTS ====================== */}
          <aside className="hidden lg:block lg:w-64">
            <div className="sticky top-24 bg-white rounded-lg border p-4">
              <p className="font-semibold text-sm mb-3 text-gray-400">Table of Contents</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#job-purpose" className="font-semibold hover:text-blue-900">Job Purpose</a>
                </li>
                <li>
                  <a href="#key-responsibility" className="font-semibold hover:text-blue-900">Key Responsibility</a>
                </li>
                <li>
                  <a href="#job-description" className="font-semibold hover:text-blue-900">Job Description</a>
                </li>
                <li>
                  <a href="#kpi" className="font-semibold hover:text-blue-900">Performance Index</a>
                </li>
                <li>
                  <a href="#job-output" className="font-semibold hover:text-blue-900">Job Output</a>
                </li>
              </ul>
            </div>
          </aside>

        </CardContent>
      </Card>
    </div>
  );
}
