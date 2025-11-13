# Code Line Counter

A Visual Studio Code extension that counts the total lines of code in your currently opened workspace.

## Features

- Count total lines of code across all supported file types in your workspace
- Separate statistics for code lines, blank lines, and comment lines
- Support for multiple programming languages (Python, JavaScript, TypeScript, Java, C/C++, Go, Rust, PHP, Ruby, Swift, Kotlin, and more)
- Automatically excludes common build and dependency directories (node_modules, .git, dist, etc.)

## Usage

1. Open a workspace/folder in VS Code
2. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
3. Type "Count Lines of Code" and select the command
4. View the statistics in a popup dialog

## Statistics Provided

- **Total Lines**: All lines in the scanned files
- **Code Lines**: Lines containing actual code
- **Blank Lines**: Empty lines
- **Comment Lines**: Lines containing only comments
- **Files Scanned**: Total number of files analyzed

## Supported File Types

The extension supports common programming languages including:
- JavaScript/TypeScript (.js, .ts, .jsx, .tsx)
- Python (.py)
- Java (.java)
- C/C++ (.c, .cpp, .h)
- C# (.cs)
- Go (.go)
- Rust (.rs)
- PHP (.php)
- Ruby (.rb)
- Swift (.swift)
- Kotlin (.kt)
- HTML/CSS/SCSS/LESS
- And many more...

## Installation

### From Source

1. Clone this repository
2. Run `npm install` in the extension directory
3. Run `npm run compile` to compile TypeScript
4. Press F5 to open a new VS Code window with the extension loaded

### Package and Install

1. Install vsce: `npm install -g @vscode/vsce`
2. Run `vsce package` to create a .vsix file
3. Install via VS Code: Extensions > ... > Install from VSIX

## Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Run linter
npm run lint
```

## License

MIT
