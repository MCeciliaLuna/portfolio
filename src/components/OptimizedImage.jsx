import React, { memo, useState } from 'react';

const OptimizedImage = memo(({ src, alt, className, fallbackSrc, loading = "lazy", ...props }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const imageSrc = imageError && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={`image-container ${className || ''}`} {...props}>
      {!imageLoaded && (
        <div className="image-placeholder" style={{
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }}>
          <span style={{ color: '#999' }}>Cargando...</span>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          display: imageLoaded ? 'block' : 'none',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;