import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText } from '@/data/uiText';

const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const t = uiText[lang];

  const navLinks = [
    { path: '/', label: t.nav_home },
    { path: '/tracking', label: t.nav_tracking },
    { path: '/timeline', label: t.nav_timeline },
    { path: '/globe', label: t.nav_globe },
    { path: '/about', label: t.nav_about },
  ];

  return (
    <footer
      className="relative z-10"
      style={{
        background: '#0a0a1a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <img
                src="/peco-logo.png"
                alt="PeCoLab"
                className="h-[36px] w-auto object-contain"
              />
              <div>
                <span
                  className="text-[18px] font-bold tracking-wider neon-text-cyan block"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  WMT
                </span>
                <span
                  className="text-[10px] text-text-dim"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  WorldModel Tracker
                </span>
              </div>
            </Link>
            <p
              className="text-[13px] text-text-dim mt-1"
              style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
            >
              {t.footer_tagline}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[13px] text-text-secondary no-underline transition-colors duration-200 hover:text-neon-cyan"
                style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* PeCoLab Team Info */}
        <div
          className="mt-6 pt-6 flex flex-col items-center gap-2"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-text-dim">{t.developed_by}</span>
            <span
              className="text-[13px] font-semibold neon-text-cyan"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {t.peco_lab}
            </span>
          </div>
          <p
            className="text-[11px] text-text-dim text-center max-w-[500px]"
            style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
          >
            {lang === 'zh' ? t.peco_full : t.peco_full}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-[12px] text-text-dim">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
