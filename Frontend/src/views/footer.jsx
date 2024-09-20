import React from 'react'

function Footer() {
    return (
    <footer class="bg-dark text-white text-center mt-0 py-3">
        <div class="bg-dark text-light">

            <h3 class="text-center pt-3">Follow Us</h3>
            <div class="my-1">
                <a href="facebook.com" class="btn text-secondary fs-2"><i class="bi bi-facebook"></i></a>
                <a href="instagram.com" class="btn text-secondary fs-2"><i class="bi bi-instagram"></i></a>
                <a href="#" class="btn text-secondary fs-2"><i class="bi bi-twitter"></i></a>
                <a href="linkedin.com" class="btn text-secondary fs-2"><i class="bi bi-linkedin"></i></a>
                <a href="youtube.com" class="btn text-secondary fs-2"><i class="bi bi-youtube"></i></a>

            </div>
        </div>

        <h6>&copy; 2024 Laptop Shop</h6>
        <p>This website is made for project purpose</p>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p>Email: abc@company.com</p>
                </div>
                <div class="col-md">
                    <p>Phone: 0987654321</p>
                </div>
            </div>
        </div>
    </footer >
  )
}

export default Footer