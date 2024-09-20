import React, { useState, useRef, useEffect } from 'react'
import AdminNavigation from './AdminNavigtion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function AddProduct() {
    const formData = new FormData();
    const navigate = useNavigate();
    const productRef = useRef()
    const [product, setProduct] = useState({
        name: "",
        main_image: '',
        second_image: '',
        description: '',
        price: 0,
        mrp: 0,
        model: '',
        color: '',
        brand: '',
        screen: '',
        processor: '',
        ssd: '',
        ram: '',
        ram_type: '',
        clock_speed: '',
        gpu: '',
        disk_drive: '',
        cam: false,
        fingerprint: false,
        keyboard: '',
        category: ''
    })
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setProduct(prevProduct => {
            if (type === 'checkbox') {
                return {
                    ...prevProduct,
                    [name]: checked
                };
            } else if (type === 'file') {
                return {
                    ...prevProduct,
                    [name]: files[0]
                };
            } else if (type === 'number') {
                return {
                    ...prevProduct,
                    [name]: parseFloat(value)
                };
            } else {
                return {
                    ...prevProduct,
                    [name]: value
                };
            }
        });

    }
    useEffect(() => {
        productRef.current = product;
        console.log(productRef.current)
    }, [product])
    const handleSubmit = (e) => {
        e.preventDefault()
        const currentProduct = productRef.current;
        console.log(product);
        for (const key in currentProduct) {
            formData.append(key, product[key]);
        }

       

        fetch('http://127.0.0.1:8000/api/add-product', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.resp === 1) {
                    console.log(data)
                    alert(data.messsage);
                    navigate('/admin')
                }
            })
    }
    return (

        <div>
            <AdminNavigation></AdminNavigation>
            <div className="container">
                <div className="container mt-5">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="col-12">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="name" name='name' placeholder="Enter product name" required onChange={handleChange} />
                        </div>

                        {/* Main Image */}
                        <div className="col-12">
                            <label htmlFor="mainImage" className="form-label">Main Image</label>
                            <input type="file" className="form-control" id="mainImage" name='main_image' required onChange={handleChange} />
                        </div>

                        {/* Second Image */}
                        <div className="col-12">
                            <label htmlFor="secondImage" className="form-label">Second Image</label>
                            <input type="file" className="form-control" id="secondImage" name='second_image' required onChange={handleChange} />
                        </div>

                        {/* Description */}
                        <div className="col-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="4" name='description' placeholder="Enter product description" required onChange={handleChange}></textarea>
                        </div>

                        {/* Price */}
                        <div className="col-md-6">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" name='price' placeholder="Enter price" step="0.01" required onChange={handleChange} />
                        </div>

                        {/* MRP */}
                        <div className="col-md-6">
                            <label htmlFor="mrp" className="form-label">MRP</label>
                            <input type="number" className="form-control" id="mrp" name='mrp' placeholder="Enter MRP" step="0.01" required onChange={handleChange} />
                        </div>

                        {/* Model */}
                        <div className="col-12">
                            <label htmlFor="model" className="form-label">Model</label>
                            <input type="text" className="form-control" id="model" name='model' placeholder="Enter model" required onChange={handleChange} />
                        </div>

                        {/* Color */}
                        <div className="col-12">
                            <label htmlFor="color" className="form-label">Color</label>
                            <input type="text" className="form-control" id="color" name='color' placeholder="Enter color" required onChange={handleChange} />
                        </div>

                        {/* Brand */}
                        <div className="col-12">
                            <label htmlFor="brand" className="form-label">Brand</label>
                            <input type="text" className="form-control" id="brand" name='brand' placeholder="Enter brand" required onChange={handleChange} />
                        </div>

                        {/* Screen */}
                        <div className="col-12">
                            <label htmlFor="screen" className="form-label">Screen</label>
                            <input type="text" className="form-control" id="screen" name='screen' placeholder="Enter screen details" required onChange={handleChange} />
                        </div>

                        {/* Processor Dropdown */}
                        <div className="col-12">
                            <label htmlFor="processor" className="form-label">Processor</label>
                            <select className="form-select" value={product.processor} id="processor" name='processor' required onChange={handleChange}>
                                <option value="" selected disabled hidden>Select Processor</option>
                                <option value="Intel Core i3">Intel Core i3</option>
                                <option value="Intel Core i5">Intel Core i5</option>
                                <option value="Intel Core i7">Intel Core i7</option>
                                <option value="intel Core i0">Intel Core i9</option>
                                <option value="AMD Ryzen 3">AMD Ryzen 3</option>
                                <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                                <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                                <option value="AMD Ryzen 9">AMD Ryzen 9</option>

                            </select>
                        </div>

                        {/* SSD */}
                        <div className="col-12">
                            <label htmlFor="ssd" className="form-label">SSD</label>
                            <input type="text" className="form-control" id="ssd" name='ssd' placeholder="Enter SSD details" required onChange={handleChange} />
                        </div>

                        {/* RAM */}
                        <div className="col-12">
                            <label htmlFor="ram" className="form-label">RAM</label>
                            <input type="text" className="form-control" id="ram" name='ram' placeholder="Enter RAM size" required onChange={handleChange} />
                        </div>

                        {/* RAM Type Dropdown */}
                        <div className="col-12">
                            <label htmlFor="ramType" className="form-label">RAM Type</label>
                            <select className="form-select" id="ramType" name='ram_type' required onChange={handleChange}>
                                <option value="" selected disabled hidden>Select RAM Type</option>
                                <option value="ddr4">DDR4</option>
                                <option value="ddr5">DDR5</option>
                            </select>
                        </div>

                        {/* Clock Speed */}
                        <div className="col-12">
                            <label htmlFor="clockSpeed" className="form-label" name='clock_speed'>Clock Speed</label>
                            <input type="text" className="form-control" name="clock_speed" id="clockSpeed" placeholder="Enter clock speed" required onChange={handleChange} />
                        </div>

                        {/* GPU */}
                        <div className="col-12">
                            <label htmlFor="gpu" className="form-label">GPU</label>
                            <input type="text" className="form-control" name='gpu' id="gpu" placeholder="Enter GPU details" required onChange={handleChange} />
                        </div>

                        {/* Disk Drive */}
                        <div className="col-12">
                            <label htmlFor="diskDrive" className="form-label" >Disk Drive</label>
                            <input type="text" className="form-control" id="diskDrive" name='disk_drive' placeholder="Enter disk drive details" required onChange={handleChange} />
                        </div>

                        {/* Camera Checkbox */}
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name='cam' id="cam" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="cam">
                                    Camera
                                </label>
                            </div>
                        </div>

                        {/* Fingerprint Checkbox */}
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name='fingerprint' id="fingerprint" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="fingerprint">
                                    Fingerprint Sensor
                                </label>
                            </div>
                        </div>

                        {/* Keyboard */}
                        <div className="col-12">
                            <label htmlFor="keyboard" className="form-label">Keyboard</label>
                            <input type="text" className="form-control" id="keyboard" name='keyboard' placeholder="Enter keyboard details" required onChange={handleChange} />
                        </div>

                        {/* Stock */}
                        <div className="col-12">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input type="number" className="form-control" id="stock" name='stock' placeholder="Enter stock quantity" required onChange={handleChange} min="0" />
                        </div>

                        {/* Category Dropdown */}
                        <div className="col-12">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select className="form-select" name="category" id="category" value={product.category} onChange={handleChange}>
                                <option value="" selected disabled hidden>Select Category</option>
                                <option value="Everyday">Everyday Laptop</option>
                                <option value="Gaming">Gaming Laptop</option>
                                <option value="Thin_Light">Thin and Light Laptop</option>
                                <option value="Multitasking">Multitasking Laptop</option>
                                <option value="Developer">Developer Laptop</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct