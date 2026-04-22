import {
  AiOutlinePhone,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Contact UniSelection
          </h2>
          <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about universities, admissions, or platform usage?
            Reach out to us, we're here to help you make informed decisions.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Side - Contact Info */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-slate-900">
              Get In Touch
            </h3>

            <div className="space-y-4 text-gray-700 text-sm sm:text-base">
              <p className="flex items-center gap-3">
                <AiOutlinePhone className="text-blue-600 text-lg" />
                <span className="font-medium">Phone:</span> 0334-5525242
              </p>

              <p className="flex items-center gap-3">
                <AiOutlineWhatsApp className="text-green-500 text-lg" />
                <span className="font-medium">WhatsApp:</span> 0308-8130852
              </p>

              <p className="flex items-center gap-3">
                <AiOutlineMail className="text-red-500 text-lg" />
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:uniselectionkpk@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  uniselectionkpk@gmail.com
                </a>
              </p>

              <p className="text-gray-500 pt-2 text-xs sm:text-sm">
                Our support team typically responds within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-slate-900">
              Send Us a Message
            </h3>

            <form className="space-y-4 sm:space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-800 to-slate-600 hover:from-slate-700 hover:to-slate-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
