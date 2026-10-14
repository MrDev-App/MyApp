package com.guruvani.widget

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import kotlin.math.cos
import kotlin.math.sin

object MalaBitmap {
    const val RENDER_PX = 360

    private const val GURU_BEAD_COLOR = 0xFFD49B22.toInt()
    private const val GURU_BORDER_COLOR = 0xFFFFF1A8.toInt()
    private const val UNFILLED_BORDER_COLOR = 0xFFC9BCAD.toInt()
    private const val UNFILLED_BG_COLOR = 0x22B7A897

    // Reusable cached canvas & bitmap to avoid GC allocation on every tap
    @Volatile private var cachedCanvasBitmap: Bitmap? = null
    @Volatile private var cachedCanvas: Canvas? = null

    // Cached pre-scaled bead bitmap
    @Volatile private var motiBitmap: Bitmap? = null

    // Pre-allocated reusable Paint objects
    private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.FILL }
    private val strokePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE }

    private fun getBeadBitmap(context: Context, targetSize: Int): Bitmap? {
        val current = motiBitmap
        if (current != null && current.width == targetSize && !current.isRecycled) {
            return current
        }
        return try {
            val resId =
                    context.resources.getIdentifier("mala_moti", "drawable", context.packageName)
            if (resId != 0) {
                val original = BitmapFactory.decodeResource(context.resources, resId)
                if (original != null) {
                    val scaled = Bitmap.createScaledBitmap(original, targetSize, targetSize, true)
                    motiBitmap = scaled
                    scaled
                } else null
            } else null
        } catch (e: Exception) {
            null
        }
    }

    @Synchronized
    fun render(context: Context, count: Int, sizePx: Int = RENDER_PX): Bitmap {
        var bitmap = cachedCanvasBitmap
        var canvas = cachedCanvas

        if (bitmap == null || bitmap.width != sizePx || bitmap.isRecycled || canvas == null) {
            bitmap = Bitmap.createBitmap(sizePx, sizePx, Bitmap.Config.ARGB_8888)
            canvas = Canvas(bitmap)
            cachedCanvasBitmap = bitmap
            cachedCanvas = canvas
        } else {
            bitmap.eraseColor(Color.TRANSPARENT)
        }

        strokePaint.strokeWidth = sizePx * 0.0035f
        strokePaint.color = UNFILLED_BORDER_COLOR

        val center = sizePx / 2f
        val ringRadius = center - sizePx * 0.075f
        val beadRadius = sizePx * 0.0165f
        val beadDiameter = (beadRadius * 2).toInt().coerceAtLeast(4)
        val total = WidgetStore.BEADS // 108

        val beadImg = getBeadBitmap(context, beadDiameter)

        for (i in 0 until total) {

            // Counter-clockwise fill starting from 12 o'clock (-90 degrees)
            val angle = Math.toRadians(-90.0 - (i * 360.0 / total))
            val x = center + ringRadius * cos(angle).toFloat()
            val y = center + ringRadius * sin(angle).toFloat()

            if (i == 0) {

                fillPaint.color = GURU_BEAD_COLOR
                canvas.drawCircle(x, y, beadRadius * 1.5f, fillPaint)
                strokePaint.color = GURU_BORDER_COLOR
                strokePaint.strokeWidth = sizePx * 0.004f
                canvas.drawCircle(x, y, beadRadius * 1.5f, strokePaint)
                strokePaint.color = UNFILLED_BORDER_COLOR
                strokePaint.strokeWidth = sizePx * 0.0035f
            } else {
                val isFilled = i <= count
                if (isFilled) {
                    if (beadImg != null) {
                        canvas.drawBitmap(beadImg, x - beadRadius, y - beadRadius, null)
                    } else {
                        fillPaint.color = 0xFF7A3E1D.toInt()
                        canvas.drawCircle(x, y, beadRadius, fillPaint)
                    }
                } else {
                    fillPaint.color = UNFILLED_BG_COLOR
                    canvas.drawCircle(x, y, beadRadius, fillPaint)
                    canvas.drawCircle(x, y, beadRadius, strokePaint)
                }
            }
        }
        return bitmap
    }
}
