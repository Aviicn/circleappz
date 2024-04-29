import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
  upload() {
    cloudinary.config({
      cloud_name: "dpryumi92",
      api_key: "555421868287672",
      api_secret: "FDdPMWOIKNKsAP2wDtZY2fIVB68",
    });
  }

  async destination(image: any) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        process.env.DESTINATION + image
      );

      return cloudinaryResponse.secure_url;
    } catch (err) {
      throw err;
    }
  }
})();
