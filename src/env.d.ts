// src/env.d.ts

// HTML raw imports
declare module '*.html?raw' {
  const content: string;
  export default content;
}

// CSS imports
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}