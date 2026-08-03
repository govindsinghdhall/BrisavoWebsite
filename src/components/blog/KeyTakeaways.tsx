interface KeyTakeawaysProps {
  items: string[];
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items.length) return null;

  return (
    <aside className="rounded-2xl border border-accent-blue/25 bg-accent-blue/8 p-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Key Takeaways
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-7 text-foreground/80"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
