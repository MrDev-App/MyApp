package com.guruvani.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.SizeF
import android.util.TypedValue
import android.widget.RemoteViews
import com.guruvani.R
import kotlin.math.min

open class JapWidgetProvider : AppWidgetProvider() {

    protected open val isWide: Boolean = false

    override fun onUpdate(context: Context, mgr: AppWidgetManager, ids: IntArray) {
        val count = WidgetStore.count(context)
        for (id in ids) {
            renderWidget(context, mgr, id, count, isWide)
        }
    }

    override fun onAppWidgetOptionsChanged(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int,
        newOptions: Bundle
    ) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions)
        renderWidget(context, appWidgetManager, appWidgetId, WidgetStore.count(context), isWide)
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_TAP) {
            val count = WidgetStore.increment(context)
            refreshAll(context, count)
        }
    }

    companion object {
        const val ACTION_TAP = "com.guruvani.widget.TAP"

        fun refreshAll(context: Context, count: Int = WidgetStore.count(context)) {
            val mgr = AppWidgetManager.getInstance(context)
            val smallIds = mgr.getAppWidgetIds(ComponentName(context, JapWidgetProvider::class.java))
            for (id in smallIds) {
                renderWidget(context, mgr, id, count, isWide = false)
            }
            try {
                val wideIds = mgr.getAppWidgetIds(ComponentName(context, JapWidgetWideProvider::class.java))
                for (id in wideIds) {
                    renderWidget(context, mgr, id, count, isWide = true)
                }
            } catch (_: Exception) {}
        }

        fun renderWidget(context: Context, mgr: AppWidgetManager, id: Int, count: Int, isWide: Boolean) {
            val todayCount = WidgetStore.todayCount(context)
            val todayMala = WidgetStore.todayMala(context)
            val lang = WidgetStore.language(context).lowercase()
            val isEnglish = lang.startsWith("en")

            val options = mgr.getAppWidgetOptions(id)
            val minWidth = options?.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH) ?: (if (isWide) 270 else 130)
            val minHeight = options?.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT) ?: 130
            val maxWidth = options?.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH) ?: minWidth
            val maxHeight = options?.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT) ?: minHeight

            val views: RemoteViews = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                // Android 12+: provide size-mapped responsive layouts
                val smallViews = buildViews(context, id, R.layout.widget_small, count, todayCount, todayMala, isEnglish, widthDp = 130, heightDp = 130)
                val compactWideViews = buildViews(context, id, R.layout.widget_medium, count, todayCount, todayMala, isEnglish, widthDp = 210, heightDp = 130)
                val regularWideViews = buildViews(context, id, R.layout.widget_medium, count, todayCount, todayMala, isEnglish, widthDp = 270, heightDp = 130)

                RemoteViews(
                    mapOf(
                        SizeF(100f, 100f) to smallViews,
                        SizeF(190f, 100f) to compactWideViews,
                        SizeF(250f, 100f) to regularWideViews
                    )
                )
            } else {
                // Pre-Android 12: pick layout based on reported min width
                val isWideSize = minWidth >= 185
                val layoutRes = if (isWideSize) R.layout.widget_medium else R.layout.widget_small
                val widthDp = if (isWideSize) maxWidth else minWidth
                val heightDp = min(minHeight, maxHeight)
                buildViews(context, id, layoutRes, count, todayCount, todayMala, isEnglish, widthDp = widthDp, heightDp = heightDp)
            }

            mgr.updateAppWidget(id, views)
        }

        private fun buildViews(
            context: Context,
            appWidgetId: Int,
            layoutRes: Int,
            count: Int,
            todayCount: Int,
            todayMala: Int,
            isEnglish: Boolean,
            widthDp: Int,
            heightDp: Int = 130
        ): RemoteViews {
            val views = RemoteViews(context.packageName, layoutRes)

            // Render Mala ring bitmap
            val ringBitmap = MalaBitmap.render(context, count)
            views.setImageViewBitmap(R.id.ring, ringBitmap)

            // Tap to chant text
            val tapText = if (isEnglish) "Tap to Chant" else "जप के लिए टैप करें"
            views.setTextViewText(R.id.tv_tap_chant, tapText)

            // Use the smaller dimension as the "side" reference for font scaling
            // This mirrors iOS approach where side = min(geo.size.width, geo.size.height)
            val sideDp = if (layoutRes == R.layout.jap_widget_wide) {
                heightDp.coerceAtLeast(100)
            } else {
                minOf(widthDp, heightDp).coerceAtLeast(100)
            }

            if (layoutRes == R.layout.widget_medium) {
                // Wide widget: set stats text
                val todayCountTitle = if (isEnglish) "Today Total\nCount" else "आज कुल\nजाप"
                val todayMalaTitle = if (isEnglish) "Today Total\nMala" else "आज कुल\nमाला"
                views.setTextViewText(R.id.tv_today_count_title, todayCountTitle)
                views.setTextViewText(R.id.tv_today_mala_title, todayMalaTitle)
                views.setTextViewText(R.id.tv_today_count, todayCount.toString())
                views.setTextViewText(R.id.tv_today_mala, todayMala.toString())

                // Scale fonts proportionally based on side (height) like iOS does with side * factor
                // iOS uses: title ~ side * 0.038, value ~ side * 0.054, tap ~ side * 0.042, om ~ side * 0.054
                val titleSp = (sideDp * 0.085f).coerceIn(9f, 13f)
                val valueSp = (sideDp * 0.120f).coerceIn(13f, 20f)
                val tapSp = (sideDp * 0.085f).coerceIn(9f, 12f)
                val omSp = (sideDp * 0.130f).coerceIn(14f, 21f)

                views.setTextViewTextSize(R.id.tv_today_count_title, TypedValue.COMPLEX_UNIT_SP, titleSp)
                views.setTextViewTextSize(R.id.tv_today_mala_title, TypedValue.COMPLEX_UNIT_SP, titleSp)
                views.setTextViewTextSize(R.id.tv_today_count, TypedValue.COMPLEX_UNIT_SP, valueSp)
                views.setTextViewTextSize(R.id.tv_today_mala, TypedValue.COMPLEX_UNIT_SP, valueSp)
                views.setTextViewTextSize(R.id.tv_tap_chant, TypedValue.COMPLEX_UNIT_SP, tapSp)
                views.setTextViewTextSize(R.id.tv_om, TypedValue.COMPLEX_UNIT_SP, omSp)
            } else {
                // Small/square widget: scale om and tap based on side
                val tapSp = (sideDp * 0.085f).coerceIn(9f, 12f)
                val omSp = (sideDp * 0.140f).coerceIn(14f, 22f)
                views.setTextViewTextSize(R.id.tv_tap_chant, TypedValue.COMPLEX_UNIT_SP, tapSp)
                views.setTextViewTextSize(R.id.tv_om, TypedValue.COMPLEX_UNIT_SP, omSp)
            }

            // Click on pill opens JapScreen in app
            val openIntent = Intent(Intent.ACTION_VIEW, Uri.parse("guruvani://japScreen")).apply {
                setPackage(context.packageName)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            val openPendingIntent = PendingIntent.getActivity(
                context,
                appWidgetId + 1000,
                openIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.pill, openPendingIntent)

            // Click on ring/container increments count
            val tapIntent = Intent(context, JapWidgetProvider::class.java).apply {
                action = ACTION_TAP
            }
            val tapPendingIntent = PendingIntent.getBroadcast(
                context,
                appWidgetId,
                tapIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.ring_container, tapPendingIntent)

            return views
        }
    }
}
