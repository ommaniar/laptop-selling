import React,{useState,useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'
import Header from './header'

function ProductDetail() {

    const [productObject,setProductObject] = useState([])
    const [pid, setPid] = useSearchParams();
    const [cam,setCam] = useState("no");
    const [fingerprint,setFingerprint] = useState("no")
    const navigate = useNavigate()
    pid.get('pid');
    console.log(pid)
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product?${pid}`)
        .then(response=>{
            const arr = response.data.data[0]
            setProductObject(arr)
            console.log('Fetched data:', arr); // Log the fetched data for debugging
        })
        .catch(error=>{
            console.log(error)
        })
        console.log(productObject)
    }, []);
    useEffect(() => {
        console.log('Updated productObject:', productObject); // Log the updated state after it's changed
        if(productObject.cam == true){
            setCam("yes")
        }
        if(productObject.fingerprint == true){
            setFingerprint("yes")
        }
    }, [productObject]); 
    const handleBuyNow = () =>{
        navigate(`/purchase?${pid}`);
    }
    return (
        <section id="product" className="pb-2">
            <Header></Header>
            <div className="row">
                <div className="col-md-4">
                    <div className="sticky-md-top py-4 z-0">
                        <div id="carouselExample" className="carousel slide m-2">
                            <div className="carousel-inner ">
                                <div className="carousel-item active ">
                                    <img src={'http://127.0.0.1:8000/media/'+productObject.main_image} className="d-block w-100 " alt="..." id="main_image" />
                                </div>
                                <div className="carousel-item">
                                    <img src={'http://127.0.0.1:8000/media/'+productObject.second_image} className="d-block w-100 " alt="..." id="second_image" />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="row">
                            <div className="text-center">
                                <button className="btn btn-primary my-3" onClick={handleBuyNow}><i className="bi bi-bag"></i> Buy
                                    Now</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="container-fluid py-3">
                        <h1 id="model">{productObject.model}</h1>
                        <p id="description">{productObject.description}</p>
                        <hr />
                        <h1><sup>&#8377;</sup><span id="price">{productObject.price}</span> </h1>
                        <h6 className="text-secondary ">M.R.P. <span className="text-danger"><sup>&#8377;</sup></span><del><span
                            id="mrp">{productObject.mrp}</span></del>
                        </h6>
                        <p>Inclusive of all taxes</p>
                        <p className='fw-bold'>Available Stock: {productObject.stock}</p>
                        <section id="services" className="bg-secondary text-white p-3 rounded-3 bg-opacity-75">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-3 col-sm-6">
                                        <h5><i className="bi bi-tools"></i> One Year Warranty</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-6">
                                        <h5><i className="bi bi-truck"></i> Free Delivery</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-6">
                                        <h5><i className="bi bi-credit-card"></i>EMI Available </h5>
                                    </div>
                                    <div className="col-md-3 col-sm-6">
                                        <h5><i className="bi bi-headset"></i>Customer Support Available</h5>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />
                        <div className="container-fluid">
                            <h3>General</h3>
                            <table className="table table-striped table-hover">
                                <tr>
                                    <th>Model</th>
                                    <td id="td_model">{productObject.model}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td id="color">{productObject.color}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td id="brand">{productObject.brand}</td>
                                </tr>
                                <tr>
                                    <th>Screen Size and Type</th>
                                    <td id="screen">{productObject.screen}</td>
                                </tr>
                            </table>
                            <hr />
                            <h3>Processor And Memory Features</h3>
                            <table className="table table-striped table-hover">
                                <tr>
                                    <th>Processor</th>
                                    <td id="processor">{productObject.processor}</td>
                                </tr>
                                <tr>
                                    <th>SSD</th>
                                    <td id="SSD">{productObject.ssd}</td>
                                </tr>
                                <tr>
                                    <th>RAM</th>
                                    <td id="RAM">{productObject.ram}</td>
                                </tr>
                                <tr>
                                    <th>RAM Type</th>
                                    <td id="RAMType">{productObject.ram_type}</td>
                                </tr>
                                <tr>
                                    <th>Clock Speed</th>
                                    <td id="clock_speed">{productObject.clock_speed}</td>
                                </tr>
                                <tr>
                                    <th>Graphics Card</th>
                                    <td id="gpu">{productObject.gpu}</td>
                                </tr>
                            </table>
                            <hr />
                            <h3>Additional Features</h3>
                            <table className="table table-striped table-hover">
                                <tr>
                                    <th>Disk Drive</th>
                                    <td id="disk_drive">{productObject.disk_drive}</td>
                                </tr>
                                <tr>
                                    <th>Web Camera</th>
                                    <td id="cam">{cam}</td>
                                </tr>
                                <tr>
                                    <th>Finger Print Sensor</th>
                                    <td id="fingerprint">{fingerprint}</td>
                                </tr>
                                <tr>
                                    <th>Keyboard</th>
                                    <td id="keyboard">{productObject.keyboard}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </section>)
}
export default ProductDetail