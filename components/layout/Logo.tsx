"use client";

interface LogoProps {
  variant?: "primary" | "white";
  className?: string;
}

export function Logo({ className = "h-16 w-auto", variant = "primary" }: LogoProps) {
  const logos = {
    primary: "https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/logos%2FBorder%20International-03.png?alt=media&token=0f80de06-67f2-4463-813b-1edf67b3042a",
    white: "https://firebasestorage.googleapis.com/v0/b/bordertrucks-d8624.firebasestorage.app/o/logos%2Finternational-white.svg?alt=media&token=f89d9315-0204-4e4a-a051-6850025f0fda"
  };

  return (
    <img 
      src={logos[variant as keyof typeof logos]}
      alt="Border International"
      className={className}
    />
  );
}