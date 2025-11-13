#!/bin/bash

# VS Code Extension Build Script
# This script compiles TypeScript and packages the extension into a .vsix file

set -e  # Exit immediately if a command exits with a non-zero status

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Output directory
OUTPUT_DIR="$SCRIPT_DIR/dist"

echo -e "${GREEN}=== VS Code Extension Build Script ===${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm version: $(npm --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "\n${YELLOW}Installing dependencies...${NC}"
    npm install || {
        echo -e "${RED}Error: Failed to install dependencies${NC}"
        exit 1
    }
    echo -e "${GREEN}✓${NC} Dependencies installed successfully"
else
    echo -e "${GREEN}✓${NC} Dependencies already installed"
fi

# Check if vsce is installed globally, if not install it
if ! command -v vsce &> /dev/null; then
    echo -e "\n${YELLOW}Installing vsce globally...${NC}"
    npm install -g @vscode/vsce || {
        echo -e "${RED}Error: Failed to install vsce${NC}"
        echo "Try running: sudo npm install -g @vscode/vsce"
        exit 1
    }
    echo -e "${GREEN}✓${NC} vsce installed successfully"
else
    echo -e "${GREEN}✓${NC} vsce is already installed"
fi

# Clean previous build
echo -e "\n${YELLOW}Cleaning previous build...${NC}"
if [ -d "out" ]; then
    rm -rf out
    echo -e "${GREEN}✓${NC} Removed 'out' directory"
fi

# Compile TypeScript
echo -e "\n${YELLOW}Compiling TypeScript...${NC}"
npm run compile || {
    echo -e "${RED}Error: TypeScript compilation failed${NC}"
    exit 1
}
echo -e "${GREEN}✓${NC} TypeScript compiled successfully"

# Create output directory if it doesn't exist
if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
    echo -e "${GREEN}✓${NC} Created output directory: $OUTPUT_DIR"
fi

# Remove old .vsix files from output directory
if ls "$OUTPUT_DIR"/*.vsix 1> /dev/null 2>&1; then
    echo -e "\n${YELLOW}Removing old .vsix files...${NC}"
    rm "$OUTPUT_DIR"/*.vsix
    echo -e "${GREEN}✓${NC} Old .vsix files removed"
fi

# Package the extension
echo -e "\n${YELLOW}Packaging extension...${NC}"
vsce package --out "$OUTPUT_DIR" || {
    echo -e "${RED}Error: Failed to package extension${NC}"
    exit 1
}

# Get the created .vsix file name
VSIX_FILE=$(ls -t "$OUTPUT_DIR"/*.vsix 2>/dev/null | head -1)

if [ -z "$VSIX_FILE" ]; then
    echo -e "${RED}Error: .vsix file was not created${NC}"
    exit 1
fi

# Get file size
FILE_SIZE=$(du -h "$VSIX_FILE" | cut -f1)

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Build completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\nPackage details:"
echo -e "  File: ${GREEN}$(basename "$VSIX_FILE")${NC}"
echo -e "  Size: ${GREEN}$FILE_SIZE${NC}"
echo -e "  Location: ${GREEN}$OUTPUT_DIR${NC}"
echo -e "\n${YELLOW}To install the extension:${NC}"
echo -e "  1. Open VS Code"
echo -e "  2. Go to Extensions (Ctrl+Shift+X)"
echo -e "  3. Click '...' menu > Install from VSIX"
echo -e "  4. Select: $VSIX_FILE"
echo -e "\n${YELLOW}Or use command line:${NC}"
echo -e "  code --install-extension \"$VSIX_FILE\""
echo -e "\n${GREEN}Done!${NC}"

exit 0
