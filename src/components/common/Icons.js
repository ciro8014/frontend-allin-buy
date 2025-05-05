'use client';

import React from 'react';

export const LogoIcon = () => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8 28L5.6 13.2V28H1V7.6H7.28L14.36 22.12V7.6H19V28H12.8ZM21.9742 28V7.6H26.5742V28H21.9742ZM29.1867 28V7.6H33.7867V28H29.1867ZM42.0391 28.4C40.6124 28.4 39.3924 28.08 38.3791 27.44C37.3791 26.8 36.6124 25.9333 36.0791 24.84C35.5457 23.7333 35.2791 22.48 35.2791 21.08V14.52C35.2791 13.12 35.5457 11.88 36.0791 10.8C36.6124 9.7 37.3791 8.83333 38.3791 8.2C39.3924 7.56667 40.6124 7.25333 42.0391 7.25333C43.4524 7.25333 44.6657 7.56667 45.6791 8.2C46.6924 8.82 47.4657 9.68 47.9991 10.78C48.5324 11.8667 48.7991 13.1067 48.7991 14.5V21.08C48.7991 22.48 48.5324 23.7333 47.9991 24.84C47.4657 25.9333 46.6924 26.8 45.6791 27.44C44.6657 28.08 43.4524 28.4 42.0391 28.4ZM42.0391 24.2C42.6524 24.2 43.1324 23.9733 43.4791 23.52C43.8391 23.0667 44.0191 22.4267 44.0191 21.6V14C44.0191 13.1733 43.8391 12.5333 43.4791 12.08C43.1324 11.6267 42.6524 11.4 42.0391 11.4C41.4257 11.4 40.9457 11.6267 40.5991 12.08C40.2524 12.5333 40.0791 13.1733 40.0791 14V21.6C40.0791 22.4267 40.2524 23.0667 40.5991 23.52C40.9457 23.9733 41.4257 24.2 42.0391 24.2ZM57.7773 28.4C56.3907 28.4 55.2173 28.1 54.2573 27.5C53.3107 26.8867 52.584 26.04 52.0773 24.96C51.584 23.88 51.3373 22.6267 51.3373 21.2V7.6H56.1373V21.2C56.1373 22.08 56.3107 22.7467 56.6573 23.2C57.004 23.64 57.484 23.86 58.0973 23.86C58.7107 23.86 59.184 23.64 59.5173 23.2C59.864 22.7467 60.0373 22.08 60.0373 21.2V7.6H64.7573V21.2C64.7573 22.6267 64.504 23.88 63.9973 24.96C63.504 26.04 62.7773 26.8867 61.8173 27.5C60.8707 28.1 59.4107 28.4 57.7773 28.4ZM70.9303 28L67.1303 7.6H71.7303L73.8903 21.36L76.3303 7.6H80.3303L82.7703 21.36L84.9303 7.6H89.5303L85.7303 28H80.7703L78.3303 14.6L75.8903 28H70.9303ZM93.61 28V11.7H89.71V7.6H102.01V11.7H98.21V28H93.61Z" fill="#f59e0b" />
  </svg>
);

export const SearchIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const MenuIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CartIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const StarIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const StarEmptyIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export const IncreaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DecreaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HeartIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 11.3701C16.1234 12.2023 15.9812 13.0523 15.5937 13.7991C15.2062 14.5459 14.5931 15.1515 13.8416 15.5297C13.0901 15.908 12.2384 16.0397 11.4077 15.906C10.5771 15.7723 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22768 13.4229 8.09402 12.5923C7.96035 11.7616 8.09202 10.91 8.47028 10.1584C8.84854 9.40691 9.45414 8.7938 10.2009 8.4063C10.9477 8.0188 11.7977 7.87665 12.63 8.00006C13.4789 8.12594 14.2648 8.52152 14.8716 9.12836C15.4785 9.73521 15.8741 10.5211 16 11.3701Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BoxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 8L16 4L4 8V24L16 28L28 24V8Z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 8L16 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 28V12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 8L16 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L10 10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ParcelIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 9L16 16L30 9L16 2Z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 23L16 30L30 23" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 16L16 23L30 16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LocationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UserIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const CheckmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6667 5L7.50001 14.1667L3.33334 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowRightIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export const ArrowLeftIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const CloseIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChartIcon = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const ProductIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export const OrderIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export const SettingsIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const AddIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const MessageIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const TrashIcon = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// Placeholder component para cuando necesitemos usar imágenes de producto
export const PlaceholderImage = ({ name, className }) => {
  const colors = {
    macbook: "#f3f4f6",
    headphone: "#fef3c7",
    camera: "#e0f2fe",
    phone: "#f1f5f9",
    watch: "#fff7ed",
    playstation: "#f5f3ff",
    soundbox: "#ecfccb",
    airbuds: "#fef2f2"
  };

  const getColor = () => {
    for (const [key, value] of Object.entries(colors)) {
      if (name.toLowerCase().includes(key)) {
        return value;
      }
    }
    return "#f9fafb"; // default color
  };

  const initials = name.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center justify-center ${className || 'w-full h-full'}`} style={{backgroundColor: getColor()}}>
      <span className="text-2xl font-bold text-gray-400">{initials}</span>
    </div>
  );
};

// Export a default object with all icons for convenience
const Icons = {
  Logo: LogoIcon,
  Search: SearchIcon,
  Menu: MenuIcon,
  Cart: CartIcon,
  Star: StarIcon,
  StarEmpty: StarEmptyIcon,
  Increase: IncreaseIcon,
  Decrease: DecreaseIcon,
  Heart: HeartIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  Box: BoxIcon,
  Parcel: ParcelIcon,
  Location: LocationIcon,
  User: UserIcon,
  Checkmark: CheckmarkIcon,
  ArrowRight: ArrowRightIcon,
  ArrowLeft: ArrowLeftIcon,
  Close: CloseIcon,
  Chart: ChartIcon,
  Product: ProductIcon,
  Order: OrderIcon,
  Settings: SettingsIcon,
  Add: AddIcon,
  Message: MessageIcon,
  Trash: TrashIcon,
  PlaceholderImage
};

export default Icons;