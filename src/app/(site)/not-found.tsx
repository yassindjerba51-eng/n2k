export default function NotFound() {
  return (
    <div className="min-h-screen bg-n2k-primary relative overflow-hidden flex items-center justify-center px-6">
      {/* ── Background decorative elements ── */}
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-n2k-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-n2k-secondary/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto stagger-children">
        {/* Glowing 404 badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-n2k-secondary-light animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/60 font-heading">
            Erreur 404
          </span>
        </div>

        {/* Giant 404 number */}
        <div className="relative mb-4">
          <h1
            className="text-[140px] sm:text-[180px] md:text-[220px] font-black font-heading leading-none select-none bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
            }}
          >
            404
          </h1>
          {/* Overlay text with green accent */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
              Page <span className="text-n2k-secondary-light">introuvable</span>
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-10">
          La page que vous recherchez n&apos;existe pas, a été déplacée ou n&apos;est
          plus disponible.
        </p>

        {/* CTA Button */}
        <a
          href="/fr"
          className="group relative inline-flex items-center gap-3 bg-n2k-secondary hover:bg-n2k-secondary-light text-white px-8 py-4 rounded-xl font-black font-heading text-sm sm:text-base tracking-tight shadow-lg shadow-n2k-secondary/20 hover:shadow-n2k-secondary-light/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retourner à la page d&apos;accueil
        </a>

        {/* Decorative separator */}
        <div className="flex items-center justify-center gap-3 mt-14 text-white/20">
          <div className="w-12 h-px bg-white/10" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-heading">
            Les Laboratoires N2K
          </span>
          <div className="w-12 h-px bg-white/10" />
        </div>
      </div>
    </div>
  );
}
