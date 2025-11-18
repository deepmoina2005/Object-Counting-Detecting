const API_BASE_URL = 'http://localhost:5000/api';

export const detectObjects = async (image, method) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('method', method);

  const response = await fetch(`${API_BASE_URL}/detect`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Detection failed');
  }

  return await response.json();
};
