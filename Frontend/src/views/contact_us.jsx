import image from "../assets/contact-png.png"
import Header from "./header"
function Contact() {
    return (

        <section>
        <Header />
            <section class="container">
                <div class="bg-contact ">
                    <h3 class="text-white p-3 text-center mb-0 pb-1 bg-dark bg-opacity-50 text-white">Get in Touch with Us</h3>
                    <h2 class="text-center pt-5 bg-dark m-0 bg-opacity-50 text-white">CONTACT US</h2>

                    <p class="pb-5 px-5 text-center bg-dark bg-opacity-50 text-white">
                        <strong>Need technical support with your laptop purchase?</strong>Contact our experts
                    </p>
                </div>
                <div class="row text-center">
                    <div class="col-md-3 py-3">
                        <h4><i class="bi bi-phone"></i></h4>
                        <h6 class="my-0">Phone Number</h6>
                        <p class="text-secondary mt-0">9876543210</p>
                    </div>
                    <div class="col-md-3 py-3">
                        <h4><i class="bi bi-envelope-open"></i></h4>
                        <h6 class="my-0">Email</h6>
                        <p class="text-secondary">abc@company.com</p>
                    </div>
                    <div class="col-md-3 py-3">
                        <h4><i class="bi bi-geo-alt"></i></h4>
                        <h6 class="my-0">Address</h6>
                        <p class="text-secondary">Lok Jagruti Institute Technology Sarkhej ,Ahmedabad </p>
                    </div>
                    <div class="col-md-3 py-3">
                        <h4><i class="bi bi-clock-fill"></i></h4>
                        <h6>Timings</h6>
                        <p class="text-secondary">Monday - Friday (9:00 AM to 5:00 PM)</p>
                    </div>
                </div>
                <hr/>
            </section>
            <section class="container">
                <div class="row">
                    <div class="col-md-6">
                        <form class="was-validated">
                            <div>
                                <input type="text" name="fnmme" id="fname" class="form-control mb-3" placeholder="First Name" required/>
                                    <input type="text" name="lname" id="lname" class="form-control mb-3" placeholder="Last Name" required/>
                                    </div>
                                    <div>
                                        <input type="email" name="email" id="email" class="form-control mb-3" placeholder="E-mail" required/>
                                            <input type="text" name="phone" id="phone" class="form-control mb-3" placeholder="Phone" required/>
                                            </div>
                                            <textarea rows="5" placeholder="Message" class="form-control mb-3" required></textarea>
                                            <input type="submit" class="btn btn-success" value="send message"/>
                                            </form>
                                    </div>
                                    <div class="col-md-6">
                                        <img src={image} alt="" class="img-fluid"/>

                                    </div>
                            </div>
                            <div class="map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281593.600203412!2d72.09721794998711!3d20.756556409268157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1718208430951!5m2!1sen!2sin"
                                    width="100%" height="450" frameborder="0" style={{border:0}} aria-hidden="false"
                                    tabindex="0"></iframe>
                            </div>

                        </section>
                    </section>
                    )   
}

export default Contact