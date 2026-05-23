require('dotenv').config();
const mongoose = require('mongoose');
const University = require('./models/University');

const richUniversities = [
  {
    name: "University of Peshawar",
    city: "Peshawar", province: "KPK", type: "Public",
    rankingHEC: "W-Category (Top 10 National)",
    description: "The University of Peshawar is a historic public research university located in Peshawar, Khyber Pakhtunkhwa. It is a premier institution offering comprehensive education across arts, humanities, social, and natural sciences.",
    website: "https://www.uop.edu.pk",
    image: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 45,000 - 85,000 / sem", lastDate: "Aug 15, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 55,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Software Engineering", fee: "PKR 55,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS English Literature", fee: "PKR 35,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BBA (Hons)", fee: "PKR 65,000 / sem", deadline: "Aug 15, 2026" },
      { name: "Pharm-D", fee: "PKR 85,000 / sem", deadline: "Aug 10, 2026" },
      { name: "BS Biotechnology", fee: "PKR 48,000 / sem", deadline: "Aug 15, 2026" }
    ]
  },
  {
    name: "UET Peshawar",
    city: "Peshawar", province: "KPK", type: "Public",
    rankingHEC: "Top 5 Engineering (National)",
    description: "The University of Engineering and Technology, Peshawar is a premier engineering institution recognized nationally for outstanding research and technical education in electrical, civil, mechanical, and software fields.",
    website: "https://www.uetpeshawar.edu.pk",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 60,000 - 110,000 / sem", lastDate: "Jul 30, 2026",
    programs: [
      { name: "BSc Electrical Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Civil Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Mechanical Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Computer Systems Engineering", fee: "PKR 55,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Software Engineering", fee: "PKR 58,000 / sem", deadline: "Jul 30, 2026" }
    ]
  },
  {
    name: "Islamia College University",
    city: "Peshawar", province: "KPK", type: "Public",
    rankingHEC: "Top 15 General (National)",
    description: "Founded in 1913, Islamia College University is a historic general university. Known for its gorgeous gothic campus architecture, it delivers exceptional studies in general sciences, literature, and social studies.",
    website: "https://www.icp.edu.pk",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 40,000 - 70,000 / sem", lastDate: "Sep 05, 2026",
    programs: [
      { name: "BS Physics", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Chemistry", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Mathematics", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Islamic Studies", fee: "PKR 30,000 / sem", deadline: "Sep 05, 2026" }
    ]
  },
  {
    name: "Khyber Medical University",
    city: "Peshawar", province: "KPK", type: "Public",
    rankingHEC: "Top Medical (KPK)",
    description: "Khyber Medical University is the main administrative medical college hub in KPK, regulating advanced nursing, physical therapy, pharmaceutical, and clinical surgical sciences.",
    website: "https://www.kmu.edu.pk",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 50,000 - 150,000 / sem", lastDate: "Oct 15, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 65,000 / year", deadline: "Oct 15, 2026" },
      { name: "BDS", fee: "PKR 65,000 / year", deadline: "Oct 15, 2026" },
      { name: "Doctor of Physical Therapy (DPT)", fee: "PKR 75,000 / sem", deadline: "Oct 10, 2026" },
      { name: "BS Nursing", fee: "PKR 50,000 / sem", deadline: "Oct 10, 2026" }
    ]
  },
  {
    name: "IMSciences Peshawar",
    city: "Peshawar", province: "KPK", type: "Semi-Government",
    rankingHEC: "Top 5 Business (National)",
    description: "The Institute of Management Sciences is a state-of-the-art business and IT academy located in Hayatabad, Peshawar, recognized for grooming top financial, business, and software analytical graduates.",
    website: "https://www.imsciences.edu.pk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 150,000 / sem", lastDate: "Jul 20, 2026",
    programs: [
      { name: "BBA", fee: "PKR 85,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Accounting & Finance", fee: "PKR 85,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Data Science", fee: "PKR 95,000 / sem", deadline: "Jul 20, 2026" }
    ]
  },
  {
    name: "CECOS University",
    city: "Peshawar", province: "KPK", type: "Private",
    rankingHEC: "W-Category",
    description: "CECOS University of IT and Emerging Sciences is a premier private sector university in Peshawar providing leading technology, software, civil engineering, and biotech streams.",
    website: "https://www.cecos.edu.pk",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 120,000 - 200,000 / sem", lastDate: "Aug 25, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 110,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Civil Engineering", fee: "PKR 130,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Software Engineering", fee: "PKR 110,000 / sem", deadline: "Aug 25, 2026" }
    ]
  },
  {
    name: "Abasyn University",
    city: "Peshawar", province: "KPK", type: "Private",
    rankingHEC: "W-Category",
    description: "Abasyn University is a rapidly expanding private campus in Peshawar offering standard programs across computer science, management sciences, and pharmaceutical fields.",
    website: "https://www.abasyn.edu.pk",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 100,000 - 180,000 / sem", lastDate: "Sep 10, 2026",
    programs: [
      { name: "Pharm-D", fee: "PKR 160,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Microbiology", fee: "PKR 80,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BBA", fee: "PKR 75,000 / sem", deadline: "Sep 10, 2026" }
    ]
  },
  {
    name: "City University of Science and IT",
    city: "Peshawar", province: "KPK", type: "Private",
    rankingHEC: "W-Category",
    description: "CUSIT Peshawar is highly regarded for its fast-paced computing curriculums, management disciplines, and high-impact business training seminars.",
    website: "https://www.cusit.edu.pk",
    image: "https://images.unsplash.com/photo-1525926472898-752119eb45a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 90,000 - 160,000 / sem", lastDate: "Aug 30, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Aug 30, 2026" },
      { name: "BS Mathematics", fee: "PKR 55,000 / sem", deadline: "Aug 30, 2026" },
      { name: "MBA", fee: "PKR 85,000 / sem", deadline: "Aug 30, 2026" }
    ]
  },
  {
    name: "GIKI Topi",
    city: "Swabi", province: "KPK", type: "Private",
    rankingHEC: "Top 3 Engineering (National)",
    description: "The Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI) is a world-class center of excellence located in Topi, Swabi. It is globally recognized for high-caliber engineering, robotics, and physics sciences.",
    website: "https://www.giki.edu.pk",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 350,000 - 550,000 / sem", lastDate: "Jul 15, 2026",
    programs: [
      { name: "BS Computer Engineering", fee: "PKR 450,000 / sem", deadline: "Jul 15, 2026" },
      { name: "BS Mechanical Engineering", fee: "PKR 450,000 / sem", deadline: "Jul 15, 2026" },
      { name: "BS Materials Engineering", fee: "PKR 420,000 / sem", deadline: "Jul 15, 2026" },
      { name: "BS Artificial Intelligence", fee: "PKR 480,000 / sem", deadline: "Jul 15, 2026" }
    ]
  },
  {
    name: "COMSATS Abbottabad",
    city: "Abbottabad", province: "KPK", type: "Public",
    rankingHEC: "Top 5 IT (National)",
    description: "COMSATS University Islamabad (Abbottabad Campus) combines the peace of a mountainous resort campus with world-grade labs for computing, biotechnology, and electrical sciences.",
    website: "https://cuiatd.edu.pk",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 75,000 - 130,000 / sem", lastDate: "Jul 25, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 98,000 / sem", deadline: "Jul 25, 2026" },
      { name: "BS Software Engineering", fee: "PKR 98,000 / sem", deadline: "Jul 25, 2026" },
      { name: "BS Biotechnology", fee: "PKR 70,000 / sem", deadline: "Jul 25, 2026" },
      { name: "BS Electrical Engineering", fee: "PKR 90,000 / sem", deadline: "Jul 25, 2026" }
    ]
  },
  {
    name: "Abdul Wali Khan University Mardan",
    city: "Mardan", province: "KPK", type: "Public",
    rankingHEC: "Top 3 Research (National)",
    description: "AWKUM is a highly-ranked public research university located in Mardan. It has gained global recognition for high research citation output and general science educational resources.",
    website: "https://www.awkum.edu.pk",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 35,000 - 65,000 / sem", lastDate: "Aug 20, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 45,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Physics", fee: "PKR 35,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS English Literature", fee: "PKR 32,000 / sem", deadline: "Aug 20, 2026" },
      { name: "BS Chemistry", fee: "PKR 38,000 / sem", deadline: "Aug 20, 2026" }
    ]
  },
  {
    name: "Hazara University Mansehra",
    city: "Mansehra", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "Hazara University is located in beautiful Mansehra. It provides extensive fields of learning in biochemistry, cultural heritage, micro-biology, and arts.",
    website: "https://www.hu.edu.pk",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 30,000 - 55,000 / sem", lastDate: "Aug 28, 2026",
    programs: [
      { name: "BS Art & Design", fee: "PKR 35,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BS Environmental Sciences", fee: "PKR 32,000 / sem", deadline: "Aug 28, 2026" },
      { name: "BS Zoology", fee: "PKR 30,000 / sem", deadline: "Aug 28, 2026" }
    ]
  },
  {
    name: "Gomal University",
    city: "D.I. Khan", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "Located in Dera Ismail Khan, Gomal University is a premier general campus serving the southern regions of KPK with historic contributions to agriculture and pharmacy sciences.",
    website: "https://www.gu.edu.pk",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 32,000 - 60,000 / sem", lastDate: "Sep 15, 2026",
    programs: [
      { name: "Pharm-D", fee: "PKR 75,000 / sem", deadline: "Sep 15, 2026" },
      { name: "BS Agriculture", fee: "PKR 35,000 / sem", deadline: "Sep 15, 2026" },
      { name: "BS Veterinary Medicine", fee: "PKR 65,000 / sem", deadline: "Sep 10, 2026" }
    ]
  },
  {
    name: "University of Malakand",
    city: "Swat", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "Set in Chakdara, University of Malakand has progressed rapidly, offering high-level scientific infrastructures in pure physics, software research, and humanities.",
    website: "https://www.uom.edu.pk",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 30,000 - 50,000 / sem", lastDate: "Aug 18, 2026",
    programs: [
      { name: "BS Software Engineering", fee: "PKR 45,000 / sem", deadline: "Aug 18, 2026" },
      { name: "BS Chemistry", fee: "PKR 35,000 / sem", deadline: "Aug 18, 2026" },
      { name: "BS Economics", fee: "PKR 30,000 / sem", deadline: "Aug 18, 2026" }
    ]
  },
  {
    name: "University of Swat",
    city: "Swat", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "The University of Swat delivers high-grade teaching in ecotourism, environmental sciences, computing, and developmental literature in Swat valley.",
    website: "http://www.uswat.edu.pk",
    image: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 35,000 - 60,000 / sem", lastDate: "Aug 22, 2026",
    programs: [
      { name: "BS Applied Geology", fee: "PKR 40,000 / sem", deadline: "Aug 22, 2026" },
      { name: "BS Media & Communication", fee: "PKR 35,000 / sem", deadline: "Aug 22, 2026" },
      { name: "BS Computer Science", fee: "PKR 48,000 / sem", deadline: "Aug 22, 2026" }
    ]
  },
  {
    name: "University of Haripur",
    city: "Haripur", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "The University of Haripur is a prominent and emerging public general campus, delivering fine research capabilities in medical technology, business, and software.",
    website: "https://www.uoh.edu.pk",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 35,000 - 65,000 / sem", lastDate: "Aug 29, 2026",
    programs: [
      { name: "BS Medical Lab Technology", fee: "PKR 45,000 / sem", deadline: "Aug 29, 2026" },
      { name: "BS Computer Science", fee: "PKR 45,000 / sem", deadline: "Aug 29, 2026" },
      { name: "BBA (Hons)", fee: "PKR 42,000 / sem", deadline: "Aug 29, 2026" }
    ]
  },
  {
    name: "Bacha Khan University",
    city: "Charsadda", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "Named after the historic leader Bacha Khan, this campus provides advanced degrees in general agriculture, computer applications, and basic sciences.",
    website: "https://www.bkuc.edu.pk",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 30,000 - 55,000 / sem", lastDate: "Sep 02, 2026",
    programs: [
      { name: "BS Agriculture", fee: "PKR 32,000 / sem", deadline: "Sep 02, 2026" },
      { name: "BS Biotechnology", fee: "PKR 38,000 / sem", deadline: "Sep 02, 2026" },
      { name: "BS Chemistry", fee: "PKR 35,000 / sem", deadline: "Sep 02, 2026" }
    ]
  },
  {
    name: "Shaheed Benazir Bhutto Women University",
    city: "Peshawar", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "SBBWU is the first public sector women university in Peshawar, leading modern academic blocks in statistics, literature, social sciences, and bioinformatics.",
    website: "https://www.sbbwu.edu.pk",
    image: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 30,000 - 55,000 / sem", lastDate: "Aug 24, 2026",
    programs: [
      { name: "BS Bioinformatics", fee: "PKR 42,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS Psychology", fee: "PKR 35,000 / sem", deadline: "Aug 24, 2026" },
      { name: "BS Economics", fee: "PKR 32,000 / sem", deadline: "Aug 24, 2026" }
    ]
  },
  {
    name: "FAST NUCES",
    city: "Peshawar", province: "KPK", type: "Private",
    rankingHEC: "Top 3 Computing (National)",
    description: "The National University of Computer and Emerging Sciences (FAST) Peshawar is highly famous for producing elite software engineering, cyber security, and computer science alumni.",
    website: "https://peshawar.nu.edu.pk",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 140,000 - 180,000 / sem", lastDate: "Jul 10, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 155,000 / sem", deadline: "Jul 10, 2026" },
      { name: "BS Cyber Security", fee: "PKR 160,000 / sem", deadline: "Jul 10, 2026" },
      { name: "BS Software Engineering", fee: "PKR 155,000 / sem", deadline: "Jul 10, 2026" }
    ]
  },
  {
    name: "Pak-Austria Fachhochschule Institute of Applied Sciences and Technology",
    city: "Haripur", province: "KPK", type: "Public",
    rankingHEC: "Emerging Center of Excellence",
    description: "PAF-IAST is a high-tech public institute established in collaboration with leading Austrian & Chinese universities. It offers cutting-edge courses in software, chemical engineering, and materials research.",
    website: "https://www.paf-iast.edu.pk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 100,000 - 150,000 / sem", lastDate: "Aug 12, 2026",
    programs: [
      { name: "BS Software Engineering", fee: "PKR 120,000 / sem", deadline: "Aug 12, 2026" },
      { name: "BS Biomedical Sciences", fee: "PKR 95,000 / sem", deadline: "Aug 12, 2026" },
      { name: "BS Artificial Intelligence", fee: "PKR 130,000 / sem", deadline: "Aug 12, 2026" }
    ]
  },
  {
    name: "Ayub Medical College",
    city: "Abbottabad", province: "KPK", type: "Public",
    rankingHEC: "Top Medical (KPK)",
    description: "Ayub Medical College is a historic medical university in Abbottabad, providing premier, verified medical knowledge, dentistry modules, and physical therapy practices.",
    website: "https://ayubmed.edu.pk",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 180,000 / sem", lastDate: "Sep 20, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 65,000 / year", deadline: "Sep 20, 2026" },
      { name: "BDS", fee: "PKR 65,000 / year", deadline: "Sep 20, 2026" },
      { name: "BS Nursing", fee: "PKR 45,000 / sem", deadline: "Sep 20, 2026" }
    ]
  },
  {
    name: "Saidu Medical College",
    city: "Swat", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "Saidu Medical College is a premier public sector clinical study center in Swat, catering to top medical aspirants of Malakand division.",
    website: "https://www.smc.edu.pk",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 150,000 / sem", lastDate: "Sep 25, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 65,000 / year", deadline: "Sep 25, 2026" },
      { name: "BS Nursing", fee: "PKR 45,000 / sem", deadline: "Sep 25, 2026" }
    ]
  },
  {
    name: "Bacha Khan Medical College",
    city: "Mardan", province: "KPK", type: "Public",
    rankingHEC: "W-Category",
    description: "BKMC Mardan offers exceptional medical, clinical, pharmaceutical, and surgical studies in its advanced clinical complex campus.",
    website: "https://www.bkmc.edu.pk",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 150,000 / sem", lastDate: "Sep 18, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 65,000 / year", deadline: "Sep 18, 2026" },
      { name: "BS Nursing", fee: "PKR 45,000 / sem", deadline: "Sep 18, 2026" }
    ]
  },
  {
    name: "Khyber Girls Medical College",
    city: "Peshawar", province: "KPK", type: "Public",
    rankingHEC: "Top Medical (KPK)",
    description: "KGMC Peshawar is a highly distinguished and historic female-exclusive public sector medical academy delivering leading BDS, MBBS, and research modules.",
    website: "https://kgmc.edu.pk",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 80,000 - 150,000 / sem", lastDate: "Oct 05, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 65,000 / year", deadline: "Oct 05, 2026" },
      { name: "BS Nursing", fee: "PKR 45,000 / sem", deadline: "Oct 05, 2026" }
    ]
  },
  {
    name: "Qurtuba University of Science and Information Technology",
    city: "Peshawar", province: "KPK", type: "Private",
    rankingHEC: "W-Category",
    description: "A prominent private general campus providing leading statistics, mathematics, computer science, and literary studies.",
    website: "https://www.qurtuba.edu.pk",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 70,000 - 120,000 / sem", lastDate: "Sep 08, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 75,000 / sem", deadline: "Sep 08, 2026" },
      { name: "BBA (Hons)", fee: "PKR 70,000 / sem", deadline: "Sep 08, 2026" },
      { name: "BS International Relations", fee: "PKR 60,000 / sem", deadline: "Sep 08, 2026" }
    ]
  },
  {
    name: "IQRA National University",
    city: "Peshawar", province: "KPK", type: "Private",
    rankingHEC: "W-Category",
    description: "INU Peshawar is recognized for highly advanced computing campuses, modern fashion design blocks, civil engineering streams, and business courses.",
    website: "https://www.inu.edu.pk",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 85,000 - 150,000 / sem", lastDate: "Aug 26, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Aug 26, 2026" },
      { name: "BS Software Engineering", fee: "PKR 95,000 / sem", deadline: "Aug 26, 2026" },
      { name: "BS Fashion Design", fee: "PKR 85,000 / sem", deadline: "Aug 26, 2026" }
    ]
  },
  {
    name: "Brains Institute",
    city: "Peshawar", province: "KPK", type: "Private",
    rankingHEC: "X-Category",
    description: "Brains Institute is a tech-focused private academy providing responsive certifications, short courses, and standard computing degree programs.",
    website: "https://brains.edu.pk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    fees: "PKR 55,000 - 95,000 / sem", lastDate: "Sep 12, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 65,000 / sem", deadline: "Sep 12, 2026" },
      { name: "BS Software Engineering", fee: "PKR 65,000 / sem", deadline: "Sep 12, 2026" },
      { name: "BBA (Hons)", fee: "PKR 55,000 / sem", deadline: "Sep 12, 2026" }
    ]
  }
];

const seedReset = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('MONGO_URI is not set in .env');

    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Step 1: Delete ALL existing universities (clean slate)
    const deleted = await University.deleteMany({});
    console.log(`🗑️  Cleared ${deleted.deletedCount} old university records`);

    // Step 2: Insert fresh data with correct program objects
    const inserted = await University.insertMany(richUniversities);
    console.log(`✅ Inserted ${inserted.length} universities with full program data`);

    // Step 3: Verify programs exist
    const sample = await University.findOne({ name: "University of Peshawar" });
    console.log(`\n📋 Sample verification - University of Peshawar programs:`);
    sample.programs.forEach(p => console.log(`   • ${p.name} | ${p.fee} | ${p.deadline}`));

    await mongoose.disconnect();
    console.log('\n🎉 Database reset and seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed reset failed:', error.message);
    process.exit(1);
  }
};

seedReset();
