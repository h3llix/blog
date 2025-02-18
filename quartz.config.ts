import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "📝 h3llix writes!",
    pageTitleSuffix: " - Thoughts & Dumps! ",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "blog.h3llix.com",
    ignorePatterns: ["private", "templates", ".obsidian", "drafts"],
    defaultDateType: "created",
    generateSocialImages: true,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Merriweather",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#f5f5f5",
          gray: "#a0a0a0",
          darkgray: "#555555",
          dark: "#222222",
          secondary: "#007acc",
          tertiary: "#ff6b6b",
          highlight: "rgba(0, 122, 204, 0.2)",
          textHighlight: "#ffcc0088",
        },
        darkMode: {
          light: "#1a1a1a",
          lightgray: "#2e2e2e",
          gray: "#7a7a7a",
          darkgray: "#c4c4c4",
          dark: "#f0f0f0",
          secondary: "#80bfff",
          tertiary: "#ff8585",
          highlight: "rgba(0, 122, 204, 0.3)",
          textHighlight: "#ffcc0088",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark-dimmed",
        },
        keepBackground: true,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [
      Plugin.RemoveDrafts()
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
