import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Works } from "./components/Works";
import { Showcase } from "./components/Showcase";
import { Experience } from "./components/Experience";
import { Stack } from "./components/Stack";
import { Contact } from "./components/Contact";
import { CapsulePanel } from "./components/Panel";
import { getLenis, initScroll } from "./lib/scroll";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    initScroll();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lock", !loaded);
    const lenis = getLenis();
    if (lenis) {
      if (loaded) lenis.start();
      else lenis.stop();
    }
  }, [loaded]);

  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>

      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onDone={done} />}
      </AnimatePresence>

      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Cursor />
      <Nav ready={loaded} />

      <main id="conteudo">
        {/* base grafite */}
        <Hero ready={loaded} />
        <Marquee />

        {/* onda chalk — quem eu sou + formação */}
        <CapsulePanel fill="#EDEDE8" className="panel-chalk" z={2}>
          <About />
          <Education />
        </CapsulePanel>

        {/* onda graphite — o que construí */}
        <CapsulePanel fill="#131412" className="panel-graphite" z={3}>
          <Works />
          <Showcase />
          <Experience />
          <Stack />
        </CapsulePanel>

        {/* onda lime — o finale */}
        <CapsulePanel fill="#D7F452" className="panel-lime" z={4}>
          <Contact />
        </CapsulePanel>
      </main>
    </>
  );
}
