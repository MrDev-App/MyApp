import WidgetKit
import SwiftUI
import AppIntents



@available(iOS 16.0, *)
struct IncrementJapIntent: AppIntent {
    static var title: LocalizedStringResource = "Chant Jap"
    static var description = IntentDescription("Increments the Jap chant count and advances the Mala ring")
    static var isDiscoverable: Bool = false

    func perform() async throws -> some IntentResult {
        let group = "group.com.guruvani.widget"
        let defaults = UserDefaults(suiteName: group)

        let currentStr = defaults?.string(forKey: "count") ?? ""
        let currentCount = Int(currentStr) ?? (defaults?.integer(forKey: "count") ?? 0)

        let nextCount = (currentCount + 1) % 108
        defaults?.set(String(nextCount), forKey: "count")

        let pendingStr = defaults?.string(forKey: "widgetTapsPending") ?? ""
        let currentPending = Int(pendingStr) ?? (defaults?.integer(forKey: "widgetTapsPending") ?? 0)
        defaults?.set(String(currentPending + 1), forKey: "widgetTapsPending")

        WidgetCenter.shared.reloadTimelines(ofKind: "HomeWidget")
        return .result()
    }
}



struct SimpleEntry: TimelineEntry {
    let date: Date
    let japName: String
    let count: Int
}

let japURL = URL(string: "guruvani://japScreen")!

struct Provider: TimelineProvider {
    private let group = "group.com.guruvani.widget"

    private func loadName() -> String {
        UserDefaults(suiteName: group)?.string(forKey: "japName") ?? "राधा"
    }
    private func loadCount() -> Int {
        let s = UserDefaults(suiteName: group)?.string(forKey: "count")
        return Int(s ?? "") ?? 0
    }
    private func makeEntry() -> SimpleEntry {
        SimpleEntry(date: Date(), japName: loadName(), count: loadCount())
    }

    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), japName: "राधा", count: 0)
    }
    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        completion(makeEntry())
    }
    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        let next = Calendar.current.date(byAdding: .minute, value: 30, to: Date())!
        completion(Timeline(entries: [makeEntry()], policy: .after(next)))
    }
}

// MARK: - Reusable pieces

// Poore widget ke peeche ka tap-area: kahin bhi tap = count +1
struct TapBackground: View {
    var body: some View {
        Button(intent: IncrementJapIntent()) {
            Color.clear
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .contentShape(Rectangle())
        }
        .buttonStyle(FadeButtonStyle())
    }
}


struct MantraLabel: View {
    let name: String
    let fontSize: CGFloat
    let lineLimit: Int

    private var cleanName: String {
        let trimmed = name.trimmingCharacters(in: CharacterSet(charactersIn: "“”\"' \n\t"))
        return trimmed.isEmpty ? name : trimmed
    }

    private var iconSize: CGFloat {
        // Keeps pencil clear, sharp, and proportional: never smaller than 11pt, never larger than 16pt
        min(max(fontSize * 0.85, 11), 16)
    }

    var body: some View {
        (
            Text(Image(systemName: "pencil"))
                .font(.system(size: iconSize, weight: .semibold))
                .baselineOffset(-fontSize * 0.13)
            +
            Text(" \(cleanName)")
                .font(.system(size: fontSize, weight: .bold))
        )
        .foregroundColor(Color.japOrange)
        .multilineTextAlignment(.center)
        .lineLimit(lineLimit)
        .minimumScaleFactor(0.7)
       
    }
}


struct WideLayout: View {
    let entry: SimpleEntry
    let nameScale: CGFloat

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height
            let ring = h * 0.86

            // naam jitna lamba, font utna chhota
            let base = h * nameScale
            let fontSize: CGFloat = entry.japName.count < 12 ? base
                                  : entry.japName.count < 22 ? base * 0.8
                                  : entry.japName.count < 34 ? base * 0.65
                                  : base * 0.55

            ZStack {
                // peeche poora area: kahin bhi tap = count +1
                TapBackground()

                HStack(spacing: 0) {
                    Spacer(minLength: 0)

                    // Pencil + naam: ONLY ye Jap tab kholta hai
                    Link(destination: japURL) {
                        MantraLabel(name: entry.japName, fontSize: fontSize, lineLimit: 3)
                            .padding(.horizontal, h * 0.04)
                            .padding(.vertical, h * 0.08)
                            .contentShape(Rectangle())
                    }

                    Spacer(minLength: 0)

                    // Mala ring: tap = count +1
                    Button(intent: IncrementJapIntent()) {
                        JapRingView(count: entry.count)
                            .frame(width: ring, height: ring)
                            .padding(.horizontal, h * 0.04)
                    }
                    .buttonStyle(.plain)
                }
            }
            .frame(width: w, height: h)
        }
    }
}

