export async function generateMetadata() {
  return {
    title: "Politique de Confidentialité — Les Laboratoires N2K",
    description: "Politique de confidentialité et traitement des données personnelles — Les Laboratoires N2K.",
  };
}

export default async function ConfidentialitePage() {
  return (
    <main className="bg-n2k-surface min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black font-heading text-n2k-primary mb-10 tracking-tight">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-slate max-w-none font-body space-y-8">
          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Collecte des données</h2>
            <p className="text-slate-600 leading-relaxed">
              Les seules données personnelles collectées sur ce site sont celles que vous saisissez
              volontairement dans le formulaire de diagnostic ou de contact : nom ou raison sociale,
              numéro de téléphone, et le cas échéant un message décrivant votre situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Utilisation des données</h2>
            <p className="text-slate-600 leading-relaxed">
              Ces données sont utilisées <strong>uniquement</strong> pour répondre à votre demande de diagnostic
              ou de contact et vous mettre en relation avec un expert des Laboratoires N2K.
              Elles ne sont en aucun cas transmises, cédées ou vendues à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Conservation des données</h2>
            <p className="text-slate-600 leading-relaxed">
              Vos données sont conservées uniquement le temps nécessaire au traitement de votre demande.
              Vous pouvez demander leur suppression à tout moment en nous contactant par email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Vos droits</h2>
            <p className="text-slate-600 leading-relaxed">
              Conformément à la législation tunisienne en vigueur relative à la protection des données personnelles,
              vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href="mailto:contact@n2k-tunisie.com" className="text-n2k-secondary underline">
                contact@n2k-tunisie.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Ce site n'utilise pas de cookies publicitaires ou de traçage tiers. Des cookies techniques
              strictement nécessaires au fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-heading text-n2k-primary mb-3">Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              <strong>Les Laboratoires N2K</strong><br />
              Pôle Technologique Borj Cédria, Soliman, Nabeul, Tunisie<br />
              <a href="mailto:contact@n2k-tunisie.com" className="text-n2k-secondary underline">
                contact@n2k-tunisie.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
