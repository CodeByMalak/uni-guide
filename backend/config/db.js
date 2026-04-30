const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Note: useNewUrlParser and useUnifiedTopology are no longer supported or necessary in Mongoose 6+
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed:`, error.message);
    console.error('Stack Trace:', error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;