import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ImpactCard = ({
  // eslint-disable-next-line
  icon: Icon,
  title,
  value,
  subtitle,
  description,
}) => {
  return (
    <Card className="flex-1 bg-linear-to-br from-red-600 to-red-800 text-white border-none shadow-xl shadow-red-900/20 relative overflow-hidden gap-3">
      <div className="absolute bottom-0 right-0 p-8 opacity-10 transform translate-x-6 translate-y-6 rotate-12 pointer-events-none">
        <Icon size={120} />
      </div>

      <CardHeader className="relative z-10">
        <div className="mb-2 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 relative z-10">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-black">{value}</span>
          <span className="mb-2 text-red-100 font-semibold text-base">
            {subtitle}
          </span>
        </div>
        <p className="text-red-100/90 text-sm leading-relaxed min-h-12">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ImpactCard;
