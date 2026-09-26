# GuruVani — Firestore Seed

Uploads all shloka data to Firestore in a production-ready schema.

## Quick Start

```bash
# 1. Install dependencies
cd firestore-seed
npm install

# 2. Add your service account key
#    Firebase Console → Project Settings → Service Accounts → Generate new private key
#    Save file as: firestore-seed/serviceAccountKey.json

# 3. Preview first (no writes)
npm run seed:dry

# 4. Upload all data
npm run seed

# 5. Upload a single category (for testing)
node index.js --category through-the-day

# 6. Wipe + re-seed everything
npm run seed:reset
```

---

## Firestore Schema

### `shloka_categories/{slug}` — Category document

```
shloka_categories/through-the-day
├── id              "occasion-through-the-day"
├── slug            "through-the-day"
├── order           1
├── isActive        true
├── titleEn         "Through the Day"
├── titleHi         "दिनचर्या"
├── descriptionEn   "The daily rhythm of devotion..."
├── descriptionHi   "दैनिक जीवन की प्रार्थनाएं..."
├── imageUrl        "https://shlokam.org/..."
├── path            "/shloka/prayers/through-the-day.htm"
├── updatedAt       <Timestamp>
└── items[]
    ├── [0]
    │   ├── id              "on-waking"
    │   ├── nameEn          "On Waking Up"
    │   ├── nameHi          "प्रातः कर-दर्शन"
    │   ├── headerTitleEn   "Shlokas for Waking Up"
    │   ├── headerTitleHi   "प्रातः जागरण श्लोक"
    │   ├── subtitleEn      "..."
    │   ├── subtitleHi      "..."
    │   ├── descriptionEn   "..."
    │   ├── descriptionHi   "..."
    │   ├── sanskrit        "कराग्रे वसते..."
    │   ├── meaningEn       "..."
    │   ├── meaningHi       "..."
    │   ├── deity           "Laxmi"
    │   ├── imageUrl        null
    │   ├── verseCount      6
    │   └── verses[]
    │       ├── id, title, titleHi
    │       ├── sanskrit, transliteration
    │       ├── translationEn, translationHi
    │       ├── meaningEn, meaningHi
    │       ├── deity, link
```

### `shloka_verses/{verseId}` — Flat verse collection

```
shloka_verses/gayatri-mantra
├── id              "gayatri-mantra"
├── categorySlug    "through-the-day"
├── subCategoryId   "on-seeing-the-sun"
├── order           2
├── title           "Gayatri Mantra"
├── titleHi         "गायत्री महामंत्र"
├── sanskrit        "ॐ भूर्भुवः स्वः..."
├── transliteration "oṃ bhūrbhuvaḥ..."
├── translationEn   "We meditate upon..."
├── translationHi   "हम उस प्राणस्वरूप..."
├── meaningEn       "..."
├── meaningHi       "..."
├── deity           "Surya"
├── link            "https://shlokam.org/..."
├── tags            ["through-the-day", "on-seeing-the-sun", "surya"]
└── updatedAt       <Timestamp>
```

---

## How App Fetches Data

The existing `getShlokaCategoryDetail()` in `shlokaService.ts` already handles this:

1. **Check MMKV cache** → instant
2. **Fetch from** `shloka_categories/{slug}` → online
3. **Fallback** to static bundled data → offline

No changes needed to the app — just seed the data and tap any category card.

---

## Categories Available

| Slug | Title (En) | Title (Hi) |
|------|-----------|-----------|
| `through-the-day` | Through the Day | दिनचर्या |
| `health-and-protection` | Health & Protection | आरोग्य एवं रक्षा |

> More categories from `shlokaService.ts` can be added to `SHLOKA_DATA` array in `index.js`

---

## Disk Space Warning

If your Mac disk is full, clean up first:
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
xcrun simctl delete unavailable
```
