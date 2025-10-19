
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-slate-600 mt-12 border-t border-slate-200">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="mb-2">Made with <span className="text-red-400">❤</span> for the Hackathon</p>
        <div className="flex justify-center space-x-6 text-slate-500">
          <a href="https://github.com/himanshulokhande26" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/himanshu-lokhandee-840a78295" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
