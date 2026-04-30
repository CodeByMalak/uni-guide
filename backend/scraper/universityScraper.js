/**
 * universityScraper.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Scrapes KPK university data from official websites.
 * Falls back to curated static data when a site is unreachable / structure
 * changes.  Each university has its own scraper + its own fallback object so
 * partial failures never wipe the whole result set.
 *
 * Exports: scrapeUniversities() → Promise<UniEntry[]>
 * ─────────────────────────────────────────────────────────────────────────────
 */

const axios = require('axios');
const cheerio = require('cheerio');
const University = require('../models/University');

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip excess whitespace / newlines from scraped text */
const clean = (str = '') => str.replace(/\s+/g, ' ').trim();

/** Safe axios GET – returns null on any network / HTTP error */
const safeFetch = async (url, timeoutMs = 10_000) => {
  try {
    const { data } = await axios.get(url, {
      timeout: timeoutMs,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    return data;
  } catch (err) {
    console.warn(`[scraper] Could not fetch ${url}: ${err.message}`);
    return null;
  }
};

// ─── Fallback (curated) data ───────────────────────────────────────────────────
//     Updated manually to reflect 2024–25 academic year information.
//     These values are used whenever live scraping fails for a university.

const FALLBACK_DATA = [
  // ── University of Peshawar ────────────────────────────────────────────────
  {
    name: 'University of Peshawar',
    city: 'Peshawar',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.uop.edu.pk',
    programs: [
      'BS Computer Science',
      'BS Software Engineering',
      'BS Information Technology',
      'BS Mathematics',
      'BS Physics',
      'BS Chemistry',
      'BS Botany',
      'BS Zoology',
      'BS Psychology',
      'BS Economics',
      'BS Political Science',
      'BS English Literature',
      'BS Urdu',
      'BS Islamic Studies',
      'MBA',
      'MPA',
      'MSc Statistics',
      'MSc Geology',
      'LLB',
      'PhD (various disciplines)',
    ],
    fees: '35,000 – 65,000 PKR per semester (varies by program)',
    lastDate: 'August 2025 (Spring: February 2026)',
    source: 'fallback',
  },

  // ── Agriculture University Peshawar ───────────────────────────────────────
  {
    name: 'The University of Agriculture Peshawar',
    city: 'Peshawar',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.aup.edu.pk',
    programs: [
      'BS Agriculture',
      'BS Horticulture',
      'BS Food Science & Technology',
      'BS Agricultural Engineering',
      'BS Environmental Science',
      'BS Forestry & Wildlife Management',
      'BS Animal Husbandry',
      'BS Agronomy',
      'BS Plant Protection',
      'BS Rural Development',
      'MSc Agriculture',
      'MSc Horticulture',
      'MSc Food Science',
      'PhD Agriculture',
      'PhD Environmental Science',
    ],
    fees: '30,000 – 55,000 PKR per semester',
    lastDate: 'September 2025 (Spring: March 2026)',
    source: 'fallback',
  },

  // ── Islamia College Peshawar ──────────────────────────────────────────────
  {
    name: 'Islamia College Peshawar',
    city: 'Peshawar',
    province: 'KPK',
    type: 'Semi-Government',
    website: 'https://www.icp.edu.pk',
    programs: [
      'BS English',
      'BS Urdu',
      'BS Islamic Studies',
      'BS History',
      'BS Political Science',
      'BS Economics',
      'BS Physics',
      'BS Chemistry',
      'BS Mathematics',
      'BS Botany',
      'BS Zoology',
      'BS Commerce',
      'MSc English',
      'MSc History',
      'MSc Economics',
      'MA Urdu',
      'MA Islamic Studies',
    ],
    fees: '20,000 – 40,000 PKR per semester',
    lastDate: 'August 2025 (Spring: February 2026)',
    source: 'fallback',
  },

  // ── Khyber Medical University ─────────────────────────────────────────────
  {
    name: 'Khyber Medical University',
    city: 'Peshawar',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.kmu.edu.pk',
    programs: [
      'MBBS',
      'BDS',
      'BS Nursing',
      'BS Pharmacy (Pharm-D)',
      'BS Medical Lab Technology',
      'BS Physical Therapy',
      'BS Radiological Sciences',
      'BS Dental Technology',
      'BS Public Health',
      'MPH (Master of Public Health)',
      'MPhil Pathology',
      'MPhil Physiology',
      'PhD Medicine',
    ],
    fees: '80,000 – 180,000 PKR per semester (merit / self-finance)',
    lastDate: 'July 2025 (MDCAT based)',
    source: 'fallback',
  },

  // ── University of Engineering & Technology Peshawar ───────────────────────
  {
    name: 'University of Engineering & Technology Peshawar',
    city: 'Peshawar',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.uetpeshawar.edu.pk',
    programs: [
      'BE Civil Engineering',
      'BE Electrical Engineering',
      'BE Mechanical Engineering',
      'BE Chemical Engineering',
      'BE Computer Systems Engineering',
      'BE Telecommunication Engineering',
      'BE Industrial Engineering',
      'BS Architecture',
      'BS City & Regional Planning',
      'MS Civil Engineering',
      'MS Electrical Engineering',
      'PhD Engineering',
    ],
    fees: '40,000 – 80,000 PKR per semester',
    lastDate: 'August 2025 (Entry test + NTS required)',
    source: 'fallback',
  },

  // ── COMSATS University Abbottabad Campus ──────────────────────────────────
  {
    name: 'COMSATS University Islamabad – Abbottabad Campus',
    city: 'Abbottabad',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.cuiatd.edu.pk',
    programs: [
      'BS Computer Science',
      'BS Software Engineering',
      'BS Electrical Engineering',
      'BS Mechanical Engineering',
      'BS Environmental Sciences',
      'BS Bioinformatics',
      'BS Mathematics',
      'MBA',
      'MS Computer Science',
      'MS Electrical Engineering',
      'PhD Computer Science',
    ],
    fees: '45,000 – 85,000 PKR per semester',
    lastDate: 'August 2025',
    source: 'fallback',
  },

  // ── Abdul Wali Khan University Mardan ────────────────────────────────────
  {
    name: 'Abdul Wali Khan University Mardan',
    city: 'Mardan',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.awkum.edu.pk',
    programs: [
      'BS Computer Science',
      'BS Software Engineering',
      'BS Chemistry',
      'BS Physics',
      'BS Mathematics',
      'BS Botany',
      'BS Zoology',
      'BS Economics',
      'BS English',
      'BS Pashto',
      'BS Political Science',
      'BS Islamic Studies',
      'MBA',
      'MSc Economics',
      'LLB',
    ],
    fees: '25,000 – 50,000 PKR per semester',
    lastDate: 'September 2025',
    source: 'fallback',
  },

  // ── Hazara University Mansehra ────────────────────────────────────────────
  {
    name: 'Hazara University Mansehra',
    city: 'Mansehra',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.hu.edu.pk',
    programs: [
      'BS Computer Science',
      'BS Chemistry',
      'BS Physics',
      'BS Mathematics',
      'BS Botany',
      'BS Zoology',
      'BS Economics',
      'BS English',
      'BS Education',
      'BS Management Sciences',
      'MS Chemistry',
      'MPhil Education',
      'PhD Botany',
    ],
    fees: '22,000 – 45,000 PKR per semester',
    lastDate: 'September 2025',
    source: 'fallback',
  },

  // ── Gomal University D.I. Khan ────────────────────────────────────────────
  {
    name: 'Gomal University',
    city: 'Dera Ismail Khan',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.gu.edu.pk',
    programs: [
      'MBBS',
      'Pharm-D',
      'BDS',
      'BS Computer Science',
      'BS Chemistry',
      'BS Physics',
      'BS Mathematics',
      'BS Botany',
      'BS Zoology',
      'BS Economics',
      'BS Agriculture',
      'MBA',
      'LLB',
      'MPhil Chemistry',
      'PhD Biology',
    ],
    fees: '25,000 – 70,000 PKR per semester',
    lastDate: 'August 2025',
    source: 'fallback',
  },

  // ── University of Malakand ────────────────────────────────────────────────
  {
    name: 'University of Malakand',
    city: 'Chakdara',
    province: 'KPK',
    type: 'Public',
    website: 'https://www.uom.edu.pk',
    programs: [
      'BS Computer Science',
      'BS Software Engineering',
      'BS Electrical Engineering',
      'BS Chemistry',
      'BS Physics',
      'BS Mathematics',
      'BS Botany',
      'BS Zoology',
      'BS Economics',
      'BS English',
      'BS Management Sciences',
      'MBA',
      'MSc Computer Science',
    ],
    fees: '20,000 – 48,000 PKR per semester',
    lastDate: 'September 2025',
    source: 'fallback',
  },

  // ── Sarhad University Peshawar ────────────────────────────────────────────
  {
    name: 'Sarhad University of Science & Information Technology',
    city: 'Peshawar',
    province: 'KPK',
    type: 'Private',
    website: 'https://www.suit.edu.pk',
    programs: [
      'BS Computer Science',
      'BS Software Engineering',
      'BS Information Technology',
      'BS Electrical Engineering',
      'BS Mechanical Engineering',
      'BS Civil Engineering',
      'BS Business Administration (BBA)',
      'MBA',
      'BS English',
      'BS Mass Communication',
      'MS Computer Science',
      'MS Electrical Engineering',
    ],
    fees: '50,000 – 90,000 PKR per semester',
    lastDate: 'Rolling admissions – check website',
    source: 'fallback',
  },

  // ── Gandhara University Peshawar ──────────────────────────────────────────
  {
    name: 'Gandhara University Peshawar',
    city: 'Peshawar',
    province: 'KPK',
    type: 'Private',
    website: 'https://www.gandhara.edu.pk',
    programs: [
      'MBBS',
      'BDS',
      'Pharm-D',
      'BS Nursing',
      'BS Medical Lab Technology',
      'BS Physical Therapy',
      'BS Computer Science',
      'MBA',
    ],
    fees: '90,000 – 250,000 PKR per semester',
    lastDate: 'July 2025 (MDCAT based)',
    source: 'fallback',
  },
];

// ─── Individual live scrapers ──────────────────────────────────────────────────
//     Each returns a partial UniEntry or null.  On null → fallback kicks in.

/**
 * Try to extract programs listed on UOP's academics page.
 * Returns a merged object built from the fallback base + any live details.
 */
const scrapeUOP = async (fallback) => {
  const html = await safeFetch('https://www.uop.edu.pk/academics');
  if (!html) return null;

  const $ = cheerio.load(html);
  const programs = new Set(fallback.programs); // start from fallback list

  // UOP lists departments / programs in <a> tags or list items
  $('a, li').each((_, el) => {
    const text = clean($(el).text());
    if (
      text.length > 5 &&
      text.length < 80 &&
      /^(BS|BE|MS|MSc|MBA|MPA|PhD|LLB|BBA|MA|MPhil)/i.test(text)
    ) {
      programs.add(text);
    }
  });

  return { ...fallback, programs: [...programs], source: 'scraped' };
};

/**
 * Try to pull admission dates from AUP's admissions page.
 */
const scrapeAUP = async (fallback) => {
  const html = await safeFetch('https://www.aup.edu.pk/admissions');
  if (!html) return null;

  const $ = cheerio.load(html);
  let lastDate = fallback.lastDate;

  // Look for date-like patterns near the word "last" or "deadline"
  $('p, li, td, span').each((_, el) => {
    const text = clean($(el).text());
    if (/last\s*date|deadline|closing/i.test(text) && text.length < 200) {
      lastDate = text;
      return false; // break
    }
  });

  return { ...fallback, lastDate, source: 'scraped' };
};

/**
 * Generic scraper – tries to pick up program names and fees from any page.
 */
const scrapeGeneric = async (fallback) => {
  const html = await safeFetch(fallback.website);
  if (!html) return null;

  const $ = cheerio.load(html);
  const programs = new Set(fallback.programs);

  $('a, li, td, p').each((_, el) => {
    const text = clean($(el).text());
    if (
      text.length > 5 &&
      text.length < 80 &&
      /^(BS|BE|MS|MSc|MBA|MPA|PhD|LLB|BBA|MA|MPhil|MBBS|BDS)/i.test(text)
    ) {
      programs.add(text);
    }
  });

  return {
    ...fallback,
    programs: [...programs],
    source: programs.size > fallback.programs.length ? 'scraped' : 'fallback',
  };
};

// ─── Map: university name → live scraper function ─────────────────────────────
const SCRAPERS = {
  'University of Peshawar': scrapeUOP,
  'The University of Agriculture Peshawar': scrapeAUP,
  // All others use the generic scraper
};

// ─── Main export ───────────────────────────────────────────────────────────────

/**
 * scrapeUniversities()
 *
 * 1. Iterates over every entry in FALLBACK_DATA.
 * 2. Calls the dedicated (or generic) live scraper.
 * 3. Falls back gracefully if scraping fails.
 * 4. Upserts all results into MongoDB (by name – deduplication).
 * 5. Returns the final array of university objects that were saved.
 */
const scrapeUniversities = async () => {
  const results = [];

  for (const fallback of FALLBACK_DATA) {
    let entry = null;

    try {
      const scraper = SCRAPERS[fallback.name] || scrapeGeneric;
      entry = await scraper(fallback);
    } catch (err) {
      console.warn(`[scraper] Error for "${fallback.name}": ${err.message}`);
    }

    // Always guarantee we have something to save
    if (!entry) {
      console.log(`[scraper] Using fallback for: ${fallback.name}`);
      entry = { ...fallback };
    }

    // Clean all program strings
    entry.programs = [...new Set(entry.programs.map(clean).filter(Boolean))];

    results.push(entry);
  }

  // ── Upsert into MongoDB ──────────────────────────────────────────────────
  if (results.length > 0) {
    const ops = results.map((uni) => ({
      updateOne: {
        filter: { name: uni.name },           // dedup key
        update: { $set: uni },
        upsert: true,
      },
    }));

    try {
      const bulk = await University.bulkWrite(ops, { ordered: false });
      console.log(
        `[scraper] MongoDB: ${bulk.upsertedCount} inserted, ` +
        `${bulk.modifiedCount} updated, ${bulk.matchedCount} matched.`
      );
    } catch (dbErr) {
      console.error('[scraper] MongoDB bulkWrite error:', dbErr.message);
    }
  }

  return results;
};

module.exports = scrapeUniversities;