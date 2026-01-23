const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, LevelFormat, ExternalHyperlink, PageBreak } = require('docx');

// 表格边框样式
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// 辅助函数：创建标题段落
function createHeading(text, level) {
  const headingMap = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4
  };
  return new Paragraph({
    heading: headingMap[level] || HeadingLevel.HEADING_1,
    children: [new TextRun(text)]
  });
}

// 辅助函数：创建普通段落
function createParagraph(text, options = {}) {
  const { bold = false, color = '000000', size = 24, alignment = AlignmentType.LEFT } = options;
  return new Paragraph({
    alignment,
    children: [new TextRun({ text, bold, color, size })]
  });
}

// 辅助函数：创建列表项
function createBulletItem(text) {
  return new Paragraph({
    numbering: { reference: 'bullet-list', level: 0 },
    children: [new TextRun(text)]
  });
}

// 辅助函数：创建超链接
function createHyperlink(text, url) {
  return new Paragraph({
    children: [new ExternalHyperlink({
      children: [new TextRun({ text, style: 'Hyperlink', color: '0000FF', underline: {} })],
      link: url
    })]
  });
}

// 辅助函数：创建表格行
function createTableRow(cells, isHeader = false) {
  return new TableRow({
    tableHeader: isHeader,
    children: cells.map(text => new TableCell({
      borders: cellBorders,
      width: { size: 3120, type: WidthType.DXA },
      shading: isHeader ? { fill: 'D5E8F0', type: ShadingType.CLEAR } : undefined,
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold: isHeader, size: 22 })]
      })]
    }))
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullet-list',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '•',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: {
        run: { font: 'Arial', size: 24 }
      }
    },
    paragraphStyles: [
      {
        id: 'Title',
        name: 'Title',
        basedOn: 'Normal',
        run: { size: 56, bold: true, color: '000000', font: 'Arial' },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
      },
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, color: '1F4E78', font: 'Arial' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 28, bold: true, color: '2E5090', font: 'Arial' },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 }
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 26, bold: true, color: '375623', font: 'Arial' },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // 标题
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun('AI视频生成模型市场综合报告 2025-2026')]
      }),

      // 报告概览
      createHeading('报告概览', 2),
      createParagraph('本报告涵盖当前市场上所有主流视频生成AI大模型和工具，包括开源和闭源解决方案，深入分析各自的技术特点、优缺点及适用场景。'),
      new Paragraph({ children: [new PageBreak()] }),

      // 第一部分：闭源/商业视频生成模型
      createHeading('第一部分：闭源/商业视频生成模型', 1),

      // Sora 2
      createHeading('1. OpenAI Sora / Sora 2', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('视频时长：最长 60秒（业界领先）'),
      createBulletItem('画质：最高 4K'),
      createBulletItem('架构：DiT (Diffusion Transformer)'),
      createBulletItem('物理模拟能力：业界最强'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('无与伦比的真实感：光照、纹理和物理效果达到行业顶尖水平'),
      createBulletItem('最长视频时长：60秒的视频生成能力领先所有竞品'),
      createBulletItem('电影级质量：输出质量达到专业影视制作标准'),
      createBulletItem('强大的语义理解：对复杂提示词的理解能力极强'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('定价昂贵：作为OpenAI的高级服务，成本较高'),
      createBulletItem('访问限制：需要排队等候或订阅高级计划'),
      createBulletItem('封闭生态：无法本地部署，依赖云服务'),
      createBulletItem('定制化困难：用户无法对模型进行微调'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('专业影视制作'),
      createBulletItem('高质量广告视频'),
      createBulletItem('需要长视频内容的商业项目'),

      // Veo 3
      createHeading('2. Google Veo 3', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：Google DeepMind'),
      createBulletItem('视频时长：最长 60秒+'),
      createBulletItem('画质：最高 4K'),
      createBulletItem('特色：集成音频生成能力'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('音视频一体化：支持同步生成视频和音频'),
      createBulletItem('高质量输出：与Sora 2直接竞争的画质水平'),
      createBulletItem('Google生态集成：与YouTube等服务无缝衔接'),
      createBulletItem('技术奖项认可：获得技术卓越奖'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('定价不透明：具体的商业定价信息有限'),
      createBulletItem('可用性限制：尚未全面向公众开放'),
      createBulletItem('学习曲线：需要适应Google的工作流程'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('YouTube内容创作者'),
      createBulletItem('需要音频+视频一体化的项目'),
      createBulletItem('Google生态用户'),

      // Runway
      createHeading('3. Runway Gen-3 / Gen-4', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('视频时长：最长 18秒'),
      createBulletItem('画质：最高 1080p'),
      createBulletItem('特色：多模型工具集成平台'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('成熟平台：久经考验的视频生成平台'),
      createBulletItem('多模型工具：集成了多种AI视频编辑工具'),
      createBulletItem('电影级真实感：Gen-3 Alpha在运动和物理方面表现优异'),
      createBulletItem('编辑功能强大：不仅仅是生成，还有丰富的编辑工具'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('视频时长受限：相比Sora和Kling，时长较短'),
      createBulletItem('定价中等偏高：专业版需要订阅'),
      createBulletItem('生成速度：高质量视频生成需要等待时间'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('专业视频编辑师'),
      createBulletItem('需要后期编辑的项目'),
      createBulletItem('短视频内容创作'),

      // Pika Labs
      createHeading('4. Pika Labs', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('视频时长：标准 3-4秒'),
      createBulletItem('画质：最高 1080p'),
      createBulletItem('特色：创意动画和风格化'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('创意性强：特别适合动画和风格化视频'),
      createBulletItem('定价友好：相对其他商业方案更实惠'),
      createBulletItem('社区活跃：有活跃的用户社区分享技巧'),
      createBulletItem('持续迭代：产品更新频繁'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('时长限制：仅适合短视频生成'),
      createBulletItem('写实度一般：在超写实场景下不如Sora/Kling'),
      createBulletItem('物理模拟能力有限'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('社交媒体短视频'),
      createBulletItem('动画和创意内容'),
      createBulletItem('预算有限的创作者'),

      // Kling
      createHeading('5. 可灵AI (Kling AI - 快手)', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：快手'),
      createBulletItem('视频时长：最长 2分钟（业界最长）'),
      createBulletItem('画质：1080p / 30fps'),
      createBulletItem('架构：类似Sora的DiT架构'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('最长视频时长：2分钟视频生成能力全球领先'),
      createBulletItem('物理模拟强大：能准确模拟真实物理世界'),
      createBulletItem('快速迭代：持续推出Kling 2.5 Turbo等更新版本'),
      createBulletItem('中文友好：对中文提示词理解优异'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('定价不透明：商业定价信息有限'),
      createBulletItem('访问限制：需要通过特定平台使用'),
      createBulletItem('国际可用性：海外用户访问可能受限'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('需要长视频内容的项目'),
      createBulletItem('中文市场内容创作'),
      createBulletItem('物理模拟要求高的场景'),

      // 即梦AI
      createHeading('6. 即梦AI (字节跳动)', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：字节跳动'),
      createBulletItem('视频时长：5秒（标准版）'),
      createBulletItem('画质：最高 60帧'),
      createBulletItem('版本：S2.0 Pro、P2.0 Pro'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('中文支持极佳：原生中文提示词优化'),
      createBulletItem('剪映深度整合：可直接导入剪映后期编辑'),
      createBulletItem('分发便利：一键推送到抖音、今日头条等平台'),
      createBulletItem('提示词遵循能力强：P2.0 Pro版本对指令遵循能力极高'),
      createBulletItem('首帧一致性：S2.0 Pro版本具备首帧一致性'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('时长较短：5秒限制了应用场景'),
      createBulletItem('生态封闭：主要服务于字节系产品'),
      createBulletItem('国际化程度低'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('抖音/短视频创作者'),
      createBulletItem('中文内容市场'),
      createBulletItem('需要与剪映协作的工作流'),

      // 清影AI
      createHeading('7. 清影AI (智谱AI)', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：智谱AI'),
      createBulletItem('视频时长：10秒'),
      createBulletItem('画质：4K / 60帧（业界最高）'),
      createBulletItem('费用：完全免费'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('画质最高：4K/60帧规格领先市场'),
      createBulletItem('零成本：完全免费使用'),
      createBulletItem('时长适中：10秒适合多数短视频需求'),
      createBulletItem('技术背景强：智谱AI的GLM系列技术积累'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('时长限制：仅10秒'),
      createBulletItem('功能相对基础：相比商业平台功能较简单'),
      createBulletItem('商业支持：免费服务的商业支持有限'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('预算有限的创作者'),
      createBulletItem('需要高画质短片的项目'),
      createBulletItem('个人创作和测试'),

      new Paragraph({ children: [new PageBreak()] }),

      // 第二部分：开源视频生成模型
      createHeading('第二部分：开源视频生成模型', 1),

      // HunyuanVideo
      createHeading('1. 腾讯混元 HunyuanVideo / HunyuanVideo 1.5', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：腾讯'),
      createBulletItem('参数规模：130亿参数（当前最大开源视频模型）'),
      createBulletItem('许可证：Apache 2.0（完全开源）'),
      createBulletItem('模型类型：视频生成基础模型'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('最大开源模型：130亿参数领先所有开源方案'),
      createBulletItem('性能媲美闭源：质量可媲美甚至超越部分闭源模型'),
      createBulletItem('完全开源：开发者可自由使用和二次开发'),
      createBulletItem('商业化友好：Apache 2.0许可证允许商业使用'),
      createBulletItem('持续更新：已发布1.5版本改进版'),
      createBulletItem('参考图主体精准复刻：支持图像编辑和精准复刻'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('部署门槛高：需要大量GPU资源本地部署'),
      createBulletItem('技术要求高：需要专业AI开发能力'),
      createBulletItem('文档和生态：相比国际模型文档较新'),
      createParagraph('硬件需求：', { bold: true }),
      createBulletItem('推荐多张A100/H100 GPU'),
      createBulletItem('最低需要高端消费级GPU（如RTX 4090）'),
      createBulletItem('显存需求：48GB+'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('企业级定制开发'),
      createBulletItem('研究机构和学术项目'),
      createBulletItem('需要私有化部署的场景'),
      createParagraph('GitHub：'),
      createHyperlink('Tencent-Hunyuan/HunyuanVideo', 'https://github.com/Tencent-Hunyuan/HunyuanVideo'),

      // LTX-Video
      createHeading('2. LTX-Video (Lightricks)', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：Lightricks'),
      createBulletItem('特色：超快生成速度'),
      createBulletItem('架构：基于Stable Diffusion的视频生成'),
      createBulletItem('集成：原生支持ComfyUI'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('生成速度极快：在中端GPU上可实时生成'),
      createBulletItem('低显存需求：最低12GB显存即可运行'),
      createBulletItem('ComfyUI工作流：有成熟的ComfyUI节点和工作流'),
      createBulletItem('社区活跃：大量教程和示例'),
      createBulletItem('多种输入类型：支持文本到视频、图像到视频'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('质量稍逊：相比Hunyuan等模型画质略低'),
      createBulletItem('时长限制：适合短视频'),
      createBulletItem('稳定性：相对较新，可能存在bug'),
      createParagraph('硬件需求：', { bold: true }),
      createBulletItem('最低：12GB显存（如RTX 3060/4060）'),
      createBulletItem('推荐：16GB+显存（如RTX 4070/4080）'),
      createBulletItem('可在消费级硬件上流畅运行'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('个人创作者'),
      createBulletItem('快速原型制作'),
      createBulletItem('预算有限的项目'),
      createParagraph('GitHub：'),
      createHyperlink('Lightricks/LTX-Video', 'https://github.com/Lightricks/LTX-Video'),

      // SVD
      createHeading('3. Stable Video Diffusion (SVD)', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：Stability AI'),
      createBulletItem('模型类型：图生视频（Image-to-Video）'),
      createBulletItem('特色：Stable Diffusion生态的一部分'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('成熟生态：Stability AI的稳定支持'),
      createBulletItem('高质量图生视频：将静态图像转化为视频效果出色'),
      createBulletItem('社区资源丰富：大量教程、工具和工作流'),
      createBulletItem('WebUI支持：支持多种SD WebUI扩展'),
      createBulletItem('可与AnimateDiff结合：生成更高质量视频'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('仅支持图生视频：不支持文本直接生成视频'),
      createBulletItem('时长短：通常生成4秒左右视频'),
      createBulletItem('需要输入图像：必须先有图像'),
      createParagraph('硬件需求：', { bold: true }),
      createBulletItem('最低：8GB显存'),
      createBulletItem('推荐：12GB+显存'),
      createBulletItem('可在消费级GPU上运行'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('图像动画化'),
      createBulletItem('与SD工作流结合'),
      createBulletItem('需要图生视频的场景'),
      createParagraph('官网：'),
      createHyperlink('Stability AI - Stable Video', 'https://stability.ai/stable-video'),

      // AnimateDiff
      createHeading('4. AnimateDiff', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：开源社区（guoyww）'),
      createBulletItem('模型类型：文本到视频动画'),
      createBulletItem('特色：基于Stable Diffusion的运动生成'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('灵活性高：可与多种SD模型结合'),
      createBulletItem('文本到视频：支持文本提示词直接生成动画'),
      createBulletItem('插件生态丰富：有多个WebUI插件支持'),
      createBulletItem('社区活跃：GitHub持续更新维护'),
      createBulletItem('支持长视频：通过技巧可生成较长视频'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('技术门槛高：需要熟悉Stable Diffusion生态'),
      createBulletItem('质量依赖SD模型：最终质量取决于底层的SD模型'),
      createBulletItem('配置复杂：需要调整多个参数'),
      createParagraph('硬件需求：', { bold: true }),
      createBulletItem('最低：8GB显存'),
      createBulletItem('推荐：12GB+显存'),
      createBulletItem('与SD类似'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('SD用户扩展到视频'),
      createBulletItem('艺术风格动画'),
      createBulletItem('个人创作者'),
      createParagraph('GitHub：'),
      createHyperlink('guoyww/AnimateDiff', 'https://github.com/guoyww/AnimateDiff'),

      // Wan 2.1
      createHeading('5. Wan 2.1 (阿里)', 2),
      createParagraph('技术规格：', { bold: true }),
      createBulletItem('开发商：阿里巴巴'),
      createBulletItem('特色：登顶VBench榜单'),
      createBulletItem('模型类型：多模态视频生成'),
      createParagraph('优点：', { bold: true }),
      createBulletItem('VBench排名第一：在权威评测中表现优异'),
      createBulletItem('质量高：生成质量接近闭源模型'),
      createBulletItem('开源：部分模型开源'),
      createBulletItem('阿里技术支持：背后有阿里技术团队'),
      createParagraph('缺点：', { bold: true }),
      createBulletItem('文档较少：相比国际模型中文文档有限'),
      createBulletItem('社区较小：使用人数相对较少'),
      createBulletItem('部署复杂：需要一定技术能力'),
      createParagraph('适用场景：', { bold: true }),
      createBulletItem('研究项目'),
      createBulletItem('需要高质量开源模型的场景'),
      createBulletItem('阿里云生态集成'),

      // 其他开源模型
      createHeading('其他开源模型列表', 3),
      createParagraph('根据 aifreeforever 的统计，目前有 31+个开源视频生成模型：'),
      createBulletItem('CogVideoX (清华)'),
      createBulletItem('ModelScope (阿里)'),
      createBulletItem('Show-1 (Show Lab)'),
      createBulletItem('VideoCrafter'),
      createBulletItem('Open-Sora (社区版Sora复现)'),
      createBulletItem('LaVie'),
      createBulletItem('MagViT'),
      createBulletItem('VideoLDM'),
      createBulletItem('VideoGPT'),
      createBulletItem('NUWA'),
      createBulletItem('CogView'),
      createBulletItem('Make-A-Video'),
      createBulletItem('Phenaki'),
      createBulletItem('VideoGen'),
      createBulletItem('Zeroscope'),
      createBulletItem('Potat1'),
      createBulletItem('SpaceTime'),
      createBulletItem('VideoFusion'),
      createBulletItem('LVDM'),
      createBulletItem('DiffusionVideo'),
      createBulletItem('VideoDiffusion'),
      createBulletItem('Pika (早期版本有开源组件)'),
      createBulletItem('DynVideoCrafter'),
      createBulletItem('AnimateDiff-Sigma'),
      createBulletItem('LAVIE'),
      createBulletItem('ID-Animator'),
      createBulletItem('MotionCtrl'),
      createBulletItem('Video-Infinity'),
      createBulletItem('FreeInit'),
      createBulletItem('ProgRes'),
      createBulletItem('UPSTAGE'),

      new Paragraph({ children: [new PageBreak()] }),

      // 第三部分：综合对比分析
      createHeading('第三部分：综合对比分析', 1),

      createHeading('性能对比表', 2),
      new Table({
        columnWidths: [2000, 1500, 1500, 1500, 1500, 1200, 1000, 1200],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          createTableRow(['模型', '类型', '视频时长', '最高画质', 'GPU需求', '生成速度', '费用', '综合评分'], true),
          createTableRow(['Sora 2', '闭源', '60秒', '4K', '云服务', '中等', '高', '⭐⭐⭐⭐⭐']),
          createTableRow(['Veo 3', '闭源', '60秒+', '4K', '云服务', '中等', '高', '⭐⭐⭐⭐⭐']),
          createTableRow(['Kling', '闭源', '2分钟', '1080p', '云服务', '快', '中', '⭐⭐⭐⭐⭐']),
          createTableRow(['即梦', '闭源', '5秒', '60帧', '云服务', '快', '中', '⭐⭐⭐⭐']),
          createTableRow(['清影', '闭源', '10秒', '4K/60帧', '云服务', '快', '免费', '⭐⭐⭐⭐']),
          createTableRow(['Runway', '闭源', '18秒', '1080p', '云服务', '中', '高', '⭐⭐⭐⭐']),
          createTableRow(['Pika', '闭源', '4秒', '1080p', '云服务', '快', '中', '⭐⭐⭐']),
          createTableRow(['HunyuanVideo', '开源', '16秒', '高清', '48GB+', '慢', '免费', '⭐⭐⭐⭐⭐']),
          createTableRow(['LTX-Video', '开源', '4秒', '中高', '12GB+', '极快', '免费', '⭐⭐⭐⭐']),
          createTableRow(['SVD', '开源', '4秒', '中高', '8GB+', '快', '免费', '⭐⭐⭐']),
          createTableRow(['AnimateDiff', '开源', '可变', '中', '8GB+', '中', '免费', '⭐⭐⭐']),
          createTableRow(['Wan 2.1', '开源', '16秒', '高', '24GB+', '中', '免费', '⭐⭐⭐⭐'])
        ]
      }),

      createHeading('优缺点总结', 2),
      createHeading('闭源模型', 3),
      createParagraph('总体优点：', { bold: true }),
      createBulletItem('质量最高：Sora 2、Veo 3代表行业最高水准'),
      createBulletItem('使用便捷：无需配置，通过网页或API直接使用'),
      createBulletItem('持续优化：商业公司持续投入研发'),
      createBulletItem('功能丰富：集成编辑、后期等完整工作流'),
      createBulletItem('技术支持：有官方技术支持和SLA保障'),
      createParagraph('总体缺点：', { bold: true }),
      createBulletItem('成本高昂：按使用量或订阅收费，长期使用成本高'),
      createBulletItem('数据隐私：数据需要上传到云端'),
      createBulletItem('无法定制：无法针对特定场景微调模型'),
      createBulletItem('依赖服务：完全依赖服务商的可用性'),
      createBulletItem('供应商锁定：难以迁移到其他平台'),

      createHeading('开源模型', 3),
      createParagraph('总体优点：', { bold: true }),
      createBulletItem('零成本：一次部署，无限使用'),
      createBulletItem('数据隐私：可本地部署，数据不出域'),
      createBulletItem('完全可控：可自由修改和定制'),
      createBulletItem('商业化友好：多数许可证允许商业使用'),
      createBulletItem('社区支持：有活跃的开源社区'),
      createBulletItem('快速进步：开源模型质量正快速逼近闭源'),
      createParagraph('总体缺点：', { bold: true }),
      createBulletItem('技术门槛高：需要专业AI开发和运维能力'),
      createBulletItem('硬件成本高：需要购买昂贵的GPU设备'),
      createBulletItem('维护负担：需要自行维护和更新'),
      createBulletItem('质量参差：多数开源模型质量仍落后于Sora等顶尖闭源'),
      createBulletItem('文档和生态：相比商业产品文档和工具较缺乏'),

      new Paragraph({ children: [new PageBreak()] }),

      // 第四部分：行业趋势分析
      createHeading('第四部分：行业趋势分析', 1),
      createHeading('1. 开源与闭源差距快速缩小', 2),
      createParagraph('2025年的最大趋势是开源模型质量正在快速逼近闭源模型：'),
      createBulletItem('HunyuanVideo（130亿参数）的性能可媲美甚至超越部分闭源模型'),
      createBulletItem('LTX-Video在生成速度上实现了突破'),
      createBulletItem('VBench榜单上，开源模型排名持续上升'),

      createHeading('2. 多模态集成成为标配', 2),
      createBulletItem('文本→视频'),
      createBulletItem('图像→视频'),
      createBulletItem('视频→视频（编辑）'),
      createBulletItem('音频+视频同步生成（Veo 3）'),

      createHeading('3. 时长竞争白热化', 2),
      createBulletItem('Sora 2: 60秒'),
      createBulletItem('Kling: 2分钟（领先）'),
      createBulletItem('Veo 3: 60秒+'),
      createParagraph('趋势：视频时长将成为核心竞争指标。'),

      createHeading('4. 电影级质量成为新标准', 2),
      createBulletItem('4K分辨率成为高端标配'),
      createBulletItem('60fps高帧率（即梦、清影）'),
      createBulletItem('物理真实感（Sora、Kling）'),
      createBulletItem('光影效果逼真'),

      createHeading('5. 中国厂商崛起', 2),
      createParagraph('2025年七成AI应用来自中国：'),
      createBulletItem('快手Kling'),
      createBulletItem('字节即梦'),
      createBulletItem('腾讯混元'),
      createBulletItem('智谱清影'),
      createBulletItem('阿里Wan 2.1'),
      createParagraph('中国厂商在视频生成领域已形成群体优势。'),

      createHeading('6. ComfyUI成为开源标准', 2),
      createParagraph('ComfyUI正在成为开源视频生成的工作流标准：'),
      createBulletItem('LTX-Video原生支持'),
      createBulletItem('AnimateDiff完美集成'),
      createBulletItem('SVD、Hunyuan等均有ComfyUI节点'),
      createBulletItem('低代码/可视化编程'),

      new Paragraph({ children: [new PageBreak()] }),

      // 第五部分：选择建议
      createHeading('第五部分：选择建议', 1),

      createHeading('按使用场景选择', 2),
      createHeading('专业影视制作', 3),
      createParagraph('推荐：Sora 2 / Veo 3 / Kling', { bold: true }),
      createBulletItem('需求：最高质量、长视频'),
      createBulletItem('预算：充足'),
      createBulletItem('时效：可接受生成等待时间'),

      createHeading('短视频/社交媒体', 3),
      createParagraph('推荐：即梦 / Pika / 清影', { bold: true }),
      createBulletItem('需求：快速生成、中等质量'),
      createBulletItem('平台：抖音、TikTok等'),
      createBulletItem('预算：中等或免费'),

      createHeading('企业级应用', 3),
      createParagraph('推荐：HunyuanVideo（自部署）/ Runway', { bold: true }),
      createBulletItem('需求：数据隐私、定制化'),
      createBulletItem('预算：可接受部署成本'),
      createBulletItem('技术：有专业团队'),

      createHeading('个人创作/学习', 3),
      createParagraph('推荐：LTX-Video / AnimateDiff / 清影', { bold: true }),
      createBulletItem('需求：低成本、易上手'),
      createBulletItem('硬件：消费级GPU'),
      createBulletItem('预算：有限'),

      createHeading('研究机构/学术界', 3),
      createParagraph('推荐：HunyuanVideo / Wan 2.1 / 各类开源模型', { bold: true }),
      createBulletItem('需求：完全可控、可修改'),
      createBulletItem('许可：学术友好'),
      createBulletItem('资源：有GPU集群'),

      createHeading('按预算选择', 2),
      new Table({
        columnWidths: [3120, 6240],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          createTableRow(['预算级别', '推荐方案'], true),
          createTableRow(['免费', '清影AI、LTX-Video（本地）、SVD、AnimateDiff']),
          createTableRow(['低预算', 'Pika Labs、即梦、HunyuanVideo（云部署）']),
          createTableRow(['中等预算', 'Runway、Kling']),
          createTableRow(['高预算', 'Sora 2、Veo 3、私有化部署HunyuanVideo'])
        ]
      }),

      createHeading('按技术能力选择', 2),
      new Table({
        columnWidths: [3120, 6240],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          createTableRow(['技术水平', '推荐方案'], true),
          createTableRow(['零基础', '清影、Sora 2（网页版）、即梦']),
          createTableRow(['入门', 'Pika、Runway']),
          createTableRow(['进阶', 'LTX-Video + ComfyUI、AnimateDiff']),
          createTableRow(['专业', 'HunyuanVideo自部署、SVD定制'])
        ]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第六部分：技术选型建议
      createHeading('第六部分：技术选型建议', 1),
      createHeading('开源模型部署路线图', 2),

      createHeading('1. 入门级（消费级GPU）', 3),
      createParagraph('模型: LTX-Video'),
      createParagraph('硬件: RTX 4060/4070 (12-16GB)'),
      createParagraph('软件: ComfyUI'),
      createParagraph('成本: 约$300-500（显卡）'),
      createParagraph('适用: 个人学习、原型制作'),

      createHeading('2. 进阶级（高端消费级GPU）', 3),
      createParagraph('模型: Stable Video Diffusion + AnimateDiff'),
      createParagraph('硬件: RTX 4080/4090 (16-24GB)'),
      createParagraph('软件: ComfyUI + A1111'),
      createParagraph('成本: 约$1000-1600（显卡）'),
      createParagraph('适用: 小型项目、个人专业创作'),

      createHeading('3. 专业级（企业级GPU）', 3),
      createParagraph('模型: HunyuanVideo'),
      createParagraph('硬件: 1-2张 A100 (40-80GB)'),
      createParagraph('软件: Docker + 自定义推理服务'),
      createParagraph('成本: 约$10,000-15,000/卡'),
      createParagraph('适用: 企业生产环境、研究机构'),

      createHeading('4. 企业级（多卡集群）', 3),
      createParagraph('模型: HunyuanVideo + 多模型集成'),
      createParagraph('硬件: 4-8张 H100/A100集群'),
      createParagraph('软件: Kubernetes + 分布式推理'),
      createParagraph('成本: 约$50,000-100,000'),
      createParagraph('适用: 大型企业、云服务商'),

      createHeading('闭源服务使用建议', 2),
      createHeading('1. 免费试用策略', 3),
      createBulletItem('清影AI：完全免费，4K/60帧，10秒'),
      createBulletItem('Sora 2：等待公测或加入waitlist'),
      createBulletItem('多数平台提供免费试用额度'),

      createHeading('2. 订阅制对比', 3),
      new Table({
        columnWidths: [2000, 2000, 3500, 1860],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          createTableRow(['平台', '月费', '特点', '推荐度'], true),
          createTableRow(['Runway', '$15-76/月', '成熟平台，工具丰富', '⭐⭐⭐⭐']),
          createTableRow(['Pika', '$8/月', '性价比高', '⭐⭐⭐⭐']),
          createTableRow(['Kling', '待定', '时长最长', '⭐⭐⭐⭐⭐']),
          createTableRow(['即梦', '待定', '中文友好，剪映整合', '⭐⭐⭐⭐'])
        ]
      }),

      createHeading('3. API集成建议', 3),
      createBulletItem('优先选择提供RESTful API的服务'),
      createBulletItem('注意查看速率限制和计费方式'),
      createBulletItem('保留模型切换的灵活性（避免供应商锁定）'),

      new Paragraph({ children: [new PageBreak()] }),

      // 第七部分：学习资源
      createHeading('第七部分：学习资源', 1),
      createHeading('官方资源', 2),
      createParagraph('闭源模型：', { bold: true }),
      createHyperlink('OpenAI Sora', 'https://openai.com/sora'),
      createHyperlink('Google Veo', 'https://deepmind.google/technologies/veo/'),
      createHyperlink('Runway ML', 'https://runwayml.com/'),
      createHyperlink('Pika Labs', 'https://pika.art/'),
      createHyperlink('快手Kling', 'https://klingai.com/'),
      createHyperlink('字节即梦', 'https://jimeng.jianying.com/'),
      createHyperlink('智谱清影', 'https://chatglm.cn/video'),
      createHyperlink('腾讯混元', 'https://hunyuan.tencent.com/'),

      createParagraph('开源模型：', { bold: true }),
      createHyperlink('HunyuanVideo GitHub', 'https://github.com/Tencent-Hunyuan/HunyuanVideo'),
      createHyperlink('LTX-Video GitHub', 'https://github.com/Lightricks/LTX-Video'),
      createHyperlink('AnimateDiff GitHub', 'https://github.com/guoyww/AnimateDiff'),
      createHyperlink('Stable Video Diffusion', 'https://stability.ai/stable-video'),
      createHyperlink('VBench评测工具', 'https://github.com/Vchitect/VBench'),

      createHeading('社区和教程', 2),
      createParagraph('ComfyUI工作流：', { bold: true }),
      createHyperlink('ComfyUI GitHub', 'https://github.com/comfyanonymous/ComfyUI'),
      createHyperlink('ComfyUI节点市场', 'https://comfyanonymous.github.io/ComfyUI_nodes/'),
      createHyperlink('LTX Video ComfyUI教程', 'https://learn.thinkdiffusion.com/meet-ltx-video-generation-speed-unleashed-in-comfyui/'),

      createParagraph('评测和对比：', { bold: true }),
      createHyperlink('KDnuggets: Top 5 Open Source Video Models', 'https://www.kdnuggets.com/top-5-open-source-video-generation-models'),
      createHyperlink('DataCamp: Top 10 Video Models of 2025', 'https://www.datacamp.com/blog/top-video-generation-models'),
      createHyperlink('31 Open Source AI Video Models', 'https://aifreeforever.com/blog/open-source-ai-video-models-free-tools-to-make-videos'),
      createHyperlink('2025年最佳开源视频生成模型排名', 'https://juejin.cn/post/7512240668220948515'),

      createParagraph('中文资源：', { bold: true }),
      createHyperlink('一文盘点市面上各种开源和闭源的AI视频项目', 'https://zhuanlan.zhihu.com/p/1922793796527175537'),
      createHyperlink('2025国内文生图应用终极横评', 'https://blog.csdn.net/xinlinliu/article/details/152725023'),
      createHyperlink('新手友好的视频生成工具大比拼', 'https://juejin.cn/post/7572142436126998547'),

      new Paragraph({ children: [new PageBreak()] }),

      // 第八部分：未来展望
      createHeading('第八部分：未来展望', 1),
      createHeading('2025-2026年预测', 2),
      createBulletItem('时长突破：更多模型将支持2分钟+视频生成'),
      createBulletItem('实时生成：LTX-Video式的实时生成将成为标配'),
      createBulletItem('音频同步：更多模型将集成音频生成能力'),
      createBulletItem('3D视频：立体视频生成技术成熟'),
      createBulletItem('交互式视频：用户可实时调整视频内容'),
      createBulletItem('开源超越：部分开源模型可能在特定指标上超越Sora'),

      createHeading('技术发展方向', 2),
      createBulletItem('DiT架构普及：Diffusion Transformer成为主流'),
      createBulletItem('多模态融合：文本+图像+音频+视频统一模型'),
      createBulletItem('轻量化模型：适配移动端和边缘设备'),
      createBulletItem('个性化微调：用户可训练专属风格'),
      createBulletItem('长视频一致性：解决长视频的时序一致性问题'),

      createHeading('商业化趋势', 2),
      createBulletItem('价格战：闭源服务价格将持续下降'),
      createBulletItem('混合模式：基础版免费+高级功能付费'),
      createBulletItem('平台化：从单一模型发展为综合创作平台'),
      createBulletItem('垂直化：针对特定行业的定制化解决方案'),

      // 总结建议
      createHeading('总结建议', 1),
      createHeading('快速决策指南', 2),
      createParagraph('如果你是...', { bold: true }),
      createParagraph('个人创作者，预算有限：', { bold: true }),
      createBulletItem('选择 清影AI（免费，4K画质）或 LTX-Video（本地部署）'),
      createParagraph('短视频创作者，中文用户：', { bold: true }),
      createBulletItem('选择 即梦AI（剪映整合）或 可灵AI（时长最长）'),
      createParagraph('专业制作团队，预算充足：', { bold: true }),
      createBulletItem('选择 Sora 2 或 Veo 3（最高质量）'),
      createParagraph('企业级应用，需要数据隐私：', { bold: true }),
      createBulletItem('选择 HunyuanVideo 私有化部署'),
      createParagraph('研究者/开发者：', { bold: true }),
      createBulletItem('选择开源模型进行二次开发'),

      createHeading('核心建议', 2),
      createBulletItem('先试用再选择：所有闭源平台都提供免费试用，先测试效果'),
      createBulletItem('关注社区活跃度：选择有活跃社区支持的平台'),
      createBulletItem('避免供应商锁定：保持可切换性，不要深度依赖单一平台'),
      createBulletItem('开源是长期趋势：2025年开源模型质量已非常接近闭源'),
      createBulletItem('ComfyUI是必备技能：学习ComfyUI可大幅提升工作效率'),

      // 附录
      createHeading('附录：速查表', 1),
      createHeading('视频生成模型速查表', 2),
      createParagraph('超高质量 + 长视频：', { bold: true }),
      createBulletItem('→ Sora 2, Veo 3, Kling (2分钟)'),
      createParagraph('短视频 + 社交媒体：', { bold: true }),
      createBulletItem('→ 即梦 (中文+剪映), Pika, 清影 (免费4K)'),
      createParagraph('开源 + 可定制：', { bold: true }),
      createBulletItem('→ HunyuanVideo (最强), LTX-Video (最快), SVD, AnimateDiff'),
      createParagraph('企业级 + 数据隐私：', { bold: true }),
      createBulletItem('→ HunyuanVideo (私有部署), Runway (企业版)'),
      createParagraph('完全免费：', { bold: true }),
      createBulletItem('→ 清影AI, 所有开源模型(需自部署)'),

      createHeading('硬件需求速查表', 2),
      createBulletItem('8GB显存 → SVD, AnimateDiff (基础)'),
      createBulletItem('12GB显存 → LTX-Video, SVD + AnimateDiff'),
      createBulletItem('16GB显存 → 大部分开源模型'),
      createBulletItem('24GB显存 → Wan 2.1, 高级工作流'),
      createBulletItem('48GB+显存 → HunyuanVideo (完整精度)'),

      // 参考资料
      createHeading('参考资料', 1),
      createParagraph('信息来源：', { bold: true }),
      createHyperlink('LovArt AI: Sora 2 vs Runway vs Pika Labs Complete Review', 'https://www.lovart.ai/blog/video-generators-review'),
      createHyperlink('Vizard: 10 Best AI Video Generative Models in 2025', 'https://vizard.ai/blog/10-best-ai-video-generative-models-in-2025'),
      createHyperlink('KDnuggets: Top 5 Open Source Video Generation Models', 'https://www.kdnuggets.com/top-5-open-source-video-generation-models'),
      createHyperlink('DataCamp: The Top 10 Video Generation Models of 2025', 'https://www.datacamp.com/blog/top-video-generation-models'),
      createHyperlink('Medium: 10 Best AI Video Generators for 2026', 'https://medium.com/@nizamstatistics/10-best-ai-video-generators-for-2026-667a05d662db'),
      createHyperlink("PCMag: The Best AI Video Generators We've Tested for 2026", 'https://www.pcmag.com/picks/the-best-ai-video-generators'),
      createHyperlink('白 Fiber: Choosing the Best Open-Source Video Generation Model', 'https://www.whitefiber.com/blog/best-open-source-video-generation-model'),
      createHyperlink('掘金: 2025年最佳开源视频生成模型排名', 'https://juejin.cn/post/7512240668220948515'),
      createHyperlink('知乎: 一文盘点市面上各种开源和闭源的AI视频项目', 'https://zhuanlan.zhihu.com/p/1922793796527175537'),
      createHyperlink('AI Free Forever: 31 Open-Source AI Video Models', 'https://aifreeforever.com/blog/open-source-ai-video-models-free-tools-to-make-videos'),
      createHyperlink('VBench: Comprehensive Benchmark Suite for Video Generative', 'https://vchitect.github.io/VBench-project/'),

      createParagraph('技术论文和评测：', { bold: true }),
      createHyperlink('VBench-2.0 (arXiv 2025): Advancing Video Generation Benchmark Suite', 'https://arxiv.org/html/2503.21755v1'),
      createHyperlink('Stanford HAI: 2025 AI Index Report', 'https://hai.stanford.edu/ai-index/2025-ai-index-report'),

      new Paragraph({ children: [new PageBreak()] }),

      // 报告元信息
      createParagraph('报告生成时间：2025年1月', { alignment: AlignmentType.LEFT, size: 22, color: '666666' }),
      createParagraph('数据更新周期：建议每3-6个月更新一次，该领域发展迅速', { alignment: AlignmentType.LEFT, size: 22, color: '666666' }),
      new Paragraph({ children: [new TextRun({ text: '*本报告仅供参考，具体选择请根据实际需求和预算进行评估。', italics: true, color: '666666', size: 22 })] })
    ]
  }]
});

// 保存文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('D:\\Work\\blsat.com\\aiv\\AI视频生成模型市场报告_2025.docx', buffer);
  console.log('文档已成功生成：AI视频生成模型市场报告_2025.docx');
}).catch(err => {
  console.error('生成文档时出错：', err);
});
