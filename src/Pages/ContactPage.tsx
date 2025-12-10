import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Visit Our Location
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We’re here to help you. Reach out to us anytime!
            </p>
          </div>

          <div className="mt-16 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Google Map (Fixed Location Embed) */}
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56546.61481279984!2d85.311!3d27.7089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b6ab0b5e2d%3A0x4d6a056d0b3f7b1f!2sItahari!5e0!3m2!1sen!2snp!4v1693673423434!5m2!1sen!2snp"
                  width="100%"
                  height="480"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>

              {/* Contact Info */}
              <div className="max-w-full mx-auto rounded-lg overflow-hidden shadow bg-white">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Our Address
                  </h3>
                  <p className="mt-1 text-gray-600">
                    123 Main St, Itahari, Sunsari, Nepal
                  </p>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                  <p className="mt-1 text-gray-600">Mon - Fri: 9am - 5pm</p>
                  <p className="mt-1 text-gray-600">Sat: 10am - 4pm</p>
                  <p className="mt-1 text-gray-600">Sun: Closed</p>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                  <p className="mt-1 text-gray-600">Email: info@example.com</p>
                  <p className="mt-1 text-gray-600">Phone: +977 9840987103</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
