// package com.guruvani.widget

// import android.content.Context
// import android.graphics.Bitmap
// import android.graphics.BitmapFactory
// import android.graphics.Canvas
// import android.graphics.Color
// import android.graphics.LinearGradient
// import android.graphics.Paint
// import android.graphics.Path
// import android.graphics.Rect
// import android.graphics.RectF
// import android.graphics.Shader
// import kotlin.math.cos
// import kotlin.math.sin

// object MalaBitmap {
//     const val RENDER_PX = 500

//     private const val TOTAL_BEADS = 36

//     // Exact colors from iOS Theme.swift and HomeWidget.swift SmallMalaView
//     private const val BEAD_GRADIENT_START = 0xFFF6EFE5.toInt() // #F6EFE5
//     private const val BEAD_GRADIENT_END = 0xFFDFCDB7.toInt()   // #DFCDB7
//     private const val BEAD_STROKE_COLOR = 0xFFBAA48A.toInt()   // #BAA48A

//     private const val SUMERU_GRADIENT_START = 0xFFF2A21E.toInt() // #F2A21E
//     private const val SUMERU_GRADIENT_END = 0xFFC66800.toInt()   // #C66800
//     private const val SUMERU_STROKE_COLOR = 0xFF9E4E00.toInt()   // #9E4E00

//     @Volatile private var cachedBitmap: Bitmap? = null
//     @Volatile private var cachedRadha: Bitmap? = null

//     private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.FILL }
//     private val strokePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE }
//     private val bitmapPaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG)
//     private val clipPath = Path()

//     private fun getRadhaBitmap(context: Context): Bitmap? {
//         val current = cachedRadha
//         if (current != null && !current.isRecycled) {
//             return current
//         }
//         return try {
//             val resId = context.resources.getIdentifier("radha", "drawable", context.packageName)
//             if (resId != 0) {
//                 val opts = BitmapFactory.Options().apply { inPreferredConfig =
// Bitmap.Config.ARGB_8888 }
//                 val bmp = BitmapFactory.decodeResource(context.resources, resId, opts)
//                 cachedRadha = bmp
//                 bmp
//             } else null
//         } catch (_: Exception) {
//             null
//         }
//     }

//     @Synchronized
//     fun render(context: Context, count: Int = 0, sizePx: Int = 300): Bitmap {
//         val bitmap = Bitmap.createBitmap(sizePx, sizePx, Bitmap.Config.ARGB_8888)

//         val canvas = Canvas(bitmap)
//         val center = sizePx / 2f

//         // Geometry: exactly matching iOS SmallMalaView
//         val beadSize = sizePx * 0.082f
//         val bRadius = beadSize / 2f
//         val sumeruSize = beadSize * 1.35f
//         val sumeruRadius = sumeruSize / 2f

//         // Safety margin so Sumeru at 12 o'clock and regular beads never clip
//         val margin = sizePx * 0.035f
//         val radius = center - sumeruRadius - margin
//         val step = 2.0 * Math.PI / TOTAL_BEADS

//         // 1. Draw Radha image cropped inside the mala circle (matching iOS RadhaImageView size
// 0.76)
//         val radhaBmp = getRadhaBitmap(context)
//         val imageDiameter = sizePx * 0.74f
//         val imageRadius = imageDiameter / 2f

//         if (radhaBmp != null) {
//             canvas.save()
//             clipPath.reset()
//             clipPath.addCircle(center, center, imageRadius, Path.Direction.CCW)
//             canvas.clipPath(clipPath)

//             // CenterCrop radha bitmap into the circular bounds
//             val bw = radhaBmp.width
//             val bh = radhaBmp.height
//             val minSide = minOf(bw, bh)
//             val srcX = (bw - minSide) / 2
//             val srcY = (bh - minSide) / 2
//             val srcRect = Rect(srcX, srcY, srcX + minSide, srcY + minSide)
//             val dstRect = RectF(center - imageRadius, center - imageRadius, center + imageRadius,
// center + imageRadius)

//             canvas.drawBitmap(radhaBmp, srcRect, dstRect, bitmapPaint)
//             canvas.restore()
//         }

//         // 2. 35 Regular beads with exact iOS colors and linear gradient
//         strokePaint.color = BEAD_STROKE_COLOR
//         strokePaint.strokeWidth = sizePx * 0.004f

//         for (i in 1 until TOTAL_BEADS) {
//             val theta = -Math.PI / 2.0 + i * step
//             val bx = center + radius * cos(theta).toFloat()
//             val by = center + radius * sin(theta).toFloat()

//             // Exact iOS gradient from beadRect.minX/minY to maxX/maxY
//             fillPaint.shader = LinearGradient(
//                 bx - bRadius, by - bRadius,
//                 bx + bRadius, by + bRadius,
//                 BEAD_GRADIENT_START,
//                 BEAD_GRADIENT_END,
//                 Shader.TileMode.CLAMP
//             )

//             canvas.drawCircle(bx, by, bRadius, fillPaint)
//             canvas.drawCircle(bx, by, bRadius, strokePaint)
//         }

//         // 3. Sumeru bead at 12 o'clock (i = 0) with exact iOS gold/orange colors
//         val topY = center - radius

//         fillPaint.shader = LinearGradient(
//             center - sumeruRadius, topY - sumeruRadius,
//             center + sumeruRadius, topY + sumeruRadius,
//             SUMERU_GRADIENT_START,
//             SUMERU_GRADIENT_END,
//             Shader.TileMode.CLAMP
//         )

