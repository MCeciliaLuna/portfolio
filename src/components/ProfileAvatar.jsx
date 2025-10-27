import React from 'react';

const ProfileAvatar = ({ 
  src, 
  alt, 
  name,
  size = 300,
  className = "profile-avatar",
  fallbackBg = "6f2dbd",
  fallbackColor = "ffffff"
}) => {
  const handleError = (e) => {
    if (name) {
      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${fallbackBg}&color=${fallbackColor}&font-size=0.4`;
    }
  };

  return (
    <div className={`${className}-wrapper`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt={alt || `${name} - Perfil`}
        className={className}
        loading="eager"
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid var(--white)',
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  );
};

export default ProfileAvatar;