# th1agx — portfólio

Portfólio de **Thiago Filipe** (engenheiro de software — fullstack + GenAI), construído do zero
com Vite + React 19 + TypeScript strict + [Motion](https://motion.dev) + [Lenis](https://lenis.darkroom.engineering).

> Direção de design: o site é uma **pilha de painéis**. Cada bloco entra numa parte da
> tela, com cantos arredondados, e cresce até cobrir tudo — transição física, nunca fade
> de cor. Base **nardo**, painel **chalk** (quem sou + formação), painel **graphite**
> (o que construí), finale **lime** (contato). Tipografia com voz: **Bricolage
> Grotesque** × **Fraunces itálico**.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + bundle de produção em dist/
npm run preview  # serve o dist/ localmente
```

Deploy: `dist/` é estático — Vercel, Netlify ou GitHub Pages servem sem configuração.

## O sistema de painéis

| Bloco | Cor | Conteúdo |
| --- | --- | --- |
| Base | nardo `#8A8A83` | hero + marquee |
| Painel 1 | chalk `#EDEDE8` | sobre + formação |
| Painel 2 | graphite `#131412` | trabalhos + destaque + experiência + arsenal |
| Finale | lime `#D7F452` | contato (frame que cresce) |

Cada painel (`components/Panel.tsx`) é `position: sticky` com `scale 0.9→1` e
`border-radius 48px→0` dirigidos pelo scroll; painéis seguintes têm `z-index` maior
e cobrem os anteriores — o mesmo princípio do take "Dev Guard Skill" no showcase.
Zero fade de cor: se a cor muda na tela, é porque um painel novo chegou.

## Motion system

| Efeito | Onde | Como |
| --- | --- | --- |
| Preloader contador + cortina de colunas | `Preloader.tsx` | rAF com easing cúbico |
| Título que entorta com a velocidade do scroll | `Hero.tsx` | `useVelocity` → `useSpring` → `skewY` |
| Frase de papel ciclando em scramble | `ScrambleText.tsx` | decode caractere a caractere |
| Marquee que acelera/inverte com o scroll | `Marquee.tsx` | `useAnimationFrame` + delta de scroll |
| Parágrafo revelado palavra por palavra | `About.tsx` | opacity 0.42→1 por palavra |
| Preview flutuante que persegue o cursor | `Works.tsx` | springs + rotação por velocidade |
| Takes que crescem (showcase e contato) | `Showcase.tsx` / `Contact.tsx` | sticky + scale + radius |
| Botões magnéticos | `Magnetic.tsx` | offset do centro × strength |
| Cursor customizado (dot + anel + "ver") | `Cursor.tsx` | `data-cursor` declarativo |

Tudo respeita `prefers-reduced-motion` e anima apenas `transform`/`opacity`
(mais `border-radius`, que é barato e só durante transições de painel).

## Arquitetura

```
src/
  data/content.ts      ← ÚNICA fonte de conteúdo (projetos, xp, stack, formação, contatos)
  lib/scroll.ts        ← Lenis singleton (com fallback nativo)
  lib/utils.ts         ← easings, wrap, charset do scramble
  components/          ← 1 arquivo por bloco + primitivas (Panel, Reveal, ScrambleText, Magnetic)
  styles/global.css    ← design system: tokens, painéis, componentes, responsivo
```

**Para editar o portfólio, edite `src/data/content.ts`.**

### Pôsteres de projeto

Sem imagens externas: cada projeto é um **bloco de cor sólida** com o nome em tipo
gigante (`ProjectPoster.tsx`). Payload zero — para usar screenshots reais depois,
troque o conteúdo do `.poster` por `<img>` mantendo `container-type: size`.

## Performance & acessibilidade

- Bundle: ~120 KB gzip; fontes self-hosted (Bricolage + Fraunces) com `unicode-range`
- Animações composited; zero imagens; zero requests de terceiros em runtime
- HTML semântico, skip-link, foco visível, `prefers-reduced-motion` honrado
- Cursor customizado só em `pointer: fine`

## TODO

- [ ] Trocar links genéricos (`github.com/th1agx`) pelos repos reais em `content.ts`
- [ ] Adicionar `og:image` quando houver capa
