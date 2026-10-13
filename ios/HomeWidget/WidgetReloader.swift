//
//  WidgetReloader.swift
//  guruvani
//
//  Created by AjayMrt on 10/10/26.
//

import Foundation

import WidgetKit

@objc(WidgetReloader)
public class WidgetReloader: NSObject {
  @objc public static func reload() {
    WidgetCenter.shared.reloadAllTimelines()
  }
}
