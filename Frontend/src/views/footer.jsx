import React from 'react'

function Footer() {
    return (
    <footer className="bg-dark text-white text-center mt-0 py-3">
        <div className="bg-dark text-light">

            <h3 className="text-center pt-3">Follow Us</h3>
            <div className="my-1">
                <a href="facebook.com" className="btn text-secondary fs-2"><i className="bi bi-facebook"></i></a>
                <a href="instagram.com" className="btn text-secondary fs-2"><i className="bi bi-instagram"></i></a>
                <a href="#" className="btn text-secondary fs-2"><i className="bi bi-twitter"></i></a>
                <a href="linkedin.com" className="btn text-secondary fs-2"><i className="bi bi-linkedin"></i></a>
                <a href="youtube.com" className="btn text-secondary fs-2"><i className="bi bi-youtube"></i></a>

            </div>
        </div>

        <h6>&copy; 2024 Laptop Shop</h6>
        <p>This website is made for project purpose</p>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <p>Email: abc@company.com</p>
                </div>
                <div className="col-md">
                    <p>Phone: 0987654321</p>
                </div>
            </div>
        </div>
    </footer >
  )
}

export default Footer