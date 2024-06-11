import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

export const uploadImage = async (filePath: string) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "images"
      });
      return result;
    } catch (error) {
      throw new Error('Failed to upload image to Cloudinary');
    }
};