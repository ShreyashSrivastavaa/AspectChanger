import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    const toHome = (source: string, destination = "/") => ({ source, destination, permanent: true });
    return [
      toHome("/faq", "/#faq"),
      toHome("/calculator/:path*", "/#calculator"),
      ...[
        "all-pages", "benchmarks", "changelog", "compare", "convert", "data", "fix", "for", "from",
        "glossary", "guides", "methodology", "press", "resolution", "tools",
      ].map((section) => toHome(`/${section}/:path*`)),
      // English lives at unprefixed URLs.
      toHome("/en/:page(about|contact|privacy|terms)", "/:page"),
      toHome("/en/:path+"),
      // Each language has only its home page and the info pages.
      toHome("/:locale(de|es|fr|it|ja|ko|pt)/:path((?!about$|contact$|privacy$|terms$).+)", "/:locale"),
      // Languages that are no longer offered.
      toHome("/:locale(ar|bn|hi|id|nl|pl|ru|th|tr|ur|vi|zh)/:path*"),
    ];
  },
};

export default withNextIntl(nextConfig);
