const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'University name is required'],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
    province: {
      type: String,
      trim: true,
      default: 'KPK',
    },
    type: {
      type: String,
      enum: ['Public', 'Private', 'Semi-Government', 'Unknown'],
      default: 'Unknown',
    },
    programs: {
      type: [String],
      default: [],
    },
    fees: {
      type: String,
      default: 'Not available',
    },
    lastDate: {
      type: String,
      default: 'Not available',
    },
    website: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      enum: ['scraped', 'fallback', 'manual'],
      default: 'fallback',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('University', universitySchema);