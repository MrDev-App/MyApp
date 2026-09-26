import UIKit

/// SceneDelegate handles UIWindowScene lifecycle for devices that require
/// scene-based lifecycle management (e.g., iPhone Duo foldable / multi-display).
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = (scene as? UIWindowScene) else { return }

    let newWindow = UIWindow(windowScene: windowScene)
    self.window = newWindow

    guard let appDelegate = UIApplication.shared.delegate as? AppDelegate,
          let factory = appDelegate.reactNativeFactory else {
      return
    }

    factory.startReactNative(
      withModuleName: "guruvani",
      in: newWindow,
      launchOptions: nil
    )
  }

  func sceneDidDisconnect(_ scene: UIScene) {}
  func sceneDidBecomeActive(_ scene: UIScene) {}
  func sceneWillResignActive(_ scene: UIScene) {}
  func sceneWillEnterForeground(_ scene: UIScene) {}
  func sceneDidEnterBackground(_ scene: UIScene) {}
}
