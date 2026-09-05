import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { EASE } from "../lib/utils";
import { getLenis, scrollToSection } from "../lib/scroll";
import { SOCIALS } from "../data/content";
import { useLang } from "../i18n";
import { ScrambleText } from "./ScrambleText";

export function Nav({ ready }: { ready: boolean }) {
  const { lang, setLang, c } = useLang();
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  // tinta do nav acompanha o painel no TOPO da viewport (o nav é fixo
  // no topo): claro sobre grafite, escuro sobre chalk e lime
  // (via pipeline do motion, que enxerga o Lenis)
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const probe = y + window.innerHeight * 0.08;
    const wraps = [...document.querySelectorAll<HTMLElement>(".panel-wrap")];
    let current: HTMLElement | null = null;
    for (const w of wraps) {
      if (w.offsetTop <= probe) current = w;
    }
    const cls = current?.className ?? "";
    setOnLight(cls.includes("chalk") || cls.includes("lime"));
  });

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToSection(id), 240);
  };

  return (
    <>
      <motion.header
        className={`nav ${onLight ? "nav--on-light" : "nav--on-dark"}`}
        initial={{ y: -70, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      >
        <button
          className="nav-brand"
          onClick={() => go("#topo")}
          data-cursor="link"
          aria-label="Voltar ao topo"
        >
          <span className="nav-logo" aria-hidden="true" />
        </button>

        <nav className="nav-links" aria-label="Navegação principal">
          {c.nav.links.map((l) => (
            <button key={l.id} className="nav-link" onClick={() => go(l.id)} data-cursor="link">
              <ScrambleText text={l.label} />
            </button>
          ))}
        </nav>

        <div className="lang-toggle" role="group" aria-label="Idioma / Language">
          {(["pt", "en"] as const).map((l) => (
            <button
              key={l}
              className={`lang-btn ${lang === l ? "on" : ""}`}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              data-cursor="link"
            >
              {l === "pt" ? "PT" : "EN"}
            </button>
          ))}
        </div>

        <button
          className="nav-burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <span className="l l1" />
          <span className="l l2" />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <nav className="menu-links" aria-label="Menu">
              {c.nav.links.map((l, i) => (
                <div key={l.id} className="menu-line">
                  <motion.button
                    className="menu-link"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
                    onClick={() => go(l.id)}
                    data-cursor="link"
                  >
                    <span className="menu-label">{l.label}</span>
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.div
              className="menu-foot serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
              <span>{c.misc.menuCity}</span>
              <div className="lang-toggle mobile">
                {(["pt", "en"] as const).map((l) => (
                  <button
                    key={l}
                    className={`lang-btn ${lang === l ? "on" : ""}`}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    data-cursor="link"
                  >
                    {l === "pt" ? "PT" : "EN"}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
