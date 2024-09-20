import React, { useState ,useEffect} from 'react'
import { useLogin } from '../required_context/LoginContext'
import Header from './header'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
function Order() {
    const {username} = useLogin()
    const [productObject,setProductObject] = useState([])
    const [searchParams] = useSearchParams();
    const [pid, setPid] = useState(searchParams.get('pid'));
    const [billingAddress, setBillingAddress] = useState("")   
    const [shippingAddress,setShippingAddress] = useState("")
    const [paymentMethod,setPaymentMethod] = useState("")
    const [phoneNumber, setPhoneNumber] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [terms, setTerms] = useState(false)
    const [quantity,setQuantity] = useState(1)
    const navigate = useNavigate()
    const changeQuantity = (e) =>{
        let value = parseInt(e.target.value)
        if(value <= productObject.stock && value > 0){
            setQuantity(value)
        }
    }
    const handleOrder = (e) =>{
        e.preventDefault()
        let orderObject = {
            username: username,
            order_items : [`${pid},${quantity}`],  
            shipping_address : shippingAddress,
            billing_address: billingAddress,
            zipcode : zipCode,
            phone_number: phoneNumber,
            payment: paymentMethod
        }
        console.log(pid,orderObject)
        if(terms === 'on'){
            axios.post('http://127.0.0.1:8000/api/create-order',JSON.stringify(orderObject),{
                headers:{'Content-Type':'application/json'}
            })
            .then(res=>{console.log(res.data)})
            navigate('/my-orders')   
        }
        
    }
    useEffect(() => {
        console.log(pid);
        
        axios.get(`http://127.0.0.1:8000/api/product?pid=${pid}`)
            .then(response => {
                const arr = response.data.data[0]
                setProductObject(arr)
                console.log('Fetched data:', arr); // Log the fetched data for debugging
            })
            .catch(error => {
                console.log(error)
            })
        console.log(productObject)
    }, []);
    useEffect(() => {
        console.log('Updated productObject:', productObject); // Log the updated state after it's changed
    }, [productObject]);

    return (
        <div>
            <Header />
            <section id="order" className="container-fluid">
                <div className="container">
                    <h3 className="text-center p-2">Enter Order Details</h3>
                    <form className="was-validated" id="order-form" onSubmit={handleOrder}>
                        <div className="row">
                            <table className='table table-striped'>
                                <tr>
                                    <th>PID</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                                <tr>
                                    <td>{productObject.pid}</td>
                                    <td>{productObject.name}</td>
                                    <td><input className='form-control' type="number" name="quantity" id="quantity" max={productObject.quantity} value={quantity} onChange={changeQuantity}/></td>
                                    <td>{productObject.price * quantity}</td>

                                </tr>
                            </table>
                            <div className="col-md-12 "><label for="shipAddress" className="form-label">Shipping Address:</label></div>
                            <div className="col-md-12"> <textarea name="shipAddress" id="shipAddress" rows="5" onChange={(e)=>{setShippingAddress(e.target.value)}}
                                className="form-control mb-2" required></textarea>
                                <div className="invalid-feedback">Enter Your Address</div>
                            </div>


                            <div className="col-md-12 my-2"><label for="BillAddress" className="form-label">Billing Address:</label>
                            </div>
                            <div className="col-md-12">
                                <textarea name="BillAddress" id="BillAddress" rows="5" className="form-control mb-2" onChange={(e)=>{setBillingAddress(e.target.value)}}
                                    required></textarea>
                                <div className="invalid-feedback">Please Enter Your Billing Address</div>

                            </div>

                            <div className="col-md-12 mt-2">
                                <label for="payment">Payment Method:</label>
                                <select className="form-select" id="payment" name="payment" required onChange={(e)=>{setPaymentMethod(e.target.value)}}>
                                    <option selected disbaled hidden value="">Select Payment Method</option>
                                    <option value="cc">Credit Card</option>
                                    <option value="debit">Dedit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="upi">UPI</option>
                                    <option value="cash">Cash On Delivery</option>
                                </select>
                                <div className="invalid-feedback">Please Choose Valid Payment Method</div>
                            </div>

                            <div className="col-md-6 mt-3">
                                <label for="Phone" className="form-label">Phone Number:</label>
                                <input type="tel" name="Phone" id="Phone" placeholder="Enter Phone Number" className="form-control" onChange={(e)=>{setPhoneNumber(e.target.value)}}
                                    required />
                                <div className="invalid-feedback">Please Enter Phone Number</div>
                            </div>

                            <div className="col-md-6 mt-3">
                                <label for="Zip Code" className="form-label">Zip Code:</label>
                                <input type="text" name="Zip" id="Zip" placeholder="Enter Zip Code" className="form-control" onChange={(e)=>{setZipCode(e.target.value)}}
                                    required />
                                <div className="invalid-feedback">Please Enter Valid Zip Code</div>
                            </div>

                            <div className="col-md-12 my-2">
                                <input type="checkbox" name="agree" id="agree" onChange={(e)=>{setTerms(e.target.value)}} required />
                                <label for="agree" className="form-label">I agree to the Terms and Conditions</label>
                                <div className="invalid-feedback">Please Mark the Check box</div>
                            </div>
                        </div>
                        <input type="submit" value="Submit" className="btn btn-primary my-2 py-1" onclick="placeOrder()" />
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Order