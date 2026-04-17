from __future__ import annotations

import os
import zipfile
from datetime import datetime, timezone
from xml.sax.saxutils import escape


SLIDES = [
    {
        "title": "当模型够强，Agent 为什么还是频繁翻车？",
        "subtitle": "一文讲透 2026 最火 AI 工程概念：Harness Engineering\n基于 TGLTommy 视频内容整理",
        "bullets": [],
    },
    {
        "title": "一句话结论",
        "bullets": [
            "Agent 频繁失败，越来越不是因为模型能力不足。",
            "真正的瓶颈，正在从模型本身转向模型外部的系统设计。",
            "下一阶段 AI 应用竞争力，核心在于谁能构建更可靠的 Harness。",
        ],
    },
    {
        "title": "什么是 Harness Engineering",
        "bullets": [
            "Harness 原意是“马具”或“安全带”。",
            "在 AI 系统中，它指模型外部的控制、约束、执行与校验框架。",
            "它不是替代模型思考，而是让模型能力更稳定地落地。",
            "可以理解为：模型 = 大脑，Harness = 骨架 + 工作流 + 校验器。",
        ],
    },
    {
        "title": "AI 工程范式的三步演进",
        "bullets": [
            "Prompt Engineering：怎么问，优化单次输出。",
            "Context Engineering：给什么信息，优化任务理解。",
            "Harness Engineering：怎么组织系统，优化稳定执行。",
            "工程重心正从“生成优化”走向“系统级可靠性设计”。",
        ],
    },
    {
        "title": "为什么 2025 年底到 2026 年初快速升温",
        "bullets": [
            "大模型基础能力提升后，单步问答已不是主要矛盾。",
            "Agent 开始承担更长链路、更真实、更复杂的任务。",
            "问题从“能不能做”转向“能不能稳定做、规模化做”。",
            "企业更关注可靠性、可控性、审计能力和成本。",
        ],
    },
    {
        "title": "Agent 为什么会翻车",
        "bullets": [
            "任务拆解不清晰。",
            "上下文注入混乱或冗余。",
            "工具太多，调用不稳定。",
            "缺少结果验证与纠错闭环。",
            "长链路任务缺乏状态管理。",
            "缺少异常恢复、重试和人工兜底机制。",
        ],
    },
    {
        "title": "行业案例透露的共同方向",
        "bullets": [
            "Anthropic：多 Agent 分工，强调生成与评估分离。",
            "OpenAI：复杂代码任务依赖完整执行体系，而非单轮生成。",
            "Google DeepMind：采用 Generator-Verifier-Reviser 循环。",
            "Vercel：减少工具数量，反而提升整体稳定性。",
        ],
    },
    {
        "title": "Harness 的典型能力模块",
        "bullets": [
            "任务编排：拆解目标、规划步骤、分配子任务。",
            "上下文管理：控制输入信息的质量、范围和时机。",
            "工具治理：限制工具数量、明确边界和权限。",
            "结果验证：检查、评分、比对和过滤输出。",
            "修订循环：失败后重试、反思、修正。",
            "监控与安全：日志、告警、人工接管、风险控制。",
        ],
    },
    {
        "title": "对企业和团队的启示",
        "bullets": [
            "不要再把 Prompt 当作唯一抓手。",
            "评估 AI 能力时，要看整条任务链而不是单次输出。",
            "优先建设验证、回滚、观测和人工介入能力。",
            "工具不是越多越好，稳定性优先于功能堆叠。",
            "Agent 项目要以系统工程方式推进，而不是 Demo 方式推进。",
        ],
    },
    {
        "title": "总结",
        "bullets": [
            "模型持续变强，系统可靠性将成为新的竞争焦点。",
            "Agent 的关键问题，正从“智力不足”转向“工程失控”。",
            "Harness Engineering 是下一阶段 AI 应用落地的核心能力之一。",
            "未来拼的不只是模型上限，更是模型被组织后的稳定下限。",
        ],
    },
]


def para(text: str, level: int = 0, size: int = 2200, bold: bool = False) -> str:
    text = escape(text)
    attrs = f' lvl="{level}"' if level else ""
    bold_attr = ' b="1"' if bold else ""
    return (
        f"<a:p><a:pPr{attrs}/><a:r><a:rPr lang=\"zh-CN\" sz=\"{size}\"{bold_attr}/>"
        f"<a:t>{text}</a:t></a:r><a:endParaRPr lang=\"zh-CN\" sz=\"{size}\"/></a:p>"
    )


