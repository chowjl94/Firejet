import * as prettier from "prettier";

export default async function lint(code: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const formattedCode = prettier.format(code);
      resolve(formattedCode);
    }, Math.random() * 1000); // random delay between 0 and 1 seconds
  });
}
