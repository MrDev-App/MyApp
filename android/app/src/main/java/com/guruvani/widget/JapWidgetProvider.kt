package com.guruvani.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.RemoteViews
import com.guruvani.R

class JapWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        super.onUpdate(context, appWidgetManager, appWidgetIds)
        for (id in appWidgetIds) {
            updateWidget(context, appWidgetManager, id)
        }
    }

    companion object {
        fun updateWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
            val count = WidgetStore.count(context)
            val lang = WidgetStore.language(context).lowercase()
            val isEnglish = lang.startsWith("en")

            val pillText = if (isEnglish) "Tap to Chant" else "जप के लिए टैप करें"
            val malaBitmap = MalaBitmap.render(context, count, 350)

            val views = RemoteViews(context.packageName, R.layout.widget_jap_small).apply {
                setImageViewBitmap(R.id.widget_small_mala_image, malaBitmap)
                setTextViewText(R.id.widget_small_pill_text, pillText)

                // When clicked, open app and navigate to Jap Screen only
                val openIntent = Intent(Intent.ACTION_VIEW, Uri.parse("guruvani://japScreen")).apply {
                    setPackage(context.packageName)
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                }
                val openPendingIntent = PendingIntent.getActivity(
                    context,
                    100,
                    openIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                )

                setOnClickPendingIntent(R.id.widget_small_pill, openPendingIntent)
                setOnClickPendingIntent(R.id.widget_small_root, openPendingIntent)
                setOnClickPendingIntent(R.id.widget_small_mala_image, openPendingIntent)
            }

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }

        fun refreshAll(context: Context) {
            val appContext = context.applicationContext
            val appWidgetManager = AppWidgetManager.getInstance(appContext)

            // Update Small widgets (2x2)
            val smallIds = appWidgetManager.getAppWidgetIds(ComponentName(appContext, JapWidgetProvider::class.java))
            for (id in smallIds) {
                updateWidget(appContext, appWidgetManager, id)
            }

            // Update Wide widgets (4x2)
            val wideIds = appWidgetManager.getAppWidgetIds(ComponentName(appContext, JapWidgetWideProvider::class.java))
            for (id in wideIds) {
                JapWidgetWideProvider.updateWidget(appContext, appWidgetManager, id)
            }
        }
    }
}
