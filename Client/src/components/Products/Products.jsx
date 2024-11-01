import { useProductAuth } from "../../store/Product.Auth.jsx";
import { useState } from "react";

const Product = () => {
    const { createProduct } = useProductAuth();

    const allowedCategories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"]; 

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        title: '',
        brand: '',
        category: '',
        image: null,
        price: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setProductData({ ...productData, [name]: type === 'file' ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
  
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('title', productData.title);
            formData.append('price', productData.price);
            formData.append('brand', productData.brand);
            formData.append('category', productData.category);
            formData.append('image', productData.image); 
            await createProduct(formData)
            
            setProductData({
                name: '',
                description: '',
                title: '',
                brand: '',
                category: '',
                image: null,
                price: ''
            });
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    

    return (
        <div className="product_wrapper">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required />
                <input type="text" name="description" value={productData.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="title" value={productData.title} onChange={handleChange} placeholder="Title" required />
                <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
                <input type="text" name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand" required />
                <select name="category" value={productData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {allowedCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <input type="file" name="image" onChange={handleChange} required />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default Product;