def textbox(shape_id: int, name: str, x: int, y: int, cx: int, cy: int, body_xml: str) -> str:
    return f"""
<p:sp>
  <p:nvSpPr>
    <p:cNvPr id="{shape_id}" name="{escape(name)}"/>
    <p:cNvSpPr txBox="1"/>
    <p:nvPr/>
  </p:nvSpPr>
  <p:spPr>
    <a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>
    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
    <a:noFill/>
    <a:ln><a:noFill/></a:ln>
  </p:spPr>
  <p:txBody>
    <a:bodyPr wrap="square" rtlCol="0" anchor="t"/>
    <a:lstStyle/>
    {body_xml}
  </p:txBody>
</p:sp>""".strip()


def slide_xml(idx: int, slide: dict[str, object]) -> str:
    title = str(slide["title"])
    subtitle = str(slide.get("subtitle", ""))
    bullets = list(slide.get("bullets", []))

    bg = """
<p:bg>
  <p:bgPr>
    <a:solidFill><a:srgbClr val="F6F8FB"/></a:solidFill>
    <a:effectLst/>
  </p:bgPr>
</p:bg>""".strip()

    accent = f"""
<p:sp>
  <p:nvSpPr>
    <p:cNvPr id="2" name="Accent"/>
    <p:cNvSpPr/>
    <p:nvPr/>
  </p:nvSpPr>
  <p:spPr>
    <a:xfrm><a:off x="420000" y="300000"/><a:ext cx="1100000" cy="90000"/></a:xfrm>
    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
    <a:solidFill><a:srgbClr val="FF7A00"/></a:solidFill>
    <a:ln><a:noFill/></a:ln>
  </p:spPr>
</p:sp>""".strip()

    title_box = textbox(
        3,
        "Title",
        420000,
        520000,
        11300000,
        900000,
        para(title, size=2800, bold=True),
    )

    shapes = [accent, title_box]

    if subtitle:
        subtitle_box = textbox(
            4,
            "Subtitle",
            420000,
            1500000,
            11300000,
            1200000,
            "".join(para(line, size=1600) for line in subtitle.splitlines()),
        )
        shapes.append(subtitle_box)

    if bullets:
        body = [para("", size=2000)]
        for bullet in bullets:
            body.append(para("• " + bullet, size=2000))
        bullets_box = textbox(
            5,
            "Body",
            650000,
            1750000,
            11200000,
            4300000,
            "".join(body),
        )
        shapes.append(bullets_box)

    footer = textbox(
        6,
        "Footer",
        420000,
        6550000,
        11800000,
        300000,
        para(f"Harness Engineering 视频解读  |  第 {idx} 页", size=1000),
    )
    shapes.append(footer)

    sp_tree = "\n".join(
        [
            "<p:nvGrpSpPr><p:cNvPr id=\"1\" name=\"\"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>",
            "<p:grpSpPr><a:xfrm><a:off x=\"0\" y=\"0\"/><a:ext cx=\"0\" cy=\"0\"/><a:chOff x=\"0\" y=\"0\"/><a:chExt cx=\"0\" cy=\"0\"/></a:xfrm></p:grpSpPr>",
            *shapes,
        ]
    )

    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide {idx}">
    {bg}
    <p:spTree>
      {sp_tree}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>
"""


def content_types_xml(slide_count: int) -> str:
    overrides = "\n".join(
        f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
        for i in range(1, slide_count + 1)
    )
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>
  <Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>
  <Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>
  {overrides}
</Types>
"""


ROOT_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"""


def presentation_xml(slide_count: int) -> str:
    slide_ids = "\n".join(
        f'<p:sldId id="{256 + i}" r:id="rId{i + 3}"/>' for i in range(1, slide_count + 1)
    )
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"
 saveSubsetFonts="1" autoCompressPictures="0">
  <p:sldMasterIdLst>
    <p:sldMasterId id="2147483648" r:id="rId1"/>
  </p:sldMasterIdLst>
  <p:sldIdLst>
    {slide_ids}
  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
  <p:notesSz cx="6858000" cy="9144000"/>
  <p:defaultTextStyle/>
</p:presentation>
"""


def presentation_rels_xml(slide_count: int) -> str:
    slide_rels = "\n".join(
        f'<Relationship Id="rId{i + 3}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i}.xml"/>'
        for i in range(1, slide_count + 1)
    )
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/printerSettings" Target="printerSettings/printerSettings1.bin"/>
  {slide_rels}
</Relationships>
"""


SLIDE_MASTER = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Master">
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="F6F8FB"/></a:solidFill>
        <a:effectLst/>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="1" r:id="rId1"/></p:sldLayoutIdLst>
  <p:txStyles>
    <p:titleStyle/>
    <p:bodyStyle/>
    <p:otherStyle/>
  </p:txStyles>
</p:sldMaster>
"""


SLIDE_MASTER_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>
"""


SLIDE_LAYOUT = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>
"""


