import ImageResizer from 'react-native-image-resizer';

export async function resize(ouri, w, h) {
  let resized = await ImageResizer.createResizedImage(ouri, w, h, 'JPEG', 100);
  let newI = await resized.uri;
  return newI;
  // .then(({uri}) => {
  //   console.log('resized:' + uri);
  //   return uri;
  // })
  // .catch(err => {
  //   console.log(err);
  // });
}
