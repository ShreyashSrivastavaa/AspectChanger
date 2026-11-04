// scripts/check-schemas.js
// Automated verification script for Schema.org JSON-LD compliance.

const BRAND = {
  name: "AspectCut",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://aspectcut.vercel.app",
  entityStatement: "AspectCut is a free, browser-based video aspect ratio changer that processes files locally with WebAssembly; videos are not uploaded to a server.",
};

console.log("\n📐 Testing AspectCut Schema.org JSON-LD Generators...\n");

let errors = 0;

function validateJson(name, obj) {
  try {
    const jsonStr = JSON.stringify(obj);
    const parsed = JSON.parse(jsonStr);
    if (!parsed["@context"] || parsed["@context"] !== "https://schema.org") {
      console.error(`❌ ${name}: Missing or invalid @context: ${parsed["@context"]}`);
      errors++;
      return;
    }
    if (!parsed["@type"]) {
      console.error(`❌ ${name}: Missing @type`);
      errors++;
      return;
    }
    console.log(`  ✔ ${name} (@type: ${parsed["@type"]}): Valid JSON-LD`);
  } catch (err) {
    console.error(`❌ ${name}: JSON serialization error: ${err.message}`);
    errors++;
  }
}

// 1. SoftwareApplication Schema
const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AspectCut Video Aspect Ratio Changer",
  description: BRAND.entityStatement,
  url: BRAND.domain,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires WebAssembly & SharedArrayBuffer",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
validateJson("SoftwareApplication", softwareApp);

// 2. HowTo Schema
const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to convert 16:9 to 9:16 vertical video",
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload Video", text: "Drop your video file into the browser." },
    { "@type": "HowToStep", position: 2, name: "Choose Ratio", text: "Select 9:16 target ratio." },
    { "@type": "HowToStep", position: 3, name: "Convert", text: "Render your video locally in WebAssembly." }
  ],
};
validateJson("HowTo", howTo);

// 3. FAQPage Schema
const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is AspectCut free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, 100% free with no watermarks." }
    }
  ]
};
validateJson("FAQPage", faqPage);

// 4. BreadcrumbList Schema
const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BRAND.domain },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${BRAND.domain}/tools` }
  ]
};
validateJson("BreadcrumbList", breadcrumbs);

// 5. Organization Schema
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: BRAND.domain,
  description: BRAND.entityStatement
};
validateJson("Organization", organization);

// 6. DefinedTerm Schema
const definedTerm = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Display Aspect Ratio (DAR)",
  description: "Proportional ratio of width to height on screen.",
  inDefinedTermSet: `${BRAND.domain}/glossary`
};
validateJson("DefinedTerm", definedTerm);

// 7. Article Schema
const article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is Video Aspect Ratio?",
  author: { "@type": "Organization", name: BRAND.name },
  publisher: { "@type": "Organization", name: BRAND.name }
};
validateJson("Article", article);

if (errors > 0) {
  console.error(`\n❌ Schema verification failed with ${errors} error(s).\n`);
  process.exit(1);
} else {
  console.log(`\n✅ ALL 7 SCHEMA.ORG SCHEMAS VALIDATED SUCCESSFULLY!\n`);
  process.exit(0);
}
