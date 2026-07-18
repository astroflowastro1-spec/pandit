import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'vfwjkpvh', 
    api_key: process.env.CLOUDINARY_API_KEY || '742124864881266', 
    api_secret: process.env.CLOUDINARY_API_SECRET || 'uFHRqFgKR4BQzLmYl-v1YChMmbE' 
});

/**
 * Uploads a buffer to Cloudinary and returns the secure URL
 */
export const uploadToCloudinary = (buffer: Buffer, folder: string = 'pujas'): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return reject(error);
                }
                resolve(result?.secure_url as string);
            }
        );
        uploadStream.end(buffer);
    });
};

export default cloudinary;
