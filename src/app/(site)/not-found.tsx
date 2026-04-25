import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-n2k-surface px-6">
      <div className="text-center max-w-lg">
        <div className="text-[120px] md:text-[160px] font-black font-heading text-n2k-primary/10 leading-none select-none">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary -mt-8 mb-4">
          Page introuvable
        </h1>
        <p className="text-n2k-on-surface-variant mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/fr"
          className="inline-flex items-center gap-2 bg-n2k-secondary text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg hover:opacity-90 transition-all"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
