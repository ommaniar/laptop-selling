import React, { useEffect, useState } from 'react'
import AdminNavigtion from './AdminNavigtion'
import AdminOrderComponent from './AdminOrderComponent'
import axios from 'axios'
function AdminOrders() {
  const [orderArray, setOrderArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [result,setResult] = useState('')

  useEffect(() => {
    axios.post('http://127.0.0.1:8000/api/get-orders')
      .then(async (response) => {
        await setOrderArray(response.data.orders)
        console.log(orderArray)
      })
  }, [])

  const handleSearch = () =>{
    let arr = orderArray.filter(order=>{
      if((search.length >= 3)&& (search[1] === '"') && (search[search.length-1]==="")){
        if((order.oid).toString() === search){
          return true
        }else{
          return false
        }
      }else{
        if((order.oid).toString().includes(search)){
          return true
        }else{
          return false
        }
      }
    })
    setResult(arr)
    console.log(filteredArray)
  }
  
  const statusFilter=() =>{
    let arr = orderArray.filter(order=>{
      if(order.status === status){
        return true
      }
      // console.log(order)
    })
    setResult(arr)
    console.log(filteredArray)
  }

  useEffect(() => {
    handleSearch();
  }, [search]);
  
  // Use useEffect to run statusFilter when 'status' changes
  useEffect(() => {
    statusFilter();
  }, [status]);
  
  useEffect(() => {
    setFilteredArray(result);
  }, [result]);

  // useEffect(() => {
  //   console.log('updated array:', orderArray); // Log the updated state after it's changed
  // }, [orderArray]);
  return (
    <div>
      <AdminNavigtion></AdminNavigtion>
      <div className="container">
        <div className="container p-3">
          <input type="text" name="search" id="search" placeholder='Enter OID for search' className='w-100 form-control' onChange={ (e)=>{ setSearch(e.target.value);handleSearch()}} />
          <select name="status" id="status" className='form-select my-2' onChange={(e)=>{ setStatus(e.target.value);statusFilter();}} >
            <option selected disabled hidden>Filter Status</option>
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className="row">
          { (filteredArray.length === 0) ? orderArray.map((order) => {
            // console.log(order)
            return (<div key={order.oid} className='col-md-4 col-sm-6'>  {/* Use a unique key prop, like order ID */}
              <AdminOrderComponent oid={order.oid} user={order.user} total_price={order.total_price} status={order.status} shipping_address={order.shipping_address} billing_address={order.billing_address} zipcode={order.zipcode} phone_no={order.phone_no} payment={order.payment} order_items={order.order_items} />
            </div>)
          }):filteredArray.map((order) => {
            // console.log(order)
            return (<div key={order.oid} className='col-md-4 col-sm-6'>  {/* Use a unique key prop, like order ID */}
              <AdminOrderComponent oid={order.oid} user={order.user} total_price={order.total_price} status={order.status} shipping_address={order.shipping_address} billing_address={order.billing_address} zipcode={order.zipcode} phone_no={order.phone_no} payment={order.payment} order_items={order.order_items} />
            </div>)
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders