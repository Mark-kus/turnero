# Project Technologies & Architecture

## Technologies Used
- Next.js 14
- TypeScript
- Tailwind CSS
- Zod
- Vercel Postgres
- Resend

## Project Structure

The app follows a domain-driven design with minimal routing logic. Main domains include:
- auth
- patient
- professional
- provider
- shared

### Domain Structure
Each domain (except shared) contains:

#### `actions/`
Server actions combining logic with services for abstraction and agnosticism

#### `adapters/`
Service and library adapters (Resend, Vercel, bcrypt, etc.)
- Read models for multi-table queries
- Repositories focus solely on data retrieval of specific tables
- Adaptations of libraries that follow a common interface for easy swapping

#### `components/`
UI components specific to the domain

#### `contracts/`
Interfaces implemented by adapters ensuring interchangeability

#### `dtos/`
Data transfer interfaces:
- `entity/`: Raw table SELECT * interfaces (snake_case)
- `raw/`: Multi-table SELECT interfaces (snake_case)
- `dto/`: Processed SELECT interfaces (camelCase)

#### `schemas/`
Zod data validations

#### `use-cases/`
Business logic implementations:
- Called from actions or components
- Receive adapters through contracts for flexibility

### Shared Domain
Contains common resources:

- `components/`: Shared UI components
- `styles/`: Shared styling (fonts, colors, Tailwind)
- `types/`: Common business logic types
- `utils/`: Shared utilities (formatting, date operations)
- `constants`: Shared constants (tokens, etc.)