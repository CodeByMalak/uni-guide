require('dotenv').config({ path: './backend/.env' });
const connectDB = require('./backend/config/db');
const scrapeUniversities = require('./backend/scraper/universityScraper');
const University = require('./backend/models/University');

const run = async () => {
  await connectDB();
  console.log("Emptying universities...");
  await University.deleteMany({});
  console.log("Seeding universities...");
  await scrapeUniversities();
  console.log("Done.");
  process.exit(0);
};

run();
