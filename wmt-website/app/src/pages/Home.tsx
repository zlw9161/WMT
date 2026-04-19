import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText } from '@/data/uiText';
import ScrollReveal from '@/components/ScrollReveal';
import TrackingCard from '@/components/TrackingCard';

// ============================================================
// Mock Data
// ============================================================

const featuredModels = [
  {
    id: 'sora',
    title: 'Sora',
    titleCn: 'Sora',
    description: 'OpenAI\'s text-to-video model capable of generating high-quality videos up to 60 seconds from text prompts.',
    descriptionCn: 'OpenAI的文本到视频模型，能够根据文本提示生成长达60秒的高质量视频。',
    category: 'Video Generation',
    tags: ['OpenAI', 'Video', 'Diffusion'],
    status: 'released' as const,
    date: '2024-02',
    imageUrl: '/sora-banner.png',
  },
  {
    id: 'gemini-world-model',
    title: 'Gemini World Model',
    titleCn: 'Gemini世界模型',
    description: 'Google\'s multimodal world model for understanding and reasoning about the physical world.',
    descriptionCn: 'Google的多模态世界模型，用于理解和推理物理世界。',
    category: 'Multimodal',
    tags: ['Google', 'Multimodal', 'Reasoning'],
    status: 'active' as const,
    date: '2024-06',
    imageUrl: '/gemini-banner.png',
  },
  {
    id: 'gaia-1',
    title: 'GAIA-1',
    titleCn: 'GAIA-1',
    description: 'Wayve\'s generative world model for autonomous driving that predicts future driving scenarios.',
    descriptionCn: 'Wayve的自动驾驶生成式世界模型，用于预测未来驾驶场景。',
    category: 'Autonomous Driving',
    tags: ['Wayve', 'Driving', 'End-to-End'],
    status: 'research' as const,
    date: '2023-09',
    imageUrl: '/gaia-banner.png',
  },
  {
    id: 'cosmos',
    title: 'Cosmos',
    titleCn: 'Cosmos',
    description: 'NVIDIA\'s physical AI world model platform for robotics and autonomous systems.',
    descriptionCn: 'NVIDIA的物理AI世界模型平台，用于机器人和自主系统。',
    category: 'Physical AI',
    tags: ['NVIDIA', 'Robotics', 'Physical AI'],
    status: 'active' as const,
    date: '2025-01',
    imageUrl: '/cosmos-banner.png',
  },
];

const latestUpdates = [
  {
    date: '2025-01-15',
    title: 'NVIDIA Unveils Cosmos World Model Platform',
    titleCn: 'NVIDIA发布Cosmos世界模型平台',
    category: 'Release',
    categoryColor: '#00ff88',
  },
  {
    date: '2024-12-20',
    title: 'Sora Updated with Improved Physics Understanding',
    titleCn: 'Sora更新，物理理解能力增强',
    category: 'Update',
    categoryColor: '#00ffff',
  },
  {
    date: '2024-11-08',
    title: 'Wayve Expands GAIA-1 to Multi-City Driving',
    titleCn: 'Wayve将GAIA-1扩展到多城市驾驶',
    category: 'Research',
    categoryColor: '#ffd700',
  },
  {
    date: '2024-10-22',
    title: 'Google DeepMind Advances Video Generation with Veo 2',
    titleCn: 'Google DeepMind推出Veo 2推进视频生成',
    category: 'Release',
    categoryColor: '#00ff88',
  },
  {
    date: '2024-09-15',
    title: 'Physical Intelligence Raises $400M for π0 Model',
    titleCn: 'Physical Intelligence为π0模型融资4亿美元',
    category: 'Funding',
    categoryColor: '#ff0080',
  },
  {
    date: '2024-08-30',
    title: 'Meta Introduces World Model-Based RL for Robotics',
    titleCn: 'Meta推出基于世界模型的机器人强化学习',
    category: 'Research',
    categoryColor: '#ffd700',
  },
];

const heroTitleChars = 'WorldModel Tracker'.split('');

// ============================================================
// Section 1: Hero
// ============================================================

const HeroSection: React.FC = () => {
  const { lang } = useLanguage();
  const text = uiText[lang];

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: '100dvh', paddingTop: '72px' }}
    >
      {/* Animated Title */}
      <motion.h1
        className="text-[40px] md:text-[80px] font-bold leading-tight mb-4"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {heroTitleChars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * 0.05,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #ff0080 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 20px rgba(255,0,128,0.5)) drop-shadow(0 0 40px rgba(0,255,255,0.3))',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Chinese Subtitle */}
      <motion.p
        className="text-[20px] md:text-[28px] mb-6 neon-text-cyan"
        style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        世界模型跟踪器
      </motion.p>

      {/* Tagline */}
      <motion.p
        className="text-[16px] md:text-[18px] text-text-secondary max-w-[600px] mb-10"
        style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        {text.tagline}
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <Link
          to="/tracking"
          className="inline-block px-8 py-3 rounded-full text-[15px] font-semibold no-underline transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #ff0080 0%, #cc0066 100%)',
            color: '#ffffff',
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.4), 0 0 60px rgba(255, 0, 128, 0.15)',
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 128, 0.6), 0 0 80px rgba(255, 0, 128, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 128, 0.4), 0 0 60px rgba(255, 0, 128, 0.15)';
          }}
        >
          {text.explore}
        </Link>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'rgba(255, 255, 255, 0.5)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================================
