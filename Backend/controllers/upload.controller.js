import Photo from '../models/upload.model.js';

// Get all photos
export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: photos.length,
      data: photos
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching photos'
    });
  }
};

// Get a single photo
export const getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: photo
    });
  } catch (error) {
    console.error('Error fetching photo:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid photo ID'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching photo'
    });
  }
};

// Create a new photo
export const createPhoto = async (req, res) => {
  try {
    // Log the entire request for debugging
    console.log('Request headers:', req.headers);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    // Extract photo data from request body
    const { name, title, description, species, location, imageUrl } = req.body;
    
    // Log each field for debugging
    console.log('Extracted fields:', { name, title, description, species, location, imageUrl });
    
    // Validate required fields
    if (!name) {
      console.log('Missing field: name');
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }
    
    if (!title) {
      console.log('Missing field: title');
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }
    
    if (!species) {
      console.log('Missing field: species');
      return res.status(400).json({
        success: false,
        message: 'Species is required'
      });
    }
    
    if (!location) {
      console.log('Missing field: location');
      return res.status(400).json({
        success: false,
        message: 'Location is required'
      });
    }
    
    if (!imageUrl) {
      console.log('Missing field: imageUrl');
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }
    
    // Create new photo
    console.log('Creating new photo document...');
    const photoData = {
      name,
      title,
      description: description || '',
      species,
      location,
      imageUrl
    };
    
    console.log('Photo data to save:', photoData);
    const photo = await Photo.create(photoData);
    console.log('Photo created successfully:', photo);
    
    return res.status(201).json({
      success: true,
      message: 'Photo uploaded successfully',
      data: photo
    });
  } catch (error) {
    console.error('Error creating photo. Full error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      console.log('Validation error messages:', messages);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error while creating photo'
    });
  }
};

// Delete a photo
export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }
    
    await photo.deleteOne();
    
    return res.status(200).json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid photo ID'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting photo'
    });
  }
};