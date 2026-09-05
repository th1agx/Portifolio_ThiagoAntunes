import { useEffect, useMemo, useState } from "react";
import { EMAIL, SOCIALS } from "../data/content";
import { useContent } from "../i18n";
import { LineInView } from "./Reveal";
import { Magnetic } from "./Magnetic";

function LocalTime() {
  const c = useContent();
  const [now, setNow] = useState(() => new Date());
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{fmt.format(now)} {c.contact.localCity}</span>;}

/**
 * Finale lime: conteúdo direto no painel-onda — título, CTA gigante
 * e foot-bar. Sem gates de opacity: nada de texto fantasma.
 */
export function Contact() {
  const c = useContent();
  return (
    <footer className="contact" id="contato" aria-label="Contato">
      <h2 className="contact-title">
        <span className="t-line">
          <LineInView>{c.contact.titleA}</LineInView>
        </span>
        <span className="t-line serif em">
          <LineInView delay={0.12}>{c.contact.titleB}</LineInView>
        </span>
      </h2>

      <div className="contact-cta">
        <Magnetic strength={0.25}>
          <a className="cta-mail" href={`mailto:${EMAIL}`} data-cursor="link">
            {EMAIL}
          </a>
        </Magnetic>

        <div className="contact-socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              className="social-link"
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="foot-bar">
        <span>© 2026 Thiago Antunes</span>
        <span className="serif">
          <LocalTime />
        </span>
        <a className="to-top" href="#topo" data-cursor="link">
          {c.contact.toTop}
        </a>
      </div>
    </footer>
  );
}
