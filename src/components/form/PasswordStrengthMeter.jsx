import React from "react";
import { Check, X } from "lucide-react";

export const PasswordStrengthMeter = ({ password }) => {
  const requirements = [
    { label: "At least 6 characters", test: (p) => p.length >= 6 },
    { label: "At least 1 uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "At least 1 lowercase letter", test: (p) => /[a-z]/.test(p) },
    {
      label: "At least 1 special character",
      test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
    },
  ];

  if (!password) return null;

  return (
    <div className="absolute z-10 w-full mt-1 p-3 bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-xl space-y-1 left-0 top-full">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
        Password Requirements:
      </p>
      {requirements.map((req, index) => {
        const isMet = req.test(password || "");
        return (
          <div key={index} className="flex items-center gap-2 text-xs">
            {isMet ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <X className="w-3 h-3 text-slate-300 dark:text-slate-600" />
            )}
            <span
              className={
                isMet
                  ? "text-green-600 dark:text-green-400"
                  : "text-slate-400 dark:text-slate-500"
              }
            >
              {req.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
