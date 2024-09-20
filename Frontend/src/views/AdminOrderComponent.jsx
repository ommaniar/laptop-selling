import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AdminOrderComponent(props) {
  const navigate = useNavigate()
  const [status, setStatus] = useState(props.status)
  const handleUpdate = (e) => {
    e.preventDefault()

    axios.post('http://127.0.0.1:8000/api/change-status', { 'status': status, oid: props.oid })
      .then((res) => {
        console.log(res.data);

      }).catch((err) => {
        console.log(err);
      })
  }
  return (
    <div>
      <div className="card mx-3 my-2">
        <div className="card-body">
          <div className="card-title">OID: {props.oid}</div>
          <p className='card-text'>Status: {status} </p>
          <p className='card-text'>Total Billing: {props.total_price} </p>
          <p className='card-text'>User: {props.user}</p>
          <button className=' btn btn-primary my-1' data-bs-toggle="modal" data-bs-target={"#orderModal" + props.oid}>Change Status</button>
          <button className=' btn btn-primary ms-3 my-1' data-bs-toggle="modal" data-bs-target={"#orderDetails" + props.oid}>See Details</button>
        </div>
      </div>
      <div class="modal fade" id={"orderModal" + props.oid} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>For OID: {props.oid}</p>
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Update New Status:</label>
                  <select className="form-select" id="status" name='status' value={status} onChange={(e) => { setStatus(e.target.value) }}>
                    <option value="" selected disabled hidden>Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={handleUpdate}>Update Status</button>
            </div>
          </div>
        </div>
      </div>
      {/* modal for details */}
      <div class="modal fade" id={"orderDetails" + props.oid} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>For OID: {props.oid}</p>
              <div className='container' id='order_details'>
                <h1 class="mb-4">Order Details</h1>

                <div class="card mb-4">
                  <div class="card-body">
                    <p class="card-text"><strong>OID:</strong> {props.oid}</p>
                    <p class="card-text"><strong>Status:</strong> {props.status}</p>
                    <p class="card-text"><strong>Total Price:</strong> &#8377;{props.total_price}</p>
                    <p class="card-text"><strong>Shipping Address:</strong> {props.shipping_address}</p>
                    <p class="card-text"><strong>Billing Address:</strong> {props.billing_address}</p>
                    <p class="card-text"><strong>Zipcode:</strong> {props.zipcode}</p>
                    <p class="card-text"><strong>Phone Number:</strong> {props.phone_number}</p>
                    <p class="card-text"><strong>Payment Mode:</strong> {props.payment}</p>
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
                    {props.order_items.map(item => {
                      return (
                        <tr>
                          <td>{item.product_id}</td>
                          <td>{item.product_name}</td>
                          <td>{item.quantity}</td>
                          <td>&#8377;{item.price}</td>
                        </tr>
                      )

                    }
                    )}</tbody></table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminOrderComponent