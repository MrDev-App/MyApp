



import SwiftUI

struct MalaRingView: View {
    let count: Int                 // 0...107, abhi kaunsa bead top pe hai
    private let total = 108

    var body: some View {
        GeometryReader { geo in
            let size = min(geo.size.width, geo.size.height)

            Canvas { context, canvasSize in
                let side = min(canvasSize.width, canvasSize.height)
                let beadSize = side * 0.026
                let radius = side / 2 - beadSize
                let center = CGPoint(x: canvasSize.width / 2, y: canvasSize.height / 2)
                let step = 2 * Double.pi / Double(total)

                for i in 0..<total {
                    let theta = Double(i - count) * step
                    let x = center.x + radius * sin(theta)
                    let y = center.y - radius * cos(theta)
                    let rect = CGRect(x: x - beadSize / 2, y: y - beadSize / 2,
                                      width: beadSize, height: beadSize)
                    let path = Path(ellipseIn: rect)

                    // NEW: guzre hue beads dark, baaki halke
                    let done = i < count
                    context.fill(path, with: .color(done ? Color.japBeadFilled : Color.japBead))
                    context.stroke(path,
                                   with: .color(done ? Color.japBeadFilledEdge : Color.japBeadEdge),
                                   lineWidth: 0.5)
                }

                // top pe fixed gold bead (current bead)
                let gold = beadSize * 1.8
                let topRect = CGRect(x: center.x - gold / 2,
                                     y: center.y - radius - gold / 2,
                                     width: gold, height: gold)
                context.fill(Path(ellipseIn: topRect), with: .color(Color.japGold))
            }
            .frame(width: size, height: size)
            .position(x: geo.size.width / 2, y: geo.size.height / 2)
        }
        .aspectRatio(1, contentMode: .fit)
    }
}

#Preview {
    MalaRingView(count: 54)
        .frame(width: 200, height: 200)
        .padding()
}
