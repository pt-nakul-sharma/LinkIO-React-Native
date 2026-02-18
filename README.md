# @linkio/react-native

[![npm version](https://img.shields.io/npm/v/@linkio/react-native.svg)](https://www.npmjs.com/package/@linkio/react-native)
[![npm downloads](https://img.shields.io/npm/dm/@linkio/react-native.svg)](https://www.npmjs.com/package/@linkio/react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/yourusername/LinkIO-React-Native/workflows/CI/badge.svg)](https://github.com/yourusername/LinkIO-React-Native/actions)

React Native bridge for LinkIO deep linking SDK. **Self-hosted alternative to Branch.io**.

## ✨ Features

- 🔗 **Deep Linking** - Universal Links (iOS) and App Links (Android)
- 🎯 **Deferred Deep Linking** - Attribution for users who install after clicking
- 📊 **Referral Tracking** - Track conversions with custom metadata
- 🛠 **TypeScript** - Full type definitions included
- 🔒 **Privacy-Focused** - Self-hosted, you own your data
- ⚡ **Lightweight** - Minimal dependencies
- 📱 **Native Performance** - Built with Swift (iOS) and Kotlin (Android)

## � Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Deep Link Handling](#-deep-link-handling)
- [Requirements](#️-requirements)
- [Example App](#-example-app)
- [Documentation](#-documentation)
- [Related Packages](#-related-packages)
- [Contributing](#-contributing)
- [License](#-license)

## � Installation

```bash
npm install @linkio/react-native
# or
yarn add @linkio/react-native
```

### iOS Setup

```bash
cd ios && pod install
```

Add associated domains in Xcode:

1. Target → Signing & Capabilities → Add "Associated Domains"
2. Add: `applinks:yourdomain.com`

### Android Setup

No additional setup required. The package will automatically link.

## 📱 Quick Start

```typescript
import LinkIO from '@linkio/react-native';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Configure LinkIO
    LinkIO.configure({
      domain: 'yourdomain.com',
      backendURL: 'https://yourdomain.com',
      autoCheckPendingLinks: true
    });

    // Set deep link listener
    LinkIO.setDeepLinkListener((deepLink) => {
      console.log('Deep link received:', deepLink);

      if (deepLink.params.referralCode) {
        // Auto-fill referral code
        navigation.navigate('Signup', {
          referralCode: deepLink.params.referralCode
        });
      }
    });

    return () => {
      LinkIO.cleanup();
    };
  }, []);

  return <YourApp />;
}
```

## 📚 API Reference

### configure(config)

Initialize LinkIO with configuration.

```typescript
LinkIO.configure({
  domain: "yourdomain.com",
  backendURL: "https://yourdomain.com",
  autoCheckPendingLinks: true, // Optional, default: true
});
```

### setDeepLinkListener(callback)

Listen for deep links.

```typescript
LinkIO.setDeepLinkListener((deepLink) => {
  console.log("URL:", deepLink.url);
  console.log("Params:", deepLink.params);
  console.log("Is Deferred:", deepLink.isDeferred);
});
```

### trackReferral(referralCode, userId, metadata?)

Track a referral.

```typescript
await LinkIO.trackReferral(
  "ABC123",
  "user123",
  { source: "react-native" }, // Optional metadata
);
```

### checkPendingLink()

Manually check for pending/deferred deep links.

```typescript
await LinkIO.checkPendingLink();
```

### cleanup()

Clean up listeners (call in unmount).

```typescript
LinkIO.cleanup();
```

## 🔗 Deep Link Handling

### iOS (AppDelegate.m)

```objective-c
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}
```

### Android (AndroidManifest.xml)

```xml
<activity android:name=".MainActivity">
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
      android:scheme="https"
      android:host="yourdomain.com" />
  </intent-filter>
</activity>
```

## 📱 Example App

A complete example app is included demonstrating all features:

```bash
cd example
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

See [example/EXAMPLE.md](./example/EXAMPLE.md) for detailed instructions.

## 📖 Documentation

- **[API Reference](./API.md)** - Complete API documentation
- **[Example App](./example/EXAMPLE.md)** - Usage examples and integration guide
- **[Publishing Guide](./PUBLISHING.md)** - How to publish this package
- **[Contributing](./CONTRIBUTING.md)** - Contribution guidelines
- **[Changelog](./CHANGELOG.md)** - Version history

## 🔗 Related Packages

- **Backend**: [LinkIO-Backend](https://github.com/yourusername/LinkIO-Backend)
- **iOS Native**: [LinkIO-iOS](https://github.com/yourusername/LinkIO-iOS)
- **Android Native**: [LinkIO-Android](https://github.com/yourusername/LinkIO-Android)

## 🛠️ Requirements

- React Native >= 0.60
- iOS >= 13.0
- Android >= API 21

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/LinkIO-React-Native.git
cd LinkIO-React-Native

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run prepare
```

## 💬 Support

- 📖 [Documentation](./API.md)
- 🐛 [Report a Bug](https://github.com/yourusername/LinkIO-React-Native/issues)
- 💡 [Request a Feature](https://github.com/yourusername/LinkIO-React-Native/issues)
- 💬 [Discussions](https://github.com/yourusername/LinkIO-React-Native/discussions)

## 📄 License

MIT © [Your Name]

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Note**: Replace `yourusername` and `Your Name` with your actual GitHub username and name before publishing.
