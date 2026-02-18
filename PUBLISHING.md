# Publishing Guide for LinkIO React Native

Step-by-step guide to publish this package to npm and GitHub.

## Prerequisites

Before publishing, ensure you have:

- [x] Node.js 18+ installed
- [x] npm account (create at [npmjs.com](https://www.npmjs.com))
- [x] GitHub account
- [x] Git installed and configured

## Step 1: Update Package Information

### 1.1 Update package.json

Update the following fields in `package.json`:

```json
{
  "name": "@linkio/react-native",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/LinkIO-React-Native.git"
  },
  "author": "Your Name <your.email@example.com>",
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/LinkIO-React-Native/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/LinkIO-React-Native#readme"
}
```

### 1.2 Update README.md

Update placeholder URLs in README.md:
- Replace `yourusername` with your GitHub username
- Update domain examples if needed
- Add your contact information

### 1.3 Update Native Code

**iOS Podspec** (`ios/LinkIOReactNative.podspec`):
```ruby
s.source = { :git => "https://github.com/YOUR_USERNAME/LinkIO-React-Native.git", :tag => "#{s.version}" }
```

**Android build.gradle** (`android/build.gradle`):
```gradle
implementation 'com.github.YOUR_USERNAME:LinkIO-Android:1.0.0'
```

## Step 2: Prepare for Publishing

### 2.1 Install Dependencies

```bash
npm install
```

### 2.2 Run Tests

```bash
npm test
```

### 2.3 Run Linter

```bash
npm run lint
```

### 2.4 TypeScript Check

```bash
npm run typescript
```

### 2.5 Build the Package

```bash
npm run prepare
```

This creates:
- `lib/commonjs/` - CommonJS build
- `lib/module/` - ES Module build
- `lib/typescript/` - TypeScript definitions

### 2.6 Verify Build Output

```bash
ls -la lib/
```

Should see:
```
lib/
├── commonjs/
│   └── index.js
├── module/
│   └── index.js
└── typescript/
    └── index.d.ts
```

## Step 3: Initialize Git Repository

### 3.1 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name: `LinkIO-React-Native`
3. Description: "React Native bridge for LinkIO deep linking SDK"
4. Visibility: Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 3.2 Initialize Local Repository

```bash
git init
git add .
git commit -m "Initial commit: LinkIO React Native SDK v1.0.0"
```

### 3.3 Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/LinkIO-React-Native.git
git push -u origin main
```

## Step 4: Publish to npm

### 4.1 Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### 4.2 Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

Review the file list to ensure:
- ✅ `src/` is included
- ✅ `lib/` is included
- ✅ `android/` is included
- ✅ `ios/` is included
- ✅ `*.podspec` is included
- ❌ `node_modules/` is excluded
- ❌ `.github/` is excluded
- ❌ `example/` is excluded

### 4.3 Test Package Locally

Create a test tarball:

```bash
npm pack
```

This creates `linkio-react-native-1.0.0.tgz`

Test in another project:

```bash
npm install /path/to/linkio-react-native-1.0.0.tgz
```

### 4.4 Publish to npm

For scoped packages (recommended):

```bash
npm publish --access public
```

For unscoped packages:

```bash
npm publish
```

### 4.5 Verify Publication

Check your package:
- Visit: `https://www.npmjs.com/package/@linkio/react-native`
- Verify version, README, and files

## Step 5: Create GitHub Release

### 5.1 Create a Git Tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### 5.2 Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Draft a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Description:

```markdown
# 🎉 Initial Release

First stable release of LinkIO React Native SDK!

## Features

- ✅ Deep linking support for iOS and Android
- ✅ Universal links and App Links handling
- ✅ Deferred deep linking
- ✅ Referral tracking
- ✅ TypeScript support
- ✅ Complete documentation

## Installation

\`\`\`bash
npm install @linkio/react-native
\`\`\`

## Documentation

- [Quick Start](https://github.com/YOUR_USERNAME/LinkIO-React-Native#quick-start)
- [API Reference](https://github.com/YOUR_USERNAME/LinkIO-React-Native/blob/main/API.md)
- [Example App](https://github.com/YOUR_USERNAME/LinkIO-React-Native/tree/main/example)

## Requirements

- React Native >= 0.60
- iOS >= 13.0
- Android >= API 21
```

6. Click "Publish release"

## Step 6: Set Up GitHub Actions

The CI/CD workflows are already configured in `.github/workflows/`:

### 6.1 Enable GitHub Actions

GitHub Actions should be enabled by default. Verify:
1. Go to repository → Settings → Actions → General
2. Ensure "Allow all actions and reusable workflows" is selected

### 6.2 Add npm Token (for automated publishing)

1. Generate npm token:
   ```bash
   npm token create
   ```
2. Copy the token
3. Go to GitHub repository → Settings → Secrets and variables → Actions
4. Click "New repository secret"
5. Name: `NPM_TOKEN`
6. Value: Paste your npm token
7. Click "Add secret"

Now GitHub will automatically publish to npm when you create a release!

## Step 7: Post-Publishing

### 7.1 Update README Badges

Verify badges are working:
- npm version badge
- License badge
- CI status badge (if using GitHub Actions)

### 7.2 Announce Release

Share on:
- Twitter/X
- Reddit (r/reactnative)
- Dev.to
- Your blog

### 7.3 Monitor Issues

- Watch for GitHub issues
- Monitor npm download stats
- Respond to community feedback

## Subsequent Releases

For future versions:

### 1. Update Version

Use semantic versioning:

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

### 2. Update CHANGELOG.md

Add new version section with changes.

### 3. Commit and Push

```bash
git push origin main --tags
```

### 4. Publish

```bash
npm publish
```

### 5. Create GitHub Release

Follow Step 5 with new version number.

## Troubleshooting

### "Package name already exists"

If `@linkio/react-native` is taken:
1. Choose a different name (e.g., `@yourname/linkio-react-native`)
2. Update `package.json` name field
3. Update README and documentation

### "Permission denied" on npm publish

```bash
npm login
npm whoami  # Verify logged in
```

### Build Errors

```bash
# Clean and rebuild
rm -rf lib node_modules
npm install
npm run prepare
```

### Git Push Rejected

```bash
# If remote has changes
git pull --rebase origin main
git push origin main
```

## Checklist Before Publishing

- [ ] All tests pass (`npm test`)
- [ ] Linter passes (`npm run lint`)
- [ ] TypeScript check passes (`npm run typescript`)
- [ ] Build succeeds (`npm run prepare`)
- [ ] README updated with correct URLs
- [ ] package.json has correct repository/author
- [ ] CHANGELOG.md is up to date
- [ ] Version number is correct
- [ ] Native dependencies documented
- [ ] Example app works
- [ ] Documentation is complete

## Best Practices

1. **Semantic Versioning**: Follow semver strictly
2. **Changelog**: Keep detailed changelog
3. **Breaking Changes**: Document in CHANGELOG and release notes
4. **Deprecations**: Warn before removing features
5. **Testing**: Maintain high test coverage
6. **Documentation**: Keep docs in sync with code
7. **Examples**: Update example app with new features
8. **Community**: Respond to issues promptly

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [React Native Library Guide](https://reactnative.dev/docs/native-modules-setup)

## Support

Need help? Check:
- [GitHub Discussions](https://github.com/YOUR_USERNAME/LinkIO-React-Native/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- npm community forums

---

Good luck with your publish! 🚀
