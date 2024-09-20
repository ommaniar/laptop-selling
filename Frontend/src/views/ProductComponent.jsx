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
        
            <div class="col-lg-3 col-sm-6 my-2 card-wrapper" data-search-keyword="Thin and Light Laptop">
                <div class="card h-100">
                    <img src={'http://127.0.0.1:8000/media/'+props.image} class="card-img-top" alt="thin-and-light-laptop-image" />
                    <div class="card-body">
                        <h5 class="card-title">{props.name}</h5>
                        <p class="card-text"><del>&#8377;{props.mrp}</del> &#8377;{props.price}</p>
                        <button class="btn btn-primary w-100"
                            onClick={handleShowDetails}>Show Details</button>
                    </div>
                </div>
            </div>
    )
}

export default ProductComponent