export function getLoadingMessage() {
  const messages = [
    "Hold up, your file is doing a glow-up ✨",
    "Don't you worry if it seems stuck, it will continue shortly",
    "Processing your request, it’s coming together fast!",
    "Hang tight, your answer’s about to drop!",
    "Almost there, making your conversion pop off!",
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);

  return messages[randomIndex];
}
