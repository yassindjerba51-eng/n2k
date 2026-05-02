import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Mentions Légales — Les Laboratoires N2K",
    description: "Mentions légales des Laboratoires N2K, Pôle Technologique Borj Cédria, Soliman, Nabeul.",
  };
}

export default async function MentionsLegalesPage() {
  return (
    <main className="bg-n2k-surface min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black font-heading text-n2k-primary mb-10 tracking-tight">
          Mentions Légales
        </h1>

        <div className="prose prose-slate max-w-none font-body space-y-8">
          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Éditeur du site</h2>
            <p className="text-slate-600 leading-relaxed">
              <strong>Raison sociale :</strong> Les Laboratoires N2K<br />
              <strong>Adresse :</strong> Pôle Technologique Borj Cédria, Soliman, Nabeul, Tunisie<br />
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@n2k-tunisie.com" className="text-n2k-secondary underline">
                contact@n2k-tunisie.com
              </a><br />
              <strong>Téléphone :</strong>{" "}
              <a href="tel:+21621444765" className="text-n2k-secondary underline">(+216) 21 444 765</a>
              {" / "}
              <a href="tel:+21628717998" className="text-n2k-secondary underline">(+216) 28 717 998</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Directeur de la publication</h2>
            <p className="text-slate-600 leading-relaxed">
              Dr Mahmoud Naffati, Associée — Directrice Recherche et Production — Les Laboratoires N2K.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Hébergement</h2>
            <p className="text-slate-600 leading-relaxed">
              Ce site est hébergé par Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis. Site : vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Propriété intellectuelle</h2>
            <p className="text-slate-600 leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, logos, fiches produits) est la propriété exclusive
              des Laboratoires N2K et est protégé par la législation tunisienne en vigueur relative à la propriété
              intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Homologations</h2>
            <p className="text-slate-600 leading-relaxed">
              Les produits CLORAGRO et OPTIMAGRO sont homologués par le Ministère de la Santé tunisien
              (MS/DHMPE/HOM/0002/03/01/2023 et MS/DHMPE/HOM/0001/03/01/2023 respectivement).
              Les informations techniques présentées sur ce site sont conformes aux fiches techniques et
              étiquettes officielles délivrées à la date d'homologation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Limitation de responsabilité</h2>
            <p className="text-slate-600 leading-relaxed">
              Les Laboratoires N2K s'efforcent de maintenir les informations de ce site à jour. Toutefois,
              ils ne peuvent être tenus responsables des erreurs ou omissions, ni des conséquences de leur
              utilisation. Les fiches techniques officielles font foi en cas de doute.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
