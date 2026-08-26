# PRD · 个人作品集网站重构（多页面版）

> 版本：v3.0（v2.0 基础上锁定后端方案 Supabase，新增数据模型与权限设计）
> 文档定位：需求规格。UI 视觉由吴可奕定稿，开发由 Hermes 按本文档落地。
> 字体：（拉丁/等宽/标题/数字）。
> 后端：Supabase（已定）。

---

## 1. 方向修正（为什么推翻 v1.0）

v1.0 把网站定位成「单页锚点滚动的务实信息型作品集」，假设决策者 30 秒扫一遍就走。**这个假设错了。**

新定位：作品集不只是「被扫的简历」，更是一个「个人角落」——用互动页（游戏 / 博客 / 小纸条）表达个性，同时这些页本身就是技术能力的佐证（会写前端游戏、能搭带账号和交互的站）。

变化点：单页 → 多页；纯信息展示 → 信息 + 互动 + 账号体系；「30 秒可扫描」退为**仅对简历页**的要求。

---

## 2. 产品定位

- **形态**：多页面个人作品集网站，顶部导览栏切换页面。
- **页面（从左至右）**：简历页 / 游戏页 / Blog 页 / 路过小纸条页 / 用户登录页。
- **分工**：
  - 简历页 = 务实核心（结果先行、能力有佐证、数据可信）；
  - 游戏 / Blog / 小纸条 = 个性表达 + 技术能力佐证（前端游戏、带互动和登录的站）；
  - 登录页 = 支撑小纸条（及 Blog 评论身份）的账号体系。
- **判断标准**：投递者点开简历页能快速读懂经历；逛完其他页能记住「这是个会写代码、有审美、有表达欲的人」。

---

## 3. 设计原则

1. **简历页结果先行**：经历/项目第一眼是硬数据，过程是佐证（仅简历页，不套用到互动页）。
2. **能力有佐证**：不写「XX 能力 92%」这类自评，写「会什么 + 拿什么证明」。
3. **数据可信**：对外数字必须是能守住追问的口径；模拟数据显著标注。
4. **个性点睛**：配色绿做强调 + 粉只用于一处点睛（见 §7）；全站只允许一处「大胆」。
5. **技术能力可视化**：游戏可玩、博客可互动、小纸条需登录——这些本身就是「会写代码」的佐证，不靠自述。

---

## 4. 信息架构（多页面 + 顶部导览）

顶部固定导览栏，从左至右 5 个入口：

```
简历   游戏   Blog   小纸条   登录
```

| 页面 | 路由 | 内容 | 说明 |
|---|---|---|---|
| 简历页 | `/` | 个人简介、联系方式、项目经历、能力、方法论 | 务实核心页 |
| 游戏页 | `/game` | 打飞机射击小游戏（canvas） | 前端编码能力佐证 |
| Blog 页 | `/blog` | 洞察文章，点赞 + 评论交互 | Supabase 持久化 |
| 小纸条页 | `/notes` | 访客留言/纸条墙 | 需登录使用 |
| 登录页 | `/login` | 登录/注册 | 支撑小纸条（及评论身份） |

- 导览：顶部固定，当前页高亮；移动端折叠为汉堡菜单。
- 路由：多页路由（react-router 或轻量 hash 路由）。

---

## 5. 各页面需求

### 5.1 简历页（Resume，`/`）
- **Hero**：姓名「吴可奕 / Koi」+ 定位语「我是多面手」+ 开放状态（实习/校招，OPEN TO WORK）+ 联系按钮。
  - ⚠️ v1.0 的首屏 4 个硬数据（¥10万 / 71万+ / 500万+ / +10%）**删除**，不再作为首屏元素。
- **个人简介**：2-3 句定位（基于 bio 重写）。
- **联系方式**：邮箱、电话、所在地（上海/厦门）、小红书入口。
- **项目经历**：按 §6 数据源，结果数字置顶，每个项目末尾提炼 1 句「可复用打法」。
- **能力区**：能力 → 佐证（挂真实项目/数字），禁用百分比技能条。
- **方法论区**（可选）：KFS / GEO 六步工作流 / 达人四维复投模型 / 从 0 到 1 归因闭环。
- **数据案例区**（可选）：3 个模拟电商分析案例，显著标注「模拟数据 · 练习」。

