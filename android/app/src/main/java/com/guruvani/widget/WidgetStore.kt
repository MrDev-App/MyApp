package com.guruvani.widget

import android.content.Context

object WidgetStore {
        const val PREFS = "SharedStorage"
        const val KEY_COUNT = "count"
        const val KEY_PENDING = "widgetTapsPending"
        const val KEY_NAME = "japName"
        const val KEY_MANTRA_ID = "mantraId"
        const val BEADS = 108

        private fun prefs(context: Context) =
                context.applicationContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

        fun getString(context: Context, key: String): String? = prefs(context).getString(key, null)

        fun setString(context: Context, key: String, value: String) {
                prefs(context).edit().putString(key, value).apply()
        }

        fun count(context: Context): Int =
                (getString(context, KEY_COUNT)?.toIntOrNull() ?: 0).coerceIn(0, BEADS - 1)

        fun name(context: Context): String =
                getString(context, KEY_NAME)?.takeIf { it.isNotBlank() } ?: "जप"

        @Synchronized
        fun increment(context: Context): Int {
                val p = prefs(context)
                val current = p.getString(KEY_COUNT, null)?.toIntOrNull() ?: 0
                val pending = p.getString(KEY_PENDING, null)?.toIntOrNull() ?: 0
                val next = (current + 1) % BEADS
                p.edit()
                        .putString(KEY_COUNT, next.toString())
                        .putString(KEY_PENDING, (pending + 1).toString())
                        .apply()
                return next
        }
}
