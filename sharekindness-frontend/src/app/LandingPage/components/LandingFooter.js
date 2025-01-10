"use client";

const LandingFooter = () => {
  return (
    <footer className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 px-6 overflow-hidden">
      {/* Wave Divider (Top) - Smaller height */}
      <div className="absolute top-0 left-0 w-full h-8 -z-10">
        <WaveDivider />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Optional Newsletter Subscription - Now more compact */}
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold">Stay in the Loop</h3>
          <p className="text-xs sm:text-sm text-gray-200 mt-1">
            Subscribe for the latest updates.
          </p>
          <form className="mt-2 flex flex-col sm:flex-row justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                sm:w-auto
                sm:flex-1
                px-3
                py-2
                text-gray-800
                rounded-l-full
                rounded-r-full
                sm:rounded-r-none
                focus:outline-none
                text-sm
              "
            />
            <button
              type="submit"
              className="
                mt-2 sm:mt-0
                sm:ml-2
                px-4
                py-2
                bg-pink-500
                text-white
                text-sm
                font-semibold
                rounded-full
                hover:bg-pink-600
                transition
              "
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <img
              src="/ShareKindness-Logo.png"
              alt="ShareKindness Logo"
              className="w-12 h-12 mx-auto md:mx-0"
            />
            <p className="mt-1 text-xs text-gray-200">
              Empowering acts of kindness, one step at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              href="#"
              className="text-xs underline hover:text-yellow-300 transition"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-xs underline hover:text-yellow-300 transition"
            >
              Contact
            </a>
            <a
              href="/privacy-policy"
              className="text-xs underline hover:text-yellow-300 transition"
            >
              Privacy Policy
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-yellow-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.491v-9.294H9.69v-3.622h3.126V8.414c0-3.1 1.894-4.788 4.657-4.788 1.325 0 2.464.099 2.796.143v3.243l-1.919.001c-1.504 0-1.796.715-1.796 1.763v2.309h3.592l-.468 3.622h-3.124V24h6.116C23.407 24 24 23.407 24 22.675V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-yellow-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.933 4.933 0 002.165-2.724 9.86 9.86 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482A13.946 13.946 0 011.675 3.149 4.917 4.917 0 003.195 9.868a4.902 4.902 0 01-2.231-.573v.062a4.919 4.919 0 003.94 4.827 4.921 4.921 0 01-2.224.084 4.928 4.928 0 004.602 3.417A9.867 9.867 0 010 19.54a13.924 13.924 0 007.548 2.212c9.057 0 14.01-7.503 14.01-14.01 0-.213-.005-.426-.015-.637A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-yellow-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22.225 0H1.775C.791 0 0 .774 0 1.729v20.541C0 23.225.792 24 1.775 24h20.451C23.208 24 24 23.225 24 22.27V1.729C24 .774 23.208 0 22.225 0zM7.125 20.452H3.586V9h3.539v11.452zM5.355 7.663c-1.143 0-2.067-.926-2.067-2.069 0-1.144.924-2.07 2.067-2.07 1.144 0 2.07.926 2.07 2.07 0 1.143-.926 2.069-2.07 2.069zM20.452 20.452h-3.539v-5.896c0-1.405-.028-3.216-1.959-3.216-1.959 0-2.26 1.529-2.26 3.114v6H9.155V9h3.399v1.561h.046c.472-.895 1.628-1.834 3.353-1.834 3.585 0 4.249 2.359 4.249 5.428v6.297z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-xs text-gray-300">
          &copy; {new Date().getFullYear()} ShareKindness. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

/** Wave divider at the top of the footer (smaller) */
const WaveDivider = () => (
  <svg
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="w-full h-full"
  >
    <path
      fill="#1e3a8a" /* A deeper blue to blend with your gradient */
      fillOpacity="1"
      d="M0,32L34.3,42.7C68.6,53,137,75,206,106.7C274.3,139,343,181,411,181.3C480,181,549,139,617,138.7C685.7,139,754,181,823,197.3C891.4,213,960,203,1029,186.7C1097.1,171,1166,149,1234,154.7C1302.9,160,1371,192,1406,208L1440,224L1440,0L1406,0C1371,0,1303,0,1234,0C1166,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,685,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
    />
  </svg>
);

export default LandingFooter;
