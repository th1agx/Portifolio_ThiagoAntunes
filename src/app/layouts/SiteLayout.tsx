import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useScrollLock } from "../../controllers/useActivePanel";
import { Preloader } from "../../views/system/Preloader";
import { Cursor } from "../../views/components/Cursor";
import { Nav } from "../../views/system/Nav";
import { Hero } from "../../views/sections/Hero";
import { Marquee } from "../../views/sections/Marquee";
import { CapsulePanel } from "../../views/system/Panel";
import { About } from "../../views/sections/About";
import { Education } from "../../views/sections/Education";
import { Works } from "../../views/sections/Works";
import { Showcase } from "../../views/sections/Showcase";
import { Experience } from "../../views/sections/Experience";
import { Stack } from "../../views/sections/Stack";
import { Contact } from "../../views/sections/Contact";
import { getLenis, initScroll } from "../../lib/scroll";

/**
 * Layout do site: uma página, duas rotas de idioma.
 * Preloader → Nav/Cursor → seções em painéis-onda.
 */
export function SiteLayout() {
  const [loaded, setLoaded] = useState(false);
  useScrollLock(!loaded);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    initScroll();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (loaded) lenis?.start();
    else lenis?.stop();
  }, [loaded]);

  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo / Skip to content
      </a>

      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Cursor />
      <Nav ready={loaded} />

      <main id="conteudo">
        {/* base grafite */}
        <Hero ready={loaded} />
        <Marquee />

        {/* take da direita — quem eu sou + formação */}
        <CapsulePanel fill="#EDEDE8" className="panel-chalk" variant="sheetR" z={2}>
          <About />
          <Education />
        </CapsulePanel>

        {/* take da esquerda — o que construí */}
        <CapsulePanel fill="#131412" className="panel-graphite" variant="sheetL" z={3}>
          <Works />
          <Showcase />
          <Experience />
          <Stack />
        </CapsulePanel>

        {/* cápsula lime — o finale */}
        <CapsulePanel fill="#D7F452" className="panel-lime" variant="capsule" z={4}>
          <Contact />
        </CapsulePanel>
      </main>
    </>
  );
}
