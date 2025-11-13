import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Code Line Counter extension is now active');

    let disposable = vscode.commands.registerCommand('code-line-counter.countLines', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if (!workspaceFolders) {
            vscode.window.showWarningMessage('No workspace folder is open');
            return;
        }

        // Show progress notification
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Counting lines of code...",
            cancellable: false
        }, async (progress) => {
            const rootPath = workspaceFolders[0].uri.fsPath;
            const stats = await countLinesInDirectory(rootPath);

            const totalLines = stats.codeLines + stats.blankLines + stats.commentLines;
            
            // Show detailed results
            const message = `Code Line Statistics:\n\n` +
                          `Total Lines: ${totalLines}\n` +
                          `Code Lines: ${stats.codeLines}\n` +
                          `Blank Lines: ${stats.blankLines}\n` +
                          `Comment Lines: ${stats.commentLines}\n` +
                          `Files Scanned: ${stats.filesScanned}`;
            
            vscode.window.showInformationMessage(message, { modal: true });
        });
    });

    context.subscriptions.push(disposable);
}

interface LineStats {
    codeLines: number;
    blankLines: number;
    commentLines: number;
    filesScanned: number;
}

async function countLinesInDirectory(dirPath: string): Promise<LineStats> {
    const stats: LineStats = {
        codeLines: 0,
        blankLines: 0,
        commentLines: 0,
        filesScanned: 0
    };

    // File extensions to include
    const codeExtensions = new Set([
        '.ts', '.js', '.tsx', '.jsx', '.py', '.java', '.c', '.cpp', '.cs', 
        '.go', '.rs', '.php', '.rb', '.swift', '.kt', '.scala', '.m', '.h',
        '.vue', '.html', '.css', '.scss', '.sass', '.less', '.json', '.xml',
        '.yaml', '.yml', '.sql', '.sh', '.bash', '.ps1', '.r', '.dart', '.lua'
    ]);

    // Directories to exclude
    const excludeDirs = new Set([
        'node_modules', '.git', 'dist', 'build', 'out', '.vscode', 
        '.idea', '__pycache__', '.pytest_cache', 'venv', 'env',
        'coverage', '.next', '.nuxt', 'target', 'bin', 'obj'
    ]);

    async function traverseDirectory(currentPath: string): Promise<void> {
        try {
            const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(currentPath, entry.name);

                if (entry.isDirectory()) {
                    if (!excludeDirs.has(entry.name)) {
                        await traverseDirectory(fullPath);
                    }
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name).toLowerCase();
                    if (codeExtensions.has(ext)) {
                        await countLinesInFile(fullPath, stats);
                        stats.filesScanned++;
                    }
                }
            }
        } catch (error) {
            console.error(`Error reading directory ${currentPath}:`, error);
        }
    }

    await traverseDirectory(dirPath);
    return stats;
}

async function countLinesInFile(filePath: string, stats: LineStats): Promise<void> {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        const lines = content.split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();
            
            if (trimmedLine === '') {
                stats.blankLines++;
            } else if (isCommentLine(trimmedLine, path.extname(filePath))) {
                stats.commentLines++;
            } else {
                stats.codeLines++;
            }
        }
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
    }
}

function isCommentLine(line: string, ext: string): boolean {
    // Single-line comment patterns for different languages
    const commentPatterns: { [key: string]: string[] } = {
        '.py': ['#'],
        '.js': ['//', '/*', '*/', '/**'],
        '.ts': ['//', '/*', '*/', '/**'],
        '.jsx': ['//', '/*', '*/', '/**'],
        '.tsx': ['//', '/*', '*/', '/**'],
        '.java': ['//', '/*', '*/', '/**'],
        '.c': ['//', '/*', '*/', '/**'],
        '.cpp': ['//', '/*', '*/', '/**'],
        '.cs': ['//', '/*', '*/', '/**'],
        '.go': ['//', '/*', '*/', '/**'],
        '.rs': ['//', '/*', '*/', '/**'],
        '.php': ['//', '/*', '*/', '/**', '#'],
        '.rb': ['#'],
        '.swift': ['//', '/*', '*/', '/**'],
        '.kt': ['//', '/*', '*/', '/**'],
        '.scala': ['//', '/*', '*/', '/**'],
        '.sh': ['#'],
        '.bash': ['#'],
        '.r': ['#'],
        '.sql': ['--', '/*', '*/'],
        '.lua': ['--'],
        '.html': ['<!--', '-->'],
        '.xml': ['<!--', '-->'],
        '.css': ['/*', '*/'],
        '.scss': ['//', '/*', '*/'],
        '.sass': ['//'],
        '.less': ['//', '/*', '*/'],
        '.vue': ['//', '/*', '*/', '<!--', '-->']
    };

    const patterns = commentPatterns[ext.toLowerCase()] || [];
    
    for (const pattern of patterns) {
        if (line.startsWith(pattern)) {
            return true;
        }
    }
    
    return false;
}

export function deactivate() {}
