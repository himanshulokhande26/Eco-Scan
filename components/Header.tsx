
import React from 'react';

const EcoScanLogo: React.FC = () => (
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
    <div className="p-2 bg-green-500 rounded-lg">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 9.5L12.5 12L15 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 9.5L12 12L9.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 5H8C6.89543 5 6 5.89543 6 7V17C6 18.1046 6.89543 19 8 19H16C17.1046 19 18 18.1046 18 17V7C18 5.89543 17.1046 5 16 5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5V3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800">EcoScan</span>
      <span className="text-xs text-slate-500">Smart Waste Classifier</span>
    </div>
  </a>
);

interface HeaderProps {
  onNavLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavLinkClick }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-between items-center">
          <EcoScanLogo />
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li><a href="#analyze" onClick={onNavLinkClick} className="block py-2 px-3 text-slate-700 rounded hover:bg-gray-100/50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 transition-colors">Scanner</a></li>
              <li><a href="#about" onClick={onNavLinkClick} className="block py-2 px-3 text-slate-700 rounded hover:bg-gray-100/50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 transition-colors">About</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
