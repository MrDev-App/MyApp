import WidgetKit
import SwiftUI

struct SimpleEntry: TimelineEntry {
    let date: Date
    let japName: String
    var todayCount: Int = 0
    var todayMala: Int = 0
    var language: String = "hi"
}

let japURL = URL(string: "guruvani://japScreen")!

// MARK: - Provider
struct Provider: TimelineProvider {
    private let group = "group.com.guruvani.widget"

    private func loadName() -> String {
        UserDefaults(suiteName: group)?.string(forKey: "japName") ?? "राधा"
    }

    private func loadTodayCount() -> Int {
        if let s = UserDefaults(suiteName: group)?.string(forKey: "todayCount"), let val = Int(s) {
            return val
        }
        return UserDefaults(suiteName: group)?.integer(forKey: "todayCount") ?? 0
    }

    private func loadTodayMala() -> Int {
        if let s = UserDefaults(suiteName: group)?.string(forKey: "todayMala"), let val = Int(s) {
            return val
        }
        return UserDefaults(suiteName: group)?.integer(forKey: "todayMala") ?? 0
    }

    private func loadLanguage() -> String {
        UserDefaults(suiteName: group)?.string(forKey: "appLanguage") ?? "hi"
    }

    private func makeEntry() -> SimpleEntry {
        SimpleEntry(
            date: Date(),
            japName: loadName(),
            todayCount: loadTodayCount(),
            todayMala: loadTodayMala(),
            language: loadLanguage()
        )
    }

    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(
            date: Date(),
            japName: "राधा",
            todayCount: 0,
            todayMala: 0,
            language: "hi"
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        completion(makeEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        let next = Calendar.current.date(byAdding: .minute, value: 30, to: Date())!
        completion(Timeline(entries: [makeEntry()], policy: .after(next)))
    }
}

// MARK: - Asset Icon
struct AssetIcon: View {
    let name: String
    let size: CGFloat

    private var uiImage: UIImage? {
        if let img = UIImage(named: name) {
            return img
        }
        if let path = Bundle.main.path(forResource: name, ofType: "png") {
            return UIImage(contentsOfFile: path)
        }
        return nil
    }

    var body: some View {
        Group {
            if let uiImage {
                Image(uiImage: uiImage)
                    .resizable()
                    .renderingMode(.original)
                    .scaledToFit()
            } else {
                Image(systemName: "questionmark.square.dashed") // visible fallback so you notice a missing file
                    .resizable()
                    .scaledToFit()
                    .foregroundColor(Color.japPillIcon)
            }
        }
        .frame(width: size, height: size)
    }
}

// MARK: - Medium view
struct WideLayout: View {
  let entry: SimpleEntry
  
  private var tapToChantText: String {
    let lang = entry.language.lowercased()
    if lang.starts(with: "en") {
      return "Tap to Chant"
    } else {
      return "जप के लिए टैप करें"
    }
  }
  
  private var todayCountTitle: String {
    let lang = entry.language.lowercased()
    if lang.starts(with: "en") {
      return "Today Total\nCount"
    } else {
      return "आज कुल\nजाप"
    }
  }
  
  private var todayMalaTitle: String {
    let lang = entry.language.lowercased()
    if lang.starts(with: "en") {
      return "Today Total\nMala"
    } else {
      return "आज कुल\nमाला"
    }
  }
  
