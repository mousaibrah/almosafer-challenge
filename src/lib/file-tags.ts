// File type mapping for better badge representation
export const FILE_TYPE_EXTENSIONS: Record<string, string[]> = {
  JavaScript: [".js", ".jsx", ".mjs"],
  TypeScript: [".ts", ".tsx"],
  Python: [".py", ".pyw", ".pyi"],
  Java: [".java"],
  "C++": [".cpp", ".cc", ".cxx", ".c++"],
  C: [".c", ".h"],
  "C#": [".cs"],
  PHP: [".php"],
  Ruby: [".rb"],
  Go: [".go"],
  Rust: [".rs"],
  Swift: [".swift"],
  Kotlin: [".kt", ".kts"],
  Scala: [".scala"],
  HTML: [".html", ".htm"],
  CSS: [".css", ".scss", ".sass", ".less"],
  Shell: [".sh", ".bash", ".zsh"],
  PowerShell: [".ps1"],
  Dockerfile: ["Dockerfile"],
  YAML: [".yml", ".yaml"],
  JSON: [".json"],
  XML: [".xml"],
  Markdown: [".md", ".markdown"],
}

export function getFileExtensions(language: string): string[] {
  return FILE_TYPE_EXTENSIONS[language] || [`.${language.toLowerCase()}`]
}

export function getLanguageFromExtension(filename: string): string | null {
  const ext = filename.substring(filename.lastIndexOf("."))
  for (const [language, extensions] of Object.entries(FILE_TYPE_EXTENSIONS)) {
    if (extensions.includes(ext)) {
      return language
    }
  }
  return null
}
