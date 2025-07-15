export const getFileExtensions = (language: string): string[] => {
  switch (language.toLowerCase()) {
    case "javascript":
      return [".js", ".jsx"];
    case "typescript":
      return [".ts", ".tsx"];
    case "python":
      return [".py"];
    case "java":
      return [".java"];
    case "c++":
      return [".cpp", ".cxx", ".hpp"];
    case "c#":
      return [".cs"];
    case "go":
      return [".go"];
    case "html":
      return [".html", ".htm"];
    case "css":
      return [".css"];
    case "shell":
      return [".sh", ".bash", ".zsh"];
    default:
      return [];
  }
};
// Language mapping helper
export const getLanguageVariant = (language: string) => {
  switch (language.toLowerCase()) {
    case "javascript":
      return "javascript";
    case "typescript":
      return "typescript";
    case "python":
      return "python";
    case "java":
      return "java";
    case "c++":
      return "cpp";
    case "c#":
      return "csharp";
    case "go":
      return "go";
    case "html":
      return "html";
    case "css":
      return "css";
    case "shell":
      return "shell";
    default:
      return "default";
  }
};
