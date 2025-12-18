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
    <div className="max-w-5xl mx-auto mb-6 space-y-6">
      <Button
        variant="ghost"
        className="hover:bg-transparent hover:text-red-600 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
      <Card className="max-w-5xl mx-auto border-none shadow-md bg-white dark:bg-zinc-900 overflow-hidden py-0 gap-3">
        <div className="bg-amber-500 h-8 w-full"></div>{" "}
        <CardHeader>
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
