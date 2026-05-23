require('dotenv').config();
const mongoose = require('mongoose');
const University = require('./models/University');

const peshawarUnis = [
  {
    name: "University of Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "W-Category (Top 10 National)",
    description: "The University of Peshawar is a public research university located in Peshawar, Khyber Pakhtunkhwa, Pakistan. It is one of the oldest universities in the province.",
    website: "http://www.uop.edu.pk",
    image: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 45,000 - 85,000 / year",
    lastDate: "Aug 15, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 55,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS Software Engineering", fee: "PKR 55,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BS English Literature", fee: "PKR 35,000 / sem", deadline: "Aug 15, 2026" },
      { name: "BBA (Hons)", fee: "PKR 65,000 / sem", deadline: "Aug 15, 2026" },
      { name: "Pharm-D", fee: "PKR 85,000 / sem", deadline: "Aug 10, 2026" },
    ]
  },
  {
    name: "UET Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "Top 5 Engineering (National)",
    description: "The University of Engineering and Technology, Peshawar is a premier institution of higher learning in the field of engineering sciences.",
    website: "http://www.uetpeshawar.edu.pk",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 60,000 - 110,000 / year",
    lastDate: "Jul 30, 2026",
    programs: [
      { name: "BSc Electrical Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Civil Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Mechanical Engineering", fee: "PKR 45,000 / sem", deadline: "Jul 30, 2026" },
      { name: "BSc Computer Systems Engineering", fee: "PKR 55,000 / sem", deadline: "Jul 30, 2026" }
    ]
  },
  {
    name: "Islamia College University",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "Top 15 General (National)",
    description: "Islamia College University is a public university located in Peshawar. Founded by Nawab Sir Sahibzada Abdul Qayyum and Sir George Roos-Keppel in 1913, it is one of the oldest institutions of higher education in Pakistan.",
    website: "http://www.icp.edu.pk",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 40,000 - 70,000 / year",
    lastDate: "Sep 05, 2026",
    programs: [
      { name: "BS Physics", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Chemistry", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Mathematics", fee: "PKR 38,000 / sem", deadline: "Sep 05, 2026" },
      { name: "BS Islamic Studies", fee: "PKR 30,000 / sem", deadline: "Sep 05, 2026" }
    ]
  },
  {
    name: "Khyber Medical University",
    city: "Peshawar",
    province: "KPK",
    type: "Public",
    rankingHEC: "Top Medical (KPK)",
    description: "Khyber Medical University is a public medical university in Peshawar, Khyber Pakhtunkhwa, Pakistan.",
    website: "http://www.kmu.edu.pk",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 50,000 - 150,000 / year",
    lastDate: "Oct 15, 2026",
    programs: [
      { name: "MBBS", fee: "PKR 65,000 / year (Public)", deadline: "Oct 15, 2026" },
      { name: "BDS", fee: "PKR 65,000 / year (Public)", deadline: "Oct 15, 2026" },
      { name: "Doctor of Physical Therapy (DPT)", fee: "PKR 75,000 / sem", deadline: "Oct 10, 2026" },
      { name: "BS Nursing", fee: "PKR 50,000 / sem", deadline: "Oct 10, 2026" }
    ]
  },
  {
    name: "IMSciences Peshawar",
    city: "Peshawar",
    province: "KPK",
    type: "Semi-Government",
    rankingHEC: "Top 5 Business (National)",
    description: "The Institute of Management Sciences is a government-owned, autonomous institution, founded in 1995. It offers programs in business administration, public administration, computer science, and more.",
    website: "http://www.imsciences.edu.pk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 80,000 - 150,000 / year",
    lastDate: "Jul 20, 2026",
    programs: [
      { name: "BBA", fee: "PKR 85,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Accounting & Finance", fee: "PKR 85,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Jul 20, 2026" },
      { name: "BS Data Science", fee: "PKR 95,000 / sem", deadline: "Jul 20, 2026" }
    ]
  },
  {
    name: "CECOS University",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "CECOS University of IT and Emerging Sciences is a private university in Peshawar, known for its engineering and computing programs.",
    website: "http://www.cecos.edu.pk",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 120,000 - 200,000 / year",
    lastDate: "Aug 25, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 110,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Civil Engineering", fee: "PKR 130,000 / sem", deadline: "Aug 25, 2026" },
      { name: "BS Software Engineering", fee: "PKR 110,000 / sem", deadline: "Aug 25, 2026" }
    ]
  },
  {
    name: "Abasyn University",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "Abasyn University is a private university located in Peshawar, offering diverse programs in engineering, computing, and management.",
    website: "http://www.abasyn.edu.pk",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 100,000 - 180,000 / year",
    lastDate: "Sep 10, 2026",
    programs: [
      { name: "Pharm-D", fee: "PKR 160,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BS Microbiology", fee: "PKR 80,000 / sem", deadline: "Sep 10, 2026" },
      { name: "BBA", fee: "PKR 75,000 / sem", deadline: "Sep 10, 2026" }
    ]
  },
  {
    name: "City University of Science and IT",
    city: "Peshawar",
    province: "KPK",
    type: "Private",
    rankingHEC: "W-Category",
    description: "CUSIT is a private-sector university providing quality education in computer science, business, and engineering disciplines.",
    website: "http://www.cusit.edu.pk",
    image: "https://images.unsplash.com/photo-1525926472898-752119eb45a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fees: "PKR 90,000 - 160,000 / year",
    lastDate: "Aug 30, 2026",
    programs: [
      { name: "BS Computer Science", fee: "PKR 95,000 / sem", deadline: "Aug 30, 2026" },
      { name: "BS Mathematics", fee: "PKR 55,000 / sem", deadline: "Aug 30, 2026" },
      { name: "MBA", fee: "PKR 85,000 / sem", deadline: "Aug 30, 2026" }
    ]
  }
];

const seedPeshawar = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding Peshawar Unis');

    for (const uni of peshawarUnis) {
      // Upsert
      await University.findOneAndUpdate(
        { name: uni.name },
        { ...uni },
        { upsert: true, new: true, runValidators: true }
      );
    }
    
    // Convert old string programs to object format for other universities (graceful fallback)
    const allUnis = await University.find();
    for(const u of allUnis) {
        if(u.programs && u.programs.length > 0 && typeof u.programs[0] === 'string') {
            const updatedPrograms = u.programs.map(progStr => ({
                name: progStr,
                fee: "Not available",
                deadline: "Not available"
            }));
            u.programs = updatedPrograms;
            await u.save();
        }
    }

    console.log('Peshawar Universities Seeded Successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedPeshawar();
