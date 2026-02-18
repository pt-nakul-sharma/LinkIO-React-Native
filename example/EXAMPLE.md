# LinkIO React Native Example App

This example app demonstrates all the features of the LinkIO React Native SDK.

## Features Demonstrated

- ✅ SDK Configuration
- ✅ Deep Link Listening
- ✅ Referral Tracking
- ✅ Pending Link Checking
- ✅ Manual URL Handling
- ✅ Auto-fill Referral Codes

## Setup

### 1. Install Dependencies

```bash
cd example
npm install
```

### 2. iOS Setup

```bash
cd ios
pod install
cd ..
```

#### Configure Associated Domains

1. Open `ios/LinkIOExample.xcworkspace` in Xcode
2. Select your project target
3. Go to **Signing & Capabilities**
4. Click **+ Capability** and add **Associated Domains**
5. Add your domain: `applinks:yourdomain.com`

#### Update AppDelegate (if needed)

**Objective-C (AppDelegate.m/mm)**:

```objc
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application
   continueUserActivity:(nonnull NSUserActivity *)userActivity
   restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}
```

**Swift (AppDelegate.swift)**:

```swift
import UIKit
import React

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?
  var bridge: RCTBridge!

  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Initialize React Native bridge
    bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
    let rootView = RCTRootView(bridge: bridge, moduleName: "LinkIOExample", initialProperties: nil)

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    window = UIWindow(frame: UIScreen.main.bounds)
    window?.rootViewController = rootViewController
    window?.makeKeyAndVisible()

    return true
  }

  // MARK: - Deep Linking Support

  // Handle custom URL schemes (e.g., linkio://ref/ABC123)
  func application(_ app: UIApplication,
                   open url: URL,
                   options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return RCTLinkingManager.application(app, open: url, options: options)
  }

  // Handle Universal Links (e.g., https://yourdomain.com/ref/ABC123)
  func application(_ application: UIApplication,
                   continue userActivity: NSUserActivity,
                   restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return RCTLinkingManager.application(application,
                                        continue: userActivity,
                                        restorationHandler: restorationHandler)
  }
}

// MARK: - RCTBridgeDelegate
extension AppDelegate: RCTBridgeDelegate {
  func sourceURL(for bridge: RCTBridge!) -> URL! {
    #if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
```

### 3. Android Setup

#### Update AndroidManifest.xml

Add intent filters to your MainActivity:

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">

  <!-- Deep link intent filter -->
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
      android:scheme="https"
      android:host="yourdomain.com" />
  </intent-filter>

  <!-- Custom URL scheme (optional) -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="linkio" />
  </intent-filter>
</activity>
```

### 4. Update Configuration

In `App.tsx`, update the configuration with your domain:

```typescript
LinkIO.configure({
  domain: "yourdomain.com", // Your domain
  backendURL: "https://api.yourdomain.com", // Your backend API
  autoCheckPendingLinks: true,
});
```

## Run the Example

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

## Testing Deep Links

### iOS Simulator

```bash
xcrun simctl openurl booted "https://yourdomain.com/ref/TEST123?campaign=summer"
```

### Android Emulator

```bash
adb shell am start -W -a android.intent.action.VIEW -d "https://yourdomain.com/ref/TEST123?campaign=summer" com.linkioexample
```

### Physical Device

1. Send the deep link URL via email, message, or notes
2. Tap the link on your device
3. The app should open and display the deep link data

## Testing Deferred Deep Links

Deferred deep links work when a user clicks a link before installing the app:

1. Uninstall the app from device
2. Click a deep link (e.g., from a web page or email)
3. Install and open the app
4. The deep link should be delivered with `isDeferred: true`

## API Usage Examples

### Configure SDK

```typescript
useEffect(() => {
  LinkIO.configure({
    domain: "yourdomain.com",
    backendURL: "https://api.yourdomain.com",
    autoCheckPendingLinks: true,
  });
}, []);
```

### Listen for Deep Links

```typescript
useEffect(() => {
  LinkIO.setDeepLinkListener((deepLink) => {
    console.log("Deep link received:", deepLink);

    // Handle referral code
    if (deepLink.params.referralCode) {
      setReferralCode(deepLink.params.referralCode);
    }

    // Handle navigation
    if (deepLink.params.screen) {
      navigation.navigate(deepLink.params.screen);
    }
  });

  return () => {
    LinkIO.cleanup();
  };
}, []);
```

### Track Referrals

```typescript
const handleSignup = async (userId: string) => {
  if (referralCode) {
    await LinkIO.trackReferral(referralCode, userId, {
      source: "mobile-app",
      campaign: "spring-2024",
    });
  }
};
```

### Manual Link Checking

```typescript
const checkForDeepLinks = async () => {
  await LinkIO.checkPendingLink();
};
```

## Common Use Cases

### 1. Referral System

```typescript
// Auto-fill referral code from deep link
LinkIO.setDeepLinkListener((deepLink) => {
  if (deepLink.params.referralCode) {
    setReferralCode(deepLink.params.referralCode);
    navigation.navigate("Signup", {
      referralCode: deepLink.params.referralCode,
    });
  }
});

// Track when user signs up
const handleSignup = async (userData) => {
  const userId = await createUser(userData);

  if (referralCode) {
    await LinkIO.trackReferral(referralCode, userId);
  }
};
```

### 2. Deep Link Navigation

```typescript
LinkIO.setDeepLinkListener((deepLink) => {
  const { screen, productId, category } = deepLink.params;

  if (screen === "product" && productId) {
    navigation.navigate("ProductDetails", { id: productId });
  } else if (screen === "category" && category) {
    navigation.navigate("CategoryView", { category });
  }
});
```

### 3. Campaign Tracking

```typescript
LinkIO.setDeepLinkListener((deepLink) => {
  const { campaign, source, medium } = deepLink.params;

  analytics.track("campaign_click", {
    campaign,
    source,
    medium,
    isDeferred: deepLink.isDeferred,
  });
});
```

## Troubleshooting

### Deep links not working on iOS

- Ensure Associated Domains are configured correctly
- Verify your domain has a proper `apple-app-site-association` file
- Check that `RCTLinkingManager` is imported in AppDelegate

### Deep links not working on Android

- Ensure intent filter has `android:autoVerify="true"`
- Verify your domain has a proper `.well-known/assetlinks.json` file
- Test with custom URL scheme first (e.g., `linkio://`)

### Module not found errors

```bash
cd example
rm -rf node_modules package-lock.json
npm install
cd ..
npm run prepare
cd example
npm install
```

## Learn More

- [LinkIO Documentation](https://github.com/yourusername/LinkIO-React-Native)
- [React Native Linking](https://reactnative.dev/docs/linking)
- [iOS Universal Links](https://developer.apple.com/ios/universal-links/)
- [Android App Links](https://developer.android.com/training/app-links)
