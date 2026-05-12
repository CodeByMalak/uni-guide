const fs = require('fs');
const path = require('path');

const scraperPath = path.join(__dirname, 'backend', 'scraper', 'universityScraper.js');
let content = fs.readFileSync(scraperPath, 'utf8');

const kpkUniversities = [
  "University of Peshawar|Peshawar|Public",
  "The University of Agriculture Peshawar|Peshawar|Public",
  "Islamia College Peshawar|Peshawar|Semi-Government",
  "Khyber Medical University|Peshawar|Public",
  "University of Engineering & Technology Peshawar|Peshawar|Public",
  "COMSATS University Islamabad – Abbottabad Campus|Abbottabad|Public",
  "Abdul Wali Khan University Mardan|Mardan|Public",
  "Hazara University Mansehra|Mansehra|Public",
  "Gomal University|Dera Ismail Khan|Public",
  "University of Malakand|Chakdara|Public",
  "Sarhad University of Science & Information Technology|Peshawar|Private",
  "Gandhara University Peshawar|Peshawar|Private",
  "City University of Science and Information Technology|Peshawar|Private",
  "CECOS University of IT and Emerging Sciences|Peshawar|Private",
  "Abasyn University|Peshawar|Private",
  "Preston University|Kohat|Private",
  "Kohat University of Science and Technology (KUST)|Kohat|Public",
  "University of Science & Technology|Bannu|Public",
  "University of Swabi|Swabi|Public",
  "University of Haripur|Haripur|Public",
  "Bacha Khan University|Charsadda|Public",
  "Shaheed Benazir Bhutto Women University|Peshawar|Public",
  "Khushal Khan Khattak University|Karak|Public",
  "Shuhada-e-Army Public School University of Technology|Nowshera|Public",
  "Women University Mardan|Mardan|Public",
  "Women University Swabi|Swabi|Public",
  "Abbottabad University of Science and Technology (AUST)|Abbottabad|Public",
  "Ayub Medical College|Abbottabad|Public",
  "Gomal Medical College|Dera Ismail Khan|Public",
  "Pak International Medical College|Peshawar|Private",
  "Peshawar Medical College|Peshawar|Private",
  "Rehman Medical Institute|Peshawar|Private",
  "Kabir Medical College|Peshawar|Private",
  "Jinnah Medical College|Peshawar|Private",
  "Frontier Medical College|Abbottabad|Private",
  "Women Medical College|Abbottabad|Private",
  "Saidu Medical College|Swat|Public",
  "Bacha Khan Medical College|Mardan|Public",
  "Khyber Girls Medical College|Peshawar|Public",
  "Qurtuba University of Science and Information Technology|Peshawar|Private",
  "Northern University|Nowshera|Private",
  "Brains Institute|Peshawar|Private",
  "IQRA National University|Peshawar|Private",
  "FAST NUCES|Peshawar|Private",
  "Pak-Austria Fachhochschule Institute of Applied Sciences and Technology|Haripur|Public",
  "FATA University|FR Kohat|Public",
  "University of Swat|Swat|Public",
  "University of Chitral|Chitral|Public",
  "University of Dir|Dir|Public",
  "University of Lakki Marwat|Lakki Marwat|Public",
  "University of Buner|Buner|Public",
  "Institute of Management Sciences (IMSciences)|Peshawar|Public",
  "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI)|Topi|Private",
  "NUST College of Aeronautical Engineering|Risalpur|Public",
  "National Institute of Transportation|Nowshera|Public",
  "State Centre of Excellence in Geology|Peshawar|Public",
  "Bannu Medical College|Bannu|Public",
  "Nowshera Medical College|Nowshera|Public",
  "Gajju Khan Medical College|Swabi|Public",
  "Loralai University|Loralai|Public"
];

const fallbackData = kpkUniversities.map((uniString) => {
  const [name, city, type] = uniString.split('|');
  return `  {
    name: '${name.replace(/'/g, "\\'")}',
    city: '${city.replace(/'/g, "\\'")}',
    province: 'KPK',
    type: '${type}',
    website: 'https://www.example.edu.pk',
    programs: [
      'BS Computer Science',
      'BS Physics',
      'BS Mathematics',
      'BS English',
      'BBA'
    ],
    fees: '30,000 – 60,000 PKR per semester',
    lastDate: 'August 2025',
    source: 'fallback',
  }`;
}).join(',\n');

const newFallbackBlock = `const FALLBACK_DATA = [\n${fallbackData}\n];`;

// Replace everything between const FALLBACK_DATA = [ and ];
const regex = /const FALLBACK_DATA = \[[\s\S]*?\];/;
content = content.replace(regex, newFallbackBlock);

fs.writeFileSync(scraperPath, content, 'utf8');
console.log('Successfully added 60 universities to fallback data.');
