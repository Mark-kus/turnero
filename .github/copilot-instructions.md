# Turnero - Appointment Booking System

Turnero is a Next.js 14 web application for booking medical appointments, built with TypeScript, Tailwind CSS, and domain-driven design architecture. It integrates with Vercel Postgres, Resend email service, and Google OAuth.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Dependencies
- **Node.js Version**: Use Node.js 20.x (confirmed working with 20.19.4)
- **Install dependencies**: `npm install` -- takes ~4 minutes. NEVER CANCEL. Set timeout to 10+ minutes.
- **Environment setup**: Copy `.env.example` to `.env.local` and configure with actual values, or use `.env.test` for development without external services

### Development Commands
- **Development server**: `npm run dev` -- starts in ~2 seconds on http://localhost:3000
- **Linting**: `npm run lint` -- takes ~8 seconds, validates ESLint configuration
- **Lint with auto-fix**: `npm run lint:fix` -- fixes auto-correctable issues
- **Tests**: `npm test` -- runs Jest (currently no tests exist, use `npm test -- --passWithNoTests` for CI)
- **Test with coverage**: `npm run test:coverage`
- **Test in watch mode**: `npm run test:watch`

### Build and Production
- **Build**: `npm run build` -- **WARNING**: Fails in restricted network environments due to Google Fonts fetching. Works in normal environments with internet access.
- **Production server**: `npm start` -- requires successful build first
- **NEVER CANCEL**: Build may take 5-15 minutes depending on network. Set timeout to 20+ minutes.

## Validation

### Manual Testing Scenarios
**ALWAYS run through these scenarios after making changes:**

1. **Homepage Navigation**:
   - Start dev server: `npm run dev`
   - Navigate to http://localhost:3000
   - Verify "Bienvenido" heading and two buttons: "Registrarse" and "Login"

2. **Registration Flow**:
   - Click "Registrarse" button
   - Verify form loads with fields: First Name, Last Name, Email, Password
   - Verify password visibility toggle works
   - Check "Already have an account?" link

3. **Login Flow**:
   - From homepage, click "Login" button
   - Verify login form displays correctly

### Pre-commit Validation
- **Always run**: `npm run lint` before committing changes
- **Test framework**: `npm test -- --passWithNoTests` to ensure Jest configuration works
- **Development server**: Verify `npm run dev` starts without errors

## Environment Configuration

### Required Environment Variables
Create `.env.local` with these variables (see `.env.example` for full template):

```bash
# Database (Vercel Postgres or Neon)
POSTGRES_URL="postgres://username:password@host:5432/database?sslmode=require"
POSTGRES_PRISMA_URL="postgres://username:password@host:5432/database?sslmode=require&pgbouncer=true&connect_timeout=15"

# Blob Storage (Vercel)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_token"
BLOB_HOSTNAME="hostname.public.blob.vercel-storage.com"

# Application Security
SECRET="minimum_32_character_secret_key"

# Google OAuth
GOOGLE_CLIENT_ID="client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="client_secret"

# Email Service (Resend)
RESEND_API_KEY="re_api_key"

# Application URL
PROJECT_URL="http://localhost:3000"
```

### Development Without External Services
Use `.env.test` for local development when external services aren't available. This allows the application to start and run basic functionality.

## Domain-Driven Architecture

The project follows domain-driven design with these domains:

### Domain Structure
Each domain (auth, patient, professional) contains:
- **actions/**: Server actions combining logic with services
- **adapters/**: Service and library adapters (Resend, Vercel, bcrypt)
- **components/**: UI components specific to the domain
- **contracts/**: Interfaces for adapters ensuring interchangeability
- **dtos/**: Data transfer objects
  - `entity/`: Raw table interfaces (snake_case)
  - `raw/`: Multi-table SELECT interfaces (snake_case)  
  - `dto/`: Processed interfaces (camelCase)
- **schemas/**: Zod data validations
- **use-cases/**: Business logic implementations

### Shared Domain
- **components/**: Shared UI components across domains
- **styles/**: Global styling, fonts, Tailwind configuration
- **types/**: Common business logic types
- **utils/**: Shared utilities (formatting, date operations)
- **constants.ts**: Shared constants

### Key File Locations
- **Path aliases**: Configured in `tsconfig.json`
  - `@/shared/*` → `./src/domains/shared/*`
  - `@/auth/*` → `./src/domains/auth/*`
  - `@/patient/*` → `./src/domains/patient/*`
  - `@/professional/*` → `./src/domains/professional/*`
- **Main layout**: `src/app/layout.tsx`
- **Homepage**: `src/app/page.tsx`
- **Auth routes**: `src/app/(auth)/`
- **API routes**: `src/app/api/`

## Technology Stack Details

### Core Technologies
- **Next.js 14**: App Router, Server Actions
- **TypeScript**: Strict mode enabled
- **Tailwind CSS 4**: With DaisyUI components
- **Zod**: Schema validation
- **Jest**: Testing framework (jsdom environment)

### External Services
- **Database**: Vercel Postgres with Neon
- **Email**: Resend API
- **Storage**: Vercel Blob Storage
- **Auth**: Custom JWT + Google OAuth

### Styling System
- **Framework**: Tailwind CSS 4 with DaisyUI
- **Theme**: Custom "figma" theme in `src/domains/shared/styles/globals.css`
- **Fonts**: Inter and Work Sans from Google Fonts
- **Custom utilities**: Defined in globals.css (@utility declarations)

## Common Tasks

### Adding New Features
1. Identify the appropriate domain (auth, patient, professional, shared)
2. Follow the domain structure:
   - Add schemas in `schemas/` for validation
   - Create DTOs in `dtos/` for data transfer
   - Implement use cases in `use-cases/`
   - Create adapters in `adapters/` if external services needed
   - Add UI components in `components/`
   - Create server actions in `actions/`

### Database Changes
- No migration system currently exists
- Database schema changes require manual SQL execution
- Use adapters pattern for database access

### Styling Changes
- Use Tailwind utilities and DaisyUI components
- Custom utilities defined in `globals.css`
- Theme colors defined in CSS custom properties

## Known Issues and Workarounds

### Build Issues
- **Google Fonts**: Build fails in restricted networks due to font fetching
- **Environment Variables**: `next.config.mjs` requires `BLOB_HOSTNAME` to be set (fixed to handle missing values)

### Development Limitations
- **No tests**: Testing infrastructure exists but no tests written yet
- **No database migrations**: Manual schema management required
- **External service dependency**: Requires multiple external services for full functionality

## Troubleshooting

### Common Problems
1. **Build fails with font errors**: Network restrictions preventing Google Fonts access
2. **Environment variable errors**: Ensure `.env.local` exists with required variables
3. **Dev server won't start**: Check Node.js version (must be 20.x)
4. **Lint errors**: Run `npm run lint:fix` for auto-correctable issues

### Quick Fixes
- **Reset dependencies**: `rm -rf node_modules package-lock.json && npm install`
- **Clear Next.js cache**: `rm -rf .next`
- **Environment issues**: Copy `.env.test` to `.env.local` for basic functionality