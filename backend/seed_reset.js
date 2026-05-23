require('dotenv').config();
const mongoose = require('mongoose');
const University = require('./models/University');

const peshawarUniversities = [
  {
    name: "University of Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "W-Category (Top 10 National)",
    description: "The University of Peshawar, established in 1950, is the oldest and most prestigious general university in Khyber Pakhtunkhwa. It offers a wide range of programs across natural sciences, social sciences, humanities, law, and pharmacy — serving as the academic backbone of the region.",
    website: "https://www.uop.edu.pk",
    image: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 35,000 - 85,000 / sem",
    lastDate: "Aug 15, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 55,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Software Engineering", fee: "PKR 55,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Mathematics", fee: "PKR 35,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Physics", fee: "PKR 35,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Chemistry", fee: "PKR 35,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS English Literature", fee: "PKR 32,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Psychology", fee: "PKR 35,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Mass Communication", fee: "PKR 38,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BBA (Hons)", fee: "PKR 65,000 / sem", deadline: "Aug 15, 2026" },
      { name: "Pharm-D", fee: "PKR 85,000 / sem", deadline: "Aug 10, 2026" },
      { name: "BS Biotechnology", fee: "PKR 48,000 / sem", deadline: "Aug 15, 2026" },
      { name: "LLB (5-Year)", fee: "PKR 40,000 / sem", deadline: "Aug 15, 2026" }
    ]
  },
  {
    name: "University of Engineering and Technology Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "Top 5 Engineering (National)",
    description: "UET Peshawar, established in 1980, is the premier engineering university of KPK. Recognized nationally for research excellence in electrical, civil, mechanical, and software engineering, it produces the most sought-after engineering graduates in the region.",
    website: "https://www.uetpeshawar.edu.pk",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 60,000 - 110,000 / sem",
    lastDate: "Jul 30, 2026",
    programs: [
      { name: "BSc Electrical Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Civil Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Mechanical Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Computer Systems Engineering", fee: "PKR 55,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Software Engineering", fee: "PKR 58,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Industrial Engineering", fee: "PKR 48,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Telecommunication Engineering", fee: "PKR 50,000 / sem", deadline: "Jul 30, 2026" },
      { name: "MSc Electrical Engineering", fee: "PKR 65,000 / sem", deadline: "Jul 30, 2026" }
    ]
  },
  {
    name: "Khyber Medical University",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "Top Medical (KPK)",
    description: "Khyber Medical University (KMU) is the apex regulatory and teaching medical university of KPK, established in 2007. It governs affiliated medical and dental colleges across the province and offers a wide spectrum of health sciences programs with state-of-the-art clinical training facilities.",
    website: "https://www.kmu.edu.pk",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 50,000 - 150,000 / sem",
    lastDate: "Oct 15, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 65,000 / year", deadline: "Oct 15, 2026" },
      { name: "BDS", fee: "PKR 65,000 / year", deadline: "Oct 15, 2026" },
      { name: "Doctor of Physical Therapy (DPT)", fee: "PKR 75,000 / sem", deadline: "Oct 10, 2026" },
      { name: "BS Nursing", fee: "PKR 50,000 / sem", deadline: "Oct 10, 2026" },
      { name: "Pharm-D", fee: "PKR 90,000 / sem", deadline: "Oct 10, 2026" },
      { name: "BS Medical Lab Technology", fee: "PKR 55,000 / sem", deadline: "Oct 10, 2026" },
      { name: "BS Radiology & Imaging", fee: "PKR 55,000 / sem", deadline: "Oct 10, 2026" },
      { name: "BS Human Nutrition & Dietetics", fee: "PKR 50,000 / sem", deadline: "Oct 10, 2026" }
    ]
  },
  {
    name: "Islamia College Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "Top 15 General (National)",
    description: "Founded in 1913 under the British Raj, Islamia College Peshawar is one of the oldest and most historically significant universities in Pakistan. Its iconic red-brick gothic architecture is a landmark of Peshawar. It offers programs in sciences, arts, commerce, and social sciences.",
    website: "https://www.icp.edu.pk",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 28,000 - 55,000 / sem",
    lastDate: "Sep 05, 2026",
    programs: [
      { name: "BS Physics", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Chemistry", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Mathematics", fee: "PKR 35,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Computer Science", fee: "PKR 42,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS English", fee: "PKR 30,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Pashto", fee: "PKR 28,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Islamic Studies", fee: "PKR 28,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Political Science", fee: "PKR 30,000 / sem", deadline: "Sep 05, 2026" }
    ]
  },
  {
    name: "Institute of Management Sciences Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Semi-Government",
    rankingHEC: "Top 5 Business (National)",
    description: "IMSciences (IMS) Peshawar, established in 1995, is a leading semi-government business and IT institution located in Hayatabad. Ranked among the top business schools nationally, it is renowned for producing high-caliber business professionals and software engineers.",
    website: "https://www.imsciences.edu.pk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 150,000 / sem",
    lastDate: "Jul 20, 2026",
    programs: [
      { name: "BBA", fee: "PKR 85,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Accounting & Finance", fee: "PKR 85,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Data Science", fee: "PKR 95,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Supply Chain Management", fee: "PKR 80,000 / sem", deadline: "Jul 20, 2026" },
      { name: "MBA", fee: "PKR 120,000 / sem", deadline: "Jul 20, 2026" },
      { name: "MS Management Sciences", fee: "PKR 110,000 / sem", deadline: "Jul 20, 2026" }
    ]
  },
  {
    name: "Agriculture University Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "Top Agriculture (National)",
    description: "The Agriculture University Peshawar, established in 1981, is the only dedicated agriculture university in KPK. It plays a vital role in agricultural research, food security, and rural development across the province and the broader region.",
    website: "https://www.aup.edu.pk",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 30,000 - 60,000 / sem",
    lastDate: "Aug 20, 2026",
    programs: [
      { name: "BS Agriculture", fee: "PKR 35,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Food Technology", fee: "PKR 38,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Horticulture", fee: "PKR 35,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Animal Sciences", fee: "PKR 35,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Agricultural Engineering", fee: "PKR 45,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Agronomy", fee: "PKR 32,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Forestry", fee: "PKR 32,000 / sem", deadline: "Aug 20, 2026" },
      { name: "MS Agriculture", fee: "PKR 55,000 / sem", deadline: "Aug 20, 2026" }
    ]
  },
  {
    name: "FAST National University Peshawar Campus",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "Top 3 Computing (National)",
    description: "FAST-NUCES Peshawar Campus is a branch of the prestigious National University of Computer and Emerging Sciences. Renowned for producing elite software engineers and computer scientists, it maintains a highly competitive admission process and industry-aligned curriculum.",
    website: "https://peshawar.nu.edu.pk",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 140,000 - 180,000 / sem",
    lastDate: "Jul 10, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 155,000 / sem", deadline: "Jul 10, 2026" },
      { name: "BS Software Engineering", fee: "PKR 155,000 / sem", deadline: "Jul 10, 2026" },
      { name: "BS Cyber Security", fee: "PKR 160,000 / sem", deadline: "Jul 10, 2026" },
      { name: "BS Artificial Intelligence", fee: "PKR 165,000 / sem", deadline: "Jul 10, 2026" },
      { name: "BE Electrical Engineering", fee: "PKR 155,000 / sem", deadline: "Jul 10, 2026" },
      { name: "MS Computer Science", fee: "PKR 170,000 / sem", deadline: "Jul 10, 2026" }
    ]
  },
  {
    name: "CECOS University",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "CECOS University of IT and Emerging Sciences, established in 1986, is one of the oldest and most established private sector universities in Peshawar. It is well known for technology, software engineering, civil engineering, and biomedical programs.",
    website: "https://www.cecos.edu.pk",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 100,000 - 180,000 / sem",
    lastDate: "Aug 25, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 110,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Software Engineering", fee: "PKR 110,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Civil Engineering", fee: "PKR 130,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Electrical Engineering", fee: "PKR 125,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Biomedical Engineering", fee: "PKR 120,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BBA", fee: "PKR 95,000 / sem", deadline: "Aug 25, 2026" }
    ]
  },
  {
    name: "Abasyn University",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Abasyn University Peshawar is a growing private institution offering programs in pharmaceutical sciences, management, computer science, and engineering. Known for its modern campus in Peshawar and multiple sub-campuses across KPK.",
    website: "https://www.abasyn.edu.pk",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 160,000 / sem",
    lastDate: "Sep 10, 2026",
    programs: [
      { name: "Pharm-D", fee: "PKR 160,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Microbiology", fee: "PKR 80,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BBA", fee: "PKR 75,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Electrical Engineering", fee: "PKR 110,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Civil Engineering", fee: "PKR 115,000 / sem", deadline: "Sep 10, 2026" }
    ]
  },
  {
    name: "Sarhad University of Science and Information Technology",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Sarhad University of Science and Information Technology (SUIT) is a private sector university in Peshawar offering a strong portfolio of engineering, computing, business, and media programs. Its modern campuses cater to thousands of students from across KPK.",
    website: "https://www.suit.edu.pk",
    image: "https://images.unsplash.com/photo-1525926472898-752119eb45a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 70,000 - 130,000 / sem",
    lastDate: "Aug 28, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 80,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BS Software Engineering", fee: "PKR 80,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BS Civil Engineering", fee: "PKR 100,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BS Electrical Engineering", fee: "PKR 100,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BBA", fee: "PKR 70,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BS Media & Communication Studies", fee: "PKR 65,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BS Architecture", fee: "PKR 110,000 / sem", deadline: "Aug 28, 2026" }
    ]
  },
  {
    name: "Iqra National University",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Iqra National University (INU) Peshawar is known for its diverse program offerings including computing, business, fashion design, and civil engineering. It has multiple campuses in Peshawar with modern facilities and industry-linked programs.",
    website: "https://www.inu.edu.pk",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 65,000 - 120,000 / sem",
    lastDate: "Aug 26, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Aug 26, 2026" },
      { name: "BS Software Engineering", fee: "PKR 95,000 / sem", deadline: "Aug 26, 2026" },
      { name: "BBA", fee: "PKR 75,000 / sem", deadline: "Aug 26, 2026" },
      { name: "BS Fashion Design", fee: "PKR 80,000 / sem", deadline: "Aug 26, 2026" },
      { name: "BS Interior Design", fee: "PKR 80,000 / sem", deadline: "Aug 26, 2026" },
      { name: "BS Civil Engineering", fee: "PKR 105,000 / sem", deadline: "Aug 26, 2026" }
    ]
  },
  {
    name: "Shaheed Benazir Bhutto Women University",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "W-Category",
    description: "Shaheed Benazir Bhutto Women University (SBBWU) is the first public sector women's university in KPK, established in 2013 in Peshawar. It empowers women through quality education in sciences, social sciences, bioinformatics, and technology.",
    website: "https://www.sbbwu.edu.pk",
    image: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 25,000 - 50,000 / sem",
    lastDate: "Aug 24, 2026",
    programs: [
      { name: "BS Bioinformatics", fee: "PKR 42,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS Psychology", fee: "PKR 35,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS Economics", fee: "PKR 32,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS Mathematics", fee: "PKR 30,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS Computer Science", fee: "PKR 42,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS Chemistry", fee: "PKR 30,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS English", fee: "PKR 28,000 / sem", deadline: "Aug 24, 2026" }
    ]
  },
  {
    name: "City University of Science and Information Technology",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "City University of Science and Information Technology (CUSIT) Peshawar is highly regarded for its computing curriculum, management programs, and business training. It maintains an active research culture and strong industry connections.",
    website: "https://www.cusit.edu.pk",
    image: "https://images.unsplash.com/photo-1525926472898-752119eb45a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 75,000 - 130,000 / sem",
    lastDate: "Aug 30, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Aug 30, 2026" },
      { name: "BS Software Engineering", fee: "PKR 95,000 / sem", deadline: "Aug 30, 2026" },
      { name: "BS Mathematics", fee: "PKR 55,000 / sem", deadline: "Aug 30, 2026" },
      { name: "BBA", fee: "PKR 75,000 / sem", deadline: "Aug 30, 2026" },
      { name: "MBA", fee: "PKR 100,000 / sem", deadline: "Aug 30, 2026" },
      { name: "BS Information Technology", fee: "PKR 85,000 / sem", deadline: "Aug 30, 2026" }
    ]
  },
  {
    name: "Gandhara University",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Gandhara University Peshawar is a private university focusing primarily on medical and health sciences education. It operates affiliated teaching hospitals and provides clinical training in medicine, dentistry, and allied health programs.",
    website: "https://www.gandhara.edu.pk",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 200,000 / sem",
    lastDate: "Oct 01, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 180,000 / year", deadline: "Oct 01, 2026" },
      { name: "BDS", fee: "PKR 150,000 / year", deadline: "Oct 01, 2026" },
      { name: "Doctor of Physical Therapy (DPT)", fee: "PKR 90,000 / sem", deadline: "Oct 01, 2026" },
      { name: "Pharm-D", fee: "PKR 100,000 / sem", deadline: "Oct 01, 2026" },
      { name: "BS Nursing", fee: "PKR 70,000 / sem", deadline: "Oct 01, 2026" },
      { name: "BS Medical Lab Technology", fee: "PKR 75,000 / sem", deadline: "Oct 01, 2026" }
    ]
  },
  {
    name: "Preston University Peshawar Campus",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "X-Category",
    description: "Preston University Peshawar Campus is the local branch of a US-affiliated private university. It offers affordable and flexible business administration and computer science degrees, attracting working professionals and evening-shift students.",
    website: "https://www.preston.edu.pk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 40,000 - 80,000 / sem",
    lastDate: "Sep 15, 2026",
    programs: [
      { name: "BBA", fee: "PKR 45,000 / sem", deadline: "Sep 15, 2026" },
      { name: "MBA", fee: "PKR 65,000 / sem", deadline: "Sep 15, 2026" },
      { name: "BS Computer Science", fee: "PKR 50,000 / sem", deadline: "Sep 15, 2026" },
      { name: "MS Computer Science", fee: "PKR 70,000 / sem", deadline: "Sep 15, 2026" },
      { name: "MPA (Master of Public Administration)", fee: "PKR 60,000 / sem", deadline: "Sep 15, 2026" }
    ]
  },
  {
    name: "National University of Modern Languages Peshawar Campus",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "W-Category",
    description: "NUML Peshawar Campus is a branch of the prestigious National University of Modern Languages, offering specialized programs in foreign languages, translation, computing, and management sciences. It serves as a key institution for linguistic and cultural education in KPK.",
    website: "https://www.numl.edu.pk",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 30,000 - 65,000 / sem",
    lastDate: "Aug 15, 2026",
    programs: [
      { name: "BS English (Linguistics)", fee: "PKR 35,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Chinese Language", fee: "PKR 38,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Arabic Language", fee: "PKR 32,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Urdu", fee: "PKR 30,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Computer Science", fee: "PKR 55,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Management Sciences", fee: "PKR 45,000 / sem", deadline: "Aug 15, 2026" },
      { name: "MBA", fee: "PKR 65,000 / sem", deadline: "Aug 15, 2026" }
    ]
  },
  {
    name: "Edwardes College Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Edwardes College Peshawar, founded in 1900, is one of the oldest educational institutions in Pakistan. Affiliated with the University of Peshawar, it offers undergraduate and BS programs in sciences, arts, and commerce — known for its rich academic traditions.",
    website: "https://www.edwardescollege.edu.pk",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 20,000 - 45,000 / sem",
    lastDate: "Sep 10, 2026",
    programs: [
      { name: "BS Physics", fee: "PKR 32,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Chemistry", fee: "PKR 32,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Mathematics", fee: "PKR 30,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Computer Science", fee: "PKR 40,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS English", fee: "PKR 28,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Economics", fee: "PKR 30,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Political Science", fee: "PKR 28,000 / sem", deadline: "Sep 10, 2026" }
    ]
  },
  {
    name: "Riphah International University Peshawar Campus",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Riphah International University Peshawar Campus is a branch of the reputable Islamabad-based university. It offers programs in clinical sciences, business, computing, and allied health, with a focus on ethical and values-driven education.",
    website: "https://www.riphah.edu.pk",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 75,000 - 140,000 / sem",
    lastDate: "Aug 20, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 90,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Software Engineering", fee: "PKR 90,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BBA", fee: "PKR 80,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Psychology", fee: "PKR 75,000 / sem", deadline: "Aug 20, 2026" },
      { name: "Doctor of Physical Therapy (DPT)", fee: "PKR 110,000 / sem", deadline: "Aug 20, 2026" },
      { name: "MBA", fee: "PKR 120,000 / sem", deadline: "Aug 20, 2026" },
      { name: "MS Computer Science", fee: "PKR 110,000 / sem", deadline: "Aug 20, 2026" }
    ]
  },
  {
    name: "Northern University Nowshera",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Northern University, located in Nowshera near Peshawar, is a growing private institution offering engineering, computing, and business programs. It is committed to providing quality education at affordable fees to students from across KPK.",
    website: "https://www.nu.edu.pk",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 50,000 - 100,000 / sem",
    lastDate: "Sep 01, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 60,000 / sem", deadline: "Sep 01, 2026" },
      { name: "BS Software Engineering", fee: "PKR 60,000 / sem", deadline: "Sep 01, 2026" },
      { name: "BS Civil Engineering", fee: "PKR 80,000 / sem", deadline: "Sep 01, 2026" },
      { name: "BS Electrical Engineering", fee: "PKR 80,000 / sem", deadline: "Sep 01, 2026" },
      { name: "BBA", fee: "PKR 55,000 / sem", deadline: "Sep 01, 2026" },
      { name: "BS Mathematics", fee: "PKR 45,000 / sem", deadline: "Sep 01, 2026" }
    ]
  },
  {
    name: "Pak-Austria Fachhochschule Institute of Applied Sciences and Technology",
    city: "Haripur",
    province: "KPK",
    type: "Public",
    rankingHEC: "Emerging Center of Excellence",
    description: "PAF-IAST is an innovative public institution established through collaboration between Pakistani and Austrian governments. Located in Haripur, it offers modern, industry-oriented programs in software engineering, artificial intelligence, biomedical, and chemical engineering using European academic frameworks.",
    website: "https://www.paf-iast.edu.pk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 90,000 - 150,000 / sem",
    lastDate: "Aug 12, 2026",
    programs: [
      { name: "BS Software Engineering", fee: "PKR 120,000 / sem", deadline: "Aug 12, 2026" },
      { name: "BS Artificial Intelligence", fee: "PKR 130,000 / sem", deadline: "Aug 12, 2026" },
      { name: "BS Biomedical Sciences", fee: "PKR 95,000 / sem", deadline: "Aug 12, 2026" },
      { name: "BS Chemical Engineering", fee: "PKR 115,000 / sem", deadline: "Aug 12, 2026" },
      { name: "BS Data Science", fee: "PKR 125,000 / sem", deadline: "Aug 12, 2026" },
      { name: "MS Software Engineering", fee: "PKR 140,000 / sem", deadline: "Aug 12, 2026" }
    ]
  }
];

const resetToPeshawarOnly = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('MONGO_URI is not set in .env');

    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Step 1: Wipe everything
    const deleted = await University.deleteMany({});
    console.log(`🗑️  Cleared ${deleted.deletedCount} old records`);

    // Step 2: Insert 20 specific Peshawar universities
    const inserted = await University.insertMany(peshawarUniversities);
    console.log(`✅ Inserted ${inserted.length} Peshawar universities`);

    // Step 3: Verification
    console.log('\n📋 Universities seeded:');
    inserted.forEach((u, i) => {
      console.log(`   ${i + 1}. ${u.name} (${u.type}) — ${u.programs.length} programs`);
    });

    const totalPrograms = inserted.reduce((sum, u) => sum + u.programs.length, 0);
    console.log(`\n📊 Total programs across all universities: ${totalPrograms}`);

    await mongoose.disconnect();
    console.log('\n🎉 Database reset to 20 Peshawar universities successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

resetToPeshawarOnly();
