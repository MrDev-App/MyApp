package com.guruvani.widget

import android.content.Context

object WidgetStore {
    const val PREFS = "SharedStorage"
    const val KEY_COUNT = "count"
    const val KEY_PENDING = "widgetTapsPending"
    const val KEY_TODAY_COUNT = "todayCount"
    const val KEY_TODAY_MALA = "todayMala"
    const val KEY_NAME = "japName"
    const val KEY_MANTRA_ID = "mantraId"
    const val KEY_LANGUAGE = "appLanguage"
    const val KEY_LAST_DATE = "widgetLastDate"
    const val BEADS = 108

    private fun todayDateString(): String {
        val sdf = java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.US)
        return sdf.format(java.util.Date())
    }

    private fun prefs(context: Context) =
        context.applicationContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    fun getString(context: Context, key: String): String? = prefs(context).getString(key, null)

    fun setString(context: Context, key: String, value: String) {
        val editor = prefs(context).edit().putString(key, value)
        if (key == KEY_TODAY_COUNT) {
            editor.putString(KEY_LAST_DATE, todayDateString())
        }
        editor.apply()
    }

    fun count(context: Context): Int =
        (getString(context, KEY_COUNT)?.toIntOrNull() ?: 0).coerceIn(0, BEADS - 1)

    fun todayCount(context: Context): Int {
        val p = prefs(context)
        val lastDate = p.getString(KEY_LAST_DATE, null)
        if (lastDate != null && lastDate != todayDateString()) {
            return 0
        }
        return p.getString(KEY_TODAY_COUNT, null)?.toIntOrNull() ?: 0
    }

    fun todayMala(context: Context): Int {
        val p = prefs(context)
        val lastDate = p.getString(KEY_LAST_DATE, null)
        if (lastDate != null && lastDate != todayDateString()) {
            return 0
        }
        return p.getString(KEY_TODAY_MALA, null)?.toIntOrNull() ?: (todayCount(context) / BEADS)
    }

    fun language(context: Context): String =
        getString(context, KEY_LANGUAGE) ?: "hi"

    fun name(context: Context): String =
        getString(context, KEY_NAME)?.takeIf { it.isNotBlank() } ?: "राधा"

    @Synchronized
    fun increment(context: Context): Int {
        val p = prefs(context)
        val todayStr = todayDateString()
        val lastDate = p.getString(KEY_LAST_DATE, null)

        val current = p.getString(KEY_COUNT, null)?.toIntOrNull() ?: 0
        val pending = p.getString(KEY_PENDING, null)?.toIntOrNull() ?: 0
        val today = if (lastDate != null && lastDate != todayStr) 0 else (p.getString(KEY_TODAY_COUNT, null)?.toIntOrNull() ?: 0)

        val next = (current + 1) % BEADS
        val nextPending = pending + 1
        val nextToday = today + 1
        val nextTodayMala = nextToday / BEADS

        p.edit()
            .putString(KEY_LAST_DATE, todayStr)
            .putString(KEY_COUNT, next.toString())
            .putString(KEY_PENDING, nextPending.toString())
            .putString(KEY_TODAY_COUNT, nextToday.toString())
            .putString(KEY_TODAY_MALA, nextTodayMala.toString())
            .apply()
        return next
    }
}
