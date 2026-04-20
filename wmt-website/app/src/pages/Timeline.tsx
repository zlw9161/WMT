import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTimeline } from '@/data/worldmodel/loader';
import type { TimelineEvent } from '@/data/worldmodel/loader';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  milestone: '#ff0080',
  breakthrough: '#00ffff',
  release: '#00ff88',
  foundation: '#ffd700',
  research: '#ff6600',
};

const importanceSize: Record<string, number> = {
  high: 16,
  medium: 12,
  low: 8,
};

const basePeriods = [
  { range: '2018-2019', labelEn: 'Early Concepts', labelCn: '早期概念', start: 2018, end: 2019 },
  { range: '2020-2021', labelEn: 'Foundation Era', labelCn: '基础时代', start: 2020, end: 2021 },
  { range: '2022-2023', labelEn: 'Breakthrough Period', labelCn: '突破时期', start: 2022, end: 2023 },
  { range: '2024-2025', labelEn: 'Expansion', labelCn: '扩展阶段', start: 2024, end: 2025 },
];

const buildPeriods = (events: TimelineEvent[]) => {
  const years = events
    .map((ev) => parseInt(ev.year, 10))
    .filter((year) => Number.isFinite(year));

  const maxYear = years.length > 0 ? Math.max(...years) : 2025;
  const periods = [...basePeriods];

  // Auto-extend timeline periods so new years (e.g. 2026+) are visible without code changes.
  for (let start = 2026; start <= maxYear; start += 2) {
    const end = start + 1;
    periods.push({
      range: `${start}-${end}`,
      labelEn: 'Latest Frontier',
      labelCn: '前沿进展',
      start,
      end,
    });
  }

  return periods;
};

