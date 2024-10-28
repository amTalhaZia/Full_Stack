import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_NAME, 
    api_key: process.env.CLOUDNRY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECRET_KEY
});

const uploadCloudinary = async (localPath) => {
    if (!localPath) return null;

    // Check if the file exists
    if (!fs.existsSync(localPath)) {
        console.error('File does not exist at path:', localPath);
        return null;
    }

    try {
        console.log('Uploading from:', localPath);

        const stats = fs.statSync(localPath);

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        });

        return response;

    } catch (error) {

        return null
    } finally {
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
        }
    }
};


export { uploadCloudinary };
