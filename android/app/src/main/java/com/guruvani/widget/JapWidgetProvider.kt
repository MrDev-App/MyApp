package com.guruvani.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.RemoteViews
import com.guruvani.R

class JapWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(context: Context, mgr: AppWidgetManager, ids: IntArray) {
        val count = WidgetStore.count(context)
        for (id in ids) {
            render(context, mgr, id, count)
        }
    }

    override fun onAppWidgetOptionsChanged(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int,
            newOptions: Bundle
    ) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions)
        render(context, appWidgetManager, appWidgetId, WidgetStore.count(context))
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
            val ids = mgr.getAppWidgetIds(ComponentName(context, JapWidgetProvider::class.java))
            for (id in ids) {
                render(context, mgr, id, count)
            }
        }

        private fun render(context: Context, mgr: AppWidgetManager, id: Int, count: Int) {
            val views = RemoteViews(context.packageName, R.layout.jap_widget)

            // Dynamic size adaptation based on user resize in host launcher
            val options = mgr.getAppWidgetOptions(id)
            val minHeight = options?.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT) ?: 140
            val minWidth = options?.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH) ?: 140

            // Responsive mantra display:
            // width <= 200, height <= 250 -> 1 line with ellipsis (...)
            // bigger than width = 200, height = 250 -> show full mantra
            val isBiggerThan200x250 = minWidth > 200 && minHeight > 250
            if (isBiggerThan200x250) {
                views.setInt(R.id.pill, "setMaxLines", 10)
            } else {
                views.setInt(R.id.pill, "setMaxLines", 1)
            }

            // Responsively size typography if user makes widget very small or very large
            if (minHeight < 110 || minWidth < 110) {
                views.setTextViewTextSize(R.id.count, android.util.TypedValue.COMPLEX_UNIT_SP, 24f)
                views.setTextViewTextSize(R.id.target, android.util.TypedValue.COMPLEX_UNIT_SP, 11f)
                views.setTextViewTextSize(R.id.pill, android.util.TypedValue.COMPLEX_UNIT_SP, 11f)
            } else if (minHeight > 220 && minWidth > 220) {
                views.setTextViewTextSize(R.id.count, android.util.TypedValue.COMPLEX_UNIT_SP, 46f)
                views.setTextViewTextSize(R.id.target, android.util.TypedValue.COMPLEX_UNIT_SP, 18f)
                views.setTextViewTextSize(R.id.pill, android.util.TypedValue.COMPLEX_UNIT_SP, 13f)
            } else {
                views.setTextViewTextSize(R.id.count, android.util.TypedValue.COMPLEX_UNIT_SP, 36f)
                views.setTextViewTextSize(R.id.target, android.util.TypedValue.COMPLEX_UNIT_SP, 14f)
                views.setTextViewTextSize(R.id.pill, android.util.TypedValue.COMPLEX_UNIT_SP, 11f)
            }

            // Update text views
            views.setTextViewText(R.id.count, count.toString())
            views.setTextViewText(R.id.pill, "${WidgetStore.name(context).uppercase()} ✏️")

            // Render bead ring
            val bitmap = MalaBitmap.render(context, count, MalaBitmap.RENDER_PX)
            views.setImageViewBitmap(R.id.ring, bitmap)

            // Tap PendingIntent strictly on ring_container (NOT the entire root card)
            val tapIntent =
                    Intent(context, JapWidgetProvider::class.java).apply { action = ACTION_TAP }
            val tapPendingIntent =
                    PendingIntent.getBroadcast(
                            context,
                            id,
                            tapIntent,
                            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                    )
            views.setOnClickPendingIntent(R.id.ring_container, tapPendingIntent)

            // Activity PendingIntent strictly on pill
            val openIntent =
                    Intent(Intent.ACTION_VIEW, Uri.parse("guruvani://japScreen")).apply {
                        setPackage(context.packageName)
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
            val openPendingIntent =
                    PendingIntent.getActivity(
                            context,
                            id + 1000,
                            openIntent,
                            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                    )
            views.setOnClickPendingIntent(R.id.pill, openPendingIntent)

            // Push RemoteViews update directly to AppWidgetManager
            mgr.updateAppWidget(id, views)
        }
    }
}