// Section 2: What Are World Models?
// ============================================================

const WhatAreWMSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = uiText[lang];

  const stats = [
    { num: '50+', label: t.models_tracked },
    { num: '30+', label: t.research_labs },
    { num: '2024+', label: t.timeline_start },
  ];

  return (
    <section className="relative z-10 py-[80px] md:py-[120px] px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <h2
                className="text-[28px] md:text-[40px] font-bold text-text-primary mb-6"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow: '0 0 10px rgba(255,0,128,0.4)',
                }}
              >
                {t.what_are_wm}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-4 mb-8">
                <p
                  className="text-[15px] md:text-[16px] text-text-secondary leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {lang === 'en'
                    ? 'World models are AI systems that build internal representations of the physical world to predict future states, simulate scenarios, and enable reasoning about cause and effect. They form the foundation for next-generation AI in robotics, autonomous vehicles, and video generation.'
                    : '世界模型是构建物理世界内部表征的人工智能系统，能够预测未来状态、模拟场景并实现因果推理。它们构成了下一代人工智能在机器人、自动驾驶和视频生成等领域的基础。'}
                </p>
                <p
                  className="text-[15px] md:text-[16px] text-text-secondary leading-relaxed"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  {lang === 'en'
                    ? 'From OpenAI\'s Sora to NVIDIA\'s Cosmos, world models are reshaping how machines understand and interact with reality.'
                    : '从OpenAI的Sora到NVIDIA的Cosmos，世界模型正在重塑机器理解和与现实互动的方式。'}
                </p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card px-5 py-4 text-center min-w-[120px]"
                  >
                    <div
                      className="text-[24px] md:text-[28px] font-bold neon-text-magenta"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {stat.num}
                    </div>
                    <div
                      className="text-[12px] text-text-secondary mt-1"
                      style={{
                        fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Abstract Visualization */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Abstract gradient visualization */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,0,128,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,255,255,0.15) 0%, transparent 50%)',
                }}
              >
                {/* Animated orbs */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,0,128,0.4) 0%, transparent 70%)',
                    top: '20%',
                    left: '25%',
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-16 h-16 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,255,255,0.4) 0%, transparent 70%)',
                    top: '50%',
                    right: '20%',
                    filter: 'blur(15px)',
                  }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-14 h-14 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                    bottom: '25%',
                    left: '40%',
                    filter: 'blur(18px)',
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Connection lines (decorative) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <motion.line
                    x1="100" y1="80" x2="280" y2="200"
                    stroke="rgba(255,0,128,0.2)"
                    strokeWidth="1"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.line
                    x1="280" y1="200" x2="160" y2="320"
                    stroke="rgba(0,255,255,0.2)"
                    strokeWidth="1"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.line
                    x1="100" y1="80" x2="160" y2="320"
                    stroke="rgba(255,215,0,0.15)"
                    strokeWidth="1"
                    animate={{ opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </svg>
                {/* Center node */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,0,128,0.2) 0%, rgba(0,255,255,0.1) 50%, transparent 70%)',
                    filter: 'blur(10px)',
                  }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Section 3: Featured Models
// ============================================================

const FeaturedModelsSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = uiText[lang];

  return (
    <section
      className="relative z-10 py-[80px] md:py-[120px] px-6 lg:px-12"
      style={{ background: '#12122a' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2
              className="text-[28px] md:text-[40px] font-bold text-text-primary mb-3"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: '0 0 10px rgba(255,0,128,0.4)',
              }}
            >
              {t.featured_models}
            </h2>
            <p
              className="text-[15px] md:text-[16px] text-text-secondary"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.featured_subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredModels.map((model, index) => (
            <TrackingCard key={model.id} {...model} index={index} />
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-10">
            <Link
              to="/tracking"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-neon-cyan no-underline transition-all duration-200 hover:gap-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.view_all}
              <span>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ============================================================
// Section 4: Latest Updates
// ============================================================

const LatestUpdatesSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = uiText[lang];

  return (
    <section className="relative z-10 py-[80px] md:py-[120px] px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2
              className="text-[28px] md:text-[40px] font-bold text-text-primary mb-3"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: '0 0 10px rgba(255,0,128,0.4)',
              }}
            >
              {t.latest_updates}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {latestUpdates.map((update, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-5 px-5 transition-all duration-200 hover:bg-[rgba(255,255,255,0.02)]"
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Date */}
                <div
                  className="text-[12px] text-text-dim min-w-[90px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {update.date}
                </div>

                {/* Category Badge */}
                <div
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium self-start md:self-auto"
                  style={{
                    background: `${update.categoryColor}18`,
                    color: update.categoryColor,
                    border: `1px solid ${update.categoryColor}33`,
                  }}
                >
                  {update.category}
                </div>

                {/* Title */}
                <div
                  className="text-[14px] md:text-[15px] text-text-primary flex-1"
                  style={{
                    fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                  }}
                >
                  {lang === 'zh' ? update.titleCn : update.title}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-neon-cyan no-underline transition-all duration-200 hover:gap-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.view_timeline}
              <span>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ============================================================
// Section 5: PeCoLab Team Showcase
// ============================================================

const PeCoLabSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section
      className="relative z-10 py-[80px] md:py-[120px] px-6 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #12122a 50%, #0a0a1a 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #ff0080 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto relative">
        <div className="flex flex-col items-center text-center">
          {/* PeCoLab Logo */}
          <ScrollReveal>
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src="/peco-logo.png"
                alt="PeCoLab"
                className="h-[120px] md:h-[160px] w-auto object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]"
              />
            </motion.div>
          </ScrollReveal>

          {/* Team Name */}
          <ScrollReveal delay={0.1}>
            <h2
              className="text-[24px] md:text-[32px] font-bold mb-2"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                background: 'linear-gradient(135deg, #00ffff 0%, #ff0080 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 15px rgba(0,255,255,0.4))',
              }}
            >
              PeCoLab
            </h2>
          </ScrollReveal>

          {/* Full Name */}
          <ScrollReveal delay={0.15}>
            <p
              className="text-[14px] md:text-[16px] text-neon-cyan mb-4 tracking-wider"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {lang === 'zh' ? '感知与认知实验室' : 'Perception & Cognition Laboratory'}
            </p>
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal delay={0.2}>
            <div
              className="w-[60px] h-[2px] mb-6"
              style={{
                background: 'linear-gradient(90deg, #ff0080, #00ffff)',
                boxShadow: '0 0 10px rgba(255,0,128,0.5), 0 0 10px rgba(0,255,255,0.5)',
              }}
            />
          </ScrollReveal>

          {/* Team Description */}
          <ScrollReveal delay={0.25}>
            <p
              className="text-[14px] md:text-[16px] text-text-secondary max-w-[600px] mb-8 leading-relaxed"
              style={{
                fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
              }}
            >
              {lang === 'en'
                ? 'We are a research team dedicated to advancing artificial intelligence, focusing on perception, cognition, and world model research. WorldModel Tracker is our initiative to map and monitor the rapidly evolving landscape of world models.'
                : '我们是致力于推进人工智能的研究团队，专注于感知、认知与世界模型研究。世界模型跟踪器是我们为绘制和监测世界模型快速发展的全景而发起的项目。'}
            </p>
          </ScrollReveal>

          {/* Team Highlights */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                {
                  label: lang === 'zh' ? '世界模型研究' : 'World Model Research',
                },
                {
                  label: lang === 'zh' ? '感知与认知' : 'Perception & Cognition',
                },
                {
                  label: lang === 'zh' ? '前沿追踪' : 'Frontier Tracking',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2 glass-card px-5 py-3 min-w-[140px]"
                  whileHover={{ y: -4, borderColor: 'rgba(0, 255, 255, 0.4)' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span
                    className="text-[12px] text-text-dim uppercase tracking-wider"
                    style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Section 6: CTA Band
// ============================================================

const CTASection: React.FC = () => {
  const { lang } = useLanguage();
  const t = uiText[lang];

  return (
    <section
      className="relative z-10 py-[80px] md:py-[120px] px-6 lg:px-12"
      style={{ background: '#12122a' }}
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1280px] mx-auto text-center relative">
        <ScrollReveal>
          <h2
            className="text-[28px] md:text-[40px] font-bold text-text-primary mb-4"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 10px rgba(0,255,255,0.4)',
            }}
          >
            {t.stay_ahead}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            className="text-[15px] md:text-[16px] text-text-secondary mb-10 max-w-[500px] mx-auto"
            style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
          >
            {t.cta_subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link
            to="/tracking"
            className="inline-block px-8 py-3 rounded-full text-[15px] font-semibold no-underline transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #00ffff 0%, #0088aa 100%)',
              color: '#0a0a1a',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.15)',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6), 0 0 80px rgba(0, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.15)';
            }}
          >
            {t.start_exploring}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ============================================================
// Home Page
// ============================================================

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhatAreWMSection />
      <FeaturedModelsSection />
      <LatestUpdatesSection />
      <PeCoLabSection />
      <CTASection />
    </>
  );
};

export default Home;
