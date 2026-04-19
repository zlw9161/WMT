import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText } from '@/data/uiText';

const Navbar: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const location = useLocation();
  const t = uiText[lang];

  const navLinks = [
    { path: '/', label: t.nav_home },
    { path: '/tracking', label: t.nav_tracking },
    { path: '/timeline', label: t.nav_timeline },
    { path: '/about', label: t.nav_about },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12"
      style={{
        height: '72px',
        background: 'rgba(10, 10, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 no-underline">
        <img
          src="/peco-logo.png"
          alt="PeCoLab"
          className="h-[40px] w-auto object-contain"
        />
        <div className="flex flex-col">
          <span
            className="text-[18px] font-bold tracking-wider neon-text-cyan leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            WMT
          </span>
          <span
            className="text-[10px] text-text-dim hidden sm:inline leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            WorldModel Tracker
          </span>
        </div>
      </Link>

      {/* Center Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="relative text-[14px] font-medium transition-colors duration-200 no-underline"
            style={{
              color: isActive(link.path) ? '#ff0080' : '#a0a0b8',
              fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
            }}
          >
            {link.label}
            {isActive(link.path) && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px]"
                style={{
                  background: '#ff0080',
                  boxShadow: '0 0 10px rgba(255, 0, 128, 0.8), 0 0 20px rgba(255, 0, 128, 0.4)',
                }}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Language Toggle */}
      <button
        onClick={toggleLang}
        className="flex items-center justify-center w-[48px] h-[32px] rounded-full text-[12px] font-semibold cursor-pointer transition-all duration-200"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#00ffff',
          fontFamily: "'Inter', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 255, 255, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.4)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {lang === 'en' ? '中' : 'EN'}
      </button>
    </nav>
  );
};

export default Navbar;
