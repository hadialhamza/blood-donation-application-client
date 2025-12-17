import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PageHeader = ({ title, subtitle, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mb-6 space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="pl-0 hover:bg-transparent hover:text-red-600 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      {/* Header Card */}
      <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
        <div className="bg-amber-500 h-2 w-full"></div>{" "}
        {/* Uses your Amber/Red style */}
        <CardHeader className="pt-8 px-8">
          <div className="flex items-center gap-3 mb-2">
            {Icon && (
              <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl text-amber-600">
                <Icon className="w-6 h-6" />
              </div>
            )}
            <div>
              <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white">
                {title}
              </CardTitle>
              {subtitle && <CardDescription>{subtitle}</CardDescription>}
            </div>
          </div>
        </CardHeader>
        <Separator className="bg-slate-100 dark:bg-zinc-800" />
      </Card>
    </div>
  );
};

export default PageHeader;