### 5.2 游戏页（打飞机，`/game`）
- 一个可玩的飞机射击小游戏（canvas 实现），纯前端、无后端。
- 定位：前端/编码能力佐证；玩法与美术由 UI 阶段定稿（像素风？配色沿用站内绿/粉？）。

### 5.3 Blog 页（`/blog`）
- 放「洞察」文章（运营/增长/AI 方向的思考）。
- 交互：点赞 + 评论。
- 数据存 Supabase（表见 §10）；文章内容由站主（吴可奕）发布。

### 5.4 路过小纸条页（`/notes`）
- 访客留言/纸条墙。
- **需登录使用**：未登录只能看，登录后能留纸条。
- 依赖账号体系（§5.5）。

### 5.5 用户登录页（`/login`）
- 登录/注册；作为小纸条（及 Blog 评论身份）的账号入口。
- 登录后回跳来源页。

---

## 6. 内容清单与数据源

| 数据源 | 内容 | 处理 |
|---|---|---|
| `~/Documents/Obsidian Vault/2026天启灵光/` | 天启灵光实习一手材料（业务闭环故事、GEO 六步工作流、电商 TP 对接、KFS 打法、周会纪要、达人池、品牌号素材） | **新增为简历页项目经历真源** |
| `~/Documents/Obsidian Vault/秋招杂谈/天启灵光实习-业务闭环故事.md` | GEO 项目「洞察→方案→执行→验证→沉淀」完整闭环叙事 | 简历页旗舰项目素材 |
| `~/Documents/Obsidian Vault/秋招杂谈/天启灵光GEO工作流框架.md` | GEO 六阶段 SOP 细节 | 方法论区素材 |
| `homepage/src/data/profile.js` | 旧版基础信息 | 更新 |
| `homepage/src/data/projects.js` | 4 个项目（缺天启灵光细节） | 重写，纳入天启灵光 |
| `homepage/src/data/ecommerceAnalytics.js` | 3 个模拟案例 | 保留，标注「模拟」 |
| `【简历】/吴可奕-通用版_行业运营改写稿.md` | 行业运营版简历 | 数据口径参考 |

**关键事实校准**（从 Obsidian 天启灵光目录）：
- 公司：上海天启灵光科技有限公司（世纪华通间接全资子公司，天游子公司）。
- 产品：AI 录音卡「LYNSE 灵光闪记卡」（硬件 + AI 转写/摘要）。
- 平台：讯灵 AI（GEO + Agent 双引擎）。

**必须修正的数据问题**：
- 芙琳水晶：`+15% 加微 CAC 提升` → 「加微 CAC 优化 15%」（成本下降是正向）。

**待确认数据口径**（投出前逐条核对）：
1. 71万+ 曝光 / 9.1万阅读 / 6700 互动（截至 8-09 口径）是否可对外写；
2. 10 万预算是「总盘子」还是「已执行额」（执行口径 45,773 元）；
3. GEO 250 篇 / 首轮 3-6 篇验证 / 实际分发的表述口径；
4. KFS 3 万预算是「已落地」还是「制定中」（建议写「制定」）；
5. 「补单 / 9 万水分」是否对外（敏感项，建议「识别异常订单约 9 万元」）。

---

## 7. 视觉与字体

- **主字体**：Departure Mono（拉丁字母 / 等宽 / 标题 / 数字 / 代码）。开源，可从 Google Fonts 或 npm（`departure-mono`）引入。
  - ⚠️ Departure Mono 只覆盖拉丁字符，**不含中文**；中文正文需配 CJK 字体（标题可用汇文明朝体方向做点睛，正文用干净黑体），具体由 UI 定稿。
- **配色**：绿色为品牌强调色（数据、标签、按钮、区块标记），粉色仅用于 hero 一处最大标题/签名，作为全站唯一记忆点。
- **底色二选一**（UI 定稿）：A 浅底（米白/浅灰）+ 绿强调 + 粉点睛；B 低饱和复古绿底 + 粉点睛，其余中性。
- **氛围**：干净、克制、留白充足；可沿用「克莱因蓝+米白复古双线框」的秩序感，但主色改绿系。

---

## 8. CLI 终端（去留待定）

- v1.0 曾建议保留 CLI 彩蛋；新页面结构（简历/游戏/Blog/小纸条/登录）**未包含终端**。
- 去留待定：可作为简历页彩蛋保留，或直接移除。见 §13。

