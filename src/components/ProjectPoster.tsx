import type { Project } from "../data/content";

/**
 * Pôster editorial: bloco de cor sólida + o nome do projeto em tipo
 * gigante + uma linha serif. No showcase usa `minimal` (só a linha
 * serif no topo) para não colidir com o overlay de texto.
 */
export function ProjectPoster({
  project,
  className,
  minimal = false,
}: {
  project: Project;
  className?: string;
  minimal?: boolean;
}) {
  return (
    <div
      className={`poster p-${project.variant} ${minimal ? "minimal" : ""} ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="poster-inner">
        <span className="poster-title">{project.title}</span>
        <span className="serif poster-line">{project.posterLine}</span>
      </div>
    </div>
  );
}