//         strokePaint.color = SUMERU_STROKE_COLOR
//         strokePaint.strokeWidth = sizePx * 0.0055f

//         canvas.drawCircle(center, topY, sumeruRadius, fillPaint)
//         canvas.drawCircle(center, topY, sumeruRadius, strokePaint)

//         return bitmap
//     }
// }

package com.guruvani.widget

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.LinearGradient
import android.graphics.Paint
import android.graphics.Path
import android.graphics.Rect
import android.graphics.RectF
import android.graphics.Shader
import kotlin.math.cos
import kotlin.math.sin

object MalaBitmap {

    private const val TOTAL_BEADS = 36

    private const val BEAD_GRADIENT_START = 0xFFF6EFE5.toInt()
    private const val BEAD_GRADIENT_END = 0xFFDFCDB7.toInt()
    private const val BEAD_STROKE_COLOR = 0xFFBAA48A.toInt()

    private const val SUMERU_GRADIENT_START = 0xFFF2A21E.toInt()
    private const val SUMERU_GRADIENT_END = 0xFFC66800.toInt()
    private const val SUMERU_STROKE_COLOR = 0xFF9E4E00.toInt()

    @Volatile private var cachedRadha: Bitmap? = null

    private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.FILL }
    private val strokePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE }
    private val bitmapPaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG)
    private val clipPath = Path()

    private fun getRadhaBitmap(context: Context): Bitmap? {
        cachedRadha?.takeIf { !it.isRecycled }?.let {
            return it
        }
        return try {
            val resId = context.resources.getIdentifier("radha", "drawable", context.packageName)
            if (resId != 0) {
                val opts =
                        BitmapFactory.Options().apply {
                            inPreferredConfig = Bitmap.Config.ARGB_8888
                        }
                BitmapFactory.decodeResource(context.resources, resId, opts).also {
                    cachedRadha = it
                }
            } else null
        } catch (_: Exception) {
            null
        }
    }

    /**
     * @param sizeDp desired square size in dp (widget ka available size) Density se px khud convert
     * hota hai, isliye har device pe same proportion.
     */
    @Synchronized
    fun render(context: Context, count: Int = 0, sizeDp: Int = 120): Bitmap {
        val density = context.resources.displayMetrics.density
        val sizePx = (sizeDp * density).toInt().coerceAtLeast(64)
        return renderPx(context, sizePx)
    }

    private fun renderPx(context: Context, sizePx: Int): Bitmap {
        val bitmap = Bitmap.createBitmap(sizePx, sizePx, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        val center = sizePx / 2f
        val s = sizePx.toFloat()

        // Geometry sab sizePx ke proportion mein
        val beadSize = s * 0.082f
        val bRadius = beadSize / 2f
        val sumeruSize = beadSize * 1.35f
        val sumeruRadius = sumeruSize / 2f
        val margin = s * 0.035f
        val radius = center - sumeruRadius - margin
        val step = 2.0 * Math.PI / TOTAL_BEADS

        // 1. Radha image: circle ke andar center-crop
        val radhaBmp = getRadhaBitmap(context)
        val imageRadius = s * 0.37f
        if (radhaBmp != null) {
            canvas.save()
            clipPath.reset()
            clipPath.addCircle(center, center, imageRadius, Path.Direction.CCW)
            canvas.clipPath(clipPath)

            val minSide = minOf(radhaBmp.width, radhaBmp.height)
            val srcRect =
                    Rect(
                            (radhaBmp.width - minSide) / 2,
                            (radhaBmp.height - minSide) / 2,
                            (radhaBmp.width + minSide) / 2,
                            (radhaBmp.height + minSide) / 2
                    )
            val dstRect =
                    RectF(
                            center - imageRadius,
                            center - imageRadius,
                            center + imageRadius,
                            center + imageRadius
                    )
            canvas.drawBitmap(radhaBmp, srcRect, dstRect, bitmapPaint)
            canvas.restore()
        }

        // 2. Regular beads
        strokePaint.color = BEAD_STROKE_COLOR
        strokePaint.strokeWidth = s * 0.004f

        for (i in 1 until TOTAL_BEADS) {
            val theta = -Math.PI / 2.0 + i * step
            val bx = center + radius * cos(theta).toFloat()
            val by = center + radius * sin(theta).toFloat()

            fillPaint.shader =
                    LinearGradient(
                            bx - bRadius,
                            by - bRadius,
                            bx + bRadius,
                            by + bRadius,
                            BEAD_GRADIENT_START,
                            BEAD_GRADIENT_END,
                            Shader.TileMode.CLAMP
                    )
            canvas.drawCircle(bx, by, bRadius, fillPaint)
            canvas.drawCircle(bx, by, bRadius, strokePaint)
        }

        // 3. Sumeru bead (12 o'clock)
        val topY = center - radius
        fillPaint.shader =
                LinearGradient(
                        center - sumeruRadius,
                        topY - sumeruRadius,
                        center + sumeruRadius,
                        topY + sumeruRadius,
                        SUMERU_GRADIENT_START,
                        SUMERU_GRADIENT_END,
                        Shader.TileMode.CLAMP
                )
        strokePaint.color = SUMERU_STROKE_COLOR
        strokePaint.strokeWidth = s * 0.0055f
        canvas.drawCircle(center, topY, sumeruRadius, fillPaint)
        canvas.drawCircle(center, topY, sumeruRadius, strokePaint)

        return bitmap
    }
}