---

## 9. 技术要求

- 前端：React 18 + Vite 5（`homepage/` 目录）。
- 多页路由：`react-router-dom` 或轻量 hash 路由。
- 游戏页：canvas 实现，纯前端。
- 后端：**Supabase**（BaaS，已定）。
  - SDK：`@supabase/supabase-js`。
  - 环境变量（Vite 前缀）：`VITE_SUPABASE_URL`、`VITE_SUPABASE_ANON_KEY`。
  - 部署：GitHub Pages 静态托管前端 + Supabase 云端后端分离。
  - ⚠️ 阿里云自建方案已评估并**放弃**：无域名 / ICP 备案，国内节点无法合规对外开 HTTPS 服务；前端仅 GitHub Pages（无自定义域名）。
- 响应式：桌面 + 移动端优先。

---

## 10. Supabase 后端设计（数据模型 + 权限）

### 10.1 认证（Auth）
- 邮箱登录：密码 或 magic link 二选一（UI 阶段定）。
- 预留 OAuth 扩展（GitHub / Google）；微信 OAuth 需企业认证，暂不做。

### 10.2 表结构（public schema）

```sql
-- 用户公开信息（1:1 关联 auth.users）
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  username   text,
  avatar_url text,
  bio        text,
  created_at timestamptz not null default now()
);

-- Blog 文章（站主发布）
create table public.blog_posts (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  slug       text unique not null,
  excerpt    text,
  content    text,                -- markdown
  tags       text[],
  published  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 点赞（一人一赞）
create table public.blog_likes (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.blog_posts(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

-- 评论
create table public.blog_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.blog_posts(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  content    text not null,
  created_at timestamptz not null default now()
);

-- 小纸条（登录后可留）
create table public.notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  content    text not null,
  created_at timestamptz not null default now()
);
```

### 10.3 权限（RLS，全部 enable RLS）

| 表 | select | insert | update | delete |
|---|---|---|---|---|
| profiles | 公开 | — | 本人 | — |
| blog_posts | 公开（仅 `published=true`） | 站主 | 站主 | 站主 |
| blog_likes | 公开 | 登录用户 | — | 本人 |
| blog_comments | 公开 | 登录用户 | — | 本人 |
| notes | 公开（未登录可看） | 登录用户 | — | 本人 |

- 「站主」= 服务账号（service_role 走管理端 / 用固定 admin 邮箱判断）。
- 点赞数/评论数：前端 `select count(*)` 或订阅 realtime，不做触发器维护计数字段（简单优先）。

### 10.4 安全要点
- 前端只放 **anon key**（设计上就应公开）；**service_role key 绝不进前端/仓库**。
- 数据安全靠 RLS 策略，不靠藏 key。

---

## 11. 非目标（本次不做）

- 不做复杂 3D / 长页面视觉特效；
- 不重写简历内容本身（仅搬移 + 口径修正）；
- 不做微信 OAuth（需企业认证）。

---

## 12. 验收标准

- [ ] 顶部导览可切换 5 个页面，当前页高亮；
- [ ] 简历页结果先行、数据可信、无百分比自评；
- [ ] 游戏页可玩（打飞机）；
- [ ] Blog 页可点赞/评论，数据落 Supabase；
- [ ] 小纸条页需登录才能留纸条，未登录可看；
- [ ] 登录页可注册/登录/回跳来源页；
- [ ] 主字体 Departure Mono 生效，中文正文正常渲染；
- [ ] 配色：绿强调 + 粉仅一处点睛；
- [ ] Supabase RLS 生效（匿名只能读，写操作需登录/站主）；
- [ ] 移动端可读；
- [ ] GitHub Pages 部署 workflow 可正常 build 并通过。

---

## 13. 待确认问题（进 UI/开发前定）

1. **CLI 终端去留**：保留为简历页彩蛋，还是移除？
2. **登录方式**：邮箱密码 vs magic link？
3. **定位语**：「我是多面手，用沟通」是否完整？给出最终版。
4. **游戏「打飞机」**：像素风还是其他？是否沿用站内绿/粉配色？
5. §6「待确认数据口径」5 条，逐条给结论。
6. **Supabase 项目**：需要你提供/创建 Supabase 项目（URL + anon key），或授权我用 Supabase CLI 初始化——搭建前对齐账号。
