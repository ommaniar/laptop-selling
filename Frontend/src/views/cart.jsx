import laptop1 from '../assets/laptop-1.png'
function Cart() {
    
    return(
    <section>
        <section id="cart-items" class="my-3 container-fluid">
            <div class="table-responsive">
                <table class="table table-striped caption-top">
                    <tr>
                        <caption class="text-center py-1 w-100 text-secondary">
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
                                <div class="card mb-3" style={{maxWidth: "540px"}}>
                                    <div class="row g-0">
                                        <div class="col-sm-4">
                                            <img src={laptop1} class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-body">
                                                <h5 class="card-title">Dual Screen Creative Laptop</h5>
                                                <p class="card-text"><del>&#8377;140000</del> &#8377;125000</p>
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
                            <td><button class="btn btn-danger" onClick="removeRow('row-1')">Remove Item</button></td>
                        </tr>
                        <tr id="row-2">
                            <td>
                                <div class="card mb-3" style={{maxWidth: "540px"}}>
                                    <div class="row g-0">
                                        <div class="col-sm-4">
                                            <img src={laptop1} class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-body">
                                                <h5 class="card-title">Dual Screen Creative Laptop</h5>
                                                <p class="card-text"><del>&#8377;140000</del> &#8377;125000</p>
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
                            <td><button class="btn btn-danger" onClick="removeRow('row-2')">Remove Item</button></td>

                        </tr>
                    </tbody>
                    <tr>
                        <td colspan="5" class="text-end pe-4">
                            <button class="btn btn-secondary">Add Item</button>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="row justify-content-end">
                <div class="col-md-4 table-responsive">
                    <table class="table">
                        <tr>
                            <th>Total:</th>
                            <td class="text-center">250000</td>
                        </tr>
                        <tr>
                            <th>Enter Coupon:</th>
                            <td><a href="" class="btn btn-secondary text-center" id="coupon" data-bs-toggle="modal"
                                data-bs-target="#coupon-modal">Click Here To add Coupon</a></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-center">
                                <a class="btn btn-success" href="order.html">Order</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="modal fade" id="coupon-modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="mdoal-title fs-5">Enter Coupon</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="coupon-code" class="form-label">Enter Coupon Code</label>
                            <input type="text" name="coupon-code" id="coupon-code" class="form-control" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-success" onClick="addCoupon()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    </section>)
}

export default Cart