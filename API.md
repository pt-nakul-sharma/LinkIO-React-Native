# LinkIO React Native API Reference

Complete API documentation for the LinkIO React Native SDK.

## Installation

```bash
npm install @linkio/react-native
```

## Table of Contents

- [Configuration](#configuration)
- [Deep Link Handling](#deep-link-handling)
- [Referral Tracking](#referral-tracking)
- [Types](#types)
- [Error Handling](#error-handling)

## Configuration

### `configure(config: LinkIOConfig): void`

Initialize the LinkIO SDK with your configuration. Must be called before using any other SDK methods.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `LinkIOConfig` | Yes | Configuration object |

#### LinkIOConfig

```typescript
interface LinkIOConfig {
  domain: string;                    // Your domain (e.g., 'yourdomain.com')
  backendURL: string;                // Your backend API URL
  autoCheckPendingLinks?: boolean;   // Auto-check on launch (default: true)
}
```

#### Example

```typescript
import LinkIO from '@linkio/react-native';

LinkIO.configure({
  domain: 'yourdomain.com',
  backendURL: 'https://api.yourdomain.com',
  autoCheckPendingLinks: true
});
```

#### Notes

- Call this method once during app initialization
- Automatically sets up native event listeners
- If `autoCheckPendingLinks` is true, checks for deferred deep links on first launch

---

## Deep Link Handling

### `setDeepLinkListener(listener: DeepLinkListener): void`

Set a callback function to receive deep link events.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listener` | `DeepLinkListener` | Yes | Callback function |

#### DeepLinkListener

```typescript
type DeepLinkListener = (deepLink: DeepLinkData) => void;
```

#### DeepLinkData

```typescript
interface DeepLinkData {
  url: string;                      // Full deep link URL
  params: Record<string, string>;   // Parsed query parameters
  isDeferred: boolean;              // True if deferred deep link
}
```

#### Example

```typescript
LinkIO.setDeepLinkListener((deepLink) => {
  console.log('Deep link URL:', deepLink.url);
  console.log('Parameters:', deepLink.params);
  console.log('Is deferred:', deepLink.isDeferred);

  // Handle referral code
  if (deepLink.params.referralCode) {
    navigation.navigate('Signup', {
      referralCode: deepLink.params.referralCode
    });
  }

  // Handle product link
  if (deepLink.params.productId) {
    navigation.navigate('Product', {
      id: deepLink.params.productId
    });
  }
});
```

#### Notes

- Only one listener can be active at a time
- Setting a new listener replaces the previous one
- Called for both regular and deferred deep links
- Listener is called after app is in active state

---

### `checkPendingLink(): Promise<void>`

Manually check for pending/deferred deep links. Useful for checking after user login.

#### Returns

`Promise<void>` - Resolves when check is complete

#### Example

```typescript
// Check after user logs in
const handleLogin = async (credentials) => {
  await login(credentials);
  await LinkIO.checkPendingLink();  // Check for deferred links
};

// Check manually on button press
const checkForLinks = async () => {
  try {
    await LinkIO.checkPendingLink();
    console.log('Checked for pending links');
  } catch (error) {
    console.error('Error checking links:', error);
  }
};
```

#### Notes

- Automatically called on first launch if `autoCheckPendingLinks` is true
- Safe to call multiple times
- Does nothing if no pending links exist

---

### `handleURL(url: string): void`

Manually handle a deep link URL. iOS only - Android handles this automatically.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Deep link URL to handle |

#### Example

```typescript
// Manually handle a URL (iOS)
LinkIO.handleURL('https://yourdomain.com/ref/ABC123?campaign=summer');
```

#### Notes

- Primarily for iOS use cases
- Android handles URLs through intent filters automatically
- Triggers the deep link listener if one is set

---

## Referral Tracking

### `trackReferral(referralCode: string, userId: string, metadata?: Record<string, string>): Promise<void>`

Track a referral conversion when a user signs up or completes a desired action.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `referralCode` | `string` | Yes | The referral code from deep link |
| `userId` | `string` | Yes | Unique identifier for the new user |
| `metadata` | `Record<string, string>` | No | Additional tracking data |

#### Returns

`Promise<void>` - Resolves when tracking is complete

#### Example

```typescript
// Basic referral tracking
await LinkIO.trackReferral('REF123', 'user456');

// With metadata
await LinkIO.trackReferral(
  'REF123',
  'user456',
  {
    source: 'mobile-app',
    campaign: 'spring-2024',
    platform: 'ios'
  }
);

// In signup flow
const handleSignup = async (userData) => {
  try {
    const user = await createUser(userData);
    
    // Track referral if code exists
    if (referralCode) {
      await LinkIO.trackReferral(
        referralCode,
        user.id,
        {
          source: 'signup-page',
          timestamp: new Date().toISOString()
        }
      );
    }
  } catch (error) {
    console.error('Signup error:', error);
  }
};
```

#### Notes

- Call this after user successfully signs up or converts
- Sends tracking data to your backend
- Metadata is optional but recommended for analytics
- Returns a promise that resolves on success

---

### `cleanup(): void`

Remove event listeners and clean up resources. Call when unmounting or no longer need LinkIO.

#### Example

```typescript
useEffect(() => {
  // Setup
  LinkIO.configure({
    domain: 'yourdomain.com',
    backendURL: 'https://api.yourdomain.com'
  });

  LinkIO.setDeepLinkListener(handleDeepLink);

  // Cleanup
  return () => {
    LinkIO.cleanup();
  };
}, []);
```

#### Notes

- Removes native event subscriptions
- Clears deep link listener
- Safe to call multiple times
- Call in component unmount or cleanup

---

## Types

### Complete TypeScript Definitions

```typescript
// Configuration
interface LinkIOConfig {
  domain: string;
  backendURL: string;
  autoCheckPendingLinks?: boolean;
}

// Deep Link Data
interface DeepLinkData {
  url: string;
  params: Record<string, string>;
  isDeferred: boolean;
}

// Listener Type
type DeepLinkListener = (deepLink: DeepLinkData) => void;

// Main SDK Class
interface LinkIOSDK {
  configure(config: LinkIOConfig): void;
  setDeepLinkListener(listener: DeepLinkListener): void;
  trackReferral(
    referralCode: string,
    userId: string,
    metadata?: Record<string, string>
  ): Promise<void>;
  checkPendingLink(): Promise<void>;
  handleURL(url: string): void;
  cleanup(): void;
}
```

---

## Error Handling

### Common Errors

#### Module Not Linked

```
The package '@linkio/react-native' doesn't seem to be linked
```

**Solution:**
- iOS: Run `cd ios && pod install`
- Rebuild the app after installation

#### Configuration Error

If `configure()` is not called before other methods, operations may fail silently.

**Solution:**
```typescript
// Always configure first
useEffect(() => {
  LinkIO.configure({
    domain: 'yourdomain.com',
    backendURL: 'https://api.yourdomain.com'
  });
}, []);
```

#### Deep Links Not Working

**iOS:**
- Ensure Associated Domains are configured
- Verify `apple-app-site-association` file exists
- Check AppDelegate includes RCTLinkingManager

**Android:**
- Ensure intent filter has `android:autoVerify="true"`
- Verify `.well-known/assetlinks.json` exists
- Check AndroidManifest.xml configuration

### Error Handling Best Practices

```typescript
// Wrap async operations in try-catch
const trackUserReferral = async (code: string, userId: string) => {
  try {
    await LinkIO.trackReferral(code, userId);
    console.log('Referral tracked successfully');
  } catch (error) {
    console.error('Failed to track referral:', error);
    // Handle error appropriately
  }
};

// Safely check for pending links
const checkLinks = async () => {
  try {
    await LinkIO.checkPendingLink();
  } catch (error) {
    console.error('Error checking links:', error);
  }
};

// Protect listener from errors
LinkIO.setDeepLinkListener((deepLink) => {
  try {
    handleDeepLinkNavigation(deepLink);
  } catch (error) {
    console.error('Error handling deep link:', error);
  }
});
```

---

## Advanced Usage

### React Hook Wrapper

```typescript
import { useEffect, useState } from 'react';
import LinkIO, { DeepLinkData } from '@linkio/react-native';

export function useLinkIO(config) {
  const [deepLink, setDeepLink] = useState<DeepLinkData | null>(null);

  useEffect(() => {
    LinkIO.configure(config);
    
    LinkIO.setDeepLinkListener((data) => {
      setDeepLink(data);
    });

    return () => {
      LinkIO.cleanup();
    };
  }, [config]);

  return { deepLink };
}

// Usage
function App() {
  const { deepLink } = useLinkIO({
    domain: 'yourdomain.com',
    backendURL: 'https://api.yourdomain.com'
  });

  useEffect(() => {
    if (deepLink?.params.referralCode) {
      // Handle referral
    }
  }, [deepLink]);
}
```

### Navigation Integration

```typescript
import { useNavigation } from '@react-navigation/native';

function useDeepLinking() {
  const navigation = useNavigation();

  useEffect(() => {
    LinkIO.setDeepLinkListener((deepLink) => {
      const { screen, ...params } = deepLink.params;
      
      if (screen) {
        navigation.navigate(screen, params);
      }
    });
  }, [navigation]);
}
```

### Analytics Integration

```typescript
LinkIO.setDeepLinkListener((deepLink) => {
  // Track in analytics
  analytics.track('deep_link_opened', {
    url: deepLink.url,
    is_deferred: deepLink.isDeferred,
    campaign: deepLink.params.campaign,
    source: deepLink.params.source
  });

  // Handle navigation
  handleNavigation(deepLink);
});
```

---

## Platform-Specific Notes

### iOS

- Requires iOS 13.0+
- Uses Universal Links
- Requires Associated Domains capability
- Needs RCTLinkingManager in AppDelegate

### Android

- Requires API 21+ (Lollipop)
- Uses App Links
- Requires intent filters in AndroidManifest
- Supports both https and custom URL schemes

---

## Support

For issues, questions, or contributions:
- GitHub: [LinkIO-React-Native](https://github.com/yourusername/LinkIO-React-Native)
- Issues: [Report a bug](https://github.com/yourusername/LinkIO-React-Native/issues)
- Documentation: [Full Docs](https://github.com/yourusername/LinkIO-React-Native#readme)
