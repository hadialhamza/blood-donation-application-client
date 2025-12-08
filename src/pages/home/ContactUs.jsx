import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-base-200 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Info */}
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-bold">Get in Touch</h3>
            <p>
              Have questions about donating? Need help finding a donor? Contact
              our support team.
            </p>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-bold">Emergency Hotline:</p>
              <p className="text-2xl text-red-600 font-bold">
                +880 1234 567 890
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-bold">Email Support:</p>
              <p>support@bloodline.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
