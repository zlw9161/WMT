import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getItemById, getRelatedItems } from '@/data/worldmodel/loader';
import TrackingCard from '@/components/TrackingCard';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowLeft, ExternalLink, Globe, FileText, Github } from 'lucide-react';

const categoryConfig: Record<string, { color: string; labelEn: string; labelZh: string }> = {
  company: { color: '#ffd700', labelEn: 'Company', labelZh: '公司' },
  model: { color: '#00ffff', labelEn: 'Model', labelZh: '模型' },
  paper: { color: '#ff0080', labelEn: 'Paper', labelZh: '论文' },
  dataset: { color: '#00ff88', labelEn: 'Dataset', labelZh: '数据集' },
};

const statusConfig = {
  active: { dot: '#00ff88', label: { en: 'Active', zh: '进行中' } },
  research: { dot: '#ffd700', label: { en: 'Research', zh: '研究中' } },
  released: { dot: '#00ffff', label: { en: 'Released', zh: '已发布' } },
};

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();

  const item = useMemo(() => (id ? getItemById(id) : undefined), [id]);
  const related = useMemo(() => (id ? getRelatedItems(id, 4) : []), [id]);

  if (!item) {
    return <NotFound lang={lang} />;
  }

  const config = categoryConfig[item.category] || categoryConfig.model;
  const color = config.color;
  const statusCfg = statusConfig[item.status];

  const t = {
    back: lang === 'zh' ? '返回追踪' : 'Back to Tracking',
    overview: lang === 'zh' ? '概述' : 'Overview',
    description: lang === 'zh' ? '描述' : 'Description',
    keyInfo: lang === 'zh' ? '关键信息' : 'Key Info',
    related: lang === 'zh' ? '相关项目' : 'Related Items',
    tags: lang === 'zh' ? '标签' : 'Tags',
    status: lang === 'zh' ? '状态' : 'Status',
    category: lang === 'zh' ? '类别' : 'Category',
    date: lang === 'zh' ? '日期' : 'Date',
    organization: lang === 'zh' ? '组织' : 'Organization',
    founded: lang === 'zh' ? '成立时间' : 'Founded',
    releaseDate: lang === 'zh' ? '发布日期' : 'Release Date',
    headquarters: lang === 'zh' ? '总部' : 'Headquarters',
    website: lang === 'zh' ? '网站' : 'Website',
    paper: lang === 'zh' ? '论文' : 'Paper',
    github: lang === 'zh' ? '代码' : 'GitHub',
    modelSize: lang === 'zh' ? '模型规模' : 'Model Size',
    license: lang === 'zh' ? '许可证' : 'License',
    keyModels: lang === 'zh' ? '关键模型' : 'Key Models',
    capabilities: lang === 'zh' ? '能力' : 'Capabilities',
    employees: lang === 'zh' ? '员工数' : 'Employees',
    notFound: lang === 'zh' ? '未找到项目' : 'Item Not Found',
    notFoundDesc: lang === 'zh'
      ? '该项目不存在或已被移除。'
      : 'The item you are looking for does not exist or has been removed.',
  };

  // Build key info pairs for sidebar
  const keyInfo: { label: string; value: string }[] = [];
  if (item.founded) keyInfo.push({ label: t.founded, value: item.founded });
  if (item.releaseDate) keyInfo.push({ label: t.releaseDate, value: item.releaseDate });
  if (item.date) keyInfo.push({ label: t.date, value: item.date });
  if (item.organization) keyInfo.push({ label: t.organization, value: item.organization });
  if (item.headquarters || item.headquarters_cn) keyInfo.push({
    label: t.headquarters,
    value: lang === 'zh' && item.headquarters_cn ? item.headquarters_cn : (item.headquarters || ''),
  });
  if (item.modelSize) keyInfo.push({ label: t.modelSize, value: item.modelSize });
  if (item.license) keyInfo.push({ label: t.license, value: item.license });
  if (item.employees) keyInfo.push({ label: t.employees, value: item.employees });

  const tagColors: Record<string, string> = {
    company: '#ffd700',
    model: '#00ffff',
    paper: '#ff0080',
    dataset: '#00ff88',
  };

  return (
    <div className="min-h-[100dvh]">
      {/* ===== DETAIL HEADER ===== */}
      <section
        className="relative flex flex-col justify-end px-6 pb-10"
        style={{
          minHeight: '50vh',
          paddingTop: '72px',
          background: `radial-gradient(ellipse at center top, ${color}15 0%, transparent 60%), linear-gradient(to bottom, rgba(10,10,26,0.3) 0%, #0a0a1a 100%)`,
        }}
      >
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/tracking"
              className="inline-flex items-center gap-2 text-[13px] text-text-secondary no-underline transition-colors duration-200 hover:text-neon-cyan mb-6"
              style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
            >
              <ArrowLeft size={16} />
              {t.back}
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4"
          >
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold capitalize"
              style={{
                background: `${color}22`,
                color: color,
                border: `1px solid ${color}44`,
              }}
            >
              {lang === 'zh' ? config.labelZh : config.labelEn}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-[32px] md:text-[56px] font-bold mb-2"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              lineHeight: 1.15,
              color: '#ffffff',
              textShadow: `0 0 10px ${color}CC, 0 0 30px ${color}80, 0 0 60px ${color}40`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {item.title}
          </motion.h1>

          {/* Chinese Title */}
          <motion.p
            className="text-[18px] md:text-[22px] text-text-secondary mb-4"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {item.title_cn}
          </motion.p>

          {/* Meta row */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Status */}
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: statusCfg.dot,
                  boxShadow: `0 0 8px ${statusCfg.dot}`,
                }}
              />
              <span className="text-[13px] text-text-secondary">
                {lang === 'zh' ? statusCfg.label.zh : statusCfg.label.en}
              </span>
            </div>

            {/* Organization */}
            {item.organization && (
              <span className="text-[13px] text-text-dim">{item.organization}</span>
            )}

            {/* Date */}
            <span className="text-[13px] text-text-dim">{item.date}</span>

            {/* External Links */}
            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] transition-colors duration-200 hover:text-neon-cyan"
                style={{ color }}
              >
                <Globe size={13} />
                {t.website}
                <ExternalLink size={11} />
              </a>
            )}
            {item.paperUrl && (
              <a
                href={item.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] transition-colors duration-200 hover:text-neon-cyan"
                style={{ color }}
              >
                <FileText size={13} />
                {t.paper}
                <ExternalLink size={11} />
              </a>
            )}
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] transition-colors duration-200 hover:text-neon-cyan"
                style={{ color }}
              >
                <Github size={13} />
                {t.github}
                <ExternalLink size={11} />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Content (2/3) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <ScrollReveal>
              <div>
                <h2
                  className="text-[22px] font-semibold text-text-primary mb-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    textShadow: `0 0 8px ${color}40`,
                  }}
                >
                  {t.description}
                </h2>
                <p
                  className="text-[15px] text-text-secondary leading-relaxed mb-4"
                  style={{
                    fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                  }}
                >
                  {lang === 'zh' ? item.description_cn : item.description}
                </p>
                {lang === 'en' && item.description_cn !== item.description && (
                  <p
                    className="text-[14px] text-text-dim leading-relaxed"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {item.description_cn}
                  </p>
                )}
              </div>
            </ScrollReveal>

            {/* Key Features / Capabilities */}
            {item.capabilities && item.capabilities.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div>
                  <h2
                    className="text-[22px] font-semibold text-text-primary mb-4"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      textShadow: `0 0 8px ${color}40`,
                    }}
                  >
                    {t.capabilities}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(lang === 'zh' && item.capabilities_cn ? item.capabilities_cn : item.capabilities).map((cap: string) => (
                      <span
                        key={cap}
                        className="px-3 py-1.5 rounded-lg text-[13px]"
                        style={{
                          background: `${color}15`,
                          color: color,
                          border: `1px solid ${color}30`,
                          fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Key Models (for companies) */}
            {item.keyModels && item.keyModels.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div>
                  <h2
                    className="text-[22px] font-semibold text-text-primary mb-4"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      textShadow: `0 0 8px ${color}40`,
                    }}
                  >
                    {t.keyModels}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.keyModels.map((model: string) => (
                      <span
                        key={model}
                        className="px-3 py-1.5 rounded-lg text-[13px]"
                        style={{
                          background: `${color}15`,
                          color: color,
                          border: `1px solid ${color}30`,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right: Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Info Card */}
            <ScrollReveal delay={0.2}>
              <div className="glass-card p-5">
                <h3
                  className="text-[16px] font-semibold text-text-primary mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {t.keyInfo}
                </h3>
                <div className="space-y-3">
                  {/* Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-text-dim">{t.category}</span>
                    <span
                      className="text-[12px] font-medium capitalize"
                      style={{ color }}
                    >
                      {lang === 'zh' ? config.labelZh : config.labelEn}
                    </span>
                  </div>
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-text-dim">{t.status}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: statusCfg.dot,
                          boxShadow: `0 0 5px ${statusCfg.dot}`,
                        }}
                      />
                      <span className="text-[12px] text-text-secondary">
                        {lang === 'zh' ? statusCfg.label.zh : statusCfg.label.en}
                      </span>
                    </div>
                  </div>
                  {/* Key info rows */}
                  {keyInfo.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-[12px] text-text-dim">{label}</span>
                      <span className="text-[12px] text-text-secondary">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[12px] text-text-dim block mb-2">{t.tags}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'zh' && item.tags_cn ? item.tags_cn : item.tags).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          background: `${color}18`,
                          color: color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Related Items Card */}
            {related.length > 0 && (
              <ScrollReveal delay={0.3}>
                <div className="glass-card p-5">
                  <h3
                    className="text-[16px] font-semibold text-text-primary mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t.related}
                  </h3>
                  <div className="space-y-3">
                    {related.map((rel) => {
                      const relConfig = categoryConfig[rel.category] || categoryConfig.model;
                      return (
                        <Link
                          key={rel.id}
                          to={`/detail/${rel.id}`}
                          className="flex items-center gap-3 p-2.5 rounded-lg no-underline transition-all duration-200"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${relConfig.color}15`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: relConfig.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-text-primary truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {lang === 'zh' ? rel.title_cn : rel.title}
                            </p>
                            <p className="text-[10px] text-text-dim capitalize">{rel.category}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ===== RELATED ITEMS GRID ===== */}
      {related.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-20">
          <ScrollReveal>
            <h2
              className="text-[22px] font-semibold text-text-primary mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                textShadow: `0 0 8px ${color}40`,
              }}
            >
              {t.related}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel, index) => (
              <TrackingCard
                key={rel.id}
                id={rel.id}
                title={rel.title}
                titleCn={rel.title_cn}
                description={rel.description}
                descriptionCn={rel.description_cn}
                category={rel.category}
                categoryColor={tagColors[rel.category] || '#ff0080'}
                tags={rel.tags?.slice(0, 3) || []}
                status={rel.status}
                date={rel.date || ''}
                imageUrl={rel.image}
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function NotFound({ lang }: { lang: 'en' | 'zh' }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6" style={{ paddingTop: '72px' }}>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-[40px] font-bold text-text-primary mb-4"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {lang === 'zh' ? '未找到项目' : 'Item Not Found'}
        </h1>
        <p
          className="text-[16px] text-text-secondary mb-8"
          style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
        >
          {lang === 'zh'
            ? '该项目不存在或已被移除。'
            : 'The item you are looking for does not exist or has been removed.'}
        </p>
        <Link
          to="/tracking"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium no-underline transition-all duration-300"
          style={{
            background: 'rgba(0, 255, 255, 0.1)',
            color: '#00ffff',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <ArrowLeft size={16} />
          {lang === 'zh' ? '返回追踪' : 'Back to Tracking'}
        </Link>
      </motion.div>
    </div>
  );
}
