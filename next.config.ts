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
      // Only the home page exists per language.
      toHome("/en/:path+"),
      toHome("/:locale(ar|bn|de|es|fr|hi|id|it|ja|ko|nl|pl|pt|ru|th|tr|ur|vi|zh)/:path+", "/:locale"),
    ];
  },
};

export default withNextIntl(nextConfig);
