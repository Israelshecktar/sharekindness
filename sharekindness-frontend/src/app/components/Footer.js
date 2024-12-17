const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <div className="mb-3">
          <a href="#" className="underline">
            About Us
          </a>{" "}
          |{" "}
          <a href="#" className="underline">
            Contact
          </a>{" "}
          |{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} ShareKindness. All Rights Reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  