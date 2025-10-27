import { iconMap } from '../utils/iconMap';

const DynamicIcon = ({ iconName, ...props }) => {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }
  
  return <IconComponent {...props} />;
};

export default DynamicIcon;