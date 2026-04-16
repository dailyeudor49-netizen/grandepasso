export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex text-xl font-extrabold uppercase tracking-wider sm:text-2xl ${className}`}>
      <span className="text-blue-900">Piede Luxe</span>
      <span className="text-blue-600">Calzature</span>
    </span>
  );
}
