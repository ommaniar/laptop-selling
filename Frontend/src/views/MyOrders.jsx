import React, { useState, useEffect } from 'react'
import { useLogin } from '../required_context/LoginContext'
import axios from 'axios';
import Header from './header';
function MyOrders() {
    const { username } = useLogin();
    const [ordersArray, setOrdersArray] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    const printDiv = (divName) => {
        var printContents = document.getElementById("order_details").innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;

    }
    useEffect(() => {
        axios.post(`http://127.0.0.1:8000/api/get-orders-by-user`, JSON.stringify({ 'username': username }), { 'headers': { 'Content-Type': 'application/json' } })
            .then(response => {
                console.log(response.data.message);
                const arr = response.data.message
                setOrdersArray(arr)
                console.log('Fetched data:', arr); // Log the fetched data for debugging
            })
            .catch(error => {
                console.log(error)
            })
        console.log(ordersArray)
    }, []);
    useEffect(() => {
        console.log('Updated productObject:', ordersArray); // Log the updated state after it's changed
    }, [ordersArray]);
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Header />
            <div className='container'>
                <div className='p-3 text-center'>
                    <h1>Your Orders:</h1>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>oid</th>
                                <th>status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersArray.map(order => {
                                return (
                                    <tr>
                                        <td>{order.oid}</td>
                                        <td>{order.status}</td>
                                        <td><button className='btn btn-primary' onClick={() => { setCurrentOrder([order]) }}>Show Details</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {currentOrder.map(order => {
                    return (
                        <div className='container' id='order_details'>
                            <h1 class="mb-4">Order Details</h1>

                            <div class="card mb-4">
                                <div class="card-body">
                                    <p class="card-text"><strong>OID:</strong> {order.oid}</p>
                                    <p class="card-text"><strong>Status:</strong> {order.status}</p>
                                    <p class="card-text"><strong>Total Price:</strong> &#8377;{order.total_price}</p>
                                    <p class="card-text"><strong>Shipping Address:</strong> {order.shipping_address}</p>
                                    <p class="card-text"><strong>Billing Address:</strong> {order.billing_address}</p>
                                    <p class="card-text"><strong>Zipcode:</strong> {order.zipcode}</p>
                                    <p class="card-text"><strong>Phone Number:</strong> {order.phone_number}</p>
                                    <p class="card-text"><strong>Payment Mode:</strong> {order.payment}</p>
                                </div>
                            </div> <h2 class="mb-3">Order Items</h2>
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.pid}</td>
                                                <td>{item.product_name}</td>
                                                <td>{item.quantity}</td>
                                                <td>&#8377;{item.total_price}</td>
                                            </tr>
                                        )

                                    }
                                    )}</tbody></table>
                            <button className='btn btn-primary' onClick={printDiv}>Print</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders