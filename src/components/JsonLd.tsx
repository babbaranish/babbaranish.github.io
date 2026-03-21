/**
 * JSON-LD structured data for SEO.
 * All content is a hardcoded constant — no user input, safe.
 */
const JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anish Babbar",
  jobTitle: "Team Lead & Full-Stack Developer",
  url: "https://babbaranish.github.io/new_portfolio",
  email: "anishbabbar1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abohar",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/babbaranish",
    "https://linkedin.com/in/babbaranish",
  ],
  knowsAbout: [
    "React", "Node.js", "TypeScript", "AWS", "Express",
    "Redux", "Next.js", "React Native",
  ],
  worksFor: { "@type": "Organization", name: "Masters' Union" },
});

export function JsonLd() {
  // Uses dangerouslySetInnerHTML with a static hardcoded JSON string (no user input).
  // Required for JSON-LD structured data injection in React.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSONLD }} // eslint-disable-line react/no-danger
    />
  );
}
