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

## Coding Conventions

### Naming Conventions

This project follows specific naming conventions for consistency and clarity:

#### Database vs Application Data
- **snake_case**: Used for raw database data (tables, columns, destructuring raw data)
- **camelCase**: Used by default and for parsed application data (variables, functions, parsed raw data)

**Example:**
```typescript
// Database (snake_case)
const rawData = await sql`SELECT family_member_id, account_id FROM family_members`;
const {family_member_id, account_id} = rawData;

// Application (camelCase) 
const familyMember = {
  familyMemberId: family_member_id,
  accountId: account_id
};
```

#### TypeScript/JavaScript Naming
- **Variables**: camelCase (e.g., `familyMember`, `accountId`)
- **Functions**: camelCase (e.g., `createFamilyMember`, `updateAccount`)
- **Interfaces**: PascalCase (e.g., `FamilyMember`, `Account`)
- **Components**: PascalCase (e.g., `FamilyMemberForm`, `AccountLayout`)

#### Path Mappings
Use domain-specific import aliases instead of long relative paths:

```typescript
// ❌ Avoid long paths
import {types} from "@/src/domains/shared/types";

// ✅ Use short aliases
import {types} from "@/shared/types";
import {AccountLogin} from "@/auth/schemas/account";
import {createFamilyMember} from "@/patient/actions/family-members";
```

**Available aliases:**
- `@/shared/*` → `./src/domains/shared/*`
- `@/auth/*` → `./src/domains/auth/*`
- `@/patient/*` → `./src/domains/patient/*`
- `@/professional/*` → `./src/domains/professional/*`
- `@/provider/*` → `./src/domains/provider/*`

#### File and Folder Structure
- **Components**: PascalCase files (e.g., `FamilyMemberForm.tsx`)
- **Actions**: kebab-case files (e.g., `family-members.ts`)
- **Schemas**: singular nouns (e.g., `account.ts`, not `accounts.ts`)
- **DTOs**: singular with dto suffix (e.g., `family-member.ts`)
- **Services**: camelCase with `.service.ts` extension (e.g., `email.service.ts`, `bcrypt.service.ts`)
- **Additional Extensions**: Some files use descriptive extensions for clarity:
  - `.action.ts` for server actions (e.g., `signup.action.ts`)
  - `.adapter.ts` for data adapters (e.g., `session.ts`, `appointment.ts`)
  - `.port.ts` for interface definitions (e.g., `email.port.ts`)
  - `.repository.ts` for data repositories (e.g., `account.repository.ts`)

### Domain Architecture

The project follows a domain-driven design structure:

```
src/domains/
  auth/           # Authentication and authorization
  patient/        # Patient-related functionality
  professional/   # Professional-related functionality
  provider/  # Establishment management
  shared/         # Shared utilities and types
```

### Data Transformation Patterns

Use DTOs (Data Transfer Objects) to transform between database and application formats:

```typescript
// DTO function
export function familyMemberDTO(raw: any): FamilyMember {
  return {
    familyMemberId: raw.family_member_id,
    name: raw.name,
    surname: raw.surname,
    age: raw.age,
    identificationNumber: raw.identification_number
  };
}
```

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