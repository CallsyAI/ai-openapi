# @callsy/ai-openapi

🤖 Automatically generate OpenAPI 3.0 documentation from your code using AI.

This package uses Claude AI (via Claude Code agent) to analyze your API routes and generate comprehensive OpenAPI specifications with schemas, endpoints, and error responses.

## Features

- ✨ **AI-Powered**: Uses Claude Code AI Agent to understand your code and generate accurate documentation.
- 📝 **Complete Workflow**: Generate, build, validate, and deploy OpenAPI specs.
- 🔄 **Self-Verifying**: AI validates its own output and retries on errors.
- 🎯 **Framework Agnostic**: Works with any language, or any framework.
- 🚀 **README.com Integration**: Deploy directly to README.com documentation platform.
- 🛠️ **CLI & Programmatic**: Use as CLI tool or import into your code.

## Prerequisites

1. **Claude Code CLI**: Install the Claude Code CLI tool
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Anthropic API Key**: 
   ```text
   Get your API key from https://console.anthropic.com/
   ```

3. **README.com API Key** (optional):
   ```text
   Get your API key from https://dash.readme.com/{your-project}/api-key
   ```

4. **Environment Variables**:
   ```bash
   export ANTHROPIC_API_KEY=your-key-here
   export README_API_KEY=your-readme-key-here  # (Optional).
   ```

## Installation

Install as a dev dependency:
```bash
npm install --save-dev @callsy/ai-openapi
```

Or install globally if you plan to use it as a CLI tool across multiple projects:
```bash
npm install -g @callsy/ai-openapi
```

## Quick Start

### 1. Create Base OpenAPI Spec

- Create `documentation` folder in the root of your application codebase.
- Create base api spec file `documentation/base.json`:

```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "Your API",
    "version": "1.0.0",
    "description": "API documentation"
  },
  "servers": [
    {
      "url": "https://api.example.com",
      "description": "Production"
    }
  ],
  "components": {
    "securitySchemes": {
      "ApiToken": {
        "type": "http",
        "scheme": "bearer"
      }
    },
    "schemas": {}
  },
  "paths": {}
}
```

### 2. Create Instructions File

Create a single instruction file that guides the AI on how to analyze your codebase:

**File**: `documentation/instructions.txt`

This file should include:
- **Application Context**: Explain what your application does, tech stack, and codebase structure.
- **Endpoint Location**: Clear instructions on where to find API endpoints.
- **Constraints**: Rules the AI must follow (e.g., "never modify application code").

**Example**:
```text
## Application Context

This is a Node.js REST API built with Express.js.
- API routes are in `src/routes/api/` directory.
- Each file exports Express router with endpoints.
- TypeScript is used for type definitions.

## Finding Endpoints

Search for all files in `src/routes/api/*.ts`.
- Each file represents a route group (e.g., users.ts, auth.ts).
- Extract HTTP methods (GET, POST, PUT, DELETE).
- Identify request/response types from TypeScript interfaces.

## Constraints

ONLY READ FROM:
- Source files in `src/routes/api/`.
- Type definitions in `src/types/`.

ONLY WRITE TO:
- `documentation/schemas/*.json`.
- `documentation/routes/*.json`.

NEVER modify application source code.
```

## CLI Commands

**Important**: You should run all commands from the root directory of your application for best experience.

```bash
# Generate OpenAPI docs using AI.
npx ai-openapi generate

# Build final OpenAPI spec.
npx ai-openapi build

# Validate OpenAPI spec.
npx ai-openapi validate

# Deploy to README.com.
npx ai-openapi deploy

# Clean up generated files.
npx ai-openapi cleanup

# Run complete workflow.
npx ai-openapi full
```

### CLI Options

All commands support these options:

```bash
--doc-dir <path>             # Path to documentation folder (default: ./documentation).
--anthropic-api-key <key>    # Anthropic API key (default: ANTHROPIC_API_KEY env var).
--readme-api-key <key>       # README.com API key (default: README_API_KEY env var).
```

**Example with options**:
```bash
npx ai-openapi generate --doc-dir ./docs
```

## Programmatic Usage

```javascript
// Import functions.
const { generate, build, validate, deploy, cleanup, full } = require('@callsy/ai-openapi')

// Run individual commands.
await generate({
  docDir: './documentation'
})

// Or run the full workflow.
await full({
  docDir: './documentation'
})
```

## How It Works

1. **Instruction Loading**: Reads your custom instructions from `additionalInstructions.txt`.
2. **Template Processing**: Handlebars renders the AI prompt with your codebase-specific guidance.
3. **AI Analysis**: Claude AI agent analyzes your API route files following your instructions.
4. **Schema Extraction**: Extracts types, validation logic, and response structures from code.
5. **Route Mapping**: Maps discovered routes to OpenAPI paths with proper HTTP methods.
6. **Documentation Generation**: Creates/updates schema and route JSON files in `documentation/`.
7. **Building**: Merges base spec with generated schemas and routes into final `openapi.json`.
8. **Validation**: Validates the final OpenAPI spec against OpenAPI 3.0 standards.
9. **Self-Correction**: If validation fails, AI automatically fixes issues (max 5 retries).


## Cost

Typical costs for documentation generation:
- Small API (5-10 endpoints): ~$0.10-0.30
- Medium API (20-50 endpoints): ~$0.50-1.00
- Large API (100+ endpoints): ~$2.00-5.00

Cost depends on code complexity and number of endpoints.

## Troubleshooting

- "ANTHROPIC_API_KEY is required"
```text
Set your API key: `export ANTHROPIC_API_KEY=your-key-here`
```

- "Claude Code process exited with code 127"
```bash
# Ensure Claude Code CLI is installed and in PATH.
npm install -g @anthropic-ai/claude-code
which claude
```

- Validation failures
```text
The AI will automatically retry up to 5 times. Check the console output for specific errors.
```

- "Additional instructions file not found"
```text
Ensure your instruction file exists at the correct path:
- Default: ./documentation/additionalInstructions.txt.
- Or specify custom path with --additional-instructions flag.
```

## License

ISC

## Contributing

Issues and PRs welcome at https://github.com/CallsyAI/ai-openapi.

## Author

Laimonas Sutkus - [@callsy.ai](https://callsy.ai).
