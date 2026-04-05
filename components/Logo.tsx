export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
    >
      {/* Three horizontal bars decreasing in width — compression visual */}
      <rect x="8" y="14" width="64" height="10" rx="5" fill="currentColor" opacity="0.3" />
      <rect x="16" y="35" width="48" height="10" rx="5" fill="currentColor" opacity="0.6" />
      <rect x="24" y="56" width="32" height="10" rx="5" fill="currentColor" opacity="1" />
    </svg>
  );
}
