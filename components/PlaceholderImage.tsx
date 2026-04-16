"use client";

import Image from "next/image";

interface PlaceholderImageProps {
  color: string;
  accentColor: string;
  name: string;
  className?: string;
  image?: string;
}

export default function PlaceholderImage({
  color,
  accentColor,
  name,
  className = "",
  image,
}: PlaceholderImageProps) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={image}
          alt={name || "Prodotto"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-3/4 w-3/4"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse
          cx="100"
          cy="158"
          rx="80"
          ry="12"
          fill={`${color}25`}
        />
        {/* Thick sole (orthopedic) */}
        <path
          d="M30 140 Q30 130 40 128 L160 128 Q170 130 170 140 L170 152 Q170 158 160 158 L40 158 Q30 158 30 152Z"
          fill={color}
          opacity="0.95"
        />
        {/* Sole tread lines */}
        <line x1="50" y1="148" x2="150" y2="148" stroke={accentColor} strokeWidth="1" opacity="0.4" />
        <line x1="55" y1="153" x2="145" y2="153" stroke={accentColor} strokeWidth="1" opacity="0.3" />
        {/* Shoe upper */}
        <path
          d="M40 128 Q40 85 65 65 Q85 48 105 48 Q135 48 150 65 Q163 80 165 105 L168 128"
          fill={color}
          opacity="0.8"
        />
        {/* Collar / opening */}
        <path
          d="M65 65 Q85 48 105 48 Q135 48 150 65 Q140 75 105 72 Q75 72 65 65Z"
          fill={accentColor}
          opacity="0.5"
        />
        {/* Arch support line (orthopedic detail) */}
        <path
          d="M50 140 Q70 125 100 128 Q130 125 150 140"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          opacity="0.6"
          strokeDasharray="4,3"
        />
        {/* Medical cross */}
        <rect x="142" y="55" width="12" height="3" rx="1.5" fill={accentColor} opacity="0.7" />
        <rect x="146.5" y="50.5" width="3" height="12" rx="1.5" fill={accentColor} opacity="0.7" />
      </svg>
      {name && (
        <span className="absolute bottom-3 left-0 right-0 text-center text-xs font-medium text-stone-500 opacity-60">
          {name}
        </span>
      )}
    </div>
  );
}
