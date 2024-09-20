import React from 'react'
import { useNavigate } from 'react-router-dom';
function ProductComponent(props) {
    const navigate = useNavigate();
    console.log(props.primary_image)
    const handleShowDetails = () => {
        // Navigate to the details page with the `pid` as a query parameter
        navigate(`/product-details?pid=${props.pid}`);
    };

    return (
        
            <div className="col-lg-3 col-sm-6 my-2 card-wrapper" data-search-keyword="Thin and Light Laptop">
                <div className="card h-100">
                    <img src={'http://127.0.0.1:8000/media/'+props.image} className="card-img-top" alt="thin-and-light-laptop-image" />
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-text"><del>&#8377;{props.mrp}</del> &#8377;{props.price}</p>
                        <button className="btn btn-primary w-100"
                            onClick={handleShowDetails}>Show Details</button>
                    </div>
                </div>
            </div>
    )
}

export default ProductComponent