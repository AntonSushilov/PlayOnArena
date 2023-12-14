import type { RcFile } from 'antd/es/upload/interface';
import { message } from 'antd';

// export const getBase64 = (img: RcFile, callback: (base64: string | ArrayBuffer | null) => void) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(img);
//     reader.onload = function () {
//       callback(reader.result)
//     };
//     reader.onerror = function (error) {
//         console.log('Error: ', error);
//     };
// };
export const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};



export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Вы можете загружать только JPG/PNG файлы!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Изображение должно быть меньше 2MB!');
  }
  return isJpgOrPng && isLt2M;
};