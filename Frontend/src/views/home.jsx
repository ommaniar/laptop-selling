import laptop1Carousel from "../assets/laptop-1-carousel.png"
import laptop2Carousel from "../assets/laptop-3-carousel.png"
import laptop3Carousel from "../assets/laptop-5-carousel.png"
// import laptop1 from "../assets/laptop-1.png"
// import laptop5 from "../assets/laptop-5.png"
// import laptop3 from "../assets/laptop-3.png"
// import laptop6 from "../assets/laptop-6.png"
import ProductComponent from "./ProductComponent"
import axios from "axios"
import Header from "./header"
import React, { useState, useEffect } from 'react'
const Home = () => {
    const [productArray, setProductArray] = useState([])
    const [searchResult, setSearchResult] = useState([]);
    const [searchMessage,setSeearchMessage] = useState("");
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/new-arrivals')
            .then(response => {
                const arr = response.data.data
                setProductArray(arr)
                console.log('Fetched data:', arr); // Log the fetched data for debugging
            })
            .catch(error => {
                console.log(error)
            })
            
        // console.log(productArray)
    }, []);
    useEffect(() => {
        console.log('Updated productArray:', productArray); // Log the updated state after it's changed
    }, [productArray]);
    return (
        <>
            <Header />

            <section className="container-fluid">
                <div id="laptops" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#laptops" data-bs-slide-to="0" className="active" aria-current="true"
                            aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#laptops" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#laptops" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={laptop1Carousel} className="d-block w-100" alt="laptop-1" />
                        </div>
                        <div className="carousel-item">
                            <img src={laptop2Carousel} className="d-block w-100" alt="laptop-2" />
                        </div>
                        <div className="carousel-item">
                            <img src={laptop3Carousel} className="d-block w-100" alt="laptop-3" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#laptops" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#laptops" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </section>

            <section id="Shop" className="my-4">
                <div className="container">
                    <h1 className="heading4 text-center fw-bold">New Arrivals</h1>
                </div>
                <div className="container">
                    {/* <div class="col-lg-3 col-md-6 my-2"> */}

                        <div class="container" id="container3">
                            <div class="row">
                                {productArray.map(product => {
                                    return (
                                        <>
                                            <ProductComponent pid={product.pid} name={product.name} image={product.main_image} mrp={product.mrp} price={product.price} />
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    {/* </div> */}
                </div>
                {/* <div className="container" id="container3">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 my-2">
                            <div className="card h-100">
                                <img src={laptop1} className="card-img-top" alt="thin-and-light-laptop-image"/>
                                    <div className="card-body">
                                        <h5 className="card-title border-bottom">Thin And Light Laptop</h5>
                                        <p className="card-text"><span className="fs-4">&#8377;46700 </span><del className="text-danger">M.R.P. &#8377;50000</del><br/><span className="text-danger fw-bold">Limited Time Deal</span> </p>
                                        <button className="btn btn-primary w-100" onclick="showDetails('thin-and-light-laptop')">Show Details</button>
                                    </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 my-2">
                            <div className="card h-100 text-dark">
                                <img src={laptop5} className="card-img-top" alt="thin-and-light-laptop-image"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Gaming Laptop</h5>
                                        <p className="card-text"><span className="fs-4">&#8377;99000</span> <del className="text-danger">M.R.P. &#8377;100000</del><br/><span className="text-danger fw-bold">Limited Time Deal</span> </p>
                                        <button className="btn btn-primary w-100" onclick="showDetails('gaming-laptop')">Show Details</button>
                                    </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 my-2">
                            <div className="card h-100 text-dark">
                                <img src={laptop3} className="card-img-top" alt="thin-and-light-laptop-image"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Dual Screen Creative Laptop</h5>
                                        <p className="card-text"><span className="fs-4"> &#8377;149000</span> <del className="text-danger">M.R.P. &#8377;150000</del><br/><span className="text-danger fw-bold">Limited Time Deal</span></p>
                                        <button className="btn btn-primary w-100" onclick="showDetails('dual-screen-laptop')">Show Details</button>
                                    </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 my-2">
                            <div className="card h-100 text-dark">
                                <img src={laptop6} className="card-img-top" alt="thin-and-light-laptop-image"/>
                                    <div className="card-body">
                                        <h5 className="card-title">RGB Gaming Laptop</h5>
                                        <p className="card-text"><span className="fs-4">&#8377;125000 </span><del className="text-danger">M.R.P. &#8377;140000</del><br/><span className="text-danger fw-bold">Limited Time Deal</span></p>
                                        <button className="btn btn-primary w-100" onclick="showDetails('RGB-gaming-laptop')">Show Details</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </section>

            <section id="services" className="container-fluid text-light bg-secondary py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <h5><i className="bi bi-tools"></i> Maintenance and Repair Service</h5>
                            <p>Easily Contct Us for Repair and Maintenance.</p>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h5><i className="bi bi-truck"></i> Free Delivery</h5>
                            <p>100% free delivery.</p>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h5><i className="bi bi-credit-card"></i>Safe and Secure Payments </h5>
                            <p>Secure encryption for all transaction.</p>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h5><i className="bi bi-headset"></i>Available Customer Support</h5>
                            <p>Customer Support is available all the time.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home