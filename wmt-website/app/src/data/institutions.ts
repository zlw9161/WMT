export interface ResearchInstitution {
  id: string;
  name: string;
  name_cn: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  focus: string[];
  focus_cn: string[];
  url?: string;
}

export const institutions: ResearchInstitution[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    name_cn: 'OpenAI',
    city: 'San Francisco',
    country: 'USA',
    lat: 37.7749,
    lng: -122.4194,
    focus: ['Video world models', 'Multimodal reasoning'],
    focus_cn: ['视频世界模型', '多模态推理'],
    url: 'https://openai.com'
  },
  {
    id: 'google-deepmind',
    name: 'Google DeepMind',
    name_cn: 'Google DeepMind',
    city: 'London',
    country: 'UK',
    lat: 51.5072,
    lng: -0.1276,
    focus: ['Embodied agents', 'Planning world models'],
    focus_cn: ['具身智能体', '规划世界模型'],
    url: 'https://deepmind.google'
  },
  {
    id: 'meta-ai',
    name: 'Meta AI',
    name_cn: 'Meta AI',
    city: 'Menlo Park',
    country: 'USA',
    lat: 37.4529,
    lng: -122.1817,
    focus: ['JEPA', 'Video representation'],
    focus_cn: ['JEPA', '视频表征'],
    url: 'https://ai.meta.com'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    name_cn: '英伟达',
    city: 'Santa Clara',
    country: 'USA',
    lat: 37.3541,
    lng: -121.9552,
    focus: ['Physical AI', 'World foundation models'],
    focus_cn: ['物理AI', '世界基础模型'],
    url: 'https://nvidia.com'
  },
  {
    id: 'wayve',
    name: 'Wayve',
    name_cn: 'Wayve',
    city: 'London',
    country: 'UK',
    lat: 51.5072,
    lng: -0.1276,
    focus: ['Autonomous driving', 'Generative simulation'],
    focus_cn: ['自动驾驶', '生成式仿真'],
    url: 'https://wayve.ai'
  },
  {
    id: 'bair',
    name: 'BAIR (UC Berkeley)',
    name_cn: 'BAIR（伯克利）',
    city: 'Berkeley',
    country: 'USA',
    lat: 37.8715,
    lng: -122.273,
    focus: ['Dreamer', 'Model-based RL'],
    focus_cn: ['Dreamer', '基于模型的强化学习'],
    url: 'https://bair.berkeley.edu'
  },
  {
    id: 'microsoft-research',
    name: 'Microsoft Research',
    name_cn: '微软研究院',
    city: 'Redmond',
    country: 'USA',
    lat: 47.673988,
    lng: -122.121513,
    focus: ['Multimodal systems', 'Agentic planning'],
    focus_cn: ['多模态系统', '智能体规划'],
    url: 'https://www.microsoft.com/en-us/research/'
  },
  {
    id: 'alibaba-damo',
    name: 'Alibaba DAMO Academy',
    name_cn: '阿里巴巴达摩院',
    city: 'Hangzhou',
    country: 'China',
    lat: 30.2741,
    lng: 120.1551,
    focus: ['Vision-language world models', 'Multimodal agents'],
    focus_cn: ['视觉语言世界模型', '多模态智能体'],
    url: 'https://damo.alibaba.com'
  },
  {
    id: 'tsinghua',
    name: 'Tsinghua University',
    name_cn: '清华大学',
    city: 'Beijing',
    country: 'China',
    lat: 40.0025,
    lng: 116.3269,
    focus: ['Embodied intelligence', 'Simulation'],
    focus_cn: ['具身智能', '仿真'],
    url: 'https://www.tsinghua.edu.cn/en/'
  },
  {
    id: 'eth-zurich',
    name: 'ETH Zurich',
    name_cn: '苏黎世联邦理工',
    city: 'Zurich',
    country: 'Switzerland',
    lat: 47.3769,
    lng: 8.5417,
    focus: ['Robotics world models', 'Policy learning'],
    focus_cn: ['机器人世界模型', '策略学习'],
    url: 'https://ethz.ch/en.html'
  },
  {
    id: 'mit-csail',
    name: 'MIT CSAIL',
    name_cn: 'MIT CSAIL',
    city: 'Cambridge',
    country: 'USA',
    lat: 42.3601,
    lng: -71.0942,
    focus: ['AI systems', 'Embodied reasoning'],
    focus_cn: ['AI系统', '具身推理'],
    url: 'https://www.csail.mit.edu/'
  },
  {
    id: 'epfl',
    name: 'EPFL',
    name_cn: '洛桑联邦理工',
    city: 'Lausanne',
    country: 'Switzerland',
    lat: 46.5197,
    lng: 6.6323,
    focus: ['Robot learning', 'Generalizable world models'],
    focus_cn: ['机器人学习', '可泛化世界模型'],
    url: 'https://www.epfl.ch/en/'
  }
];