  var body: some View {
    GeometryReader { geo in
      let side = min(geo.size.width, geo.size.height)
      
      ZStack(alignment: .top) {
        LinearGradient(
          colors: [Color.japSmallBgTop, Color.japSmallBgBottom],
          startPoint: .top,
          endPoint: .bottom
        )
        
        VStack(spacing: 0) {
          // Top row (Lotus & Om)
          HStack {
            LotusIcon(color: Color.japSmallGoldIcon, size: side * 0.095)
            Spacer()
            Text("ॐ")
              .font(.system(size: side * 0.125, weight: .medium, design: .serif))
              .foregroundColor(Color.japSmallGoldIcon)
          }
          .padding(.horizontal, side * 0.09)
          .frame(height: side * 0.2)
          
          // Image and Stats Row
          HStack(spacing: side * 0.05) {
            SmallMalaView(side: side * 0.72)
            
            Spacer()
            
            VStack(spacing: side * 0.04) {
              // Stats Columns (Today Total Count & Today Total Mala)
              HStack(alignment: .center, spacing: side * 0.02) {
                // Column 1: Today Total Count
                VStack(alignment: .center, spacing: side * 0.02) {
                  Text(todayCountTitle)
                    .font(.system(size: side * 0.066, weight: .medium, design: .serif))
                    .foregroundColor(Color.japSmallGoldIcon)
                    .multilineTextAlignment(.center)
                    .lineSpacing(side * 0.008)
                    .lineLimit(2)
                    .minimumScaleFactor(0.7)
                  
                  HStack(spacing: side * 0.015) {
                    AssetIcon(name: "mala_icon", size: side * 0.20)
                    Text("\(entry.todayCount)")
                      .font(.system(size: side * 0.095, weight: .semibold, design: .serif))
                      .foregroundColor(Color.japSmallGoldIcon)
                      .lineLimit(1)
                      .minimumScaleFactor(0.7)
                  }
                }
                .frame(maxWidth: .infinity)

                // Vertical Divider Line
                Capsule()
                  .fill(Color.japSmallBorder.opacity(0.85))
                  .frame(width: 1, height: side * 0.26)
                
                // Column 2: Today Total Mala
                VStack(alignment: .center, spacing: side * 0.02) {
                  Text(todayMalaTitle)
                    .font(.system(size: side * 0.066, weight: .medium, design: .serif))
                    .foregroundColor(Color.japSmallGoldIcon)
                    .multilineTextAlignment(.center)
                    .lineSpacing(side * 0.008)
                    .lineLimit(2)
                    .minimumScaleFactor(0.7)
                  
                  HStack(spacing: side * 0.015) {
                    AssetIcon(name: "flame_icon", size: side * 0.20)
                    Text("\(entry.todayMala)")
                      .font(.system(size: side * 0.095, weight: .semibold, design: .serif))
                      .foregroundColor(Color.japSmallGoldIcon)
                      .lineLimit(1)
                      .minimumScaleFactor(0.7)
                  }
                }
                .frame(maxWidth: .infinity)
              }
              .frame(maxWidth: .infinity)
              
              // Tap to chant button
              HStack(spacing: side * 0.03) {
                Image(systemName: "hand.tap.fill")
                  .font(.system(size: side * 0.075, weight: .semibold))
                  .foregroundColor(Color.japPillIcon)
                
                Text(tapToChantText)
                  .font(.system(size: side * 0.068, weight: .semibold))
                  .foregroundColor(Color.japPillText)
                  .lineLimit(1)
                  .minimumScaleFactor(0.6)
              }
              .frame(maxWidth: .infinity)
              .frame(height: side * 0.17)
              .background(
                Capsule()
                  .fill(Color.japPillBg)
                  .overlay(Capsule().stroke(Color.japPillBorder, lineWidth: 0.8))
              )
            }
          }
          .padding(.horizontal, side * 0.08)
        }
      }
      .contentShape(Rectangle())
      .widgetURL(japURL)
    }
  }
}





// MARK: - Small Widget Spiritual Components
// MARK: - Lotus Icon
struct LotusIcon: View {
    var color: Color = Color.japSmallGoldIcon
    var size: CGFloat = 16
    
