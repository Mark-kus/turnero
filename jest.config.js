import {existsSync} from "fs";

import nextJest from "next/jest.js";
import {config} from "dotenv";

// Cargar el primer .env que encuentre
const envFiles = [".env.local", ".env.test", ".env"];

for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    config({path: envFile});
    break;
  }
}

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/layout.tsx",
    "!app/**/loading.tsx",
    "!app/**/not-found.tsx",
    "!app/**/error.tsx",
    "!app/**/page.tsx", // You can remove this if you want to test pages
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  transformIgnorePatterns: ["node_modules/(?!(jose)/)"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
