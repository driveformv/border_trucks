// Brand Colors
export const colors = {
  white: '#FFFFFF',
  black: '#1C1C1C',
  orange: '#FF2A00',
  gray: {
    100: '#F5F5F5',
    300: '#D4D4D4',
    500: '#737373',
    700: '#404040',
  }
} as const;

// Button Variants
export const buttonVariants = {
  // Black background, white text, orange hover
  primary: `
    bg-[#1C1C1C] 
    text-white 
    border-2 
    border-[#1C1C1C] 
    hover:bg-[#FF2A00] 
    hover:border-[#FF2A00] 
    hover:text-[#1C1C1C]
    transition-colors
  `,
  
  // White background, black border & text, orange hover
  secondary: `
    bg-white 
    text-[#1C1C1C] 
    border-2 
    border-[#1C1C1C] 
    hover:bg-[#FF2A00] 
    hover:border-[#FF2A00] 
    hover:text-[#1C1C1C]
    transition-colors
  `,
  
  // Transparent background, white text
  ghost: `
    text-white 
    hover:text-white/80
    transition-colors
  `
} as const;

// Icon Colors
export const iconColors = {
  black: 'text-[#1C1C1C]',
  white: 'text-white'
} as const;