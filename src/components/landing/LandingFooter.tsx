import Image from "next/image";
import SocialLinks from "./SocialLinks";

export default function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20">
              
              <Image src="/images/landing/Logo Empresa.png" alt="Logo" width={80} height={80} className="object-contain" />
            </div>
            <div className="text-left">
              <p className="font-bold">Mundo Tilín</p>
              <p className="text-sm text-[var(--text-muted)]">Shows infantiles · Animación · Cumpleaños</p>
            </div>
          </div>

          <div className="text-sm text-[var(--text-muted)]">
            <p>Contacto: <a href="tel:+51999999999" className="text-white underline">+569 69688100</a></p>
            <p>Email: <a href="mailto:info@mundotilin.com" className="text-white underline">pilotomendez777@gmail.com</a></p>
            <div className="mt-4">
    <SocialLinks />
</div>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} Mundo Tilín. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}