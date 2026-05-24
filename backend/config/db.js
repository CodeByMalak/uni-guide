const mongoose = require('mongoose');

let connectionPromise = null;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    })
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      console.log(`Database: ${conn.connection.name}`);
      return conn.connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.error('MongoDB Connection Failed:', error.message);
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDB;
