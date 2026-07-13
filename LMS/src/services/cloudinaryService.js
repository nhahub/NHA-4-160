// src/services/cloudinaryService.js

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadVideoToCloudinary(file, onProgress) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    // متابعة نسبة الرفع (اختياري بس مفيد للـ UX)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url); // ده رابط الفيديو النهائي
      } else {
        reject(new Error('فشل رفع الفيديو'));
      }
    };

    xhr.onerror = () => reject(new Error('حصل خطأ في الاتصال'));

    xhr.send(formData);
  });
}