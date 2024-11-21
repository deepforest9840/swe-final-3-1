import React, { useState } from 'react';
import './CreateBidc.css';

const CreateBidc = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    condition: '',
    starting_price: '',
    auction_end_date: '',
    pic: null,
    category: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      pic: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      description: formData.description,
      condition: formData.condition,
      starting_price: formData.starting_price,
      auction_end_date: formData.auction_end_date,
      pic: formData.pic,
      category: formData.category,
    };

    // Store the new product in local storage or send it to a server
    // Here, let's assume you store it in local storage
    const products = JSON.parse(localStorage.getItem('allProducts')) || [];
    localStorage.setItem('allProducts', JSON.stringify([...products, newProduct]));

    // Reset form data
    setFormData({
      name: '',
      description: '',
      condition: '',
      starting_price: '',
      auction_end_date: '',
      pic: null,
      category: [],
    });
  };

  return (
    <div className='create-bidc'>
      <h2>Create Bid</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <input type='file' name='pic' onChange={handleImageChange} />
        {formData.pic && <img src={formData.pic} alt='Uploaded' />}
        <input type='text' name='name' placeholder='Product Name' value={formData.name} onChange={handleChange} />
        <input type='text' name='description' placeholder='Description' value={formData.description} onChange={handleChange} />
        <input type='text' name='condition' placeholder='Condition' value={formData.condition} onChange={handleChange} />
        <input type='number' name='starting_price' placeholder='Starting Price' value={formData.starting_price} onChange={handleChange} />
        <input type='datetime-local' name='auction_end_date' value={formData.auction_end_date} onChange={handleChange} />
        <input type='text' name='category' placeholder='Category' value={formData.category} onChange={handleChange} />
        <button type='submit' className='submit-button'>Submit</button>
      </form>
    </div>
  );
};

export default CreateBidc;
