import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSelect = ({ control, name, label, icon: Icon, placeholder, options, rules, disabled = false }) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-red-600" />}
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select onValueChange={field.onChange}
            value={field.value || ""}
            disabled={disabled}>
            <SelectTrigger className="w-full h-11 border-red-200 dark:border-red-800 focus:ring-red-500 bg-white dark:bg-zinc-900">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default FormSelect;
