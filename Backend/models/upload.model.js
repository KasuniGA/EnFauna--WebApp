import mongoose from 'mongoose';

// Define the schema for photos
const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    default: ''
  },
  species: {
    type: String,
    required: [true, 'Species is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Photo = mongoose.model('Photo', photoSchema);

export default Photo;

console.log('Photo model defined successfully');