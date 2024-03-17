
export const ProfileImageComposer = (ImageArray) => {
   if (ImageArray?.length > 0) {
      const image = `https://spk.shadi.pk/uploads/${ImageArray?.[0]?.updated_at?.slice(
         0,
         4
      )}/${ImageArray?.[0]?.updated_at?.slice(5, 7)}/`;
      return image + ImageArray?.[0]?.file_name_unique;
   } else {
      return "https://api.shadi.pk/app-images/images/picture-privacy-image.png";
   }
};