    var body: some View {
      Canvas { context, canvasSize in
        let w = canvasSize.width
        let h = canvasSize.height
        let midX = w / 2
        let bottomY = h * 0.90
        
        // Center petal
        var centerPetal = Path()
        centerPetal.move(to: CGPoint(x: midX, y: h * 0.06))
        centerPetal.addQuadCurve(to: CGPoint(x: midX, y: bottomY),
                                 control: CGPoint(x: midX + w * 0.18, y: h * 0.45))
        centerPetal.addQuadCurve(to: CGPoint(x: midX, y: h * 0.06),
                                 control: CGPoint(x: midX - w * 0.18, y: h * 0.45))
        context.fill(centerPetal, with: .color(color))
        
        // Left inner petal
        var leftInner = Path()
        leftInner.move(to: CGPoint(x: midX - w * 0.04, y: bottomY))
        leftInner.addQuadCurve(to: CGPoint(x: w * 0.14, y: h * 0.28),
                               control: CGPoint(x: midX - w * 0.22, y: h * 0.70))
        leftInner.addQuadCurve(to: CGPoint(x: midX - w * 0.04, y: bottomY),
                               control: CGPoint(x: midX - w * 0.06, y: h * 0.45))
        context.fill(leftInner, with: .color(color))
        
        // Right inner petal
        var rightInner = Path()
        rightInner.move(to: CGPoint(x: midX + w * 0.04, y: bottomY))
        rightInner.addQuadCurve(to: CGPoint(x: w * 0.86, y: h * 0.28),
                                control: CGPoint(x: midX + w * 0.22, y: h * 0.70))
        rightInner.addQuadCurve(to: CGPoint(x: midX + w * 0.04, y: bottomY),
                                control: CGPoint(x: midX + w * 0.06, y: h * 0.45))
        context.fill(rightInner, with: .color(color))
        
        // Left outer petal
        var leftOuter = Path()
        leftOuter.move(to: CGPoint(x: midX - w * 0.08, y: bottomY))
        leftOuter.addQuadCurve(to: CGPoint(x: 0, y: h * 0.54),
                               control: CGPoint(x: midX - w * 0.32, y: h * 0.88))
        leftOuter.addQuadCurve(to: CGPoint(x: midX - w * 0.08, y: bottomY),
                               control: CGPoint(x: midX - w * 0.18, y: h * 0.65))
        context.fill(leftOuter, with: .color(color))
        
        // Right outer petal
        var rightOuter = Path()
        rightOuter.move(to: CGPoint(x: midX + w * 0.08, y: bottomY))
        rightOuter.addQuadCurve(to: CGPoint(x: w, y: h * 0.54),
                                control: CGPoint(x: midX + w * 0.32, y: h * 0.88))
        rightOuter.addQuadCurve(to: CGPoint(x: midX + w * 0.08, y: bottomY),
                                control: CGPoint(x: midX + w * 0.18, y: h * 0.65))
        context.fill(rightOuter, with: .color(color))
      }
      .frame(width: size * 1.3, height: size)
    }
  }
  // MARK: - Small Mala View
  struct SmallMalaView: View {
    let side: CGFloat
    
    private let totalBeads = 36
    
    var body: some View {
      ZStack {
        Canvas { context, canvasSize in
          let cSide = min(canvasSize.width, canvasSize.height)
          let beadSize = cSide * 0.082
          let radius = (cSide - beadSize) / 2
          let center = CGPoint(x: canvasSize.width / 2, y: canvasSize.height / 2)
          let step = 2 * Double.pi / Double(totalBeads)
          
          // 35 Regular beads
          for i in 1..<totalBeads {
            let theta = -Double.pi / 2 + Double(i) * step
            let bx = center.x + radius * cos(theta)
            let by = center.y + radius * sin(theta)
            
            let beadRect = CGRect(x: bx - beadSize / 2, y: by - beadSize / 2,
                                  width: beadSize, height: beadSize)
            let beadPath = Path(ellipseIn: beadRect)
            
            let beadGradient = Gradient(colors: [
              Color(hex: "#F6EFE5"),
              Color(hex: "#DFCDB7")
            ])
            context.fill(beadPath, with: .linearGradient(
              beadGradient,
              startPoint: CGPoint(x: beadRect.minX, y: beadRect.minY),
              endPoint: CGPoint(x: beadRect.maxX, y: beadRect.maxY)
            ))
            context.stroke(beadPath, with: .color(Color(hex: "#BAA48A")), lineWidth: 0.6)
          }
          
          // Sumeru bead at 12 o'clock (i = 0)
          let sumeruSize = beadSize * 1.35
          let topY = center.y - radius
          let sumeruRect = CGRect(x: center.x - sumeruSize / 2,
                                  y: topY - sumeruSize / 2,
                                  width: sumeruSize, height: sumeruSize)
          let sumeruPath = Path(ellipseIn: sumeruRect)
          
          let sumeruGradient = Gradient(colors: [
            Color(hex: "#F2A21E"),
            Color(hex: "#C66800")
          ])
          context.fill(sumeruPath, with: .linearGradient(
            sumeruGradient,
            startPoint: CGPoint(x: sumeruRect.minX, y: sumeruRect.minY),
            endPoint: CGPoint(x: sumeruRect.maxX, y: sumeruRect.maxY)
          ))
          context.stroke(sumeruPath, with: .color(Color(hex: "#9E4E00")), lineWidth: 0.8)
        }
        .frame(width: side, height: side)
        
        // Image inside Mala
        RadhaImageView(size: side * 0.76)
      }
      .frame(width: side, height: side)
    }
  }
  // MARK: - Radha Image View
  struct RadhaImageView: View {
    let size: CGFloat
    
