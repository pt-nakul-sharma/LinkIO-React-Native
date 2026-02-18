import Foundation
import LinkIO

@objc(LinkIOReactNative)
class LinkIOReactNative: RCTEventEmitter {
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func supportedEvents() -> [String]! {
        return ["onDeepLink"]
    }
    
    @objc
    func configure(_ config: [String: Any]) {
        guard let domain = config["domain"] as? String,
              let backendURL = config["backendURL"] as? String else {
            return
        }
        
        let autoCheck = config["autoCheckPendingLinks"] as? Bool ?? true
        
        let linkIOConfig = LinkIOConfig(
            domain: domain,
            backendURL: backendURL,
            autoCheckPendingLinks: autoCheck
        )
        
        LinkIO.shared.configure(config: linkIOConfig)
        
        LinkIO.shared.setDeepLinkHandler { [weak self] deepLink in
            self?.sendEvent(withName: "onDeepLink", body: [
                "url": deepLink.url,
                "params": deepLink.params,
                "isDeferred": deepLink.isDeferred
            ])
        }
    }
    
    @objc
    func trackReferral(_ referralCode: String,
                      userId: String,
                      metadata: [String: String],
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
        LinkIO.shared.trackReferral(
            referralCode: referralCode,
            userId: userId,
            metadata: metadata
        )
        resolve(nil)
    }
    
    @objc
    func checkPendingLink(_ resolve: @escaping RCTPromiseResolveBlock,
                         reject: @escaping RCTPromiseRejectBlock) {
        LinkIO.shared.checkPendingLink()
        resolve(nil)
    }
    
    @objc
    func handleURL(_ url: String) {
        guard let urlObj = URL(string: url) else { return }
        _ = LinkIO.shared.handleUniversalLink(url: urlObj)
    }
}
