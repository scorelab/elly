import ImageResizer from '@bam.tech/react-native-image-resizer';

export const resize = async (ouri, w, h) => {
  try {
    console.log(ouri);
    let resized = await ImageResizer.createResizedImage(ouri, w, h, 'JPEG', 80);
    console.log(resized);
    return resized;
  } catch (e) {
    console.log(e);
    return null;
  }
};
