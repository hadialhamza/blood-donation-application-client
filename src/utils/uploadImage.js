import axios from "axios";

export const uploadImage = async (imageData) => {
  const imgData = new FormData();
  imgData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
    imgData
  );
  return data?.data?.display_url;
};
