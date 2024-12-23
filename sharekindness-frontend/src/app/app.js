import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure styles are imported

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-right" // Adjust position if needed
        autoClose={3000} // Time before auto-close in ms
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
