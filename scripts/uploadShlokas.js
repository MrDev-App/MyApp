/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  GuruVani — Firestore Shloka Upload Script
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 *  Usage:
 *    node scripts/uploadShlokas.js               → Upload all categories
 *    node scripts/uploadShlokas.js --dry-run     → Preview without writing
 *    node scripts/uploadShlokas.js --category through-the-day  → Single category
 *    node scripts/uploadShlokas.js --reset       → Delete + re-upload all
 *
 *  Setup:
 *    1. npm install firebase-admin  (inside /scripts or project root)
 *    2. Download your Firebase Service Account JSON from:
 *       Firebase Console → Project Settings → Service Accounts → Generate new private key
 *    3. Place it at:  scripts/serviceAccountKey.json
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// ─── Config ────────────────────────────────────────────────────────────────
const PROJECT_ID = 'test-9656d';
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'serviceAccountKey.json');
const DRY_RUN = process.argv.includes('--dry-run');
const RESET = process.argv.includes('--reset');
const SINGLE_CATEGORY = (() => {
  const idx = process.argv.indexOf('--category');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

// ─── Firestore Collection Names ────────────────────────────────────────────
const COLLECTIONS = {
  CATEGORIES: 'shloka_categories',   // Category-level docs
  SHLOKAS: 'shlokas',                // Flat shloka collection
};

// ─── Firebase Init ─────────────────────────────────────────────────────────
if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(`
❌ Service account key not found at: ${SERVICE_ACCOUNT_PATH}

Steps to fix:
  1. Go to Firebase Console → Project Settings → Service Accounts
  2. Click "Generate new private key"
  3. Save the file as: scripts/serviceAccountKey.json
`);
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: PROJECT_ID,
});

const db = admin.firestore();

