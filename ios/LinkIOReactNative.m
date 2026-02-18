#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(LinkIOReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(configure:(NSDictionary *)config)

RCT_EXTERN_METHOD(trackReferral:(NSString *)referralCode
                  userId:(NSString *)userId
                  metadata:(NSDictionary *)metadata
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(checkPendingLink:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(handleURL:(NSString *)url)

@end
