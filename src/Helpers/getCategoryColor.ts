export const getCategoryColor = (category: string): string[] => {
  const colors: Record<string, string[]> = {
    image: [
      "bg-emerald-50", // background color - 1
      "border-emerald-200", // border color
      "text-emerald-500", // text color
      "hover:bg-emerald-800", // hover color - 1
      "bg-emerald-800", // background color - 2
      "hover:bg-emerald-700", // hover color - 2
    ],
    video: [
      "bg-blue-50",
      "border-blue-200",
      "text-blue-500",
      "hover:bg-blue-800",
      "bg-blue-800",
      "hover:bg-blue-700",
    ],
    audio: [
      "bg-orange-50",
      "border-orange-200",
      "text-orange-500",
      "hover:bg-orange-800",
      "bg-orange-800",
      "hover:bg-orange-700",
    ],
    document: [
      "bg-amber-50",
      "border-amber-200",
      "text-amber-500",
      "hover:bg-amber-800",
      "bg-amber-800",
      "hover:bg-amber-700",
    ],
    archive: [
      "bg-teal-50",
      "border-teal-200",
      "text-teal-500",
      "hover:bg-teal-800",
      "bg-teal-800",
      "hover:bg-teal-700",
    ],
    other: [
      "bg-slate-50",
      "border-slate-200",
      "text-slate-500",
      "hover:bg-slate-800",
      "bg-slate-800",
      "hover:bg-slate-700",
    ],
  };

  return colors[category] || colors.other;
};
