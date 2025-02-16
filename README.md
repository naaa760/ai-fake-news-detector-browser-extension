# TruthGuard AI - Fake News Detection Extension

A browser extension that uses AI to detect fake news and verify claims in real-time.

## Features

- Real-time content analysis using ONNX models
- Integration with fact-checking APIs (Snopes, Reuters)
- Visual trust score indicator
- Detailed fact-check reports
- Performance monitoring
- Privacy-focused design

## Getting Started

```bash
# Install dependencies
npm install

# Download AI models
npm run download-models

# Run development server
npm run dev

# Build extension
npm run build:extension
```

## Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## Development

The extension is built with:

- Next.js for the popup UI
- ONNX Runtime for AI inference
- TypeScript for type safety
- Tailwind CSS for styling
- Jest and Playwright for testing

## Security

- API keys are encrypted in storage
- Content is sanitized before processing
- Rate limiting on API calls
- XSS prevention measures
- Regular security audits

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and ensure CI passes
4. Submit a pull request

## License

MIT License - See LICENSE file for details
