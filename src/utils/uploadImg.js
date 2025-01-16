import axios from "axios";

export default async function uploadImg(imgFile) {
  //***
  // convering img to formData
  // -> const formData = new FormData(); done
  // append img file
  // -> formData.append('file', img); done
  // create a preset on cloudinary and copy, put it in .env file and append it also
  // -> formData.append('upload_preset', import.meta.env.VITE_cloudinary_preset) - done
  //
  // Now send/upload img (should be post method)
  // - take the api endpoint from cloudinay or search goodle
  // - it look like : https://api.cloudinary.com/v1_1/{cloud_name}/image/upload this
  // - no matter just copy your coudinary cloudname to import and replace {cloud_name} and post
  // -> If every think okey try a post <-
  //  */

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
