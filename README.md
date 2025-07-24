# Turnero

A Next.js appointment booking application.

## Requirements

- **Node.js**: 22.0.0 or higher
- **npm**: Latest version recommended

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Node.js 22 Migration

This project has been migrated to Node.js 22 for improved performance and modern JavaScript features:

- Updated `.nvmrc` to specify Node.js 22
- Added `engines` field in `package.json` to ensure Node.js 22+ compatibility
- Updated TypeScript configuration to target ES2022
- Updated Jest configuration for better ES modules support

## Environment

Make sure you're using Node.js 22 by running:
```bash
node --version
```

If using nvm:
```bash
nvm use
```