const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file buffer to Cloudflare R2
 * @param {Object} file - The Multer file object
 * @param {string} bucket - The R2 Bucket name
 * @param {string} publicUrl - The R2 Bucket's public URL domain
 * @returns {Promise<Object>} - Contains the public URL of the uploaded image
 */
const uploadToR2 = async (file, bucket, publicUrl) => {
  try {
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${file.originalname}`;

    const uploadParams = {
      Bucket: bucket,
      Key: uniqueFilename,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    return {
      url: `${publicUrl}/${uniqueFilename}`,
    };
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw error;
  }
};

/**
 * Deletes a file from Cloudflare R2
 * @param {string} fileUrl - The public URL of the file stored in R2
 * @param {string} bucket - The R2 Bucket name
 * @returns {Promise<void>}
 */
const deleteFromR2 = async (fileUrl, bucket) => {
  try {
    if (!fileUrl) return;
    
    // Extract filename (key) from URL (takes everything after the last '/')
    const key = fileUrl.split("/").pop();
    if (!key) return;

    const deleteParams = {
      Bucket: bucket,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error("Error deleting from R2:", error);
    throw error;
  }
};

module.exports = {
  uploadToR2,
  deleteFromR2,
};
