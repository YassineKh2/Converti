export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    image: "bg-gradient from-[#932191]/50 to-[#7B68EE]/80 border-[#A67CBA]/25",
    video: "bg-[#932191]/5 border-[#A67CBA]/25",
    audio: "bg-[#932191]/5 border-[#A67CBA]/25",
    document: "bg-[#932191]/5 border-[#A67CBA]/25",
    archive: "bg-[#932191]/5 border-[#A67CBA]/25",
    other: "bg-gray-50 border-gray-50",
  };

  return colors[category] || colors.other;
};
