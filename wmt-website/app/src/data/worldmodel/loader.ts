import companiesData from './companies.json';
import modelsData from './models.json';
import papersData from './papers.json';
import timelineData from './timeline.json';
import updatesData from './updates.json';

// Fix image paths: /banners/xxx.png → /xxx.png
const fixImagePath = (path?: string): string | undefined => {
  if (!path) return undefined;
  return path.replace(/^\/banners\//, '/');
};

export interface TrackingItem {
  id: string;
  category: 'company' | 'model' | 'paper' | 'dataset';
  title: string;
  title_cn: string;
  description: string;
  description_cn: string;
  image?: string;
  tags: string[];
  tags_cn?: string[];
  status: 'active' | 'research' | 'released';
  date: string;
  url?: string;
  website?: string;
  organization?: string;
  releaseDate?: string;
  founded?: string;
  headquarters?: string;
  headquarters_cn?: string;
  keyModels?: string[];
  employees?: string;
  paperUrl?: string;
  githubUrl?: string;
  modelSize?: string;
  license?: string;
  capabilities?: string[];
  capabilities_cn?: string[];
  [key: string]: any;
}

export interface TimelineEvent {
  id: string;
  date: string;
  year: string;
  title: string;
  title_cn: string;
  description: string;
  description_cn: string;
  category: string;
  importance: string;
  relatedItems?: string[];
}

export interface UpdateItem {
  id: string;
  date: string;
  title: string;
  title_cn: string;
  source: string;
  category: string;
  url?: string;
  summary: string;
  summary_cn: string;
}

export const getAllItems = (): TrackingItem[] => {
  const items: TrackingItem[] = [];
  const companies = (companiesData as any).items.map((i: any) => ({ ...i, category: 'company' as const, date: i.founded || '2024', image: fixImagePath(i.image) }));
  const models = (modelsData as any).items.map((i: any) => ({ ...i, category: 'model' as const, date: i.releaseDate || '2024', image: fixImagePath(i.image) }));
  const papers = (papersData as any).items.map((i: any) => ({ ...i, category: 'paper' as const, date: i.publicationDate || '2024', image: fixImagePath(i.image) }));
  items.push(...companies, ...models, ...papers);
  return items;
};

export const getCompanies = (): TrackingItem[] => (companiesData as any).items.map((i: any) => ({ ...i, category: 'company' as const, date: i.founded || '2024', image: fixImagePath(i.image) }));
export const getModels = (): TrackingItem[] => (modelsData as any).items.map((i: any) => ({ ...i, category: 'model' as const, date: i.releaseDate || '2024', image: fixImagePath(i.image) }));
export const getPapers = (): TrackingItem[] => (papersData as any).items.map((i: any) => ({ ...i, category: 'paper' as const, date: i.publicationDate || '2024', image: fixImagePath(i.image) }));
export const getTimeline = (): TimelineEvent[] => (timelineData as any).items as TimelineEvent[];
export const getUpdates = (): UpdateItem[] => (updatesData as any).items as UpdateItem[];
export const getItemById = (id: string): TrackingItem | undefined => {
  return getAllItems().find(item => item.id === id);
};

export const getRelatedItems = (id: string, limit: number = 4): TrackingItem[] => {
  const currentItem = getItemById(id);
  if (!currentItem) return [];
  const allItems = getAllItems().filter(item => item.id !== id);
  // First try to find items with matching tags
  const withMatchingTags = allItems.filter(item =>
    item.tags.some((tag: string) => currentItem.tags.includes(tag))
  );
  if (withMatchingTags.length >= limit) {
    return withMatchingTags.slice(0, limit);
  }
  // Otherwise include items from same category
  const sameCategory = allItems.filter(item => item.category === currentItem.category && item.id !== id);
  const combined = [...withMatchingTags, ...sameCategory];
  return combined.slice(0, limit);
};