THEME = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">
  <a:themeElements>
    <a:clrScheme name="Office">
      <a:dk1><a:srgbClr val="1F1F1F"/></a:dk1>
      <a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="0F172A"/></a:dk2>
      <a:lt2><a:srgbClr val="F8FAFC"/></a:lt2>
      <a:accent1><a:srgbClr val="FF7A00"/></a:accent1>
      <a:accent2><a:srgbClr val="0F4C81"/></a:accent2>
      <a:accent3><a:srgbClr val="3A86FF"/></a:accent3>
      <a:accent4><a:srgbClr val="00A896"/></a:accent4>
      <a:accent5><a:srgbClr val="6C757D"/></a:accent5>
      <a:accent6><a:srgbClr val="ADB5BD"/></a:accent6>
      <a:hlink><a:srgbClr val="0563C1"/></a:hlink>
      <a:folHlink><a:srgbClr val="954F72"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Office">
      <a:majorFont><a:latin typeface="Microsoft YaHei"/><a:ea typeface="Microsoft YaHei"/><a:cs typeface="Arial"/></a:majorFont>
      <a:minorFont><a:latin typeface="Microsoft YaHei"/><a:ea typeface="Microsoft YaHei"/><a:cs typeface="Arial"/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Office">
      <a:fillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill>
        <a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill>
      </a:fillStyleLst>
      <a:lnStyleLst>
        <a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
      </a:lnStyleLst>
      <a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
      <a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill></a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
  <a:objectDefaults/>
  <a:extraClrSchemeLst/>
</a:theme>
"""


PRES_PROPS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentationPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>
"""


VIEW_PROPS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:viewPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" showComments="0">
  <p:normalViewPr/>
  <p:slideViewPr/>
  <p:notesTextViewPr/>
  <p:gridSpacing cx="780288" cy="780288"/>
</p:viewPr>
"""


TABLE_STYLES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>
"""


def app_xml(slide_count: int) -> str:
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
 xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office PowerPoint</Application>
  <PresentationFormat>On-screen Show (16:9)</PresentationFormat>
  <Slides>{slide_count}</Slides>
  <Notes>0</Notes>
  <HiddenSlides>0</HiddenSlides>
  <MMClips>0</MMClips>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs>
    <vt:vector size="2" baseType="variant">
      <vt:variant><vt:lpstr>幻灯片标题</vt:lpstr></vt:variant>
      <vt:variant><vt:i4>{slide_count}</vt:i4></vt:variant>
    </vt:vector>
  </HeadingPairs>
  <TitlesOfParts>
    <vt:vector size="{slide_count}" baseType="lpstr">
      {''.join(f'<vt:lpstr>{escape(slide["title"])}</vt:lpstr>' for slide in SLIDES)}
    </vt:vector>
  </TitlesOfParts>
  <Company></Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>16.0000</AppVersion>
</Properties>
"""


def core_xml() -> str:
    created = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcmitype="http://purl.org/dc/dcmitype/"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Harness Engineering 视频解读</dc:title>
  <dc:subject>Agent 与 Harness Engineering</dc:subject>
  <dc:creator>Codex</dc:creator>
  <cp:keywords>Harness Engineering, Agent, AI 工程</cp:keywords>
  <dc:description>基于公开视频整理的演示文稿</dc:description>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{created}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{created}</dcterms:modified>
</cp:coreProperties>
"""


def build_pptx(out_path: str) -> None:
    slide_count = len(SLIDES)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with zipfile.ZipFile(out_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types_xml(slide_count))
        zf.writestr("_rels/.rels", ROOT_RELS)
        zf.writestr("docProps/app.xml", app_xml(slide_count))
        zf.writestr("docProps/core.xml", core_xml())
        zf.writestr("ppt/presentation.xml", presentation_xml(slide_count))
        zf.writestr("ppt/_rels/presentation.xml.rels", presentation_rels_xml(slide_count))
        zf.writestr("ppt/slideMasters/slideMaster1.xml", SLIDE_MASTER)
        zf.writestr("ppt/slideMasters/_rels/slideMaster1.xml.rels", SLIDE_MASTER_RELS)
        zf.writestr("ppt/slideLayouts/slideLayout1.xml", SLIDE_LAYOUT)
        zf.writestr("ppt/theme/theme1.xml", THEME)
        zf.writestr("ppt/presProps.xml", PRES_PROPS)
        zf.writestr("ppt/viewProps.xml", VIEW_PROPS)
        zf.writestr("ppt/tableStyles.xml", TABLE_STYLES)
        zf.writestr("ppt/printerSettings/printerSettings1.bin", b"")
        for i, slide in enumerate(SLIDES, start=1):
            zf.writestr(f"ppt/slides/slide{i}.xml", slide_xml(i, slide))


if __name__ == "__main__":
    output = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "docs",
        "Harness Engineering视频解读.pptx",
    )
    build_pptx(output)
    print(output)
