import { cn } from "../../utils/cn";

const logoUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR70eX-BI9dTxwDwS7vgohG6nJUobls3n8Tafg8KgeuuMbsDmxFIjunpsFM&s=10";

export function Brand({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={logoUrl}
        alt="Groww NoCap"
        className={cn(
          "block shrink-0 rounded-xl object-contain",
          compact ? "h-8 w-8" : "h-10 w-10",
        )}
      />
      {!compact && (
        <span className="leading-none">
          <span className="block text-lg font-extrabold tracking-tight text-ink">Groww</span>
          <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">NoCap</span>
        </span>
      )}
    </span>
  );
}