function TimelineNode({ color, importance }: { color: string; importance: string }) {
  const size = importanceSize[importance] || 12;
  return (
    <div
      className="rounded-full flex-shrink-0 z-10"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 10px ${color}80, 0 0 20px ${color}40`,
      }}
    />
  );
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const { lang } = useLanguage();
  const color = categoryColors[event.category] || '#ff0080';
  const isLeft = index % 2 === 0;

  return (
    <ScrollReveal delay={0.1} direction={isLeft ? 'left' : 'right'}>
      <motion.div
        className="glass-card p-5 transition-all duration-300 glow-border-magenta"
        whileHover={{ y: -4 }}
      >
        {/* Date Badge */}
        <div
          className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-3"
          style={{
            background: `${color}22`,
            color: color,
            border: `1px solid ${color}44`,
          }}
        >
          {event.date}
        </div>

        {/* Title */}
        <h3
          className="text-[16px] font-semibold text-text-primary mb-1 leading-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {lang === 'zh' ? event.title_cn : event.title}
        </h3>

        {/* Description */}
        <p
          className="text-[13px] text-text-secondary leading-relaxed mb-3"
          style={{
            fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
          }}
        >
          {lang === 'zh' ? event.description_cn : event.description}
        </p>

        {/* Category Tag */}
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize"
            style={{
              background: `${color}22`,
              color: color,
              border: `1px solid ${color}33`,
            }}
          >
            {event.category}
          </span>
          {event.importance === 'high' && (
            <span className="text-[10px] text-neon-gold font-medium">★</span>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Timeline() {
  const { lang } = useLanguage();
  const timelineEvents = useMemo(() => getTimeline(), []);

  // Group events by period
  const groupedEvents = useMemo(() => {
    const periods = buildPeriods(timelineEvents);
    return periods.map(period => {
      const events = timelineEvents.filter(ev => {
        const year = parseInt(ev.year);
        return year >= period.start && year <= period.end;
      });
      return { ...period, events };
    }).filter(g => g.events.length > 0);
  }, [timelineEvents]);

  const t = {
    title: lang === 'zh' ? '发展时间线' : 'Development Timeline',
    description: lang === 'zh'
      ? '世界模型从概念到现实的旅程'
      : 'The journey of world models from concept to reality',
    futureTitle: lang === 'zh' ? '未来展望' : 'The Future',
    futureText: lang === 'zh'
      ? '世界模型领域正在快速发展。随着多模态AI、物理模拟和实时渲染技术的进步，我们正在见证新一代能够理解并模拟复杂世界系统的AI模型的诞生。未来，世界模型将在自动驾驶、机器人技术、科学研究、创意内容生成等领域发挥越来越重要的作用。'
      : 'The world model field is evolving rapidly. With advances in multimodal AI, physical simulation, and real-time rendering, we are witnessing the emergence of a new generation of AI models capable of understanding and simulating complex world systems. In the future, world models will play increasingly important roles in autonomous driving, robotics, scientific research, and creative content generation.',
    cta: lang === 'zh' ? '查看最新追踪' : 'View Latest Tracking',
    relatedItems: lang === 'zh' ? '相关项目' : 'Related Items',
  };

  return (
    <div className="min-h-[100dvh]">
      {/* ===== PAGE HEADER ===== */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: '50vh', paddingTop: '72px' }}
      >
        <motion.h1
          className="text-[40px] md:text-[56px] font-bold mb-4 neon-text-gold"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            lineHeight: 1.15,
            color: '#ffffff',
            textShadow: '0 0 10px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.2)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          className="text-[16px] md:text-[18px] text-text-secondary max-w-[600px]"
          style={{
            fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {t.description}
        </motion.p>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="max-w-[1000px] mx-auto px-6 lg:px-12 pb-20">
        {/* Central vertical line — desktop only */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2" style={{ width: '2px' }} />

        {groupedEvents.map((group, groupIndex) => (
          <div key={group.range} className="mb-16">
            {/* Period Header */}
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2
                  className="text-[28px] md:text-[40px] font-bold text-text-primary mb-1"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: '0 0 10px rgba(255,255,255,0.15)',
                  }}
                >
                  {group.range}
                </h2>
                <p
                  className="text-[14px] text-text-dim tracking-wider uppercase"
                  style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
                >
                  {lang === 'zh' ? group.labelCn : group.labelEn}
                </p>
              </div>
            </ScrollReveal>

            {/* Period divider line segment */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-4 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2"
                style={{
                  width: '2px',
                  background: 'linear-gradient(to bottom, #00ffff, #ff0080, #ffd700)',
                  opacity: 0.4,
                }}
              />

              {/* Timeline Events */}
              <div className="space-y-8">
                {group.events.map((event, eventIndex) => {
                  const globalIndex = groupIndex * 100 + eventIndex;
                  const isLeft = globalIndex % 2 === 0;
                  const color = categoryColors[event.category] || '#ff0080';

                  return (
                    <div
                      key={event.id}
                      className="relative flex items-start md:items-center"
                    >
                      {/* Desktop: alternating layout */}
                      <div className="hidden md:grid md:grid-cols-2 md:gap-12 w-full">
                        {isLeft ? (
                          <>
                            {/* Left card */}
                            <div className="flex justify-end items-center gap-6">
                              <TimelineCard event={event} index={globalIndex} />
                              <TimelineNode color={color} importance={event.importance} />
                            </div>
                            <div /> {/* empty right side */}
                          </>
                        ) : (
                          <>
                            <div /> {/* empty left side */}
                            {/* Right card */}
                            <div className="flex justify-start items-center gap-6">
                              <TimelineNode color={color} importance={event.importance} />
                              <TimelineCard event={event} index={globalIndex} />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Mobile: single column */}
                      <div className="flex md:hidden items-start gap-4 w-full">
                        <TimelineNode color={color} importance={event.importance} />
                        <div className="flex-1">
                          <TimelineCard event={event} index={globalIndex} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* ===== FUTURE OUTLOOK ===== */}
        <ScrollReveal>
          <div className="relative mt-8">
            {/* End of timeline node */}
            <div className="flex items-center justify-center mb-10">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: '#ffd700',
                  boxShadow: '0 0 15px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4)',
                }}
              />
            </div>

            <div
              className="glass-card p-8 md:p-10 text-center"
              style={{
                border: '1px solid rgba(255, 215, 0, 0.2)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
              }}
            >
              <h2
                className="text-[28px] md:text-[36px] font-bold mb-4 neon-text-gold"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#ffffff',
                  textShadow: '0 0 10px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.2)',
                }}
              >
                {t.futureTitle}
              </h2>
              <p
                className="text-[14px] md:text-[16px] text-text-secondary max-w-[700px] mx-auto leading-relaxed mb-6"
                style={{
                  fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                }}
              >
                {t.futureText}
              </p>
              <Link
                to="/tracking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium no-underline transition-all duration-300"
                style={{
                  background: 'rgba(255, 215, 0, 0.1)',
                  color: '#ffd700',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.15)',
                }}
              >
                {t.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
