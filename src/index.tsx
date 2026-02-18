import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const LINKING_ERROR =
  "The package '@linkio/react-native' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const LinkIOModule = NativeModules.LinkIO
  ? NativeModules.LinkIO
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

const eventEmitter = new NativeEventEmitter(LinkIOModule);

export interface LinkIOConfig {
  domain: string;
  backendURL: string;
  autoCheckPendingLinks?: boolean;
}

export interface DeepLinkData {
  url: string;
  params: Record<string, string>;
  isDeferred: boolean;
}

export type DeepLinkListener = (deepLink: DeepLinkData) => void;

class LinkIO {
  private listener: DeepLinkListener | null = null;
  private subscription: any = null;

  configure(config: LinkIOConfig): void {
    LinkIOModule.configure(config);

    if (this.subscription) {
      this.subscription.remove();
    }

    this.subscription = eventEmitter.addListener(
      'onDeepLink',
      (data: DeepLinkData) => {
        if (this.listener) {
          this.listener(data);
        }
      },
    );
  }

  setDeepLinkListener(listener: DeepLinkListener): void {
    this.listener = listener;
  }

  async trackReferral(
    referralCode: string,
    userId: string,
    metadata?: Record<string, string>,
  ): Promise<void> {
    return LinkIOModule.trackReferral(referralCode, userId, metadata || {});
  }

  async checkPendingLink(): Promise<void> {
    return LinkIOModule.checkPendingLink();
  }

  handleURL(url: string): void {
    LinkIOModule.handleURL(url);
  }

  cleanup(): void {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
    this.listener = null;
  }
}

export default new LinkIO();
