import SwiftUI

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        self.init(
            red:   Double((int >> 16) & 0xFF) / 255,
            green: Double((int >> 8)  & 0xFF) / 255,
            blue:  Double(int & 0xFF) / 255
        )
    }

    static let japPrimary  = Color(hex: "#fff6E0")
    static let japOrange   = Color(hex: "#E8751A")
    static let japDark     = Color(hex: "#2B2B2B")

   
   
    static let japBead     = Color(hex: "#E6D3C0")
    static let japBeadEdge = Color(hex: "#B89A7E")
    static let japGold     = Color(hex: "#E3A700")
  
    static let japBeadFilled     = Color(hex: "#7B2D1A")   // dark maroon (estimate)
    static let japBeadFilledEdge = Color(hex: "#4E1B0F")

    // Small widget parchment theme colors
    static let japSmallBgTop       = Color(hex: "#FAF6EE")
    static let japSmallBgBottom    = Color(hex: "#F3EBDD")
    static let japSmallBorder      = Color(hex: "#D6BE9B")
    static let japSmallGoldIcon    = Color(hex: "#A87E4B")
    static let japSmallName        = Color(hex: "#562316")
    static let japSmallCount       = Color(hex: "#873719")
    static let japPillBg           = Color(hex: "#E4D8C5")
    static let japPillBorder       = Color(hex: "#CFBDA3")
    static let japPillIcon         = Color(hex: "#AE4E1E")
    static let japPillText         = Color(hex: "#543725")
}


struct FadeButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .opacity(configuration.isPressed ? 0.5 : 1)
    }
}
