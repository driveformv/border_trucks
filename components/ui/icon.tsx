import { cn } from "@/lib/utils";

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  variant?: "primary" | "white";
}

export const Icon = ({ className, variant = "primary", ...props }: IconProps) => {
  const variantStyles = {
    primary: "text-[#1C1C1C]",
    white: "text-white",
  };

  return (
    <svg
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  );
};