'use client';

import logo from '../../../assets/logo.png';
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faBars, 
  faShoppingCart, 
  faStar as faStarSolid,
  faPlus, 
  faMinus,
  faHeart, 
  faBox, 
  faBoxOpen,
  faMapMarkerAlt,
  faUser,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faChartBar,
  faCube,
  faShoppingBag,
  faCog,
  faCommentDots,
  faTrashAlt,
  faList,
  faFilter,
  faThLarge
} from '@fortawesome/free-solid-svg-icons';
import { 
  faHeart as faHeartRegular,
  faStar as faStarEmpty
} from '@fortawesome/free-regular-svg-icons';
import { 
  faFacebookF as faFacebookBrand, 
  faInstagram as faInstagramBrand, 
  faTwitter as faTwitterBrand 
} from '@fortawesome/free-brands-svg-icons';

export const LogoIcon = ({ className }) => (
  <Image
    src={logo} 
    alt="Logo de la marca" 
    width={60} 
    height={20}
    priority
    quality={100}
    className={className || ""}
    style={{ objectFit: 'contain' }}
  />
);

export const SearchIcon = ({ className }) => (
  <FontAwesomeIcon icon={faSearch} className={className} />
);

export const MenuIcon = ({ className }) => (
  <FontAwesomeIcon icon={faBars} className={className} />
);

export const CartIcon = ({ className }) => (
  <FontAwesomeIcon icon={faShoppingCart} className={className} />
);

export const UserIcon = ({ className }) => (
  <FontAwesomeIcon icon={faUser} className={className} />
);

export const HeartIcon = ({ className, filled = true }) => (
  <FontAwesomeIcon icon={filled ? faHeart : faHeartRegular} className={className} />
);

export const StarIcon = ({ className, filled = true }) => (
  <FontAwesomeIcon icon={filled ? faStarSolid : faStarEmpty} className={className} />
);

export const IncreaseIcon = ({ className }) => (
  <FontAwesomeIcon icon={faPlus} className={className} />
);

export const DecreaseIcon = ({ className }) => (
  <FontAwesomeIcon icon={faMinus} className={className} />
);

export const ArrowIcon = ({ className, direction = 'right' }) => (
  <FontAwesomeIcon icon={direction === 'right' ? faArrowRight : faArrowLeft} className={className} />
);

export const CheckmarkIcon = ({ className }) => (
  <FontAwesomeIcon icon={faCheck} className={className} />
);

export const BoxIcon = ({ className }) => (
  <FontAwesomeIcon icon={faBox} className={className} />
);

export const ParcelIcon = ({ className }) => (
  <FontAwesomeIcon icon={faBoxOpen} className={className} />
);

export const LocationIcon = ({ className }) => (
  <FontAwesomeIcon icon={faMapMarkerAlt} className={className} />
);

export const ProductListIcon = ({ className }) => (
  <FontAwesomeIcon icon={faList} className={className} />
);

export const FilterIcon = ({ className }) => (
  <FontAwesomeIcon icon={faFilter} className={className} />
);

export const GridViewIcon = ({ className }) => (
  <FontAwesomeIcon icon={faThLarge} className={className} />
);

export const ListViewIcon = ({ className }) => (
  <FontAwesomeIcon icon={faList} className={className} />
);

export const FacebookIcon = ({ className }) => (
  <FontAwesomeIcon icon={faFacebookBrand} className={className} />
);

export const InstagramIcon = ({ className }) => (
  <FontAwesomeIcon icon={faInstagramBrand} className={className} />
);

export const TwitterIcon = ({ className }) => (
  <FontAwesomeIcon icon={faTwitterBrand} className={className} />
);

export const CloseIcon = ({ className }) => (
  <FontAwesomeIcon icon={faTimes} className={className} />
);

// Crear componente específico para ArrowRightIcon
export const ArrowRightIcon = ({ className }) => (
  <FontAwesomeIcon icon={faArrowRight} className={className} />
);

// Componente placeholder para imágenes
export const PlaceholderImage = ({ className, src, alt = "Image", width = 100, height = 100 }) => (
  <Image 
    src={src || "/placeholder.jpg"} 
    alt={alt} 
    className={className} 
    width={width}
    height={height}
    style={{ objectFit: 'contain' }}
  />
);

// Dashboard icons
export const ChartIcon = ({ className }) => (
  <FontAwesomeIcon icon={faChartBar} className={className} />
);

export const ProductIcon = ({ className }) => (
  <FontAwesomeIcon icon={faCube} className={className} />
);

export const OrderIcon = ({ className }) => (
  <FontAwesomeIcon icon={faShoppingBag} className={className} />
);

export const SettingsIcon = ({ className }) => (
  <FontAwesomeIcon icon={faCog} className={className} />
);

export const MessageIcon = ({ className }) => (
  <FontAwesomeIcon icon={faCommentDots} className={className} />
);

export const DeleteIcon = ({ className }) => (
  <FontAwesomeIcon icon={faTrashAlt} className={className} />
);

// Export a default object with all icons for convenience
const Icons = {
  Logo: LogoIcon,
  Search: SearchIcon,
  Menu: MenuIcon,
  Cart: CartIcon,
  Star: StarIcon,
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
  Arrow: ArrowIcon,
  ArrowRight: ArrowRightIcon,
  Close: CloseIcon,
  Chart: ChartIcon,
  Product: ProductIcon,
  Order: OrderIcon,
  Settings: SettingsIcon,
  Message: MessageIcon,
  Delete: DeleteIcon,
  ProductList: ProductListIcon,
  Filter: FilterIcon,
  GridView: GridViewIcon,
  ListView: ListViewIcon,
  PlaceholderImage: PlaceholderImage
};

export default Icons;