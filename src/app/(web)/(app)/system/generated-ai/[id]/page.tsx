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
import { DownloadIcon, Sparkles, Edit } from "lucide-react";
import { useState } from "react";
import { FormJobDescription } from "./_/components/form-job-description";
import { FormJobPurpose } from "./_/components/form-job-purpose";
import { FormKpi } from "./_/components/form-job-kpi";

export default function PageAiGenerated() {
  const { data, error, loading } = useDetailPosition();
  const [openPurpose, setOpenPurpose] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [openKpi, setOpenKpi] = useState(false);

  const handleExportPDF = async () => {
    const editButtons = document.querySelectorAll<HTMLButtonElement>(".edit-button");
    editButtons.forEach((btn) => (btn.style.display = "none"));

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
    editButtons.forEach((btn) => (btn.style.display = ""));
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
          <CardDescription>
            <button
              disabled
              className={cn(
                "flex items-center rounded-full text-blue-900 border-blue-900 border mb-4 px-3 py-1 gap-2 text-sm font-medium"
              )}
            >
              <Sparkles className="w-3 h-3" />
              AI Generated
            </button>
          </CardDescription>
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
                  <span className="text-gray-600">Job Purpose</span>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openPurpose} onOpenChange={setOpenPurpose}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-3xl !w-full">
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
                  <span className="text-gray-600">Job Description</span>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openDescription} onOpenChange={setOpenDescription}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-3xl !w-full">
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
                  <span className="text-gray-600">KPIs / Success Measures</span>
                  <span className="text-xs text-gray-500">
                    <AlertDrawer open={openKpi} onOpenChange={setOpenKpi}>
                      <AlertDrawerTrigger asChild>
                        <div className="edit-button flex gap-2 items-center cursor-pointer">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </AlertDrawerTrigger>

                      <AlertDrawerContent className="!max-w-3xl !w-full">
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
                  <a href="#job-description" className="font-semibold hover:text-blue-900">Job Description</a>
                </li>
                <li>
                  <a href="#kpi" className="font-semibold hover:text-blue-900">KPIs / Success Measures</a>
                </li>
              </ul>
            </div>
          </aside>

        </CardContent>
      </Card>
    </div>
  );
}
