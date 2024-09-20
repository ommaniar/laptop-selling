import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AdminProductComponent(props) {
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [showStockModal, setShowStockModal] = useState(false);
    const [newPrice, setNewPrice] = useState(props.price);
    const [newStock, setNewStock] = useState(0);
    const [stock,setStock] = useState(props.stock)

    const handlePriceUpdate = () => {
        // Logic for updating the price
        console.log('Updated Price:', newPrice);
        setShowPriceModal(false);
        axios.post('http://127.0.0.1:8000/api/update-product-price', {
            'price': newPrice,
            'pid': props.pid
        })
            .then((resp) => {
                console.log(resp)
                if (resp.data.resp === 1) {
                    alert("price updated successfully")
                    setNewPrice(resp.data.price)
                }
                else {
                    console.log(resp)
                    alert('Error in price update')
                    setNewPrice(resp.data.price)

                }
            })
            .catch((err)=>{
                console.log(err)
            })
    };

    const handleStockUpdate = () => {
        // Logic for updating the stock
        console.log('Updated Stock:', newStock);
        setShowStockModal(false);
        axios.post('http://127.0.0.1:8000/api/update-stock', {
            'stock': newStock,
            'pid': props.pid
        })
            .then((resp) => {
                console.log(resp)
                if (resp.data.resp === 1) {
                    alert("Stock Added successfully")
                    setNewStock(0)
                    setStock(resp.data.stock)
                }
                else {
                    console.log(resp)
                    alert('Error in Stock update')
                    setNewPrice(resp.data.price)

                }
            })
            .catch((err)=>{
                console.log(err)
            })
    };

    return (
        <div className="col-lg-3 col-sm-6 my-2 card-wrapper">
            <div className="card h-100">
                <img src={'http://127.0.0.1:8000/media/' + props.image} className="card-img-top" alt="product-image" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className='card-text text-secondary'>Stock: {stock}</p>
                    <p className="card-text"><del>&#8377;{props.mrp}</del> &#8377;{newPrice}</p>
                    <button className="btn btn-primary w-100 my-1" onClick={() => setShowPriceModal(true)}>
                        Update Price
                    </button>
                    <button className='btn btn-primary w-100 my-1' onClick={() => setShowStockModal(true)}>
                        Add Stock
                    </button>
                </div>
            </div>

            {/* Price Update Modal */}
            <div className={`modal fade ${showPriceModal ? 'show' : ''}`} style={{ display: showPriceModal ? 'block' : 'none' }} tabindex="-1" aria-labelledby="priceModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="priceModalLabel">Update Price</h5>
                            <button type="button" className="btn-close" onClick={() => setShowPriceModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="newPrice" className="form-label">New Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="newPrice"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handlePriceUpdate}>Update Price</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock Update Modal */}
            <div className={`modal fade ${showStockModal ? 'show' : ''}`} style={{ display: showStockModal ? 'block' : 'none' }} tabindex="-1" aria-labelledby="stockModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="stockModalLabel">Add Stockk</h5>
                            <button type="button" className="btn-close" onClick={() => setShowStockModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="newStock" className="form-label">New Stock</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="newStock"
                                        onChange={(e) => setNewStock(e.target.value)}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleStockUpdate}>Add Stock</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProductComponent;
