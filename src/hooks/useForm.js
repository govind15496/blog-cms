import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, onChange };
};

export default useForm;
