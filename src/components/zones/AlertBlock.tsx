import { AlertTriangle } from "lucide-react";

export default function AlertBlock({
  title,
  description,
  variant = "warning",
}: {
  title: string;
  description: string;
  variant?: "warning" | "info";
}) {
  const styles = {
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-300/50",
      icon: "text-amber-600",
      title: "text-amber-800",
      desc: "text-amber-700",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200/50",
      icon: "text-blue-600",
      title: "text-blue-800",
      desc: "text-blue-700",
    },
  };

  const s = styles[variant];

  return (
    <div
      className={`${s.bg} ${s.border} border-2 rounded-2xl p-6 md:p-8 my-8`}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 mt-0.5`}>
          <AlertTriangle className={`w-7 h-7 ${s.icon}`} />
        </div>
        <div>
          <h4
            className={`text-base md:text-lg font-black font-heading ${s.title} mb-2`}
          >
            {title}
          </h4>
          <p className={`text-sm md:text-base font-body leading-relaxed ${s.desc}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
