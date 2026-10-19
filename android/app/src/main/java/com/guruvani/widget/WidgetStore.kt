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
    const val BEADS = 108

    private fun prefs(context: Context) =
        context.applicationContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    fun getString(context: Context, key: String): String? = prefs(context).getString(key, null)

    fun setString(context: Context, key: String, value: String) {
        prefs(context).edit().putString(key, value).apply()
    }

    fun count(context: Context): Int =
        (getString(context, KEY_COUNT)?.toIntOrNull() ?: 0).coerceIn(0, BEADS - 1)

    fun todayCount(context: Context): Int =
        getString(context, KEY_TODAY_COUNT)?.toIntOrNull() ?: 0

    fun todayMala(context: Context): Int =
        getString(context, KEY_TODAY_MALA)?.toIntOrNull() ?: (todayCount(context) / BEADS)

    fun language(context: Context): String =
        getString(context, KEY_LANGUAGE) ?: "hi"

    fun name(context: Context): String =
        getString(context, KEY_NAME)?.takeIf { it.isNotBlank() } ?: "राधा"

    @Synchronized
    fun increment(context: Context): Int {
        val p = prefs(context)
        val current = p.getString(KEY_COUNT, null)?.toIntOrNull() ?: 0
        val pending = p.getString(KEY_PENDING, null)?.toIntOrNull() ?: 0
        val today = p.getString(KEY_TODAY_COUNT, null)?.toIntOrNull() ?: 0

        val next = (current + 1) % BEADS
        val nextPending = pending + 1
        val nextToday = today + 1
        val nextTodayMala = nextToday / BEADS

        p.edit()
            .putString(KEY_COUNT, next.toString())
            .putString(KEY_PENDING, nextPending.toString())
            .putString(KEY_TODAY_COUNT, nextToday.toString())
            .putString(KEY_TODAY_MALA, nextTodayMala.toString())
            .apply()
        return next
    }
}
