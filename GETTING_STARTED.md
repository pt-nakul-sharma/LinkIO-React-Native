# Getting Started with LinkIO React Native

This guide will help you set up and publish your LinkIO React Native package.

## 📦 What's Included

Your package is now complete with:

### ✅ Core Files
- `src/index.tsx` - Main TypeScript implementation
- `ios/` - Native iOS module (Swift)
- `android/` - Native Android module (Kotlin)
- `package.json` - Package configuration
- `tsconfig.json` & `tsconfig.build.json` - TypeScript configs

### ✅ Configuration
- `.eslintrc.js` - ESLint configuration
- `.eslintignore` - ESLint ignore rules
- `jest.config.js` - Jest test configuration
- `jest.setup.js` - Jest setup/mocks
- `.npmignore` - npm publish filters
- `.gitignore` - Git ignore rules

### ✅ Testing
- `src/__tests__/index.test.tsx` - Unit tests
- Test coverage configured

### ✅ Documentation
- `README.md` - Main documentation with usage examples
- `API.md` - Complete API reference
- `CHANGELOG.md` - Version history
- `CONTRIBUTING.md` - Contribution guidelines
- `PUBLISHING.md` - Publishing guide
- `LICENSE` - MIT license

### ✅ Example App
- `example/App.tsx` - Full featured demo app
- `example/package.json` - Example dependencies
- `example/EXAMPLE.md` - Example documentation

### ✅ CI/CD
- `.github/workflows/ci.yml` - Continuous integration
- `.github/workflows/publish.yml` - Automated publishing

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Package

```bash
npm run prepare
```

This compiles TypeScript and generates:
- CommonJS build (`lib/commonjs/`)
- ES Module build (`lib/module/`)
- TypeScript definitions (`lib/typescript/`)

### 3. Run Tests

```bash
npm test
```

### 4. Run Linter

```bash
npm run lint
```

### 5. TypeScript Check

```bash
npm run typescript
```

## 📝 Before Publishing

### Update Package Information

1. **package.json**:
   - Replace `yourusername` with your GitHub username
   - Update `author` field with your name and email
   - Verify `version` (1.0.0 for first release)

2. **README.md**:
   - Replace all `yourusername` with your GitHub username
   - Update `Your Name` with your actual name

3. **Native Code**:
   - Update `ios/LinkIOReactNative.podspec` repository URL
   - Update `android/build.gradle` dependency URLs

4. **CHANGELOG.md**:
   - Update release date

### Test the Build

```bash
# Create a tarball
npm pack

# Install in a test project
cd /path/to/test-project
npm install /path/to/linkio-react-native-1.0.0.tgz
```

## 🌐 Publishing to GitHub

### 1. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: LinkIO React Native SDK v1.0.0"
```

### 2. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/LinkIO-React-Native.git
git branch -M main
git push -u origin main
```

### 3. Create Release

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

Then create a GitHub release via the web interface.

## 📦 Publishing to npm

### 1. Login to npm

```bash
npm login
```

### 2. Verify Package Contents

```bash
npm pack --dry-run
```

### 3. Publish

```bash
npm publish --access public
```

### 4. Verify

Visit: https://www.npmjs.com/package/@linkio/react-native

## 🔧 Development Workflow

### Making Changes

```bash
# 1. Make your changes
# 2. Update tests
npm test

# 3. Build
npm run prepare

# 4. Commit
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Releasing New Version

```bash
# Update version (patch: 1.0.0 → 1.0.1)
npm version patch

# Update CHANGELOG.md with changes

# Push with tags
git push origin main --tags

# Publish to npm
npm publish
```

## 📱 Testing the Example App

### iOS

```bash
cd example
npm install
cd ios && pod install && cd ..
npm run ios
```

### Android

```bash
cd example
npm install
npm run android
```

## 🐛 Common Issues

### TypeScript Errors in Tests

The lint errors you see in test files are expected before installing dependencies. They'll resolve after:

```bash
npm install
```

### Build Fails

```bash
# Clean build
rm -rf lib node_modules
npm install
npm run prepare
```

### Pod Install Fails

```bash
cd example/ios
pod repo update
pod install
```

## 📚 Next Steps

1. **Customize the Package**:
   - Update domain names in examples
   - Add your backend API endpoints
   - Customize native SDK dependencies

2. **Add Features**:
   - Enhance TypeScript types
   - Add more test coverage
   - Improve error handling

3. **Documentation**:
   - Add usage videos/GIFs
   - Create blog posts
   - Write integration guides

4. **Community**:
   - Set up GitHub Discussions
   - Create Discord/Slack channel
   - Engage with users

## 🎯 Checklist

Before publishing v1.0.0:

- [ ] Dependencies installed (`npm install`)
- [ ] Tests pass (`npm test`)
- [ ] Linter passes (`npm run lint`)
- [ ] TypeScript check passes (`npm run typescript`)
- [ ] Build succeeds (`npm run prepare`)
- [ ] package.json updated with your info
- [ ] README updated with your info
- [ ] Native code updated with your repos
- [ ] Example app tested on iOS
- [ ] Example app tested on Android
- [ ] Documentation reviewed
- [ ] CHANGELOG updated
- [ ] Git repository initialized
- [ ] Pushed to GitHub
- [ ] npm account ready
- [ ] Published to npm
- [ ] GitHub release created

## 💡 Tips

### Scoped vs Unscoped Packages

**Scoped** (Recommended): `@linkio/react-native`
- Namespaced under your username/org
- Easier to identify ownership
- Can be private or public

**Unscoped**: `linkio-react-native`
- Global namespace
- Must be unique across all npm
- Always public

### Semantic Versioning

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Marketing Your Package

1. **npm**: Ensure good README with badges
2. **GitHub**: Add topics, good description
3. **Social Media**: Tweet about launch
4. **Dev.to/Medium**: Write detailed blog post
5. **Reddit**: Post in r/reactnative
6. **Product Hunt**: Launch product page

## 🔗 Resources

- [npm Publishing Docs](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [React Native Library Guide](https://reactnative.dev/docs/native-modules-setup)
- [GitHub Packages](https://docs.github.com/en/packages)
- [Semantic Versioning](https://semver.org/)

## 📞 Need Help?

- Check [PUBLISHING.md](./PUBLISHING.md) for detailed publishing steps
- Review [API.md](./API.md) for API documentation
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
- Read [example/EXAMPLE.md](./example/EXAMPLE.md) for usage examples

---

**Ready to publish?** Follow the steps in [PUBLISHING.md](./PUBLISHING.md) for a complete guide! 🚀
