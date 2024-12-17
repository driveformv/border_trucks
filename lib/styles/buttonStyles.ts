export const buttonStyles = {
  // Base styles that apply to all buttons
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",

  // Primary variants
  primary: {
    default: "bg-[#1C1C1C] text-white border-2 border-[#1C1C1C] hover:bg-[#FF2A00] hover:border-[#FF2A00] hover:text-[#1C1C1C]",
    outline: "bg-white text-[#1C1C1C] border-2 border-[#1C1C1C] hover:bg-[#FF2A00] hover:border-[#FF2A00] hover:text-[#1C1C1C]",
    ghost: "text-[#1C1C1C] hover:bg-[#FF2A00] hover:text-[#1C1C1C]",
  },

  // Sizes
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-lg",
    icon: "h-9 w-9",
  }
};