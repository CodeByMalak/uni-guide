require('dotenv').config();
const connectDB = require('./config/db');
const University = require('./models/University');
const universities = require('./data/universities');

const seedDB = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    await University.deleteMany({});
    console.log('🗑️ Existing universities deleted');

    const createdUniversities = await University.insertMany(universities);
    console.log(`✅ Seeded ${createdUniversities.length} universities successfully!`);

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
