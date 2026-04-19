import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCompanies, getModels, getPapers } from '@/data/worldmodel/loader';
import ScrollReveal from '@/components/ScrollReveal';
import { Globe, Clock, Languages, Github, Mail } from 'lucide-react';

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, startCounting]);

  return count;
}

function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      <div
        className="text-[40px] md:text-[56px] font-bold mb-2"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: '#ffffff',
          textShadow: '0 0 10px rgba(255,0,128,0.6), 0 0 30px rgba(255,0,128,0.3)',
        }}
      >
        {isVisible ? count : 0}{suffix}
      </div>
      <p
        className="text-[13px] md:text-[14px] text-text-secondary uppercase tracking-wider"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function About() {
  const { lang } = useLanguage();

  // Compute actual stats from data
  const companies = useMemo(() => getCompanies(), []);
  const models = useMemo(() => getModels(), []);
  const papers = useMemo(() => getPapers(), []);

  const stats = {
    models: models.length,
    companies: companies.length,
    papers: papers.length,
  };

  const t = {
    title: lang === 'zh' ? '关于世界模型跟踪器' : 'About WorldModel Tracker',
    subtitle: lang === 'zh' ? '我们绘制世界模型版图' : 'Our mission to map the world model landscape',
    missionTitle: lang === 'zh' ? '使命' : 'Mission',
    missionText: lang === 'zh'
      ? '世界模型跟踪器致力于追踪和记录人工智能世界模型领域的所有重大发展。我们提供一个全面、及时且双语的数据平台，帮助研究人员、开发者和爱好者了解这一快速发展的领域。'
      : 'WorldModel Tracker is dedicated to tracking and documenting all major developments in the AI world model field. We provide a comprehensive, timely, and bilingual data platform to help researchers, developers, and enthusiasts understand this rapidly evolving landscape.',
    whatWeTrack: lang === 'zh'
      ? '我们追踪研究论文、公司动态、模型发布和数据集更新，涵盖从视频生成到物理AI、从自动驾驶到多模态理解的所有相关领域。'
      : 'We track research papers, company developments, model releases, and dataset updates, covering everything from video generation to physical AI, autonomous driving to multimodal understanding.',
    comprehensiveTitle: lang === 'zh' ? '全面' : 'Comprehensive',
    comprehensiveDesc: lang === 'zh' ? '我们追踪所有重大世界模型发展' : 'We track all major world model developments',
    timelyTitle: lang === 'zh' ? '及时' : 'Timely',
    timelyDesc: lang === 'zh' ? '每日更新最新突破' : 'Daily updates on the latest breakthroughs',
    bilingualTitle: lang === 'zh' ? '双语' : 'Bilingual',
    bilingualDesc: lang === 'zh' ? '中英文内容全覆盖' : 'Content in both English and Chinese',
    methodologyTitle: lang === 'zh' ? '方法论' : 'Methodology',
    dataCollection: lang === 'zh' ? '数据收集' : 'Data Collection',
    dataCollectionDesc: lang === 'zh'
      ? '我们通过多种渠道收集世界模型相关信息，包括arXiv论文预印本、公司官方公告、GitHub仓库、技术博客和行业报告。'
      : 'We collect world model information through multiple channels, including arXiv preprints, official company announcements, GitHub repositories, technical blogs, and industry reports.',
    selectionCriteria: lang === 'zh' ? '筛选标准' : 'Selection Criteria',
    selectionCriteriaDesc: lang === 'zh'
      ? '我们关注具有世界模拟能力、物理理解、环境交互或跨模态推理的AI系统和研究。每个条目都经过人工审核以确保质量和相关性。'
      : 'We focus on AI systems and research with world simulation capabilities, physical understanding, environmental interaction, or cross-modal reasoning. Each entry is manually reviewed for quality and relevance.',
    updateFrequency: lang === 'zh' ? '更新频率' : 'Update Frequency',
    updateFrequencyDesc: lang === 'zh'
      ? '数据库每周更新，重大事件实时添加。我们持续监控领域动态以确保信息的时效性。'
      : 'The database is updated weekly, with major events added in real-time. We continuously monitor the field to ensure information remains current.',
    sources: lang === 'zh' ? '数据来源' : 'Data Sources',
    sourcesDesc: lang === 'zh'
      ? 'arXiv、公司官网、GitHub、技术博客、学术会议（NeurIPS、ICML、CVPR等）、行业媒体。'
      : 'arXiv, company websites, GitHub, technical blogs, academic conferences (NeurIPS, ICML, CVPR, etc.), industry media.',
    statsTitle: lang === 'zh' ? '数据统计' : 'Statistics',
    modelsLabel: lang === 'zh' ? '模型追踪' : 'Models Tracked',
    companiesLabel: lang === 'zh' ? '公司覆盖' : 'Companies Covered',
    papersLabel: lang === 'zh' ? '论文索引' : 'Papers Indexed',
    updatesLabel: lang === 'zh' ? '每日更新' : 'Daily Updates',
    contactTitle: lang === 'zh' ? '联系我们' : 'Get in Touch',
    contactDesc: lang === 'zh'
      ? '想要贡献内容或报告缺失的世界模型？欢迎通过以下方式联系我们。'
      : 'Want to contribute or report a missing world model? Reach out to us.',
    acknowledgmentsTitle: lang === 'zh' ? '致谢' : 'Acknowledgments',
    acknowledgmentsText: lang === 'zh'
      ? '感谢开源社区、研究人员和贡献者们，他们的工作使这个项目成为可能。特别感谢所有在世界模型领域推进前沿的科学家和工程师们。'
      : 'Thanks to the open source community, researchers, and contributors whose work makes this project possible. Special thanks to all scientists and engineers pushing the frontier in the world model field.',
  };

  return (
    <div className="min-h-[100dvh]">
      {/* ===== PAGE HEADER ===== */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: '40vh', paddingTop: '72px' }}
      >
        <motion.h1
          className="text-[32px] md:text-[48px] font-bold mb-4 neon-text-magenta"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            lineHeight: 1.15,
            color: '#ffffff',
            textShadow: '0 0 10px rgba(255,0,128,0.8), 0 0 30px rgba(255,0,128,0.4), 0 0 60px rgba(255,0,128,0.2)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          className="text-[16px] text-text-secondary max-w-[520px]"
          style={{
            fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* ===== MISSION STATEMENT ===== */}
      <section className="max-w-[800px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <ScrollReveal>
          <h2
            className="text-[28px] font-bold text-text-primary text-center mb-6"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 8px rgba(255,0,128,0.3)',
            }}
          >
            {t.missionTitle}
          </h2>
          <p
            className="text-[16px] text-text-secondary text-center leading-relaxed mb-4"
            style={{
              fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
            }}
          >
            {t.missionText}
          </p>
          <p
            className="text-[14px] text-text-dim text-center leading-relaxed mb-12"
            style={{
              fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
            }}
          >
            {t.whatWeTrack}
          </p>
        </ScrollReveal>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              Icon: Globe,
              title: t.comprehensiveTitle,
              desc: t.comprehensiveDesc,
              delay: 0,
            },
            {
              Icon: Clock,
              title: t.timelyTitle,
              desc: t.timelyDesc,
              delay: 0.1,
            },
            {
              Icon: Languages,
              title: t.bilingualTitle,
              desc: t.bilingualDesc,
              delay: 0.2,
            },
          ].map(({ Icon, title, desc, delay }) => (
            <ScrollReveal key={title} delay={delay}>
              <div
                className="glass-card p-6 text-center transition-all duration-300"
                style={{ border: '1px solid rgba(255, 0, 128, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 128, 0.3)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 128, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 128, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{
                    background: 'rgba(255, 0, 128, 0.12)',
                    color: '#ff0080',
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  className="text-[16px] font-semibold text-text-primary mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[13px] text-text-dim leading-relaxed"
                  style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
                >
                  {desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== METHODOLOGY ===== */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'rgba(18, 18, 42, 0.3)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2
              className="text-[28px] font-bold text-text-primary text-center mb-12"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: '0 0 8px rgba(255,0,128,0.3)',
              }}
            >
              {t.methodologyTitle}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto">
            {[
              { title: t.dataCollection, desc: t.dataCollectionDesc },
              { title: t.selectionCriteria, desc: t.selectionCriteriaDesc },
              { title: t.updateFrequency, desc: t.updateFrequencyDesc },
              { title: t.sources, desc: t.sourcesDesc },
            ].map(({ title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div className="mb-2">
                  <h3
                    className="text-[16px] font-semibold mb-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#ff0080',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[14px] text-text-secondary leading-relaxed"
                    style={{
                      fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATISTICS ===== */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <ScrollReveal>
          <h2
            className="text-[28px] font-bold text-text-primary text-center mb-12"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 8px rgba(255,0,128,0.3)',
            }}
          >
            {t.statsTitle}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <StatCard
            value={stats.models}
            suffix="+"
            label={t.modelsLabel}
            delay={0}
          />
          <StatCard
            value={stats.companies}
            suffix="+"
            label={t.companiesLabel}
            delay={0.1}
          />
          <StatCard
            value={stats.papers}
            suffix="+"
            label={t.papersLabel}
            delay={0.2}
          />
          <StatCard
            value={1}
            suffix=""
            label={t.updatesLabel}
            delay={0.3}
          />
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'rgba(18, 18, 42, 0.3)' }}
      >
        <div className="max-w-[640px] mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2
              className="text-[28px] font-bold text-text-primary mb-4"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: '0 0 8px rgba(255,0,128,0.3)',
              }}
            >
              {t.contactTitle}
            </h2>
            <p
              className="text-[15px] text-text-secondary mb-8"
              style={{
                fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                lineHeight: 1.6,
              }}
            >
              {t.contactDesc}
            </p>

            {/* Contact Methods */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium no-underline transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#a0a0b8',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 128, 0.1)';
                  e.currentTarget.style.color = '#ff0080';
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 128, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#a0a0b8';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href="mailto:contact@worldmodeltracker.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium no-underline transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#a0a0b8',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 128, 0.1)';
                  e.currentTarget.style.color = '#ff0080';
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 128, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#a0a0b8';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Mail size={15} />
                Email
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ACKNOWLEDGMENTS ===== */}
      <section className="max-w-[800px] mx-auto px-6 lg:px-12 py-16 text-center">
        <ScrollReveal>
          <h2
            className="text-[22px] font-bold text-text-primary mb-4"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 8px rgba(255,0,128,0.2)',
            }}
          >
            {t.acknowledgmentsTitle}
          </h2>
          <p
            className="text-[14px] text-text-dim leading-relaxed"
            style={{
              fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
            }}
          >
            {t.acknowledgmentsText}
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
