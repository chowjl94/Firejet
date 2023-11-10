import * as fs from 'fs';
import path from 'path';
import * as babelParser from '@babel/parser';
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import lint from "./prettier";

export function Lint(originalCode :string, lintingComments:string, outputPath:string) {
  const outputDir = path.dirname(outputPath);
  const options: babelParser.ParserOptions = {
    sourceType: 'module',
    plugins: ['jsx'],
    attachComment: true
  };

  const ast = babelParser.parse(originalCode);

  traverse(ast, {
    enter(path) {
      const leadingComments = path.parent.leadingComments
      if (leadingComments) {
        const lintingPromises = leadingComments.map(async (comment) => {
          if (comment.type === 'CommentBlock' && lintingComments.includes(comment.value)) {
            // Get the template literal content
            const templateLiteral = path.node;

            // Apply linting logic
            const lintedCode = lint(generate(templateLiteral).code);

            // Parse the linted code into an AST
            const lintedAST = babelParser.parse(await lintedCode, options);

            // Replace the template literal with the linted version
            path.replaceWith(lintedAST.program.body[0]);
          }
        });

        return Promise.all(lintingPromises);
      }
    },
  });

  const codeWithLintedTemplates = generate(ast, { comments: true }).code;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, codeWithLintedTemplates);
  console.log(`Linted code saved to: ${outputPath}`);

  return codeWithLintedTemplates;
}






  
