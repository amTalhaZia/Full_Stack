import { useProductAuth } from "../../store/Product.Auth.jsx"
import { useState } from "react"


const Product = () => {
    const { createProduct } = useProductAuth()

    const allowedCategories = ["Electronics", "Fashion", "Home", "Books", "Beauty", "Sports"]; 

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        title: '',
        brand: '',
        category: '',
        images: [],
        price: [{ mrp: '', cost: '', disCountPercent: 0 }]
    })

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createProduct(productData)
        setProductData([''])
    }
    return (
        <div className="product_wrapper">
            <form onSubmit={handleSubmit}>
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
                <input type="file" name="images" multiple onChange={handleChange} required />
                <button type="submit">Create Product</button>
            </form>
        </div>
    )

}

export default Product;
