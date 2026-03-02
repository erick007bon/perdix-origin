import { MainLogo } from "./components/BrandAssets";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-6">
      <div className="relative">
        {/* Outer pulse ring */}
        <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
        {/* Logo */}
        <MainLogo className="relative h-20 w-20 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)] animate-pulse" />
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
