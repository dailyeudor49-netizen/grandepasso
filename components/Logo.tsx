export default function Logo({
  className = "",
  variant = "default"
}: {
  className?: string;
  variant?: "default" | "white";
}) {
  const colors = variant === "white"
    ? { primary: "text-white", secondary: "text-blue-100" }
    : { primary: "text-blue-900", secondary: "text-blue-600" };

  return (
    <span className={`inline-flex text-xl font-extrabold uppercase tracking-wider sm:text-2xl ${className}`}>
      <span className={colors.primary}>Piede Luxe</span>
      <span className={colors.secondary}>Calzature</span>
    </span>
  );
}
