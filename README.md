# @callsy/ai-openapi

🤖 Automatically generate OpenAPI 3.0 documentation from your code using AI.

This package uses Claude AI (via Claude Code agent) to analyze your API routes and generate comprehensive OpenAPI specifications with schemas, endpoints, and error responses.

## Features

- ✨ **AI-Powered**: Uses Claude AI to understand your code and generate accurate documentation
- 📝 **Complete Workflow**: Generate, build, validate, and deploy OpenAPI specs
- 🔄 **Self-Verifying**: AI validates its own output and retries on errors
- 🎯 **Framework Agnostic**: Works with Remix, Express, or any framework via templates
- 🚀 **README.com Integration**: Deploy directly to README.com documentation platform
- 🛠️ **CLI & Programmatic**: Use as CLI tool or import into your code

## Prerequisites

1. **Claude Code CLI**: Install the Claude Code CLI tool
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Anthropic API Key**: Get your API key from https://console.anthropic.com/

3. **README.com API Key** (optional, only for deployment): Get your API key from https://dash.readme.com/{your-project}/api-key

4. **Environment Variables**:
   ```bash
   export ANTHROPIC_API_KEY=your-key-here
   export README_API_KEY=your-readme-key-here  # Optional, for deployment
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

Create `documentation/base.json`:

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

### 2. Create Template Variable Files

The AI prompt uses three customizable sections. Create files for your framework:

**`documentation/applicationExplanation.txt`:**
```
This is a web application with API endpoints in `app/routes/` prefixed with `api.`
```

**`documentation/endpointGuidance.txt`:**
```
Search for all API route files in the application.

For each API route, understand that:
- Each file represents one or more endpoints
- Extract HTTP methods, request/response schemas, and parameters
```

**`documentation/additionalConstraints.txt`:**
```
**READ FROM**:
- API route source files

**WRITE TO**:
- `documentation/schemas/*.json`
- `documentation/routes/*.json`
```

### 3. Generate Documentation

**Important**: Run commands from the root directory of your application.

```bash
npx ai-openapi generate
```

This will:
- Read your template files
- Analyze your API routes
- Generate schema files in `documentation/schemas/`
- Generate route files in `documentation/routes/`
- Build and validate the final OpenAPI spec

## CLI Commands

**Important**: You should run all commands from the root directory of your application for best experience.

```bash
# Generate OpenAPI docs using AI
npx ai-openapi generate

# Build final OpenAPI spec
npx ai-openapi build

# Validate OpenAPI spec
npx ai-openapi validate

# Deploy to README.com
npx ai-openapi deploy

# Clean up generated files
npx ai-openapi cleanup

# Run complete workflow
npx ai-openapi full
```

## Programmatic Usage

```javascript
const { generate } = require('@callsy/ai-openapi')

// Generate documentation with custom template variables
await generate({
  docDir: './documentation',
  anthropicApiKey: 'sk-...',  // Optional, uses ANTHROPIC_API_KEY env var if not provided
  applicationExplanation: './documentation/applicationExplanation.txt',
  endpointGuidance: './documentation/endpointGuidance.txt',
  additionalConstraints: './documentation/additionalConstraints.txt'
})
```

## How It Works

1. **Template Processing**: Handlebars renders the AI prompt with your framework-specific guidance
2. **AI Analysis**: Claude AI reads your API route files
3. **Schema Extraction**: Extracts types, validation logic, and response structures
4. **Route Mapping**: Maps routes to OpenAPI paths
5. **Documentation Generation**: Creates schema and route JSON files
6. **Validation**: Builds and validates the final OpenAPI spec
7. **Self-Correction**: If validation fails, AI automatically fixes issues (max 5 retries)

## Cost

Typical costs for documentation generation:
- Small API (5-10 endpoints): ~$0.10-0.30
- Medium API (20-50 endpoints): ~$0.50-1.00
- Large API (100+ endpoints): ~$2.00-5.00

Cost depends on code complexity and number of endpoints.

## Troubleshooting

### "ANTHROPIC_API_KEY is required"
Set your API key: `export ANTHROPIC_API_KEY=your-key-here`

### "Claude Code process exited with code 127"
Ensure Claude Code CLI is installed and in PATH:
```bash
npm install -g @anthropic-ai/claude-code
which claude
```

### Validation failures
The AI will automatically retry up to 5 times. Check the console output for specific errors.

### Template variables not working
Ensure your template files exist and paths are correct.

## License

ISC

## Contributing

Issues and PRs welcome at https://github.com/LaimonasCallsyAi/AiOpenApi

## Author

Laimonas Sutkus - [@callsy.ai](https://callsy.ai)
