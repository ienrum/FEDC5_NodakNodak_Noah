export const resizeImage = (image: string, size: number = 300) =>
  image
    .replace(/\.(bmp|gif|tiff|png|jpeg|jpg)$/, '.webp')
    .replace(/\/upload\//, `/upload/w_${size}/`);