// MARK: - Main view
struct HomeWidgetEntryView: View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {

        // Small: Apple sirf ek tap-target deta hai, poora widget = Jap tab
        case .systemSmall:
            GeometryReader { geo in
                let w = geo.size.width
                let h = geo.size.height

                let base = w * 0.085
                let fontSize: CGFloat = entry.japName.count < 12 ? base * 0.8
                                      : entry.japName.count < 22 ? base * 0.8
                                      : entry.japName.count < 34 ? base * 0.65
                                      : max(base * 0.55, 9.5)
 
                VStack(spacing: h * 0.02) {
                    MantraLabel(name: entry.japName, fontSize: fontSize, lineLimit: 2)
                        .frame(maxWidth: .infinity, alignment: .center)

                    JapRingView(count: entry.count)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
                .padding(.horizontal, w * 0.05)
                .padding(.top, h * 0.08)
                .padding(.bottom, h * 0.05)
                .frame(width: w, height: h)
            }
            .widgetURL(japURL)

        // Medium: naam = Jap tab, baaki jagah = count +1
        case .systemMedium:
            WideLayout(entry: entry, nameScale: 0.15)

        // Large: naam upar, ring neeche
        case .systemLarge:
            GeometryReader { geo in
                let w = geo.size.width
                let h = geo.size.height

                let base = h * 0.075
                let fontSize: CGFloat = entry.japName.count < 12 ? base
                                      : entry.japName.count < 22 ? base * 0.8
                                      : entry.japName.count < 34 ? base * 0.65
                                      : base * 0.52

                ZStack {
                    TapBackground()

                    VStack(spacing: h * 0.02) {
                        Link(destination: japURL) {
                            MantraLabel(name: entry.japName, fontSize: fontSize, lineLimit: 3)
                                .padding(.horizontal, w * 0.08)
                                .padding(.vertical, h * 0.015)
                                .contentShape(Rectangle())
                        }

                        Button(intent: IncrementJapIntent()) {
                            JapRingView(count: entry.count)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                        }
                        .buttonStyle(.plain)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                    }
                    .padding(.horizontal, w * 0.06)
                    .padding(.top, h * 0.06)
                    .padding(.bottom, h * 0.05)
                }
                .frame(width: w, height: h)
            }

        // ExtraLarge (sirf iPad): Medium jaisa, naam thoda bada
        case .systemExtraLarge:
            WideLayout(entry: entry, nameScale: 0.2)

        default:
            Text(entry.japName)
        }
    }
}

// MARK: - Widget
struct HomeWidget: Widget {
    let kind: String = "HomeWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            HomeWidgetEntryView(entry: entry)
                .containerBackground(for: .widget) {
                    LinearGradient(
                        colors: [Color.japPrimary, Color.japPrimary, .white, .white],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                }
        }
        .configurationDisplayName("Guruvani Jap")
        .description("Shows your jap count.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge, .systemExtraLarge])
        .contentMarginsDisabled()
    }
}

#Preview(as: .systemSmall) {
    HomeWidget()
} timeline: {
    SimpleEntry(date: .now, japName: "राधा", count: 27)
    SimpleEntry(date: .now, japName: "ॐ नमः शिवाय", count: 54)
    SimpleEntry(date: .now, japName: "“ हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे\nहरे राम हरे राम राम राम हरे हरे ”", count: 108)
}

#Preview(as: .systemMedium) {
    HomeWidget()
} timeline: {
    SimpleEntry(date: .now, japName: "राधा", count: 27)
    SimpleEntry(date: .now, japName: "ॐ नमः शिवाय", count: 54)
    SimpleEntry(date: .now, japName: "“ हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे\nहरे राम हरे राम राम राम हरे हरे ”", count: 108)
}

#Preview(as: .systemLarge) {
    HomeWidget()
} timeline: {
    SimpleEntry(date: .now, japName: "राधा", count: 27)
    SimpleEntry(date: .now, japName: "ॐ नमः शिवाय", count: 54)
    SimpleEntry(date: .now, japName: "“ हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे\nहरे राम हरे राम राम राम हरे हरे ”", count: 108)
}
