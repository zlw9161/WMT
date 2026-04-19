import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllItems } from '@/data/worldmodel/loader';
import type { TrackingItem } from '@/data/worldmodel/loader';
import TrackingCard from '@/components/TrackingCard';
import { Search, ChevronDown } from 'lucide-react';

type CategoryFilter = 'all' | 'company' | 'model' | 'paper';
type StatusFilter = 'all' | 'active' | 'research' | 'released';
type SortOption = 'newest' | 'name' | 'category';

const ITEMS_PER_PAGE = 12;

const categoryColors: Record<string, string> = {
  company: '#ffd700',
  model: '#00ffff',
  paper: '#ff0080',
  dataset: '#00ff88',
};

export default function Tracking() {
  const { lang } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const allItems = useMemo(() => getAllItems(), []);

  // Debounce search
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setVisibleCount(ITEMS_PER_PAGE);
    }, 300);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredItems = useMemo(() => {
    let items = [...allItems];

    // Category filter
    if (categoryFilter !== 'all') {
      items = items.filter(item => item.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      items = items.filter(item => item.status === statusFilter);
    }

    // Search
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.title_cn.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.description_cn.toLowerCase().includes(q) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(q)) ||
        (item.organization && item.organization.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortOption) {
      case 'newest':
        items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        break;
      case 'name':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        items.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return items;
  }, [allItems, categoryFilter, statusFilter, debouncedSearch, sortOption]);

  const visibleItems = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount]);

  const hasMore = visibleItems.length < filteredItems.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [categoryFilter, statusFilter, sortOption]);

  const t = {
    title: lang === 'zh' ? '世界模型追踪' : 'World Model Tracking',
    description: lang === 'zh'
      ? '全面追踪世界模型研究、公司和突破性进展'
      : 'Comprehensive tracking of world model research, companies, and breakthroughs',
    all: lang === 'zh' ? '全部' : 'All',
    companies: lang === 'zh' ? '公司' : 'Companies',
    models: lang === 'zh' ? '模型' : 'Models',
    papers: lang === 'zh' ? '论文' : 'Papers',
    statusActive: lang === 'zh' ? '进行中' : 'Active',
    statusResearch: lang === 'zh' ? '研究中' : 'Research',
    statusReleased: lang === 'zh' ? '已发布' : 'Released',
    sort: lang === 'zh' ? '排序' : 'Sort',
    newest: lang === 'zh' ? '最新' : 'Newest',
    name: lang === 'zh' ? '名称' : 'Name',
    sortCategory: lang === 'zh' ? '类别' : 'Category',
    showing: lang === 'zh' ? '显示' : 'Showing',
    items: lang === 'zh' ? '个项目' : 'items',
    loadMore: lang === 'zh' ? '加载更多' : 'Load More',
    noResults: lang === 'zh' ? '未找到匹配的项目' : 'No matching items found',
    searchPlaceholder: lang === 'zh' ? '搜索名称、描述、标签...' : 'Search names, descriptions, tags...',
  };

  const categoryOptions: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t.all },
    { key: 'company', label: t.companies },
    { key: 'model', label: t.models },
    { key: 'paper', label: t.papers },
  ];

  const statusOptions: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: t.all },
    { key: 'active', label: t.statusActive },
    { key: 'research', label: t.statusResearch },
    { key: 'released', label: t.statusReleased },
  ];

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'newest', label: t.newest },
    { key: 'name', label: t.name },
    { key: 'category', label: t.sortCategory },
  ];

  const currentSortLabel = sortOptions.find(o => o.key === sortOption)?.label || t.newest;

  return (
    <div className="min-h-[100dvh]">
      {/* ===== PAGE HEADER ===== */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: '60vh', paddingTop: '72px' }}
      >
        <motion.h1
          className="text-[40px] md:text-[56px] font-bold mb-4 neon-text-cyan"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            lineHeight: 1.15,
            color: '#ffffff',
            textShadow: '0 0 10px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(0,255,255,0.2)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          className="text-[16px] md:text-[18px] text-text-secondary max-w-[640px] mb-8"
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

        {/* Search Bar */}
        <motion.div
          className="w-full max-w-[560px] relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-full"
            style={{
              background: 'rgba(18, 18, 42, 0.8)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Search size={18} className="text-text-dim flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-dim outline-none"
              style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== STICKY FILTER BAR ===== */}
      <section
        className="sticky top-[72px] z-30"
        style={{
          background: 'rgba(10, 10, 26, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            {/* Category Filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {categoryOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setCategoryFilter(opt.key)}
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: categoryFilter === opt.key ? 'rgba(0, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: categoryFilter === opt.key ? '#00ffff' : '#a0a0b8',
                    border: categoryFilter === opt.key ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {statusOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setStatusFilter(opt.key)}
                  className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: statusFilter === opt.key ? 'rgba(255, 0, 128, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: statusFilter === opt.key ? '#ff0080' : '#a0a0b8',
                    border: statusFilter === opt.key ? '1px solid rgba(255, 0, 128, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Sort Dropdown + Result Count */}
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-text-dim" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t.showing} {filteredItems.length} {t.items}
              </span>

              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#a0a0b8',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                  }}
                >
                  {t.sort}: {currentSortLabel}
                  <ChevronDown size={12} className={`transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortDropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-1.5 rounded-lg overflow-hidden z-40"
                      style={{
                        background: 'rgba(18, 18, 42, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        minWidth: '120px',
                      }}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      {sortOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => { setSortOption(opt.key); setSortDropdownOpen(false); }}
                          className="block w-full text-left px-3.5 py-2 text-[12px] transition-colors duration-100 cursor-pointer"
                          style={{
                            color: sortOption === opt.key ? '#00ffff' : '#a0a0b8',
                            background: sortOption === opt.key ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
                            fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRACKING GRID ===== */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-[16px] text-text-dim" style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}>
              {t.noResults}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item: TrackingItem, index: number) => (
                  <TrackingCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    titleCn={item.title_cn}
                    description={item.description}
                    descriptionCn={item.description_cn}
                    category={item.category}
                    categoryColor={categoryColors[item.category] || '#ff0080'}
                    tags={item.tags?.slice(0, 3) || []}
                    status={item.status}
                    date={item.date || ''}
                    imageUrl={item.image}
                    index={index % 4}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <motion.button
                  onClick={handleLoadMore}
                  className="px-8 py-3 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-300"
                  style={{
                    background: 'transparent',
                    color: '#00ffff',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif",
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)',
                  }}
                  whileHover={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.15)',
                    borderColor: 'rgba(0, 255, 255, 0.6)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t.loadMore}
                </motion.button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
