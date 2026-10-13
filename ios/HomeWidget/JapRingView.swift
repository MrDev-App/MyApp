import SwiftUI

struct JapRingView: View {
    let count: Int

    var body: some View {
        GeometryReader { geo in
            let size = min(geo.size.width, geo.size.height)

            ZStack {
                MalaRingView(count: count)

                VStack(spacing: 0) {
                    Text("\(count)")
                        .font(.system(size: size * 0.28, weight: .semibold))
                        .foregroundColor(Color.japDark)
//                        .contentTransition(.numericText())
//                        .animation(.snappy, value: count)
                        .contentTransition(.identity)
                    Text("/108")
                        .font(.system(size: size * 0.11, weight: .medium))
                        .foregroundColor(Color.japOrange)
                    Text("CHANT")
                        .font(.system(size: size * 0.065))
                        .tracking(1)
                        .foregroundColor(.gray)
                }
            }
            .frame(width: size, height: size)
            .position(x: geo.size.width / 2, y: geo.size.height / 2)
        }
        .aspectRatio(1, contentMode: .fit)
    }
}
