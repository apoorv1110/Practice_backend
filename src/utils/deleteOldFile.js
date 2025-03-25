import { v2 as cloudinary } from "cloudinary";

// Utility function to delete an image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl) return;

    try {
        // Extract the public_id from the URL (Cloudinary images contain a unique ID)
        const publicId = imageUrl.split("/").pop().split(".")[0];

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image: ${publicId}`);
    } catch (error) {
        console.error("Error deleting old avatar from Cloudinary:", error);
    }
};

export { deleteFromCloudinary };
