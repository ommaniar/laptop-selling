import laptop1 from '../assets/laptop-1.png'
function Cart() {
    
    return(
    <section>
        <section id="cart-items" className="my-3 container-fluid">
            <div className="table-responsive">
                <table className="table table-striped caption-top">
                    <tr>
                        <caption className="text-center py-1 w-100 text-secondary">
                            <h3>Your Cart</h3>
                        </caption>
                    </tr>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    <tbody>
                        <tr id="row-1">
                            <td>
                                <div className="card mb-3" style={{maxWidth: "540px"}}>
                                    <div className="row g-0">
                                        <div className="col-sm-4">
                                            <img src={laptop1} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Dual Screen Creative Laptop</h5>
                                                <p className="card-text"><del>&#8377;140000</del> &#8377;125000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>&#8377;125000</td>
                            <td>
                                1
                            </td>
                            <td>&#8377;125000</td>
                            <td><button className="btn btn-danger" onClick="removeRow('row-1')">Remove Item</button></td>
                        </tr>
                        <tr id="row-2">
                            <td>
                                <div className="card mb-3" style={{maxWidth: "540px"}}>
                                    <div className="row g-0">
                                        <div className="col-sm-4">
                                            <img src={laptop1} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Dual Screen Creative Laptop</h5>
                                                <p className="card-text"><del>&#8377;140000</del> &#8377;125000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>&#8377;125000</td>
                            <td>
                                1
                            </td>
                            <td>&#8377;125000</td>
                            <td><button className="btn btn-danger" onClick="removeRow('row-2')">Remove Item</button></td>

                        </tr>
                    </tbody>
                    <tr>
                        <td colspan="5" className="text-end pe-4">
                            <button className="btn btn-secondary">Add Item</button>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="row justify-content-end">
                <div className="col-md-4 table-responsive">
                    <table className="table">
                        <tr>
                            <th>Total:</th>
                            <td className="text-center">250000</td>
                        </tr>
                        <tr>
                            <th>Enter Coupon:</th>
                            <td><a href="" className="btn btn-secondary text-center" id="coupon" data-bs-toggle="modal"
                                data-bs-target="#coupon-modal">Click Here To add Coupon</a></td>
                        </tr>
                        <tr>
                            <td colspan="2" className="text-center">
                                <a className="btn btn-success" href="order.html">Order</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="coupon-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="mdoal-title fs-5">Enter Coupon</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label for="coupon-code" className="form-label">Enter Coupon Code</label>
                            <input type="text" name="coupon-code" id="coupon-code" className="form-control" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-success" onClick="addCoupon()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    </section>)
}

export default Cart