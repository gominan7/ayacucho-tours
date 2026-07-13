import { Badge } from "@/components/ui/badge";

interface UserStatusBadgeProps {
  estado: "Activo" | "Inactivo";
}

export function UserStatusBadge({ estado }: UserStatusBadgeProps) {
  if (estado === "Activo") {
    return (
      <Badge
        className="bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
      >
        Activo
      </Badge>
    );
  }

  return (
    <Badge
      variant="destructive"
      className="border border-destructive/20 shadow-sm"
    >
      Inactivo
    </Badge>
  );
}
