interface PainPoint {
  icon: string;
  title: string;
  description: string;
}

interface PainPointsSectionProps {
  painPoints: PainPoint[];
}

export default function PainPointsSection({ painPoints }: PainPointsSectionProps) {
  return (
    <section className="bg-emerald-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl lg:text-5xl">
            I Problemi Che Risolviamo
          </h2>
          <p className="mt-3 text-base text-stone-600 sm:text-lg">
            Le sfide quotidiane che le nostre calzature affrontano
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-4xl transition-all group-hover:scale-110 group-hover:bg-red-200">
                {point.icon}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-stone-900 sm:text-2xl">
                {point.title}
              </h3>
              <p className="leading-relaxed text-stone-600">
                {point.description}
              </p>

              {/* Decorative line */}
              <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-300 transition-all group-hover:w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
