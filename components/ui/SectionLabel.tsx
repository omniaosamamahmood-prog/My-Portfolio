type Props = {
  number: string;
  label: string;
  className?: string;
};

export function SectionLabel({ number, label, className = "" }: Props) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-muted sm:text-[15px] sm:tracking-[0.22em] ${className}`}
    >
      <span className="text-accent">{number}</span>
      <span aria-hidden className="h-px w-10 bg-line-strong sm:w-12" />
      <span>{label}</span>
    </div>
  );
}
