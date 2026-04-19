#!/usr/bin/env python3
"""
WorldModel Tracker - Data Generation Script

Generates comprehensive, structured JSON data files about world models in AI research.
All data includes both English and Chinese fields.

Output files:
- companies.json: Companies and organizations working on world models
- models.json: World model projects/models
- papers.json: Key research papers
- timeline.json: Development timeline events
- updates.json: Recent news/updates

Author: WorldModel Tracker Team
"""

import json
import os
from pathlib import Path
from typing import Any, Dict, List


# =============================================================================
# Configuration
# =============================================================================

OUTPUT_DIR = Path("/mnt/agents/output/worldmodel_data")


def ensure_directory() -> None:
    """Create the output directory if it doesn't exist."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output directory ready: {OUTPUT_DIR}")


def write_json(filename: str, data: Dict[str, Any]) -> None:
    """Write data to a JSON file with proper formatting."""
    filepath = OUTPUT_DIR / filename
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  Written: {filepath} ({len(data.get('items', []))} items)")


# =============================================================================
# 1. Companies Data
# =============================================================================

def get_companies_data() -> Dict[str, List[Dict[str, Any]]]:
    """Return companies and organizations working on world models."""
    return {
        "items": [
            {
                "id": "openai",
                "category": "company",
                "title": "OpenAI",
                "title_cn": "OpenAI",
                "description": "Leading AI research company developing Sora video generation model with world simulation capabilities. Founded with the goal of ensuring artificial general intelligence benefits all of humanity.",
                "description_cn": "领先的AI研究公司，开发了具有世界模拟能力的Sora视频生成模型。成立的使命是确保通用人工智能造福全人类。",
                "founded": "2015",
                "headquarters": "San Francisco, USA",
                "headquarters_cn": "美国旧金山",
                "tags": ["Video Generation", "LLM", "Multimodal"],
                "tags_cn": ["视频生成", "大语言模型", "多模态"],
                "status": "active",
                "website": "https://openai.com",
                "keyModels": ["Sora", "GPT-4o", "DALL-E 3", "o1"],
                "employees": "1500+",
                "image": "/banners/openai-banner.png"
            },
            {
                "id": "google-deepmind",
                "category": "company",
                "title": "Google DeepMind",
                "title_cn": "Google DeepMind",
                "description": "Google's AI research division formed by merging Google Brain and DeepMind. Pioneers in reinforcement learning, world models, and large-scale AI systems including Gemini and AlphaGo.",
                "description_cn": "Google的AI研究部门，由Google Brain和DeepMind合并而成。在强化学习、世界模型和大规模AI系统（包括Gemini和AlphaGo）方面处于先驱地位。",
                "founded": "2010 (DeepMind), 2023 (merged)",
                "headquarters": "London, UK / Mountain View, USA",
                "headquarters_cn": "英国伦敦 / 美国山景城",
                "tags": ["RL", "World Models", "LLM", "Robotics"],
                "tags_cn": ["强化学习", "世界模型", "大语言模型", "机器人"],
                "status": "active",
                "website": "https://deepmind.google",
                "keyModels": ["Gemini 1.5 Pro", "AlphaGo", "AlphaZero", "MuZero", "RT-2"],
                "employees": "3000+",
                "image": "/banners/deepmind-banner.png"
            },
            {
                "id": "meta-ai",
                "category": "company",
                "title": "Meta AI",
                "title_cn": "Meta AI",
                "description": "Meta's artificial intelligence research division. Developed the Segment Anything Model (SAM) and advanced multimodal AI systems. Open-sources many of their models including Llama and SAM.",
                "description_cn": "Meta的人工智能研究部门。开发了Segment Anything模型（SAM）和先进的多模态AI系统。开源了许多模型，包括Llama和SAM。",
                "founded": "2013 (FAIR)",
                "headquarters": "Menlo Park, USA",
                "headquarters_cn": "美国门洛帕克",
                "tags": ["Multimodal", "Open Source", "Computer Vision"],
                "tags_cn": ["多模态", "开源", "计算机视觉"],
                "status": "active",
                "website": "https://ai.meta.com",
                "keyModels": ["SAM 2", "Llama 3", "I-JEPA", "V-JEPA"],
                "employees": "2000+",
                "image": "/banners/meta-ai-banner.png"
            },
            {
                "id": "nvidia",
                "category": "company",
                "title": "NVIDIA",
                "title_cn": "英伟达",
                "description": "World's leading GPU manufacturer and AI platform company. Develops Cosmos world foundation model platform for physical AI and autonomous systems. Provides the hardware backbone for most AI training worldwide.",
                "description_cn": "全球领先的GPU制造商和AI平台公司。开发了用于物理AI和自主系统的Cosmos世界基础模型平台。为全球大多数AI训练提供硬件基础。",
                "founded": "1993",
                "headquarters": "Santa Clara, USA",
                "headquarters_cn": "美国圣克拉拉",
                "tags": ["GPU", "Physical AI", "Autonomous Systems", "Robotics"],
                "tags_cn": ["GPU", "物理AI", "自主系统", "机器人"],
                "status": "active",
                "website": "https://nvidia.com",
                "keyModels": ["Cosmos", "NVIDIA World Model (NWM)", "Isaac Sim"],
                "employees": "30000+",
                "image": "/banners/nvidia-banner.png"
            },
            {
                "id": "wayve",
                "category": "company",
                "title": "Wayve",
                "title_cn": "Wayve",
                "description": "London-based autonomous driving startup developing embodied AI for self-driving cars using end-to-end deep learning and world models. First to test autonomous vehicles on public roads in London.",
                "description_cn": "总部位于伦敦的自动驾驶初创公司，使用端到端深度学习和世界模型开发具身AI用于自动驾驶汽车。首家在伦敦公共道路上测试自动驾驶车辆的公司。",
                "founded": "2017",
                "headquarters": "London, UK",
                "headquarters_cn": "英国伦敦",
                "tags": ["Autonomous Driving", "Embodied AI", "World Models"],
                "tags_cn": ["自动驾驶", "具身AI", "世界模型"],
                "status": "active",
                "website": "https://wayve.ai",
                "keyModels": ["GAIA-1", "LINGO-1", "PRISM-1"],
                "employees": "300+",
                "image": "/banners/wayve-banner.png"
            },
            {
                "id": "tesla",
                "category": "company",
                "title": "Tesla",
                "title_cn": "特斯拉",
                "description": "Electric vehicle and AI company developing Full Self-Driving (FSD) capabilities using neural networks and world models. Elon Musk has emphasized video generation as key to solving autonomous driving.",
                "description_cn": "电动汽车和AI公司，使用神经网络和世界模型开发完全自动驾驶（FSD）能力。马斯克强调视频生成是解决自动驾驶的关键。",
                "founded": "2003",
                "headquarters": "Austin, USA",
                "headquarters_cn": "美国奥斯汀",
                "tags": ["Autonomous Driving", "Computer Vision", "Robotics"],
                "tags_cn": ["自动驾驶", "计算机视觉", "机器人"],
                "status": "active",
                "website": "https://tesla.com/ai",
                "keyModels": ["Tesla FSD", "Optimus Robot", "Dojo"],
                "employees": "140000+",
                "image": "/banners/tesla-banner.png"
            },
            {
                "id": "runway",
                "category": "company",
                "title": "Runway",
                "title_cn": "Runway",
                "description": "Applied AI research company building next-generation creativity tools. Developed Gen-3 Alpha, a state-of-the-art video generation model. Focuses on bringing the multi-modal capabilities of foundational models to art and entertainment.",
                "description_cn": "应用AI研究公司，构建下一代创意工具。开发了Gen-3 Alpha，一个最先进的视频生成模型。专注于将基础模型的多模态能力带到艺术和娱乐领域。",
                "founded": "2018",
                "headquarters": "New York, USA",
                "headquarters_cn": "美国纽约",
                "tags": ["Video Generation", "Creative AI", "Diffusion Models"],
                "tags_cn": ["视频生成", "创意AI", "扩散模型"],
                "status": "active",
                "website": "https://runwayml.com",
                "keyModels": ["Gen-3 Alpha", "Gen-2", "Runway Act-One"],
                "employees": "200+",
                "image": "/banners/runway-banner.png"
            },
            {
                "id": "pika-labs",
                "category": "company",
                "title": "Pika Labs",
                "title_cn": "Pika Labs",
                "description": "AI video generation startup that creates tools for creating and editing videos with AI. Developed Pika 1.5 with advanced video generation capabilities.",
                "description_cn": "AI视频生成初创公司，创建使用AI制作和编辑视频的工具。开发了Pika 1.5，具有先进的视频生成能力。",
                "founded": "2023",
                "headquarters": "Palo Alto, USA",
                "headquarters_cn": "美国帕洛阿尔托",
                "tags": ["Video Generation", "Creative AI", "Generative AI"],
                "tags_cn": ["视频生成", "创意AI", "生成式AI"],
                "status": "active",
                "website": "https://pika.art",
                "keyModels": ["Pika 1.5", "Pika 1.0"],
                "employees": "50+",
                "image": "/banners/pika-labs-banner.png"
            },
            {
                "id": "stability-ai",
                "category": "company",
                "title": "Stability AI",
                "title_cn": "Stability AI",
                "description": "Open-source generative AI company best known for Stable Diffusion. Develops open-access models for image, video, and audio generation including Stable Video Diffusion.",
                "description_cn": "开源生成式AI公司，以Stable Diffusion闻名。开发用于图像、视频和音频生成的开放获取模型，包括Stable Video Diffusion。",
                "founded": "2019",
                "headquarters": "London, UK",
                "headquarters_cn": "英国伦敦",
                "tags": ["Open Source", "Image Generation", "Video Generation"],
                "tags_cn": ["开源", "图像生成", "视频生成"],
                "status": "active",
                "website": "https://stability.ai",
                "keyModels": ["Stable Diffusion 3", "Stable Video Diffusion", "Stable Cascade"],
                "employees": "200+",
                "image": "/banners/stability-ai-banner.png"
            },
            {
                "id": "anthropic",
                "category": "company",
                "title": "Anthropic",
                "title_cn": "Anthropic",
                "description": "AI safety company founded by former OpenAI researchers. Develops Claude, a large language model focused on being helpful, harmless, and honest. Pioneers in constitutional AI and AI alignment.",
                "description_cn": "由前OpenAI研究人员创立的AI安全公司。开发Claude大语言模型，专注于有益、无害和诚实。在宪法AI和AI对齐方面处于先驱地位。",
                "founded": "2021",
                "headquarters": "San Francisco, USA",
                "headquarters_cn": "美国旧金山",
                "tags": ["LLM", "AI Safety", "Constitutional AI"],
                "tags_cn": ["大语言模型", "AI安全", "宪法AI"],
                "status": "active",
                "website": "https://anthropic.com",
                "keyModels": ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3 Haiku"],
                "employees": "800+",
                "image": "/banners/anthropic-banner.png"
            },
            {
                "id": "microsoft-research",
                "category": "company",
                "title": "Microsoft Research",
                "title_cn": "微软研究院",
                "description": "Microsoft's research division conducting cutting-edge research across AI, systems, and human-computer interaction. Major partner of OpenAI and contributor to large multimodal models.",
                "description_cn": "微软的研究部门，在AI、系统和人机交互方面进行前沿研究。OpenAI的主要合作伙伴，对大型多模态模型做出了重要贡献。",
                "founded": "1991",
                "headquarters": "Redmond, USA",
                "headquarters_cn": "美国雷德蒙德",
                "tags": ["LLM", "Multimodal", "Research"],
                "tags_cn": ["大语言模型", "多模态", "研究"],
                "status": "active",
                "website": "https://research.microsoft.com",
                "keyModels": ["Phi-3", "Kosmos-2", " Florence"],
                "employees": "1000+",
                "image": "/banners/microsoft-research-banner.png"
            },
            {
                "id": "baair",
                "category": "company",
                "title": "Berkeley AI Research (BAIR)",
                "title_cn": "伯克利人工智能研究实验室",
                "description": "University of California, Berkeley's AI research lab. Pioneered work in reinforcement learning, robotics, and world models including the Dreamer algorithm series.",
                "description_cn": "加州大学伯克利分校的AI研究实验室。在强化学习、机器人和世界模型方面开创了先河，包括Dreamer算法系列。",
                "founded": "2014",
                "headquarters": "Berkeley, USA",
                "headquarters_cn": "美国伯克利",
                "tags": ["RL", "Robotics", "World Models", "Research"],
                "tags_cn": ["强化学习", "机器人", "世界模型", "研究"],
                "status": "active",
                "website": "https://bair.berkeley.edu",
                "keyModels": ["DreamerV3", "UniSim", "RT-1"],
                "employees": "200+",
                "image": "/banners/bair-banner.png"
            },
            {
                "id": "stanford-hai",
                "category": "company",
                "title": "Stanford HAI",
                "title_cn": "斯坦福以人为本AI研究院",
                "description": "Stanford Institute for Human-Centered AI. Conducts interdisciplinary research on AI's impact on humanity, including world models, robotics, and AI safety.",
                "description_cn": "斯坦福以人为本AI研究院。进行AI对人类影响的跨学科研究，包括世界模型、机器人和AI安全。",
                "founded": "2019",
                "headquarters": "Stanford, USA",
                "headquarters_cn": "美国斯坦福",
                "tags": ["AI Safety", "Research", "Human-Centered AI"],
                "tags_cn": ["AI安全", "研究", "以人为本AI"],
                "status": "active",
                "website": "https://hai.stanford.edu",
                "keyModels": ["Alpaca", "ControlNet", "ACT"],
                "employees": "100+",
                "image": "/banners/stanford-hai-banner.png"
            },
            {
                "id": "tsingkee",
                "category": "company",
                "title": "Tsingkee",
                "title_cn": "清科",
                "description": "Chinese AI company focused on developing large-scale world models and autonomous driving technology. Known for their work on end-to-end autonomous driving systems.",
                "description_cn": "中国AI公司，专注于开发大规模世界模型和自动驾驶技术。以其端到端自动驾驶系统而闻名。",
                "founded": "2022",
                "headquarters": "Beijing, China",
                "headquarters_cn": "中国北京",
                "tags": ["Autonomous Driving", "World Models", "Computer Vision"],
                "tags_cn": ["自动驾驶", "世界模型", "计算机视觉"],
                "status": "active",
                "website": "https://tsingkee.com",
                "keyModels": ["Tsingkee World Model", "DriveGPT"],
                "employees": "100+",
                "image": "/banners/tsingkee-banner.png"
            },
            {
                "id": "alibaba-damo",
                "category": "company",
                "title": "Alibaba DAMO Academy",
                "title_cn": "阿里巴巴达摩院",
                "description": "Alibaba's research academy focused on fundamental technology research including AI, quantum computing, and autonomous driving. Developed Qwen series of large language models.",
                "description_cn": "阿里巴巴的研究学院，专注于基础技术研究，包括AI、量子计算和自动驾驶。开发了Qwen系列大语言模型。",
                "founded": "2017",
                "headquarters": "Hangzhou, China",
                "headquarters_cn": "中国杭州",
                "tags": ["LLM", "Multimodal", "Research"],
                "tags_cn": ["大语言模型", "多模态", "研究"],
                "status": "active",
                "website": "https://damo.alibaba.com",
                "keyModels": ["Qwen2-VL", "Qwen-Max", "Qwen-Audio"],
                "employees": "1000+",
                "image": "/banners/alibaba-damo-banner.png"
            },
            {
                "id": "baidu-research",
                "category": "company",
                "title": "Baidu Research",
                "title_cn": "百度研究院",
                "description": "Baidu's research division advancing AI technologies including autonomous driving through Apollo platform and large language models. Pioneer in China's AI development.",
                "description_cn": "百度的研究部门，推进AI技术发展，包括通过Apollo平台的自动驾驶和大语言模型。中国AI发展的先驱。",
                "founded": "2014",
                "headquarters": "Beijing, China",
                "headquarters_cn": "中国北京",
                "tags": ["Autonomous Driving", "LLM", "Research"],
                "tags_cn": ["自动驾驶", "大语言模型", "研究"],
                "status": "active",
                "website": "https://research.baidu.com",
                "keyModels": ["ERNIE 4.0", "Apollo", "PaddlePaddle"],
                "employees": "2000+",
                "image": "/banners/baidu-research-banner.png"
            }
        ]
    }


# =============================================================================
# 2. Models Data
# =============================================================================

def get_models_data() -> Dict[str, List[Dict[str, Any]]]:
    """Return world model projects and models data."""
    return {
        "items": [
            {
                "id": "sora",
                "category": "model",
                "title": "Sora",
                "title_cn": "Sora",
                "description": "OpenAI's text-to-video generation model capable of simulating realistic physical worlds. Sora can generate high-fidelity videos up to one minute long while maintaining visual quality and adherence to user prompts.",
                "description_cn": "OpenAI的文本到视频生成模型，能够模拟真实的物理世界。Sora可以生成长达一分钟的高保真视频，同时保持视觉质量和对用户提示的遵循。",
                "organization": "OpenAI",
                "releaseDate": "2024-02-15",
                "tags": ["Video Generation", "Diffusion Model", "Physical Simulation"],
                "tags_cn": ["视频生成", "扩散模型", "物理模拟"],
                "status": "released",
                "website": "https://openai.com/sora",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text-to-video", "Video extension", "Scene composition"],
                "capabilities_cn": ["文本生成视频", "视频扩展", "场景组合"],
                "image": "/banners/sora-banner.png"
            },
            {
                "id": "gemini-1.5-pro",
                "category": "model",
                "title": "Gemini 1.5 Pro",
                "title_cn": "Gemini 1.5 Pro",
                "description": "Google DeepMind's multimodal AI model with up to 2 million token context window. Supports video understanding, cross-modal reasoning, and long-context comprehension.",
                "description_cn": "Google DeepMind的多模态AI模型，上下文窗口高达200万token。支持视频理解、跨模态推理和长上下文理解。",
                "organization": "Google DeepMind",
                "releaseDate": "2024-02-15",
                "tags": ["Multimodal", "LLM", "Video Understanding"],
                "tags_cn": ["多模态", "大语言模型", "视频理解"],
                "status": "released",
                "website": "https://deepmind.google/technologies/gemini/",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Video understanding", "Long context", "Multimodal reasoning"],
                "capabilities_cn": ["视频理解", "长上下文", "多模态推理"],
                "image": "/banners/gemini-banner.png"
            },
            {
                "id": "gaia-1",
                "category": "model",
                "title": "GAIA-1",
                "title_cn": "GAIA-1",
                "description": "Wayve's generative world model for autonomous driving that uses video, text, and action inputs to generate realistic driving scenarios and predict future states.",
                "description_cn": "Wayve的自动驾驶生成式世界模型，使用视频、文本和动作输入来生成真实的驾驶场景并预测未来状态。",
                "organization": "Wayve",
                "releaseDate": "2023-09-01",
                "tags": ["Autonomous Driving", "World Models", "Video Generation"],
                "tags_cn": ["自动驾驶", "世界模型", "视频生成"],
                "status": "released",
                "website": "https://wayve.ai/thinking/introducing-gaia-1/",
                "paperUrl": "https://arxiv.org/abs/2309.17080",
                "githubUrl": "",
                "modelSize": "9B",
                "license": "Proprietary",
                "capabilities": ["Driving scene generation", "World simulation", "Future prediction"],
                "capabilities_cn": ["驾驶场景生成", "世界模拟", "未来预测"],
                "image": "/banners/gaia1-banner.png"
            },
            {
                "id": "cosmos",
                "category": "model",
                "title": "NVIDIA Cosmos",
                "title_cn": "NVIDIA Cosmos",
                "description": "NVIDIA's world foundation model platform for physical AI. Cosmos provides pre-trained world foundation models for predicting video outputs in physical environments, targeting robotics and autonomous systems.",
                "description_cn": "NVIDIA用于物理AI的世界基础模型平台。Cosmos提供预训练的世界基础模型，用于预测物理环境中的视频输出，面向机器人和自主系统。",
                "organization": "NVIDIA",
                "releaseDate": "2025-01-06",
                "tags": ["Physical AI", "World Models", "Autonomous Systems", "Robotics"],
                "tags_cn": ["物理AI", "世界模型", "自主系统", "机器人"],
                "status": "released",
                "website": "https://nvidia.com/en-us/ai/cosmos/",
                "paperUrl": "",
                "githubUrl": "https://github.com/NVIDIA/Cosmos",
                "modelSize": "14B",
                "license": "NVIDIA Open Model License",
                "capabilities": ["Physical world prediction", "Video generation", "Robot training"],
                "capabilities_cn": ["物理世界预测", "视频生成", "机器人训练"],
                "image": "/banners/cosmos-banner.png"
            },
            {
                "id": "runway-gen-3",
                "category": "model",
                "title": "Runway Gen-3 Alpha",
                "title_cn": "Runway Gen-3 Alpha",
                "description": "Runway's next-generation video generation model with significant improvements in fidelity, consistency, and motion. Capable of high-quality video synthesis from text and image inputs.",
                "description_cn": "Runway的下一代视频生成模型，在保真度、一致性和运动方面有显著提升。能够根据文本和图像输入进行高质量视频合成。",
                "organization": "Runway",
                "releaseDate": "2024-06-17",
                "tags": ["Video Generation", "Creative AI", "Diffusion Model"],
                "tags_cn": ["视频生成", "创意AI", "扩散模型"],
                "status": "released",
                "website": "https://runwayml.com/gen-3",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text-to-video", "Image-to-video", "Video editing"],
                "capabilities_cn": ["文本生成视频", "图像生成视频", "视频编辑"],
                "image": "/banners/runway-gen3-banner.png"
            },
            {
                "id": "pika-1.5",
                "category": "model",
                "title": "Pika 1.5",
                "title_cn": "Pika 1.5",
                "description": "Pika Labs' advanced video generation model with improved motion understanding and visual quality. Features Pikaffects for applying effects to generated content.",
                "description_cn": "Pika Labs的先进视频生成模型，具有改进的运动理解和视觉质量。具有Pikaffects功能，可对生成内容应用特效。",
                "organization": "Pika Labs",
                "releaseDate": "2024-10-01",
                "tags": ["Video Generation", "Creative AI", "Generative AI"],
                "tags_cn": ["视频生成", "创意AI", "生成式AI"],
                "status": "released",
                "website": "https://pika.art",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text-to-video", "Image-to-video", "Video effects"],
                "capabilities_cn": ["文本生成视频", "图像生成视频", "视频特效"],
                "image": "/banners/pika15-banner.png"
            },
            {
                "id": "stable-video-diffusion",
                "category": "model",
                "title": "Stable Video Diffusion",
                "title_cn": "Stable Video Diffusion",
                "description": "Stability AI's open-source video generation model based on the Stable Diffusion image model. Supports both image-to-video generation and text-to-video workflows.",
                "description_cn": "Stability AI基于Stable Diffusion图像模型的开源视频生成模型。支持图像生成视频和文本生成视频工作流。",
                "organization": "Stability AI",
                "releaseDate": "2023-11-21",
                "tags": ["Video Generation", "Open Source", "Diffusion Model"],
                "tags_cn": ["视频生成", "开源", "扩散模型"],
                "status": "released",
                "website": "https://stability.ai/stable-video",
                "paperUrl": "",
                "githubUrl": "https://github.com/Stability-AI/generative-models",
                "modelSize": "1.6B",
                "license": "Stability AI Community License",
                "capabilities": ["Image-to-video", "Text-to-video", "Video editing"],
                "capabilities_cn": ["图像生成视频", "文本生成视频", "视频编辑"],
                "image": "/banners/svd-banner.png"
            },
            {
                "id": "dall-e-3",
                "category": "model",
                "title": "DALL-E 3",
                "title_cn": "DALL-E 3",
                "description": "OpenAI's advanced text-to-image generation model with high prompt fidelity and detailed image synthesis. Integrated with ChatGPT for conversational image creation.",
                "description_cn": "OpenAI的先进文本到图像生成模型，具有高提示保真度和详细的图像合成能力。与ChatGPT集成实现对话式图像创建。",
                "organization": "OpenAI",
                "releaseDate": "2023-09-01",
                "tags": ["Image Generation", "Multimodal", "Diffusion Model"],
                "tags_cn": ["图像生成", "多模态", "扩散模型"],
                "status": "released",
                "website": "https://openai.com/dall-e-3",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text-to-image", "Image editing", "Conversational creation"],
                "capabilities_cn": ["文本生成图像", "图像编辑", "对话式创建"],
                "image": "/banners/dalle3-banner.png"
            },
            {
                "id": "midjourney-v6",
                "category": "model",
                "title": "Midjourney V6",
                "title_cn": "Midjourney V6",
                "description": "Midjourney's latest image generation model with photorealistic quality, improved prompt understanding, and advanced text rendering within images.",
                "description_cn": "Midjourney的最新图像生成模型，具有照片级真实质量、改进的提示理解和图像内高级文本渲染能力。",
                "organization": "Midjourney",
                "releaseDate": "2023-12-21",
                "tags": ["Image Generation", "Creative AI", "Generative AI"],
                "tags_cn": ["图像生成", "创意AI", "生成式AI"],
                "status": "released",
                "website": "https://midjourney.com",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text-to-image", "Image upscaling", "Style control"],
                "capabilities_cn": ["文本生成图像", "图像超分", "风格控制"],
                "image": "/banners/midjourney-v6-banner.png"
            },
            {
                "id": "gpt-4v",
                "category": "model",
                "title": "GPT-4V (GPT-4 Vision)",
                "title_cn": "GPT-4V (GPT-4视觉版)",
                "description": "OpenAI's multimodal version of GPT-4 that can process and understand images alongside text. Enables visual question answering, image captioning, and video understanding.",
                "description_cn": "OpenAI GPT-4的多模态版本，可以处理和理解图像以及文本。支持视觉问答、图像描述和视频理解。",
                "organization": "OpenAI",
                "releaseDate": "2023-09-25",
                "tags": ["Multimodal", "LLM", "Vision"],
                "tags_cn": ["多模态", "大语言模型", "视觉"],
                "status": "released",
                "website": "https://openai.com/research/gpt-4v-system-card",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Visual understanding", "Image captioning", "Video analysis"],
                "capabilities_cn": ["视觉理解", "图像描述", "视频分析"],
                "image": "/banners/gpt4v-banner.png"
            },
            {
                "id": "claude-3",
                "category": "model",
                "title": "Claude 3",
                "title_cn": "Claude 3",
                "description": "Anthropic's family of large language models including Opus, Sonnet, and Haiku. Features strong reasoning, vision capabilities, and long context understanding up to 200K tokens.",
                "description_cn": "Anthropic的大语言模型家族，包括Opus、Sonnet和Haiku。具有强大的推理、视觉能力和长达20万token的长上下文理解。",
                "organization": "Anthropic",
                "releaseDate": "2024-03-04",
                "tags": ["LLM", "Multimodal", "AI Safety"],
                "tags_cn": ["大语言模型", "多模态", "AI安全"],
                "status": "released",
                "website": "https://anthropic.com/claude",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text generation", "Vision", "Long context", "Reasoning"],
                "capabilities_cn": ["文本生成", "视觉", "长上下文", "推理"],
                "image": "/banners/claude3-banner.png"
            },
            {
                "id": "llava",
                "category": "model",
                "title": "LLaVA",
                "title_cn": "LLaVA",
                "description": "Large Language and Vision Assistant that connects a vision encoder to an LLM for general-purpose visual and language understanding. Open-source multimodal model.",
                "description_cn": "大型语言与视觉助手，将视觉编码器连接到大语言模型以实现通用视觉和语言理解。开源多模态模型。",
                "organization": "Microsoft Research / UW",
                "releaseDate": "2023-04-01",
                "tags": ["Multimodal", "Open Source", "Vision-Language"],
                "tags_cn": ["多模态", "开源", "视觉-语言"],
                "status": "released",
                "website": "https://llava-vl.github.io",
                "paperUrl": "https://arxiv.org/abs/2304.08485",
                "githubUrl": "https://github.com/haotian-liu/LLaVA",
                "modelSize": "7B/13B",
                "license": "Apache 2.0",
                "capabilities": ["Visual QA", "Image captioning", "Multimodal chat"],
                "capabilities_cn": ["视觉问答", "图像描述", "多模态对话"],
                "image": "/banners/llava-banner.png"
            },
            {
                "id": "videopoet",
                "category": "model",
                "title": "VideoPoet",
                "title_cn": "VideoPoet",
                "description": "Google's large language model for zero-shot video generation. Uses a decoder-only transformer architecture to generate high-quality video from text, images, and video inputs.",
                "description_cn": "Google用于零样本视频生成的大型语言模型。使用仅解码器的Transformer架构从文本、图像和视频输入生成高质量视频。",
                "organization": "Google Research",
                "releaseDate": "2023-12-01",
                "tags": ["Video Generation", "LLM", "Zero-shot"],
                "tags_cn": ["视频生成", "大语言模型", "零样本"],
                "status": "research",
                "website": "https://sites.research.google/videopoet/",
                "paperUrl": "https://arxiv.org/abs/2312.03887",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text-to-video", "Image-to-video", "Video stylization"],
                "capabilities_cn": ["文本生成视频", "图像生成视频", "视频风格化"],
                "image": "/banners/videopoet-banner.png"
            },
            {
                "id": "gen-2",
                "category": "model",
                "title": "Runway Gen-2",
                "title_cn": "Runway Gen-2",
                "description": "Runway's multimodal AI system for video generation that can synthesize realistic videos from text, images, or video clips using a latent video diffusion model.",
                "description_cn": "Runway的多模态AI视频生成系统，可以使用潜在视频扩散模型从文本、图像或视频片段合成真实视频。",
                "organization": "Runway",
                "releaseDate": "2023-06-01",
                "tags": ["Video Generation", "Diffusion Model", "Multimodal"],
                "tags_cn": ["视频生成", "扩散模型", "多模态"],
                "status": "released",
                "website": "https://research.runwayml.com/gen2",
                "paperUrl": "https://arxiv.org/abs/2302.03011",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Text-to-video", "Image-to-video", "Video-to-video"],
                "capabilities_cn": ["文本生成视频", "图像生成视频", "视频生成视频"],
                "image": "/banners/gen2-banner.png"
            },
            {
                "id": "i-jepa",
                "category": "model",
                "title": "I-JEPA",
                "title_cn": "I-JEPA",
                "description": "Image Joint Embedding Predictive Architecture by Meta AI. A self-supervised learning method that learns semantic image representations by predicting representations of target blocks from context blocks.",
                "description_cn": "Meta AI的图像联合嵌入预测架构。一种自监督学习方法，通过从上下文块预测目标块的表示来学习语义图像表示。",
                "organization": "Meta AI",
                "releaseDate": "2023-06-01",
                "tags": ["Self-supervised Learning", "Computer Vision", "Open Source"],
                "tags_cn": ["自监督学习", "计算机视觉", "开源"],
                "status": "released",
                "website": "https://ai.meta.com/blog/i-jepa-image-ai-model-human-like/",
                "paperUrl": "https://arxiv.org/abs/2301.08243",
                "githubUrl": "https://github.com/facebookresearch/ijepa",
                "modelSize": "1B (ViT-H)",
                "license": "CC BY-NC 4.0",
                "capabilities": ["Image understanding", "Representation learning", "Pretraining"],
                "capabilities_cn": ["图像理解", "表示学习", "预训练"],
                "image": "/banners/ijepa-banner.png"
            },
            {
                "id": "sam-2",
                "category": "model",
                "title": "SAM 2",
                "title_cn": "SAM 2",
                "description": "Segment Anything Model 2 by Meta AI. Extends the original SAM to video, enabling promptable visual segmentation in images and videos with state-of-the-art zero-shot performance.",
                "description_cn": "Meta AI的Segment Anything模型2。将原始SAM扩展到视频，支持图像和视频中可提示的视觉分割，具有最先进的零样本性能。",
                "organization": "Meta AI",
                "releaseDate": "2024-07-29",
                "tags": ["Computer Vision", "Video Segmentation", "Open Source"],
                "tags_cn": ["计算机视觉", "视频分割", "开源"],
                "status": "released",
                "website": "https://ai.meta.com/sam2/",
                "paperUrl": "https://arxiv.org/abs/2408.00714",
                "githubUrl": "https://github.com/facebookresearch/segment-anything-2",
                "modelSize": "Unknown",
                "license": "Apache 2.0",
                "capabilities": ["Image segmentation", "Video segmentation", "Promptable segmentation"],
                "capabilities_cn": ["图像分割", "视频分割", "可提示分割"],
                "image": "/banners/sam2-banner.png"
            },
            {
                "id": "v-jepa",
                "category": "model",
                "title": "V-JEPA",
                "title_cn": "V-JEPA",
                "description": "Video Joint Embedding Predictive Architecture by Meta AI. A self-supervised approach for learning video representations from unlabeled video by predicting feature representations in latent space.",
                "description_cn": "Meta AI的视频联合嵌入预测架构。一种自监督方法，通过在潜在空间中预测特征表示从未标记视频学习视频表示。",
                "organization": "Meta AI",
                "releaseDate": "2024-02-01",
                "tags": ["Video Understanding", "Self-supervised Learning", "Open Source"],
                "tags_cn": ["视频理解", "自监督学习", "开源"],
                "status": "released",
                "website": "https://ai.meta.com/blog/v-jepa-meta-ai-video-learning/",
                "paperUrl": "https://arxiv.org/abs/2403.05639",
                "githubUrl": "https://github.com/facebookresearch/jepa",
                "modelSize": "1B (ViT-L)",
                "license": "CC BY-NC 4.0",
                "capabilities": ["Video representation", "Action recognition", "Self-supervised pretraining"],
                "capabilities_cn": ["视频表示", "动作识别", "自监督预训练"],
                "image": "/banners/vjepa-banner.png"
            },
            {
                "id": "nwm-nvidia",
                "category": "model",
                "title": "NVIDIA World Model (NWM)",
                "title_cn": "NVIDIA世界模型 (NWM)",
                "description": "NVIDIA's world model for autonomous driving that generates future video frames conditioned on past observations and planned trajectories. Used for simulation and validation of self-driving systems.",
                "description_cn": "NVIDIA用于自动驾驶的世界模型，根据过去观测和规划轨迹生成未来视频帧。用于自动驾驶系统的模拟和验证。",
                "organization": "NVIDIA",
                "releaseDate": "2024-03-01",
                "tags": ["Autonomous Driving", "World Models", "Video Prediction"],
                "tags_cn": ["自动驾驶", "世界模型", "视频预测"],
                "status": "research",
                "website": "https://nvidia.com",
                "paperUrl": "",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Future frame prediction", "Driving simulation", "Scenario generation"],
                "capabilities_cn": ["未来帧预测", "驾驶模拟", "场景生成"],
                "image": "/banners/nwm-banner.png"
            },
            {
                "id": "gato",
                "category": "model",
                "title": "Gato",
                "title_cn": "Gato",
                "description": "A generalist agent by DeepMind that can play Atari, caption images, chat, stack blocks with a real robot arm, and more, all with a single neural network with the same set of weights.",
                "description_cn": "DeepMind的通用智能体，可以用单个神经网络的同一组权重玩Atari、描述图像、聊天、用真实机器人手臂堆叠积木等。",
                "organization": "DeepMind",
                "releaseDate": "2022-05-01",
                "tags": ["Generalist Agent", "RL", "Multimodal"],
                "tags_cn": ["通用智能体", "强化学习", "多模态"],
                "status": "research",
                "website": "https://deepmind.google/discover/blog/a-generalist-agent/",
                "paperUrl": "https://arxiv.org/abs/2205.06175",
                "githubUrl": "",
                "modelSize": "1.18B",
                "license": "Proprietary",
                "capabilities": ["Game playing", "Robot control", "Image captioning", "NLP"],
                "capabilities_cn": ["游戏游玩", "机器人控制", "图像描述", "自然语言处理"],
                "image": "/banners/gato-banner.png"
            },
            {
                "id": "dreamerv3",
                "category": "model",
                "title": "DreamerV3",
                "title_cn": "DreamerV3",
                "description": "Third generation of the Dreamer algorithm by BAIR. A reinforcement learning agent that learns a world model from pixels and solves tasks in a learned latent space. Masters diverse domains from scratch.",
                "description_cn": "BAIR的Dreamer算法第三代。一个强化学习智能体，从像素中学习世界模型并在学习到的潜在空间中解决任务。从零开始掌握多种领域。",
                "organization": "BAIR (UC Berkeley)",
                "releaseDate": "2023-01-01",
                "tags": ["RL", "World Models", "Open Source"],
                "tags_cn": ["强化学习", "世界模型", "开源"],
                "status": "released",
                "website": "https://danijar.com/project/dreamerv3/",
                "paperUrl": "https://arxiv.org/abs/2301.04104",
                "githubUrl": "https://github.com/danijar/dreamerv3",
                "modelSize": "Unknown",
                "license": "MIT",
                "capabilities": ["World model learning", "Policy optimization", "Pixel-based control"],
                "capabilities_cn": ["世界模型学习", "策略优化", "基于像素的控制"],
                "image": "/banners/dreamerv3-banner.png"
            },
            {
                "id": "unisim",
                "category": "model",
                "title": "UniSim",
                "title_cn": "UniSim",
                "description": "A learnable simulator by BAIR and DeepMind that generates realistic interactive environments from real-world data. Can simulate visual outcomes of actions for training embodied agents.",
                "description_cn": "BAIR和DeepMind开发的可学习模拟器，从真实数据生成真实的交互式环境。可以模拟动作的视觉结果以训练具身智能体。",
                "organization": "BAIR / DeepMind",
                "releaseDate": "2023-01-01",
                "tags": ["World Models", "Simulation", "Robotics"],
                "tags_cn": ["世界模型", "模拟", "机器人"],
                "status": "research",
                "website": "https://unisim-world.github.io",
                "paperUrl": "https://arxiv.org/abs/2310.06114",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Interactive simulation", "Action prediction", "Agent training"],
                "capabilities_cn": ["交互式模拟", "动作预测", "智能体训练"],
                "image": "/banners/unisim-banner.png"
            },
            {
                "id": "iris",
                "category": "model",
                "title": "IRIS",
                "title_cn": "IRIS",
                "description": "Imagination with auto-Regressive Integrated Stack by DeepMind. A data-efficient world model agent that learns to play games from high-dimensional visual inputs using a transformer-based world model.",
                "description_cn": "DeepMind的IRIS（自回归集成堆栈想象）。一种数据高效的世界模型智能体，使用基于Transformer的世界模型从高维视觉输入学习玩游戏。",
                "organization": "DeepMind",
                "releaseDate": "2022-01-01",
                "tags": ["RL", "World Models", "Transformer"],
                "tags_cn": ["强化学习", "世界模型", "Transformer"],
                "status": "research",
                "website": "https://arxiv.org/abs/2209.00588",
                "paperUrl": "https://arxiv.org/abs/2209.00588",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Game playing", "Visual RL", "World model imagination"],
                "capabilities_cn": ["游戏游玩", "视觉强化学习", "世界模型想象"],
                "image": "/banners/iris-banner.png"
            },
            {
                "id": "transformer-xl-world",
                "category": "model",
                "title": "Transformer-XL World Models",
                "title_cn": "Transformer-XL世界模型",
                "description": "An extension of Transformer-XL for learning long-term dependencies in reinforcement learning environments. Applied to world model learning for capturing temporal dynamics in sequential decision making.",
                "description_cn": "Transformer-XL的扩展，用于学习强化学习环境中的长期依赖。应用于世界模型学习以捕捉序列决策中的时间动态。",
                "organization": "Carnegie Mellon / Google",
                "releaseDate": "2019-06-01",
                "tags": ["RL", "Transformer", "Long-term Dependencies"],
                "tags_cn": ["强化学习", "Transformer", "长期依赖"],
                "status": "research",
                "website": "",
                "paperUrl": "https://arxiv.org/abs/1901.02860",
                "githubUrl": "",
                "modelSize": "Unknown",
                "license": "Proprietary",
                "capabilities": ["Long sequence modeling", "World state prediction", "Temporal reasoning"],
                "capabilities_cn": ["长序列建模", "世界状态预测", "时序推理"],
                "image": "/banners/transformer-xl-banner.png"
            }
        ]
    }


# =============================================================================
# 3. Papers Data
# =============================================================================

def get_papers_data() -> Dict[str, List[Dict[str, Any]]]:
    """Return key research papers on world models."""
    return {
        "items": [
            {
                "id": "sora-report",
                "category": "paper",
                "title": "Video Generation Models as World Simulators",
                "title_cn": "视频生成模型作为世界模拟器",
                "description": "OpenAI's technical report on Sora, exploring how large-scale video generation models can simulate physical worlds. Discusses the potential and limitations of using video generation as a path to world simulation.",
                "description_cn": "OpenAI关于Sora的技术报告，探讨大规模视频生成模型如何模拟物理世界。讨论了使用视频生成作为世界模拟路径的潜力和局限性。",
                "authors": ["OpenAI"],
                "date": "2024-02-15",
                "venue": "OpenAI Technical Report",
                "venue_cn": "OpenAI技术报告",
                "tags": ["Video Generation", "World Models", "Diffusion"],
                "tags_cn": ["视频生成", "世界模型", "扩散模型"],
                "status": "released",
                "url": "https://openai.com/research/video-generation-models-as-world-simulators",
                "citations": 0,
                "arxivUrl": ""
            },
            {
                "id": "world-models-paper",
                "category": "paper",
                "title": "World Models",
                "title_cn": "世界模型",
                "description": "Foundational paper by Ha and Schmidhuber introducing the concept of agents that learn models of their environments (world models) and use them to plan and imagine in a compressed latent space.",
                "description_cn": "Ha和Schmidhuber的基础论文，介绍了智能体学习环境模型（世界模型）并使用它们在压缩的潜在空间中进行规划和想象的概念。",
                "authors": ["David Ha", "Jürgen Schmidhuber"],
                "date": "2018-03-01",
                "venue": "NeurIPS 2018 (oral presentation)",
                "venue_cn": "NeurIPS 2018（口头报告）",
                "tags": ["World Models", "RL", "Generative Models"],
                "tags_cn": ["世界模型", "强化学习", "生成模型"],
                "status": "released",
                "url": "https://doi.org/10.5281/zenodo.1207631",
                "citations": 1800,
                "arxivUrl": "https://arxiv.org/abs/1803.10122"
            },
            {
                "id": "dreamer-paper",
                "category": "paper",
                "title": "Dream to Control: Learning Behaviors by Latent Imagination",
                "title_cn": "Dream to Control：通过潜在想象学习行为",
                "description": "Introduces Dreamer, a reinforcement learning agent that learns a world model from experience and performs planning in the learned latent space to solve long-horizon tasks from pixels.",
                "description_cn": "介绍了Dreamer，一个强化学习智能体，从经验中学习世界模型并在学习到的潜在空间中进行规划，以解决从像素出发的长时程任务。",
                "authors": ["Danijar Hafner", "Timothy Lillicrap", "Jimmy Ba", "Mohammad Norouzi"],
                "date": "2019-12-01",
                "venue": "ICLR 2020",
                "venue_cn": "ICLR 2020",
                "tags": ["RL", "World Models", "Planning"],
                "tags_cn": ["强化学习", "世界模型", "规划"],
                "status": "released",
                "url": "https://danijar.com/project/dreamer/",
                "citations": 1200,
                "arxivUrl": "https://arxiv.org/abs/1912.01603"
            },
            {
                "id": "dreamerv3-paper",
                "category": "paper",
                "title": "Mastering Diverse Domains through World Models",
                "title_cn": "通过世界模型掌握多样领域",
                "description": "DreamerV3 achieves strong performance across diverse domains from pixel inputs, mastering tasks from continuous control to discrete actions without domain-specific tuning.",
                "description_cn": "DreamerV3在从像素输入的多样领域上实现强大性能，掌握从连续控制到离散动作的任务，无需领域特定调优。",
                "authors": ["Danijar Hafner", "Jurgis Pasukonis", "Jimmy Ba", "Timothy Lillicrap"],
                "date": "2023-01-01",
                "venue": "Nature",
                "venue_cn": "Nature",
                "tags": ["RL", "World Models", "Generalization"],
                "tags_cn": ["强化学习", "世界模型", "泛化"],
                "status": "released",
                "url": "https://doi.org/10.1038/s41586-025-08744-2",
                "citations": 500,
                "arxivUrl": "https://arxiv.org/abs/2301.04104"
            },
            {
                "id": "gato-paper",
                "category": "paper",
                "title": "A Generalist Agent",
                "title_cn": "通用智能体",
                "description": "DeepMind's paper introducing Gato, a single neural network agent that can perform hundreds of different tasks across diverse environments using the same set of weights.",
                "description_cn": "DeepMind的论文介绍了Gato，一个单一神经网络智能体，可以使用同一组权重在多样环境中执行数百种不同任务。",
                "authors": ["Scott Reed", "Konrad Zolna", "Emilio Parisotto", "Sergio Gomez Colmenarejo", "Alexander Novikov", "Gabriel Barth-Maron", "Mai Gimenez", "Yury Sulsky", "Jackie Kay", "Jost Tobias Springenberg", "Tom Eccles", "Jake Bruce", "Ali Razavi", "Ashley Edwards", "Nicolas Heess", "Yutian Chen", "Raia Hadsell", "Oriol Vinyals", "Mahyar Bordbar", "Nando de Freitas"],
                "date": "2022-05-01",
                "venue": "Nature",
                "venue_cn": "Nature",
                "tags": ["Generalist Agent", "RL", "Multimodal"],
                "tags_cn": ["通用智能体", "强化学习", "多模态"],
                "status": "released",
                "url": "https://doi.org/10.1038/s41586-025-08744-2",
                "citations": 900,
                "arxivUrl": "https://arxiv.org/abs/2205.06175"
            },
            {
                "id": "videopoet-paper",
                "category": "paper",
                "title": "VideoPoet: A Large Language Model for Zero-Shot Video Generation",
                "title_cn": "VideoPoet：用于零样本视频生成的大型语言模型",
                "description": "Google's VideoPoet uses a decoder-only language model architecture for video generation, achieving high-quality video synthesis from text, images, and video inputs.",
                "description_cn": "Google的VideoPoet使用仅解码器的语言模型架构进行视频生成，从文本、图像和视频输入实现高质量视频合成。",
                "authors": ["Dan Kondratyuk", "Lijun Yu", "Xiuye Gu", "José Lezama", "Jonathan Huang", "Rachel Hornung", "Hartwig Adam", "Hassan Akbari", "Yair Alon", "Vighnesh Birodkar", "Johnathan Chiu", "Sanil Choudhary", "Ming-Chang Chiu", "Yoni Gat", "Davin Ho", "Hexiang Hu", "Jiahui Hu", "Yuming Jiang", "Bowen Li", "Jiayu Liao", "Chang Liu", "Fergus McLachlan", "David Ross", "Sudipta Sengupta", "Sarah Sargent", "Irfan Essa", "Huisheng Wang", "Hao Wu", "Avneesh Sud", "Jinbin Bai", "Adem Bader", "Krik Bell", "Gedas Bertasius", "David Eng", "Nathan Frey", "Christina Gansander", "Dennis Hsu", "Brian Lai", "Junjie Li", "Eric Nguyen", "Kirsty Panton", "Rohan Pradeep Kumar", "Amir Sarvghadi", "Jaesung Tae", "Mingzhou Teng", "Kaipeng Zeng", "Yale Song", "Jiageng Zhang", "Ming-Hsuan Yang", "Ariel Shamir", "Manjunath Kudlur", "David E. Jacobs"],
                "date": "2023-12-01",
                "venue": "Google Technical Report",
                "venue_cn": "Google技术报告",
                "tags": ["Video Generation", "LLM", "Zero-shot"],
                "tags_cn": ["视频生成", "大语言模型", "零样本"],
                "status": "released",
                "url": "https://sites.research.google/videopoet/",
                "citations": 200,
                "arxivUrl": "https://arxiv.org/abs/2312.03887"
            },
            {
                "id": "gaia-1-paper",
                "category": "paper",
                "title": "GAIA-1: A Generative World Model for Autonomous Driving",
                "title_cn": "GAIA-1：用于自动驾驶的生成式世界模型",
                "description": "Wayve's GAIA-1 is a 9-billion parameter generative world model for autonomous driving that can generate realistic driving videos from text, image, and action inputs.",
                "description_cn": "Wayve的GAIA-1是一个90亿参数的自动驾驶生成式世界模型，可以从文本、图像和动作输入生成真实的驾驶视频。",
                "authors": ["Anthony Hu", "Lloyd Russell", "Hudson Yeo", "Zak Murez", "George Fedoseev", "Alex Kendall", "Jamie Shotton", "Gianluca Corrado"],
                "date": "2023-09-01",
                "venue": "arXiv preprint",
                "venue_cn": "arXiv预印本",
                "tags": ["Autonomous Driving", "World Models", "Video Generation"],
                "tags_cn": ["自动驾驶", "世界模型", "视频生成"],
                "status": "released",
                "url": "https://arxiv.org/abs/2309.17080",
                "citations": 150,
                "arxivUrl": "https://arxiv.org/abs/2309.17080"
            },
            {
                "id": "i-jepa-paper",
                "category": "paper",
                "title": "I-JEPA: The First AI Model Based on Yann LeCun's Vision for More Human-Like AI",
                "title_cn": "I-JEPA：基于Yann LeCun愿景的首个更像人类AI的模型",
                "description": "Meta AI's I-JEPA learns semantic image representations without relying on pre-trained image augmentations, following LeCun's JEPA architecture for more human-like learning.",
                "description_cn": "Meta AI的I-JEPA不依赖预训练的图像增强来学习语义图像表示，遵循LeCun的JEPA架构实现更像人类的学习。",
                "authors": ["Meta AI Research"],
                "date": "2023-06-01",
                "venue": "arXiv preprint",
                "venue_cn": "arXiv预印本",
                "tags": ["Self-supervised Learning", "Computer Vision", "World Models"],
                "tags_cn": ["自监督学习", "计算机视觉", "世界模型"],
                "status": "released",
                "url": "https://ai.meta.com/blog/i-jepa-image-ai-model-human-like/",
                "citations": 300,
                "arxivUrl": "https://arxiv.org/abs/2301.08243"
            },
            {
                "id": "v-jepa-paper",
                "category": "paper",
                "title": "Revisiting Feature Prediction for Learning Visual Representations from Video",
                "title_cn": "重新审视特征预测以从视频学习视觉表示",
                "description": "V-JEPA extends the joint embedding predictive architecture to video, learning video representations by predicting features in a self-supervised manner without reconstructing pixels.",
                "description_cn": "V-JEPA将联合嵌入预测架构扩展到视频，通过自监督方式预测特征来学习视频表示，无需重建像素。",
                "authors": ["Meta AI Research"],
                "date": "2024-02-01",
                "venue": "arXiv preprint",
                "venue_cn": "arXiv预印本",
                "tags": ["Video Understanding", "Self-supervised Learning", "World Models"],
                "tags_cn": ["视频理解", "自监督学习", "世界模型"],
                "status": "released",
                "url": "https://ai.meta.com/blog/v-jepa-meta-ai-video-learning/",
                "citations": 100,
                "arxivUrl": "https://arxiv.org/abs/2403.05639"
            },
            {
                "id": "cosmos-paper",
                "category": "paper",
                "title": "Cosmos World Foundation Model Platform for Physical AI",
                "title_cn": "Cosmos物理AI世界基础模型平台",
                "description": "NVIDIA's technical report on Cosmos, a world foundation model platform designed for physical AI applications including robotics and autonomous driving.",
                "description_cn": "NVIDIA关于Cosmos的技术报告，这是一个专为物理AI应用（包括机器人和自动驾驶）设计的世界基础模型平台。",
                "authors": ["NVIDIA Research"],
                "date": "2025-01-06",
                "venue": "NVIDIA Technical Report",
                "venue_cn": "NVIDIA技术报告",
                "tags": ["Physical AI", "World Models", "Video Generation"],
                "tags_cn": ["物理AI", "世界模型", "视频生成"],
                "status": "released",
                "url": "https://nvidia.com/en-us/ai/cosmos/",
                "citations": 10,
                "arxivUrl": "https://arxiv.org/abs/2501.03575"
            },
            {
                "id": "unisim-paper",
                "category": "paper",
                "title": "Learning Interactive Real-World Simulators",
                "title_cn": "学习交互式真实世界模拟器",
                "description": "UniSim is a learnable simulator that generates realistic interactive environments from real-world data, enabling training of embodied agents without real-world interaction.",
                "description_cn": "UniSim是一个可学习模拟器，从真实数据生成真实的交互式环境，使具身智能体无需真实世界交互即可训练。",
                "authors": ["Sherry Yang", "Yilun Du", "Jun Yu", "Pete Florence", "Chelsea Finn", "Dale Schuurmans", "Pierre Sermanet", "DeepMind"],
                "date": "2023-01-01",
                "venue": "arXiv preprint",
                "venue_cn": "arXiv预印本",
                "tags": ["World Models", "Simulation", "Robotics"],
                "tags_cn": ["世界模型", "模拟", "机器人"],
                "status": "released",
                "url": "https://unisim-world.github.io",
                "citations": 80,
                "arxivUrl": "https://arxiv.org/abs/2310.06114"
            },
            {
                "id": "iris-paper",
                "category": "paper",
                "title": "Transformers are Sample Efficient World Models",
                "title_cn": "Transformer是样本高效的世界模型",
                "description": "IRIS shows that transformer-based world models can achieve strong performance in visual reinforcement learning with high sample efficiency, using discrete autoencoder representations.",
                "description_cn": "IRIS表明基于Transformer的世界模型可以在视觉强化学习中实现强大的性能和高样本效率，使用离散自编码器表示。",
                "authors": ["Vincent Micheli", "Eloi Alonso", "François Fleuret"],
                "date": "2022-09-01",
                "venue": "NeurIPS 2022 Deep RL Workshop",
                "venue_cn": "NeurIPS 2022深度强化学习研讨会",
                "tags": ["RL", "World Models", "Transformer"],
                "tags_cn": ["强化学习", "世界模型", "Transformer"],
                "status": "released",
                "url": "https://arxiv.org/abs/2209.00588",
                "citations": 250,
                "arxivUrl": "https://arxiv.org/abs/2209.00588"
            },
            {
                "id": "transformer-xl-paper",
                "category": "paper",
                "title": "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
                "title_cn": "Transformer-XL：超越固定长度上下文的注意力语言模型",
                "description": "Introduces a novel architecture that enables Transformer to learn dependency beyond a fixed length without disrupting temporal coherence. Key for world models needing long-term temporal understanding.",
                "description_cn": "介绍了一种新颖架构，使Transformer能够在不破坏时间连贯性的情况下学习固定长度之外的依赖关系。对需要长期时间理解的世界模型至关重要。",
                "authors": ["Zihang Dai", "Zhilin Yang", "Yiming Yang", "Jaime Carbonell", "Quoc V. Le", "Ruslan Salakhutdinov"],
                "date": "2019-06-01",
                "venue": "ACL 2019",
                "venue_cn": "ACL 2019",
                "tags": ["Transformer", "Long Context", "Language Models"],
                "tags_cn": ["Transformer", "长上下文", "语言模型"],
                "status": "released",
                "url": "https://arxiv.org/abs/1901.02860",
                "citations": 4500,
                "arxivUrl": "https://arxiv.org/abs/1901.02860"
            },
            {
                "id": "decision-transformer-paper",
                "category": "paper",
                "title": "Decision Transformer: Reinforcement Learning via Sequence Modeling",
                "title_cn": "Decision Transformer：通过序列建模进行强化学习",
                "description": "Frames reinforcement learning as a sequence modeling problem using transformers, showing that treating RL as a conditional generation problem can be highly effective.",
                "description_cn": "使用Transformer将强化学习框架为序列建模问题，表明将RL视为条件生成问题可以非常有效。",
                "authors": ["Lili Chen", "Kevin Lu", "Aravind Rajeswaran", "Kimin Lee", "Aditya Grover", "Misha Laskin", "Pieter Abbeel", "Aravind Srinivas", "Igor Mordatch"],
                "date": "2021-06-01",
                "venue": "NeurIPS 2021",
                "venue_cn": "NeurIPS 2021",
                "tags": ["RL", "Transformer", "Sequence Modeling"],
                "tags_cn": ["强化学习", "Transformer", "序列建模"],
                "status": "released",
                "url": "https://arxiv.org/abs/2106.01345",
                "citations": 1800,
                "arxivUrl": "https://arxiv.org/abs/2106.01345"
            },
            {
                "id": "muzero-paper",
                "category": "paper",
                "title": "Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model",
                "title_cn": "通过学习模型规划掌握Atari、围棋、国际象棋和将棋",
                "description": "MuZero achieves superhuman performance in complex board games and Atari without knowing the game rules, learning a model entirely from self-play and planning with it.",
                "description_cn": "MuZero在不知道游戏规则的情况下，在复杂棋盘游戏和Atari中实现超人类性能，完全通过自我对弈学习模型并进行规划。",
                "authors": ["Julian Schrittwieser", "Ioannis Antonoglou", "Thomas Hubert", "Karen Simonyan", "Laurent Sifre", "Simon Schmitt", "Arthur Guez", "Edward Lockhart", "Demis Hassabis", "Thore Graepel", "Timothy Lillicrap", "David Silver"],
                "date": "2019-11-01",
                "venue": "Nature",
                "venue_cn": "Nature",
                "tags": ["RL", "Planning", "World Models"],
                "tags_cn": ["强化学习", "规划", "世界模型"],
                "status": "released",
                "url": "https://doi.org/10.1038/s41586-020-03051-4",
                "citations": 3200,
                "arxivUrl": "https://arxiv.org/abs/1911.08265"
            },
            {
                "id": "alpha-zero-paper",
                "category": "paper",
                "title": "Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm",
                "title_cn": "通过通用强化学习算法自我对弈掌握国际象棋和将棋",
                "description": "AlphaZero achieves superhuman performance in chess, shogi, and Go through self-play reinforcement learning with a general-purpose algorithm, starting from random play.",
                "description_cn": "AlphaZero通过通用自我对弈强化学习算法，从随机对弈开始，在国际象棋、将棋和围棋中实现超人类性能。",
                "authors": ["David Silver", "Thomas Hubert", "Julian Schrittwieser", "Ioannis Antonoglou", "Matthew Lai", "Arthur Guez", "Marc Lanctot", "Laurent Sifre", "Dharshan Kumaran", "Thore Graepel", "Timothy Lillicrap", "Karen Simonyan", "Demis Hassabis"],
                "date": "2017-12-01",
                "venue": "Science",
                "venue_cn": "Science",
                "tags": ["RL", "Self-play", "Planning"],
                "tags_cn": ["强化学习", "自我对弈", "规划"],
                "status": "released",
                "url": "https://doi.org/10.1126/science.aar6404",
                "citations": 5500,
                "arxivUrl": "https://arxiv.org/abs/1712.01815"
            },
            {
                "id": "rssm-paper",
                "category": "paper",
                "title": "Learning and Querying Fast Generative Models of Reinforcement Learning Environments",
                "title_cn": "学习和查询强化学习环境的快速生成模型",
                "description": "Introduces the Recurrent State-Space Model (RSSM), the foundational architecture behind the Dreamer series. Combines deterministic and stochastic paths for learning latent dynamics models.",
                "description_cn": "介绍了循环状态空间模型（RSSM），Dreamer系列的基础架构。结合确定性和随机路径来学习潜在动态模型。",
                "authors": ["Cesar Laurent", "Marc Bellemare", "Sergey Levine", "Pablo Samuel Castro"],
                "date": "2019-06-01",
                "venue": "arXiv preprint",
                "venue_cn": "arXiv预印本",
                "tags": ["RL", "World Models", "Generative Models"],
                "tags_cn": ["强化学习", "世界模型", "生成模型"],
                "status": "released",
                "url": "https://arxiv.org/abs/1803.10122",
                "citations": 800,
                "arxivUrl": "https://arxiv.org/abs/1803.10122"
            }
        ]
    }


# =============================================================================
# 4. Timeline Data
# =============================================================================

def get_timeline_data() -> Dict[str, List[Dict[str, Any]]]:
    """Return development timeline events for world models."""
    return {
        "items": [
            {
                "id": "event-1",
                "date": "2018-03-01",
                "year": "2018",
                "title": "World Models Paper Published",
                "title_cn": "《世界模型》论文发表",
                "description": "Ha and Schmidhuber publish the seminal 'World Models' paper, introducing the concept of agents learning in simulated dream environments with a visual, memory, and controller component.",
                "description_cn": "Ha和Schmidhuber发表了开创性的《世界模型》论文，提出了在模拟梦境环境中学习的智能体概念，包含视觉、记忆和控制器组件。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": ["world-models-paper"]
            },
            {
                "id": "event-2",
                "date": "2018-12-01",
                "year": "2018",
                "title": "DeepMind Introduces PlaNet",
                "title_cn": "DeepMind发布PlaNet",
                "description": "DeepMind releases PlaNet, a deep planning network for reinforcement learning that learns a world model from images and plans in latent space.",
                "description_cn": "DeepMind发布PlaNet，一个用于强化学习的深度规划网络，从图像中学习世界模型并在潜在空间中进行规划。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": []
            },
            {
                "id": "event-3",
                "date": "2019-06-01",
                "year": "2019",
                "title": "Dreamer Algorithm Introduced",
                "title_cn": "Dreamer算法发布",
                "description": "The Dreamer algorithm is published, demonstrating that world models learned in latent space can solve long-horizon control tasks from pixels.",
                "description_cn": "Dreamer算法发布，证明了在潜在空间学习的世界模型可以解决从像素出发的长时程控制任务。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": ["dreamer-paper"]
            },
            {
                "id": "event-4",
                "date": "2019-11-01",
                "year": "2019",
                "title": "MuZero Published in Nature",
                "title_cn": "MuZero在Nature发表",
                "description": "DeepMind's MuZero is published, achieving superhuman performance in board games and Atari by learning a model entirely from self-play without knowing the rules.",
                "description_cn": "DeepMind的MuZero发表，在不知道游戏规则的情况下，通过完全自我对弈学习模型，在棋盘游戏和Atari中实现超人类性能。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": ["muzero-paper"]
            },
            {
                "id": "event-5",
                "date": "2020-06-01",
                "year": "2020",
                "title": "GPT-3 Demonstrates Emergent Capabilities",
                "title_cn": "GPT-3展示涌现能力",
                "description": "OpenAI releases GPT-3 with 175B parameters, demonstrating emergent world knowledge and reasoning capabilities in language models.",
                "description_cn": "OpenAI发布175B参数的GPT-3，展示了语言模型中的涌现世界知识和推理能力。",
                "category": "milestone",
                "importance": "medium",
                "relatedItems": []
            },
            {
                "id": "event-6",
                "date": "2021-06-01",
                "year": "2021",
                "title": "Decision Transformer Reframes RL",
                "title_cn": "Decision Transformer重构强化学习",
                "description": "Decision Transformer is published, framing reinforcement learning as a sequence modeling problem and inspiring new approaches to world model-based RL.",
                "description_cn": "Decision Transformer发表，将强化学习框架为序列建模问题，启发了基于世界模型的强化学习新方法。",
                "category": "paper",
                "importance": "medium",
                "relatedItems": ["decision-transformer-paper"]
            },
            {
                "id": "event-7",
                "date": "2022-01-01",
                "year": "2022",
                "title": "DeepMind's Gato: A Generalist Agent",
                "title_cn": "DeepMind的Gato：通用智能体",
                "description": "DeepMind introduces Gato, a single generalist agent capable of performing hundreds of tasks across diverse environments with the same neural network weights.",
                "description_cn": "DeepMind介绍Gato，一个通用智能体，能够使用相同的神经网络权重在多种环境中执行数百种任务。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": ["gato-paper"]
            },
            {
                "id": "event-8",
                "date": "2022-04-01",
                "year": "2022",
                "title": "DALL-E 2 Unveiled",
                "title_cn": "DALL-E 2发布",
                "description": "OpenAI releases DALL-E 2, a text-to-image generation model that demonstrates strong understanding of visual concepts and relationships.",
                "description_cn": "OpenAI发布DALL-E 2，一个文本到图像生成模型，展示了对视觉概念和关系的强理解能力。",
                "category": "release",
                "importance": "medium",
                "relatedItems": []
            },
            {
                "id": "event-9",
                "date": "2022-09-01",
                "year": "2022",
                "title": "IRIS: Transformer World Models for RL",
                "title_cn": "IRIS：用于强化学习的Transformer世界模型",
                "description": "IRIS paper shows that transformer-based world models can achieve high sample efficiency in visual reinforcement learning, using discrete autoencoder representations.",
                "description_cn": "IRIS论文表明基于Transformer的世界模型可以在视觉强化学习中实现高样本效率，使用离散自编码器表示。",
                "category": "paper",
                "importance": "medium",
                "relatedItems": ["iris-paper"]
            },
            {
                "id": "event-10",
                "date": "2022-11-30",
                "year": "2022",
                "title": "ChatGPT Launches to Public",
                "title_cn": "ChatGPT向公众发布",
                "description": "OpenAI launches ChatGPT, bringing large language models to mainstream users and sparking widespread interest in AI capabilities.",
                "description_cn": "OpenAI推出ChatGPT，将大语言模型带给主流用户，引发了对AI能力的广泛兴趣。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": []
            },
            {
                "id": "event-11",
                "date": "2023-01-01",
                "year": "2023",
                "title": "DreamerV3 Masters Diverse Domains",
                "title_cn": "DreamerV3掌握多样领域",
                "description": "DreamerV3 is published, achieving strong performance across diverse domains from pixel inputs without domain-specific tuning, published in Nature.",
                "description_cn": "DreamerV3发表，在从像素输入的多样领域上实现强大性能，无需领域特定调优，发表于Nature。",
                "category": "paper",
                "importance": "high",
                "relatedItems": ["dreamerv3-paper"]
            },
            {
                "id": "event-12",
                "date": "2023-03-14",
                "year": "2023",
                "title": "GPT-4 Released with Multimodal Capabilities",
                "title_cn": "GPT-4发布，具备多模态能力",
                "description": "OpenAI releases GPT-4, a large multimodal model with significantly improved reasoning and world understanding capabilities.",
                "description_cn": "OpenAI发布GPT-4，一个具有显著改进推理和世界理解能力的大型多模态模型。",
                "category": "release",
                "importance": "high",
                "relatedItems": []
            },
            {
                "id": "event-13",
                "date": "2023-06-01",
                "year": "2023",
                "title": "Meta AI Releases I-JEPA",
                "title_cn": "Meta AI发布I-JEPA",
                "description": "Meta AI releases I-JEPA, the first AI model based on Yann LeCun's JEPA architecture for more human-like self-supervised learning of image representations.",
                "description_cn": "Meta AI发布I-JEPA，这是首个基于Yann LeCun的JEPA架构的AI模型，用于更像人类的自监督图像表示学习。",
                "category": "release",
                "importance": "high",
                "relatedItems": ["i-jepa-paper"]
            },
            {
                "id": "event-14",
                "date": "2023-06-01",
                "year": "2023",
                "title": "Runway Gen-2 for Video Generation",
                "title_cn": "Runway Gen-2视频生成",
                "description": "Runway releases Gen-2, a multimodal video generation system that can synthesize videos from text, images, or video clips.",
                "description_cn": "Runway发布Gen-2，一个多模态视频生成系统，可以从文本、图像或视频片段合成视频。",
                "category": "release",
                "importance": "medium",
                "relatedItems": []
            },
            {
                "id": "event-15",
                "date": "2023-09-01",
                "year": "2023",
                "title": "Wayve Introduces GAIA-1",
                "title_cn": "Wayve发布GAIA-1",
                "description": "Wayve introduces GAIA-1, a 9-billion parameter generative world model for autonomous driving that can generate realistic driving scenarios.",
                "description_cn": "Wayve发布GAIA-1，一个90亿参数的自动驾驶生成式世界模型，可以生成真实的驾驶场景。",
                "category": "release",
                "importance": "high",
                "relatedItems": ["gaia-1-paper"]
            },
            {
                "id": "event-16",
                "date": "2023-11-21",
                "year": "2023",
                "title": "Stable Video Diffusion Open-Sourced",
                "title_cn": "Stable Video Diffusion开源",
                "description": "Stability AI releases Stable Video Diffusion, an open-source video generation model based on Stable Diffusion.",
                "description_cn": "Stability AI发布Stable Video Diffusion，一个基于Stable Diffusion的开源视频生成模型。",
                "category": "release",
                "importance": "medium",
                "relatedItems": []
            },
            {
                "id": "event-17",
                "date": "2023-12-01",
                "year": "2023",
                "title": "Google's VideoPoet for Zero-Shot Video",
                "title_cn": "Google的VideoPoet零样本视频生成",
                "description": "Google introduces VideoPoet, a large language model capable of zero-shot video generation from text, images, and video inputs.",
                "description_cn": "Google介绍VideoPoet，一个能够从文本、图像和视频输入进行零样本视频生成的大型语言模型。",
                "category": "paper",
                "importance": "medium",
                "relatedItems": ["videopoet-paper"]
            },
            {
                "id": "event-18",
                "date": "2024-02-15",
                "year": "2024",
                "title": "OpenAI Announces Sora",
                "title_cn": "OpenAI发布Sora",
                "description": "OpenAI announces Sora, a text-to-video model capable of generating realistic videos up to one minute, sparking global discussion on video generation as world simulation.",
                "description_cn": "OpenAI发布Sora，一个能够生成长达一分钟真实视频的文本到视频模型，引发全球关于视频生成作为世界模拟的讨论。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": ["sora-report"]
            },
            {
                "id": "event-19",
                "date": "2024-02-15",
                "year": "2024",
                "title": "Google Releases Gemini 1.5 Pro",
                "title_cn": "Google发布Gemini 1.5 Pro",
                "description": "Google releases Gemini 1.5 Pro with up to 2 million token context window, enabling video understanding and long-context world model capabilities.",
                "description_cn": "Google发布Gemini 1.5 Pro，上下文窗口高达200万token，支持视频理解和长上下文世界模型能力。",
                "category": "release",
                "importance": "high",
                "relatedItems": []
            },
            {
                "id": "event-20",
                "date": "2024-06-17",
                "year": "2024",
                "title": "Runway Gen-3 Alpha Released",
                "title_cn": "Runway Gen-3 Alpha发布",
                "description": "Runway releases Gen-3 Alpha with significant improvements in video fidelity, consistency, and motion understanding.",
                "description_cn": "Runway发布Gen-3 Alpha，在视频保真度、一致性和运动理解方面有显著提升。",
                "category": "release",
                "importance": "medium",
                "relatedItems": []
            },
            {
                "id": "event-21",
                "date": "2024-07-29",
                "year": "2024",
                "title": "Meta Releases SAM 2",
                "title_cn": "Meta发布SAM 2",
                "description": "Meta AI releases SAM 2, extending the Segment Anything Model to video with state-of-the-art promptable segmentation capabilities.",
                "description_cn": "Meta AI发布SAM 2，将Segment Anything模型扩展到视频，具有最先进的可提示分割能力。",
                "category": "release",
                "importance": "medium",
                "relatedItems": []
            },
            {
                "id": "event-22",
                "date": "2025-01-06",
                "year": "2025",
                "title": "NVIDIA Launches Cosmos Platform",
                "title_cn": "NVIDIA发布Cosmos平台",
                "description": "NVIDIA launches Cosmos, a world foundation model platform for physical AI, providing pre-trained models for robotics and autonomous systems.",
                "description_cn": "NVIDIA发布Cosmos，一个用于物理AI的世界基础模型平台，为机器人和自主系统提供预训练模型。",
                "category": "milestone",
                "importance": "high",
                "relatedItems": ["cosmos-paper"]
            }
        ]
    }


# =============================================================================
# 5. Updates Data
# =============================================================================

def get_updates_data() -> Dict[str, List[Dict[str, Any]]]:
    """Return recent news/updates about world model developments."""
    return {
        "items": [
            {
                "id": "update-1",
                "date": "2025-01-06",
                "title": "NVIDIA Launches Cosmos World Foundation Model Platform",
                "title_cn": "NVIDIA发布Cosmos世界基础模型平台",
                "source": "NVIDIA Blog",
                "category": "release",
                "url": "https://nvidia.com/en-us/ai/cosmos/",
                "summary": "NVIDIA launches Cosmos, a world foundation model platform with 14B parameters designed for physical AI applications including robotics and autonomous driving. Available open-source.",
                "summary_cn": "NVIDIA发布Cosmos，一个140亿参数的世界基础模型平台，用于物理AI应用，包括机器人和自动驾驶。以开源形式提供。"
            },
            {
                "id": "update-2",
                "date": "2024-12-09",
                "title": "OpenAI Unveils Sora Turbo for ChatGPT Plus Users",
                "title_cn": "OpenAI为ChatGPT Plus用户推出Sora Turbo",
                "source": "OpenAI Blog",
                "category": "release",
                "url": "https://openai.com/sora",
                "summary": "OpenAI expands Sora access to Plus and Pro subscribers with a faster 'Turbo' version capable of generating videos up to 20 seconds.",
                "summary_cn": "OpenAI将Sora访问权限扩展到Plus和Pro订阅者，推出更快的'Turbo'版本，可生成长达20秒的视频。"
            },
            {
                "id": "update-3",
                "date": "2024-12-01",
                "title": "DreamerV3 Published in Nature",
                "title_cn": "DreamerV3在Nature发表",
                "source": "Nature",
                "category": "publication",
                "url": "https://www.nature.com",
                "summary": "The DreamerV3 algorithm is published in Nature, demonstrating mastery of diverse domains through world models without domain-specific tuning.",
                "summary_cn": "DreamerV3算法在Nature发表，展示了通过世界模型无需领域特定调优即可掌握多种领域。"
            },
            {
                "id": "update-4",
                "date": "2024-11-20",
                "title": "Meta AI Releases V-JEPA for Video Understanding",
                "title_cn": "Meta AI发布V-JEPA用于视频理解",
                "source": "Meta AI Blog",
                "category": "release",
                "url": "https://ai.meta.com/blog/v-jepa-meta-ai-video-learning/",
                "summary": "Meta AI releases V-JEPA, a video joint embedding predictive architecture that learns video representations through feature prediction without pixel reconstruction.",
                "summary_cn": "Meta AI发布V-JEPA，一种视频联合嵌入预测架构，通过特征预测学习视频表示，无需像素重建。"
            },
            {
                "id": "update-5",
                "date": "2024-11-01",
                "title": "Wayve Introduces PRISM-1 World Model for Autonomous Driving",
                "title_cn": "Wayve推出PRISM-1自动驾驶世界模型",
                "source": "Wayve Blog",
                "category": "release",
                "url": "https://wayve.ai/thinking/prism-1/",
                "summary": "Wayve introduces PRISM-1, a next-generation world model for autonomous driving with improved simulation fidelity and scenario diversity.",
                "summary_cn": "Wayve推出PRISM-1，一个下一代自动驾驶世界模型，具有改进的模拟保真度和场景多样性。"
            },
            {
                "id": "update-6",
                "date": "2024-10-01",
                "title": "Pika Labs Releases Pika 1.5 with Advanced Motion Features",
                "title_cn": "Pika Labs发布Pika 1.5，具备高级运动功能",
                "source": "Pika Labs",
                "category": "release",
                "url": "https://pika.art",
                "summary": "Pika 1.5 introduces advanced motion understanding, Pikaffects for video editing, and improved video generation quality.",
                "summary_cn": "Pika 1.5引入高级运动理解、用于视频编辑的Pikaffects和改进的视频生成质量。"
            },
            {
                "id": "update-7",
                "date": "2024-09-01",
                "title": "Alibaba DAMO Releases Qwen2-VL Multimodal Model",
                "title_cn": "阿里巴巴达摩院发布Qwen2-VL多模态模型",
                "source": "Alibaba DAMO",
                "category": "release",
                "url": "https://huggingface.co/Qwen/Qwen2-VL",
                "summary": "Alibaba DAMO releases Qwen2-VL, a vision-language model with strong video understanding and world model capabilities for Chinese and English.",
                "summary_cn": "阿里巴巴达摩院发布Qwen2-VL，一个具有强视频理解和世界模型能力的中英文视觉语言模型。"
            },
            {
                "id": "update-8",
                "date": "2024-08-01",
                "title": "Runway Gen-3 Alpha Turbo Released",
                "title_cn": "Runway Gen-3 Alpha Turbo发布",
                "source": "Runway Blog",
                "category": "release",
                "url": "https://runwayml.com",
                "summary": "Runway releases a faster 'Turbo' variant of Gen-3 Alpha with near real-time video generation capabilities.",
                "summary_cn": "Runway发布更快的Gen-3 Alpha 'Turbo'变体，具备接近实时的视频生成能力。"
            },
            {
                "id": "update-9",
                "date": "2024-07-29",
                "title": "Meta AI Open-Sources SAM 2 for Video Segmentation",
                "title_cn": "Meta AI开源SAM 2用于视频分割",
                "source": "Meta AI Blog",
                "category": "release",
                "url": "https://ai.meta.com/sam2/",
                "summary": "Meta AI releases SAM 2 as open source, extending promptable segmentation to video with state-of-the-art performance.",
                "summary_cn": "Meta AI以开源形式发布SAM 2，将可提示分割扩展到视频，具有最先进的性能。"
            },
            {
                "id": "update-10",
                "date": "2024-06-01",
                "title": "Stability AI Releases Stable Diffusion 3",
                "title_cn": "Stability AI发布Stable Diffusion 3",
                "source": "Stability AI Blog",
                "category": "release",
                "url": "https://stability.ai",
                "summary": "Stability AI releases Stable Diffusion 3 with improved text rendering, image quality, and multimodal understanding.",
                "summary_cn": "Stability AI发布Stable Diffusion 3，改进了文本渲染、图像质量和多模态理解。"
            },
            {
                "id": "update-11",
                "date": "2024-05-01",
                "title": "Google DeepMind Advances Video Understanding with Gemini 1.5 Pro",
                "title_cn": "Google DeepMind通过Gemini 1.5 Pro推进视频理解",
                "source": "Google DeepMind Blog",
                "category": "research",
                "url": "https://deepmind.google/technologies/gemini/",
                "summary": "Google DeepMind extends Gemini 1.5 Pro context window to 2M tokens, enabling unprecedented video understanding and world model analysis capabilities.",
                "summary_cn": "Google DeepMind将Gemini 1.5 Pro上下文窗口扩展到200万token，实现了前所未有的视频理解和世界模型分析能力。"
            },
            {
                "id": "update-12",
                "date": "2024-03-04",
                "title": "Anthropic Releases Claude 3 with Vision Capabilities",
                "title_cn": "Anthropic发布Claude 3，具备视觉能力",
                "source": "Anthropic Blog",
                "category": "release",
                "url": "https://anthropic.com/news/claude-3-family",
                "summary": "Anthropic launches Claude 3 family with multimodal capabilities including vision understanding and long-context world model reasoning.",
                "summary_cn": "Anthropic推出Claude 3家族，具有多模态能力，包括视觉理解和长上下文世界模型推理。"
            }
        ]
    }


# =============================================================================
# Main Execution
# =============================================================================

def main() -> None:
    """Generate all world model data JSON files."""
    print("=" * 60)
    print("WorldModel Tracker - Data Generation")
    print("=" * 60)

    # Ensure output directory exists
    ensure_directory()
    print()

    # Generate all data files
    data_generators = [
        ("companies.json", get_companies_data),
        ("models.json", get_models_data),
        ("papers.json", get_papers_data),
        ("timeline.json", get_timeline_data),
        ("updates.json", get_updates_data),
    ]

    total_items = 0
    for filename, generator_func in data_generators:
        print(f"Generating {filename}...")
        data = generator_func()
        write_json(filename, data)
        total_items += len(data.get("items", []))

    print()
    print("=" * 60)
    print("Generation Complete!")
    print("=" * 60)
    print(f"Total files: {len(data_generators)}")
    print(f"Total items: {total_items}")
    print(f"Output directory: {OUTPUT_DIR}")
    print()
    print("Generated files:")
    for filename, _ in data_generators:
        filepath = OUTPUT_DIR / filename
        size = filepath.stat().st_size if filepath.exists() else 0
        print(f"  - {filename} ({size:,} bytes)")


if __name__ == "__main__":
    main()