// ─── Static Data ────────────────────────────────────────────────────────────
// This is your existing data mapped to the new multilingual Firestore schema.
// Fields like titleEn/titleHi are converted to { en, hi } maps for flexibility.
const STATIC_SHLOKA_CATEGORIES_DATA = {
  'through-the-day': {
    id: 'through-the-day',
    slug: 'through-the-day',
    order: 1,
    isActive: true,
    name: { en: 'Through the Day', hi: 'दिनचर्या' },
    title: { en: 'Through the Day', hi: 'दिनचर्या' },
    description: {
      en: 'The daily rhythm of devotion, from waking to sleep — rising, bathing, eating, lighting the evening lamp, and rest.',
      hi: 'दैनिक जीवन की प्रार्थनाएं — प्रातः जागरण, स्नान, भोजन, दीप प्रज्वलन एवं शयन तक।',
    },
    imageUrl: 'https://shlokam.org/assets/domains/through-the-day.jpg',
    path: '/shloka/prayers/through-the-day.htm',
    subCategories: [
      { id: 'on-waking', name: { en: 'On Waking Up', hi: 'प्रातः कर-दर्शन' } },
      { id: 'before-stepping-on-ground', name: { en: 'Before Stepping on the Ground', hi: 'भूमि स्पर्श' } },
      { id: 'while-bathing', name: { en: 'While Bathing', hi: 'पवित्र स्नान' } },
      { id: 'on-seeing-the-sun', name: { en: 'On Seeing the Sun', hi: 'सूर्य दर्शन' } },
      { id: 'lighting-the-lamp', name: { en: 'Lighting the Lamp', hi: 'दीप प्रज्वलन' } },
      { id: 'before-eating', name: { en: 'Before Eating', hi: 'भोजन पूर्व' } },
      { id: 'before-new-beginning', name: { en: 'Before Any New Beginning', hi: 'शुभ कार्य आरम्भ' } },
      { id: 'before-studies-exams', name: { en: 'Before Studies & Exams', hi: 'विद्यारम्भ' } },
      { id: 'before-sleep', name: { en: 'Before Sleep', hi: 'शयन प्रार्थना' } },
    ],
  },
  'health-and-protection': {
    id: 'health-and-protection',
    slug: 'health-and-protection',
    order: 2,
    isActive: true,
    name: { en: 'Health & Protection', hi: 'आरोग्य एवं रक्षा' },
    title: { en: 'Health & Protection', hi: 'आरोग्य एवं रक्षा' },
    description: {
      en: 'Prayers for the body and for safety — healing from illness, recovery, and protection from harm.',
      hi: 'आरोग्य, दीर्घायु, गंभीर रोग मुक्ति एवं सुरक्षा हेतु श्लोक।',
    },
    imageUrl: 'https://shlokam.org/assets/domains/health-protection.jpg',
    path: '/shloka/prayers/health-and-protection.htm',
    subCategories: [
      { id: 'for-serious-illness', name: { en: 'For Serious Illness', hi: 'गंभीर रोग निवारण' } },
      { id: 'for-healing-and-recovery', name: { en: 'For Healing & Recovery', hi: 'शीघ्र स्वास्थ्य लाभ' } },
      { id: 'for-long-life', name: { en: 'For a Long Life', hi: 'दीर्घायु' } },
      { id: 'for-childs-health-hp', name: { en: "For a Child's Health", hi: 'बाल स्वास्थ्य' } },
      { id: 'for-eye-problems', name: { en: 'For Eye Trouble', hi: 'नेत्र रोग निवारण' } },
      { id: 'for-speech-problems', name: { en: 'For Speech Problems', hi: 'वाणी दोष निवारण' } },
      { id: 'for-bad-dreams', name: { en: 'Against Bad Dreams', hi: 'दुःस्वप्न निवारण' } },
      { id: 'for-protection', name: { en: 'For Protection from Harm', hi: 'सर्व संकट रक्षा' } },
      { id: 'for-safe-travel', name: { en: 'For Safe Travel', hi: 'सुरक्षित यात्रा' } },
      { id: 'in-a-natural-calamity', name: { en: 'In a Natural Calamity', hi: 'प्राकृतिक आपदा' } },
    ],
  },
  'money-work-studies': {
    id: 'money-work-studies',
    slug: 'money-work-studies',
    order: 3,
    isActive: true,
    name: { en: 'Work & Money', hi: 'कर्म एवं धन-समृद्धि' },
    title: { en: 'Work & Money', hi: 'कर्म एवं धन-समृद्धि' },
    description: {
      en: 'For worldly life and effort — livelihood, wealth, relief from debt, business, and success at work.',
      hi: 'दैनिक आजीविका, व्यापार, धन-धान्य समृद्धि, ऋणमुक्ति एवं कार्यक्षेत्र में सफलता हेतु श्लोक।',
    },
    imageUrl: 'https://shlokam.org/assets/domains/work-money.jpeg',
    path: '/shloka/prayers/money-work-studies.htm',
    subCategories: [],
  },
};

/**
 * Converts a ShlokaVerse from the old flat (En/Hi suffix) format
 * to the new nested multilingual Firestore schema.
 */
