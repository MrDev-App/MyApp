// package com.guruvani.widget

// import android.app.PendingIntent
// import android.appwidget.AppWidgetManager
// import android.appwidget.AppWidgetProvider
// import android.content.Context
// import android.content.Intent
// import android.net.Uri
// import android.widget.RemoteViews
// import com.guruvani.R

// class JapWidgetWideProvider : AppWidgetProvider() {

//     override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds:
// IntArray) {
//         super.onUpdate(context, appWidgetManager, appWidgetIds)
//         for (id in appWidgetIds) {
//             updateWidget(context, appWidgetManager, id)
//         }
//     }

//     companion object {
//         fun updateWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int)
// {
//             val count = WidgetStore.count(context)
//             val todayCount = WidgetStore.todayCount(context)
//             val todayMala = WidgetStore.todayMala(context)
//             val lang = WidgetStore.language(context).lowercase()
//             val isEnglish = lang.startsWith("en")

//             val pillText = if (isEnglish) "Tap to Chant" else "जप के लिए टैप करें"
//             val todayCountTitle = if (isEnglish) "Today Total\nCount" else "आज कुल\nजाप"
//             val todayMalaTitle = if (isEnglish) "Today Total\nMala" else "आज कुल\nमाला"

//             val malaBitmap = MalaBitmap.render(context, count, 350)

//             val views = RemoteViews(context.packageName, R.layout.widget_jap_medium).apply {
//                 setImageViewBitmap(R.id.widget_wide_mala_image, malaBitmap)
//                 setTextViewText(R.id.widget_wide_today_count, todayCount.toString())
//                 setTextViewText(R.id.widget_wide_today_mala, todayMala.toString())
//                 setTextViewText(R.id.widget_wide_today_count_title, todayCountTitle)
//                 setTextViewText(R.id.widget_wide_today_mala_title, todayMalaTitle)
//                 setTextViewText(R.id.widget_wide_pill_text, pillText)

//                 // When click on this button, open app and navigate to Jap Screen only
//                 val openIntent = Intent(Intent.ACTION_VIEW,
// Uri.parse("guruvani://japScreen")).apply {
//                     setPackage(context.packageName)
//                     flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
//                 }
//                 val openPendingIntent = PendingIntent.getActivity(
//                     context,
//                     200,
//                     openIntent,
//                     PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
//                 )

//                 setOnClickPendingIntent(R.id.widget_wide_pill, openPendingIntent)
//                 setOnClickPendingIntent(R.id.widget_wide_root, openPendingIntent)
//                 setOnClickPendingIntent(R.id.widget_wide_mala_image, openPendingIntent)
//             }

//             appWidgetManager.updateAppWidget(appWidgetId, views)
//         }
//     }
// }

package com.guruvani.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.RemoteViews
import com.guruvani.R

class JapWidgetWideProvider : AppWidgetProvider() {

    override fun onUpdate(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetIds: IntArray
    ) {
        super.onUpdate(context, appWidgetManager, appWidgetIds)
        for (id in appWidgetIds) {
            updateWidget(context, appWidgetManager, id)
        }
    }

    override fun onAppWidgetOptionsChanged(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int,
            newOptions: Bundle
    ) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions)
        updateWidget(context, appWidgetManager, appWidgetId)
    }

    companion object {
        fun updateWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
            val count = WidgetStore.count(context)
            val todayCount = WidgetStore.todayCount(context)
            val todayMala = WidgetStore.todayMala(context)
            val lang = WidgetStore.language(context).lowercase()
            val isEnglish = lang.startsWith("en")

            val pillText = if (isEnglish) "Tap to Chant" else "जप के लिए टैप करें"
            val todayCountTitle = if (isEnglish) "Today Total\nCount" else "आज कुल\nजाप"
            val todayMalaTitle = if (isEnglish) "Today Total\nMala" else "आज कुल\nमाला"

            // Current (min) size: resize par bhi sahi value deta hai
            val options = appWidgetManager.getAppWidgetOptions(appWidgetId)
            val heightDp = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 110)
            val widthDp = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 280)

            // Ring: height aur width dono ke hisaab se, jo chhota ho wahi
            val ringDp = minOf(heightDp * 0.8f, widthDp * 0.44f).toInt().coerceIn(40, 200)
            val malaBitmap = MalaBitmap.render(context, count, ringDp)

            val views =
                    RemoteViews(context.packageName, R.layout.widget_jap_medium).apply {
                        setImageViewBitmap(R.id.widget_wide_mala_image, malaBitmap)
                        setTextViewText(R.id.widget_wide_today_count, todayCount.toString())
                        setTextViewText(R.id.widget_wide_today_mala, todayMala.toString())
                        setTextViewText(R.id.widget_wide_today_count_title, todayCountTitle)
                        setTextViewText(R.id.widget_wide_today_mala_title, todayMalaTitle)
                        setTextViewText(R.id.widget_wide_pill_text, pillText)

                        // Tap par Jap screen khulegi
                        val openIntent =
                                Intent(Intent.ACTION_VIEW, Uri.parse("guruvani://japScreen"))
                                        .apply {
                                            setPackage(context.packageName)
                                            flags =
                                                    Intent.FLAG_ACTIVITY_NEW_TASK or
                                                            Intent.FLAG_ACTIVITY_CLEAR_TOP
                                        }
                        val openPendingIntent =
                                PendingIntent.getActivity(
                                        context,
                                        200,
                                        openIntent,
                                        PendingIntent.FLAG_UPDATE_CURRENT or
                                                PendingIntent.FLAG_IMMUTABLE
                                )

                        setOnClickPendingIntent(R.id.widget_wide_pill, openPendingIntent)
                        setOnClickPendingIntent(R.id.widget_wide_root, openPendingIntent)
                        setOnClickPendingIntent(R.id.widget_wide_mala_image, openPendingIntent)
                    }

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
