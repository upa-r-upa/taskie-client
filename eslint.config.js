import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default [
  // 무시할 디렉토리 설정
  {
    ignores: ["dist", "dev-dist", "node_modules", "src/api/generated"], // 빌드 결과물과 자동 생성된 API 무시
  },
  // JavaScript 및 TypeScript 설정
  {
    files: ["src/**/*.{js,ts,tsx}"], // JS, TS 파일 처리
    languageOptions: {
      parser: tsParser, // TypeScript 파서
      ecmaVersion: "latest", // 최신 ECMAScript 버전
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // TypeScript 규칙
      "react-hooks": reactHooks, // React Hooks 규칙
      import: importPlugin, // Import 관련 규칙
    },
    rules: {
      // Import 관련 규칙
      "import/no-unresolved": "error", // 잘못된 import 방지
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"], // Node.js 내장 모듈 및 외부 패키지
            "internal", // 내부 모듈
            "parent", // 부모 디렉토리
            ["sibling", "index"], // 형제 디렉토리 및 index 파일
            "object", // 객체 형태의 import
            "type", // TypeScript 타입 import
          ],
          "newlines-between": "always",
        },
      ],

      // React Hooks 관련 규칙
      "react-hooks/rules-of-hooks": "error", // React Hook 규칙 강제
      "react-hooks/exhaustive-deps": "warn", // 종속성 배열 검사

      // TypeScript 관련 규칙
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }, // _로 시작하는 변수 무시
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
        },
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
];
