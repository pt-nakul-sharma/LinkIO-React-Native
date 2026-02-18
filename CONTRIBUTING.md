# Contributing to LinkIO React Native

First off, thank you for considering contributing to LinkIO React Native! It's people like you that make LinkIO such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if relevant**
- **Include your environment details**: React Native version, iOS/Android version, device model

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the use case**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/LinkIO-React-Native.git
cd LinkIO-React-Native

# Install dependencies
npm install

# Run linter
npm run lint

# Run TypeScript check
npm run typescript

# Build the library
npm run prepare
```

## Project Structure

```
LinkIO-React-Native/
├── src/                    # TypeScript source files
│   └── index.tsx          # Main module entry point
├── android/               # Android native module
│   ├── build.gradle
│   └── src/
├── ios/                   # iOS native module
│   ├── LinkIOReactNative.swift
│   ├── LinkIOReactNative.m
│   └── LinkIOReactNative.podspec
├── example/               # Example React Native app
└── lib/                   # Built output (generated)
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Follow the existing code style
- Add types for all public APIs
- Document public functions with JSDoc comments

### Native Code

- **iOS**: Use Swift with proper Objective-C bridging
- **Android**: Use Kotlin with proper Java interop
- Follow platform-specific best practices
- Ensure backward compatibility

### Commits

- Use clear and meaningful commit messages
- Follow conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `test:` for test changes
  - `chore:` for maintenance tasks

Example:
```
feat: add support for custom URL schemes
fix: resolve crash on Android API 21
docs: update installation instructions
```

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Include both unit tests and integration tests where applicable

## Release Process

Releases are handled by maintainers:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a git tag
4. Push to GitHub
5. Publish to npm

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
