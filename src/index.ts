import { DEFAULT_REACT_FILES, DEFAULT_REACT_LOADING_FILES } from './exhibitA';
import { Lint } from './lint';

const toBeLintArr = [...Object.values(DEFAULT_REACT_LOADING_FILES), ...Object.values(DEFAULT_REACT_FILES)];

// lint items here
for (const file of toBeLintArr) {
    const code = file.code;
    try {
        Lint(code, '/*tsx*/', 'Linted');
        console.log(`Linting successful for ${file || 'unknown file'}`);
    } catch (error) {
        console.error(`Error linting ${file || 'unknown file'}: ${error}`);
    }
}