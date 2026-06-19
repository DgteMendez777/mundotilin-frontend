import { HeartHandshake, PartyPopper, ShieldCheck } from "lucide-react";

const items = [
  {
    title: "Animación con experiencia",
    description:
      "Cada show se prepara pensando en la edad de los niños, el tipo de evento y el ambiente familiar.",
    icon: PartyPopper,
  },
  {
    title: "Trato cercano y responsable",
    description:
      "Acompañamos a las familias desde la cotización hasta el día del evento para que todo salga bien.",
    icon: HeartHandshake,
  },
  {
    title: "Servicio confiable",
    description:
      "Trabajamos con puntualidad, organización y mucho cuidado en cada presentación.",
    icon: ShieldCheck,
  },
];

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
            Sobre MundoTilín
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Alegría, confianza y organización para cada evento
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
            MundoTilín nace con la idea de crear momentos especiales para las
            familias, llevando shows infantiles, juegos, dinámicas y animación
            profesional a cumpleaños, baby showers, colegios y eventos
            familiares.
          </p>

          <p className="mt-4 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
            Nuestro objetivo es que cada cliente pueda reservar un servicio de
            forma clara, rápida y segura, con información completa sobre los
            paquetes disponibles.
          </p>
        </div>

        <div className="grid gap-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
              >
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-soft)] text-[var(--primary)]">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold text-[var(--text-main)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}