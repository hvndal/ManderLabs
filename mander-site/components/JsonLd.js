// Renders a schema.org JSON-LD block. Placement in the document doesn't
// matter for crawlers — this can sit in the body, it doesn't need <head>.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
