"use client";

interface LogoProps {
  variant?: "white" | "black";
  className?: string;
}

export function Logo({ className = "h-16 w-auto" }: LogoProps) {
  return (
    <img 
      src="/assets/logos/Border International-03.png"
      alt="Border International"
      className={className}
    />
  );
}