export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    image: "bg-blue-50 border-blue-200",
    video: "bg-purple-50 border-purple-200",
    audio: "bg-green-50 border-green-200",
    document: "bg-orange-50 border-orange-200",
    archive: "bg-yellow-50 border-yellow-200",
    other: "bg-gray-50 border-gray-200",
  };

  return colors[category] || colors.other;
};