function transformVerse(verse, categorySlug, subCategoryId, order) {
  return {
    id: verse.id,
    slug: verse.id,
    categorySlug,
    subCategoryId,
    deity: verse.deity || null,
    order,
    isActive: true,
    isFeatured: false,
    tags: buildTags(verse, categorySlug, subCategoryId),

    // ── Multilingual Content ──────────────────────────────
    title: {
      en: verse.title || '',
      hi: verse.titleHi || verse.title || '',
    },
    sanskrit: verse.sanskrit || '',
    transliteration: verse.transliteration
      ? { en: verse.transliteration, hi: verse.transliteration }
      : null,
    translation: {
      en: verse.translationEn || '',
      hi: verse.translationHi || verse.translationEn || '',
    },
    meaning: {
      en: verse.meaningEn || '',
      hi: verse.meaningHi || verse.meaningEn || '',
    },

    // ── Media ─────────────────────────────────────────────
    media: {
      imageUrl: null,   // Set CDN URL here after uploading images
      audioUrl: null,   // Set CDN URL here after uploading audio
      durationSeconds: null,
    },

    // ── Search & Meta ────────────────────────────────────
    searchKeywords: buildSearchKeywords(verse),
    meta: {
      source: verse.link ? extractSourceName(verse.link) : 'shlokam.org',
      link: verse.link || null,
    },

    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

/**
 * Converts a ShlokaSubItem to a Firestore sub-category document.
 */
function transformSubCategory(subItem, categorySlug, order) {
  return {
    id: subItem.id,
    slug: subItem.id,
    categorySlug,
    order,
    isActive: true,
    deity: subItem.deity || null,

    name: {
      en: subItem.nameEn || '',
      hi: subItem.nameHi || '',
    },
    headerTitle: {
      en: subItem.headerTitleEn || '',
      hi: subItem.headerTitleHi || '',
    },
    subtitle: {
      en: subItem.subtitleEn || '',
      hi: subItem.subtitleHi || '',
    },
    description: {
      en: subItem.descriptionEn || '',
      hi: subItem.descriptionHi || '',
    },

    // Featured verse shown on sub-category card
    featuredVerse: subItem.sanskrit
      ? {
          sanskrit: subItem.sanskrit,
          meaning: { en: subItem.meaningEn || '', hi: subItem.meaningHi || '' },
          transliteration: subItem.transliteration || null,
        }
      : null,

    media: {
      imageUrl: subItem.imageUrl || null,
    },

    verseCount: subItem.verses ? subItem.verses.length : 0,

    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildTags(verse, categorySlug, subCategoryId) {
  const tags = new Set();
  if (categorySlug) categorySlug.split('-').forEach(t => tags.add(t));
  if (subCategoryId) subCategoryId.split('-').forEach(t => tags.add(t));
  if (verse.deity) tags.add(verse.deity.toLowerCase());
  return Array.from(tags).filter(Boolean);
}

function buildSearchKeywords(verse) {
  const keywords = new Set();
  const addWords = (str) => {
    if (!str) return;
    str.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2).forEach(w => keywords.add(w));
  };
  addWords(verse.title);
  addWords(verse.titleHi);
  if (verse.id) keywords.add(verse.id.toLowerCase());
  if (verse.deity) keywords.add(verse.deity.toLowerCase());
  return Array.from(keywords).slice(0, 30); // Firestore array-contains limit
}

function extractSourceName(link) {
  try { return new URL(link).hostname.replace('www.', ''); } catch { return 'shlokam.org'; }
}

// ─── Upload Functions ───────────────────────────────────────────────────────

async function deleteCollection(collectionPath) {
  const collRef = db.collection(collectionPath);
  const snapshot = await collRef.limit(500).get();
  if (snapshot.empty) return;
  const batch = db.batch();
  snapshot.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  console.log(`🗑  Deleted ${snapshot.docs.length} docs from ${collectionPath}`);
  // Recurse if more remain
  if (snapshot.docs.length >= 500) await deleteCollection(collectionPath);
}

async function uploadCategory(slug, categoryMeta) {
  const categoryDoc = {
    ...categoryMeta,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (DRY_RUN) {
    console.log(`\n[DRY-RUN] 📁 Would write CATEGORY: ${COLLECTIONS.CATEGORIES}/${slug}`);
    console.log('  Data:', JSON.stringify(categoryDoc, null, 2).slice(0, 200), '...');
    return;
  }

  await db.collection(COLLECTIONS.CATEGORIES).doc(slug).set(categoryDoc, { merge: true });
  console.log(`✅ Category uploaded: ${slug}`);
}

async function uploadShlokas(rawCategoryData) {
  if (!rawCategoryData || !rawCategoryData.items) return;

  const categorySlug = rawCategoryData.slug || rawCategoryData.id.replace('occasion-', '');
  let totalVerses = 0;

  // Use batched writes (max 500 per batch)
  let batch = db.batch();
  let batchCount = 0;

  for (let si = 0; si < rawCategoryData.items.length; si++) {
    const subItem = rawCategoryData.items[si];

    // 1. Upload sub-category document
    const subCatDoc = transformSubCategory(subItem, categorySlug, si + 1);
    const subCatPath = `${COLLECTIONS.CATEGORIES}/${categorySlug}/sub_categories/${subItem.id}`;

    if (DRY_RUN) {
      console.log(`\n[DRY-RUN] 📂 Would write SUB_CATEGORY: ${subCatPath}`);
    } else {
      const subCatRef = db.doc(subCatPath);
      batch.set(subCatRef, subCatDoc, { merge: true });
      batchCount++;
    }

    // 2. Upload each verse to flat `shlokas` collection
    if (subItem.verses) {
      for (let vi = 0; vi < subItem.verses.length; vi++) {
        const verse = subItem.verses[vi];
        const verseDoc = transformVerse(verse, categorySlug, subItem.id, vi + 1);

        if (DRY_RUN) {
          console.log(`  [DRY-RUN] 📜 Would write SHLOKA: ${COLLECTIONS.SHLOKAS}/${verse.id}`);
          console.log(`    title.en: "${verseDoc.title.en}"`);
          console.log(`    title.hi: "${verseDoc.title.hi}"`);
          console.log(`    tags: [${verseDoc.tags.join(', ')}]`);
          console.log(`    searchKeywords count: ${verseDoc.searchKeywords.length}`);
        } else {
          const shlokaRef = db.collection(COLLECTIONS.SHLOKAS).doc(verse.id);
          batch.set(shlokaRef, verseDoc, { merge: true });
          batchCount++;
        }

        totalVerses++;

        // Commit batch if approaching limit
        if (!DRY_RUN && batchCount >= 490) {
          await batch.commit();
          console.log(`  💾 Committed batch of ${batchCount} writes`);
          batch = db.batch();
          batchCount = 0;
        }
      }
    }
  }

  // Commit remaining
  if (!DRY_RUN && batchCount > 0) {
    await batch.commit();
    console.log(`  💾 Committed final batch of ${batchCount} writes`);
  }

  if (!DRY_RUN) {
    console.log(`✅ Shlokas uploaded for [${categorySlug}]: ${totalVerses} verses across ${rawCategoryData.items.length} sub-categories`);
  }

  return totalVerses;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  GuruVani — Firestore Shloka Uploader');
  console.log(`  Project: ${PROJECT_ID}`);
  console.log(`  Mode: ${DRY_RUN ? '🔍 DRY-RUN (no writes)' : RESET ? '🔄 RESET + Upload' : '📤 Upload / Merge'}`);
  if (SINGLE_CATEGORY) console.log(`  Category filter: ${SINGLE_CATEGORY}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // ── Step 1: Load the FULL raw static data from shlokaService.ts ──────────
  // NOTE: We require the compiled JS. Run `tsc` first if needed,
  // or copy the STATIC_SHLOKA_CATEGORIES_DATA object directly into this file.
  // For now, we import from a JSON snapshot generated from the TS file.

  let rawData;
  const jsonSnapshotPath = path.join(__dirname, 'shlokaData.json');

  if (fs.existsSync(jsonSnapshotPath)) {
    console.log(`📂 Loading data from: ${jsonSnapshotPath}`);
    rawData = JSON.parse(fs.readFileSync(jsonSnapshotPath, 'utf-8'));
  } else {
    console.warn(`⚠️  shlokaData.json not found. Using built-in category metadata only.`);
    console.warn(`   Run: node scripts/exportShlokaData.js  to generate it first.\n`);
    rawData = {};
  }

  // ── Step 2: Reset if requested ───────────────────────────────────────────
  if (RESET && !DRY_RUN) {
    console.log('🗑  Resetting Firestore collections...');
    await deleteCollection(COLLECTIONS.CATEGORIES);
    await deleteCollection(COLLECTIONS.SHLOKAS);
  }

  // ── Step 3: Upload each category ─────────────────────────────────────────
  const categoriesToProcess = SINGLE_CATEGORY
    ? { [SINGLE_CATEGORY]: STATIC_SHLOKA_CATEGORIES_DATA[SINGLE_CATEGORY] }
    : STATIC_SHLOKA_CATEGORIES_DATA;

  let totalUploadedVerses = 0;

  for (const [slug, categoryMeta] of Object.entries(categoriesToProcess)) {
    if (!categoryMeta) {
      console.error(`❌ Category not found: ${slug}`);
      continue;
    }

    console.log(`\n🔷 Processing category: ${slug}`);

    // Upload category metadata
    await uploadCategory(slug, categoryMeta);

    // Upload shlokas from raw data (full content with verses)
    if (rawData[slug]) {
      const count = await uploadShlokas(rawData[slug]);
      totalUploadedVerses += count || 0;
    } else {
      console.warn(`  ⚠️  No raw verse data found for "${slug}". Upload shlokaData.json first.`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Done! Total verses written: ${totalUploadedVerses}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ Upload failed:', err.message);
  console.error(err.stack);
  process.exit(1);
});
