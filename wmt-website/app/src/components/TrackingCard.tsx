import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrackingCardProps {
  id: string;
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  category: string;
  categoryColor?: string;
  tags: string[];
  status: 'active' | 'research' | 'released';
  date: string;
  imageUrl?: string;
  index?: number;
}

const statusConfig = {
  active: { dot: '#00ff88', label: { en: 'Active', zh: '进行中' } },
  research: { dot: '#ffd700', label: { en: 'Research', zh: '研究中' } },
  released: { dot: '#00ffff', label: { en: 'Released', zh: '已发布' } },
};

const defaultCategoryColors: Record<string, string> = {
  'Video Generation': '#ff0080',
  'Multimodal': '#00ffff',
  'Autonomous Driving': '#ffd700',
  'Physical AI': '#ff6600',
  'Video': '#ff0080',
};

const TrackingCard: React.FC<TrackingCardProps> = ({
  id,
  title,
  titleCn,
  description,
  descriptionCn,
  category,
  categoryColor,
  tags,
  status,
  date,
  imageUrl,
  index = 0,
}) => {
  const { lang } = useLanguage();
  const statusCfg = statusConfig[status];
  const catColor = categoryColor || defaultCategoryColors[category] || '#ff0080';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      <Link
        to={`/detail/${id}`}
        className="block glass-card overflow-hidden no-underline transition-all duration-300 glow-border-magenta"
        style={{ cursor: 'pointer' }}
      >
        {/* Image Banner */}
        <div className="relative w-full aspect-video overflow-hidden flex items-center justify-center">
          {/* Base colored background */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: catColor, opacity: imageUrl ? 0.15 : 0.35 }}
          />
          {/* Dark overlay for depth */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 70% 30%, transparent 0%, rgba(10,10,26,0.7) 100%)',
            }}
          />
          {/* Image overlay if URL exists */}
          {imageUrl && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          {/* Bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,26,0.95) 0%, transparent 55%)',
              zIndex: 1,
            }}
          />
          {/* Initial letter */}
          <span
            className="relative text-[56px] font-bold pointer-events-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: catColor,
              opacity: imageUrl ? 0.15 : 0.4,
              textShadow: `0 0 50px ${catColor}55`,
              zIndex: 1,
            }}
          >
            {title.charAt(0)}
          </span>
          {/* Category Badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold"
            style={{
              background: 'rgba(18, 18, 42, 0.7)',
              color: catColor,
              border: `1px solid ${catColor}66`,
              backdropFilter: 'blur(8px)',
              zIndex: 2,
            }}
          >
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3
            className="text-[16px] font-semibold text-text-primary mb-1 leading-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {lang === 'zh' ? titleCn : title}
          </h3>

          {/* Description */}
          <p
            className="text-[13px] text-text-secondary leading-relaxed mb-4 line-clamp-2"
            style={{
              fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
            }}
          >
            {lang === 'zh' ? descriptionCn : description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                style={{
                  background: 'rgba(255, 0, 128, 0.12)',
                  color: '#ff0080',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: Status + Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: statusCfg.dot,
                  boxShadow: `0 0 6px ${statusCfg.dot}`,
                }}
              />
              <span className="text-[11px] text-text-secondary">
                {lang === 'zh' ? statusCfg.label.zh : statusCfg.label.en}
              </span>
            </div>
            <span className="text-[11px] text-text-dim">{date}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TrackingCard;
