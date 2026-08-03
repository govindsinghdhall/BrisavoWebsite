interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown> | null>;
}

export function JsonLd({ data }: JsonLdProps) {
  const payloads = (Array.isArray(data) ? data : [data]).filter(Boolean);

  if (payloads.length === 0) return null;

  return (
    <>
      {payloads.map((payload, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </>
  );
}
