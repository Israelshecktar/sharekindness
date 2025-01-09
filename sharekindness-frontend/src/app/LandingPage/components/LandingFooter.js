"use client";

const LandingFooter = () => {
  return (
    <footer
      className="
        bg-gradient-to-r
        from-blue-800
        to-blue-900
        text-white
        p-8
        relative
        z-50
      "
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <img
            src="/ShareKindness-Logo.png"
            alt="ShareKindness Logo"
            className="w-16 h-16 mx-auto md:mx-0"
          />
          <p className="mt-2 text-sm">
            Empowering acts of kindness, one step at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <a
            href="#"
            className="text-sm underline hover:text-yellow-300 transition"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-sm underline hover:text-yellow-300 transition"
          >
            Contact
          </a>
          <a
            href="/privacy-policy"
            className="text-sm underline hover:text-yellow-300 transition"
          >
            Privacy Policy
          </a>
        </div>

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
              className="w-6 h-6"
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
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.933 4.933 0 002.165-2.724 9.86 9.86 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482A13.946 13.946 0 011.675 3.149 4.917 4.917 0 003.195 9.868 4.902 4.902 0 01.964 9.295v.062a4.919 4.919 0 003.946 4.827 4.922 4.922 0 01-2.224.084 4.923 4.923 0 004.6 3.416A9.867 9.867 0 010 19.54a13.924 13.924 0 007.548 2.212c9.057 0 14.01-7.503 14.01-14.01 0-.213-.005-.426-.015-.637A10.012 10.012 0 0024 4.557z" />
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
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M22.225 0H1.775C.791 0 0 .774 0 1.729v20.541C0 23.225.792 24 1.775 24h20.451C23.208 24 24 23.225 24 22.27V1.729C24 .774 23.208 0 22.225 0zM7.125 20.452H3.586V9h3.539v11.452zM5.355 7.663c-1.143 0-2.067-.926-2.067-2.069 0-1.144.924-2.07 2.067-2.07 1.144 0 2.07.926 2.07 2.07 0 1.143-.926 2.069-2.07 2.069zM20.452 20.452h-3.539v-5.896c0-1.405-.028-3.216-1.959-3.216-1.959 0-2.26 1.529-2.26 3.114v6H9.155V9h3.399v1.561h.046c.472-.895 1.628-1.834 3.353-1.834 3.585 0 4.249 2.359 4.249 5.428v6.297z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="text-center mt-6 text-sm">
        <p>
          &copy; {new Date().getFullYear()} ShareKindness. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
