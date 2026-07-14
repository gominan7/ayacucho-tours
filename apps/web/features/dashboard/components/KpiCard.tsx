"use client";

import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  iconBgClass?: string;
}

export function KpiCard({
  title,
  value,
  icon,
  description,
  iconBgClass = "bg-zinc-100 text-zinc-900",
}: KpiCardProps) {
  return (
    <Card className="border-slate-100 hover:border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md bg-white rounded-2xl overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              {title}
            </p>
            <h4 className="text-3xl font-extrabold text-zinc-950 tracking-tight transition-all group-hover:scale-[1.02] origin-left">
              {value.toLocaleString()}
            </h4>
          </div>
          <div className={`p-3.5 rounded-xl ${iconBgClass} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
            {icon}
          </div>
        </div>
        {description && (
          <p className="text-xs text-zinc-400 mt-4 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