    var body: some View {
      Group {
        if let uiImage = UIImage(named: "radha") {
          Image(uiImage: uiImage)
            .resizable()
            .scaledToFill()
        } else if let path = Bundle.main.path(forResource: "radha", ofType: "png") ?? Bundle.main.path(forResource: "radha", ofType: "webp"),
                  let uiImage = UIImage(contentsOfFile: path) {
          Image(uiImage: uiImage)
            .resizable()
            .scaledToFill()
        } else {
          Image("radha")
            .resizable()
            .scaledToFill()
        }
      }
      .frame(width: size, height: size)
      .clipShape(Circle())
    }
  }
  
  
  //small widget view
  struct SmallWidgetView: View {
    let entry: SimpleEntry
    
    private var tapToChantText: String {
      let lang = entry.language.lowercased()
      if lang.starts(with: "en") {
        return "Tap to Chant"
      } else {
        return "जप के लिए टैप करें"
      }
    }
    
    var body: some View {
      GeometryReader { geo in
        let side = min(geo.size.width, geo.size.height)
        
        ZStack {
          LinearGradient(
            colors: [Color.japSmallBgTop, Color.japSmallBgBottom],
            startPoint: .top,
            endPoint: .bottom
          )
          
          VStack(spacing: 0) {
            // Top row
            HStack {
              LotusIcon(color: Color.japSmallGoldIcon, size: side * 0.095)
              Spacer()
              Text("ॐ")
                .font(.system(size: side * 0.125, weight: .medium, design: .serif))
                .foregroundColor(Color.japSmallGoldIcon)
            }
            .padding(.horizontal, side * 0.09)
            .frame(height: side * 0.2)
             
            // Mala ring
            SmallMalaView(side: side * 0.56)
              .frame(height: side * 0.56)
            
            // Bottom pill
            HStack(spacing: side * 0.03) {
              Image(systemName: "hand.tap.fill")
                .font(.system(size: side * 0.075, weight: .semibold))
                .foregroundColor(Color.japPillIcon)
              
              Text(tapToChantText)
                .font(.system(size: side * 0.068, weight: .semibold))
                .foregroundColor(Color.japPillText)
                .lineLimit(1)
                .minimumScaleFactor(0.6)
            }
            .frame(maxWidth: .infinity)
            .frame(height: side * 0.17)
            .background(
              Capsule()
                .fill(Color.japPillBg)
                .overlay(Capsule().stroke(Color.japPillBorder, lineWidth: 0.8))
            )
            .padding(.horizontal, side * 0.08)
            .frame(height: side * 0.24)
          }
          .frame(width: geo.size.width, height: geo.size.height)
        }
        // Whole widget opens the Jap screen
        .contentShape(Rectangle())
        .widgetURL(japURL)
      }
    }
  }
  // MARK: - Main view
  struct HomeWidgetEntryView: View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
      switch family {
      case .systemSmall:
        SmallWidgetView(entry: entry)
      case .systemMedium:
        WideLayout(entry: entry)
      default:
        SmallWidgetView(entry: entry)
      }
    }
  }

  // MARK: - Widget
  struct HomeWidget: Widget {
    let kind: String = "HomeWidget"

    var body: some WidgetConfiguration {
      StaticConfiguration(kind: kind, provider: Provider()) { entry in
        HomeWidgetEntryView(entry: entry)
      }
      .configurationDisplayName("Guruvani Jap")
      .description("Shows your jap count.")
      .supportedFamilies([.systemSmall, .systemMedium])
      .contentMarginsDisabled()
    }
  }
 