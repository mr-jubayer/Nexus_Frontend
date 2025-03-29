import axios from "axios";

export default async function uploadImg(imgFile) {
  const formData = new FormData();

  formData.append("file", imgFile);
  formData.append("upload_preset", import.meta.env.VITE_cloudinary_preset);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_cloud_name
    }/image/upload`,
    formData
  );

  return data;
}
