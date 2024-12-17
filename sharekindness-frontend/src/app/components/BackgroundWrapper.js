const BackgroundWrapper = ({ children, backgroundImage = '/background.svg', opacity = 0.5 }) => {
    return (
      <div 
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Background Opacity Overlay */}
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity }} 
        ></div>
  
        {/* Page Content */}
        <div className="relative z-10 w-full">{children}</div>
      </div>
    );
  };
  
  export default BackgroundWrapper;
  