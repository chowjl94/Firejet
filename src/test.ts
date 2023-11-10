import lint from "./prettier";
import { DEFAULT_REACT_LOADING_FILES } from "./exhibitA";

async function testLinting(code: string) {
  try {
    // Apply linting
    const lintedCode = await lint(code);
    console.log("Linted Code:\n", lintedCode);
  } catch (error) {
    console.error("Error:", error);
  }
}

testLinting(DEFAULT_REACT_LOADING_FILES["/App.tsx"].code);
