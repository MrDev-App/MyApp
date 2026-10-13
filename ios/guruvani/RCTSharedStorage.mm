#import "RCTSharedStorage.h"
#import "guruvani-Swift.h"

@implementation RCTSharedStorage

RCT_EXPORT_MODULE(SharedStorage)

- (void)setItem:(NSString *)key
          value:(NSString *)value
        resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject {
  NSUserDefaults *defaults =
      [[NSUserDefaults alloc] initWithSuiteName:@"group.com.guruvani.widget"];
  if (!defaults) {
    reject(@"ERR", @"App Group not found", nil);
    return;
  }
  [defaults setObject:value forKey:key];
  [WidgetReloader reload];
  resolve(@YES);
}

RCT_EXPORT_METHOD(getItem : (NSString *)key resolve : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  NSUserDefaults *defaults =
      [[NSUserDefaults alloc] initWithSuiteName:@"group.com.guruvani.widget"];
  if (!defaults) {
    resolve(nil);
    return;
  }
  NSString *val = [defaults stringForKey:key];
  resolve(val);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeSharedStorageSpecJSI>(params);
}

@end
