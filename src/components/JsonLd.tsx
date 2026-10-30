/**
 * JSON-LD structured data for SEO.
 * All content is a hardcoded constant, no user input, safe.
 */
const JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://anishbabbar.me/#website",
      url: "https://anishbabbar.me/",
      name: "Anish Babbar Portfolio",
      inLanguage: "en",
      publisher: { "@id": "https://anishbabbar.me/#person" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://anishbabbar.me/#profilepage",
      url: "https://anishbabbar.me/",
      name: "Anish Babbar · Full-stack developer and team lead",
      description:
        "Portfolio of Anish Babbar, full-stack developer and team lead at Masters' Union.",
      inLanguage: "en",
      isPartOf: { "@id": "https://anishbabbar.me/#website" },
      mainEntity: { "@id": "https://anishbabbar.me/#person" },
      about: { "@id": "https://anishbabbar.me/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://anishbabbar.me/#person",
      name: "Anish Babbar",
      url: "https://anishbabbar.me/",
      jobTitle: "Full-stack developer and team lead",
      description:
        "Full-stack developer and team lead at Masters' Union, leading 10+ engineers and building internal tools for lead tracking, inventory, payments and travel with React, Node.js and AWS.",
      email: "mailto:anishbabbar1@gmail.com",
      image: "https://anishbabbar.me/og.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abohar",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
      worksFor: { "@type": "Organization", name: "Masters' Union" },
      sameAs: [
        "https://github.com/babbaranish",
        "https://www.linkedin.com/in/babbaranish",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Redux",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "SQL",
        "MongoDB",
        "Sequelize",
        "AWS",
        "React Native",
        "Expo",
      ],
    },
  ],
});

export function JsonLd() {
  // Uses dangerouslySetInnerHTML with a static hardcoded JSON string (no user input).
  // Required for JSON-LD structured data injection in React.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSONLD }}
    />
  );
}
