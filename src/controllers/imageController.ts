import { Request, Response } from 'express';
import { uploadImage } from '../utils/cloudinaryStorage';

const imageController = {
  uploadImage: async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
          }
      // Upload image using Cloudinary
      const result = await uploadImage(req.file.path);
      
      // Process result as needed
      //console.log(result);
      res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default imageController;
