export type Art = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

type IllustrationProps = {
  readonly art: Art;
  readonly priority?: boolean;
  readonly className?: string;
};

export function Illustration({ art, priority = false, className }: IllustrationProps) {
  return (
    <img
      src={art.src}
      width={art.width}
      height={art.height}
      alt=""
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`pointer-events-none select-none ${className ?? ""}`}
    />
  );
}
