const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // How long the driver waits to find an available server before erroring.
      serverSelectionTimeoutMS: 10000,
      // How long a socket stays idle before being closed.
      socketTimeoutMS: 45000,
      // Maximum connection pool size.
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.error('   → Check that your MONGO_URI is correct and the Atlas cluster is reachable.');
    }
    if (error.message.includes('Authentication failed')) {
      console.error('   → Check your MongoDB username and password in MONGO_URI.');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
