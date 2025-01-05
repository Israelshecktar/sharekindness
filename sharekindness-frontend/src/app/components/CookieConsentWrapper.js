import React from "react";
import CookieConsent from "./CookieConsent"; // Adjust the import based on the export type

const CookieConsentWrapper = ({ children }) => {
  return (
    <>
      <CookieConsent /> {/* Render the cookie consent banner */}
      {children} {/* Render child pages */}
    </>
  );
};

export default CookieConsentWrapper;
