#import "RCTSharedStorage.h"

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

  Class reloader = NSClassFromString(@"WidgetReloader");
  SEL reloadSel = NSSelectorFromString(@"reload");
  if (reloader && [reloader respondsToSelector:reloadSel]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
    [reloader performSelector:reloadSel];
#pragma clang diagnostic pop
  }

  resolve(@YES);
}

RCT_EXPORT_METHOD(getItem:(NSString *)key
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject) {
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
