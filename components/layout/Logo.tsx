"use client";

interface LogoProps {
  variant?: "white" | "black";
  className?: string;
}

export function Logo({ variant = "white", className = "h-12 w-12" }: LogoProps) {
  return (
    <img 
      src={`/assets/logos/international-${variant}.svg`}
      alt="International Logo"
      className={className}
    />
  );
}