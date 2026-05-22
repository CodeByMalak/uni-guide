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
    description: {
      type: String,
      default: 'A premier educational institution in Khyber Pakhtunkhwa, dedicated to academic excellence and research.',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    source: {
      type: String,
      enum: ['scraped', 'fallback', 'manual'],
      default: 'fallback',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for comments
universitySchema.virtual('commentsList', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'university',
  justOne: false,
});

module.exports = mongoose.model('University', universitySchema);