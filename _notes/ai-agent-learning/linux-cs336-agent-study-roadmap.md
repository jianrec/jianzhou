---
layout: post
title: "Linux、CS336 与 Agent 路线系统学习资料"
date: 2026-04-30
author: "周健"
main_category: "学习资料"
discipline: "AI"
course: "系统学习 Linux、CS336 与 Agent"
material_type: "学习路线"
---

> 这份资料用于长期系统学习 Linux、语言模型基础和 Agent 工程实践。后续可以继续追加课程、项目和阶段复盘。

## 资料来源

- Linux 101：<https://101.lug.ustc.edu.cn/>
- CS336: Language Modeling from Scratch：<https://cs336.stanford.edu/>
- Agent 路线：<https://www.yuque.com/wushixiaoxianxianxian/wniu8z/vnvmiev8uiuwndye?singleDoc=agent>

说明：Linux 101 与 CS336 官网已能访问。语雀 Agent 路线当前无法直接读取正文，后续需要补充页面文本、截图、导出 PDF/Markdown，或提供可访问权限。

## 总体目标

这份资料面向长期系统学习，不追求快速刷完，而是把 Linux 工程基础、语言模型从零实现、Agent 应用路线连成一条实践链：

1. 用 Linux 建立稳定的开发、调试、部署和运维能力。
2. 用 CS336 建立语言模型底层实现能力，包括 tokenizer、Transformer、训练、系统优化、数据、评测和对齐。
3. 用 Agent 路线把模型能力落到实际应用，包括工具调用、RAG、记忆、工作流、评测和部署。

最终输出物建议是三个项目：

1. 一个可长期使用的 Linux 开发环境与个人命令手册。
2. 一个最小但完整的语言模型训练代码库。
3. 一个能调用工具、检索资料、保存上下文并可评测的 Agent 原型。

## 学习路线总览

```text
Linux 基础
  -> Shell / 文件系统 / 权限 / 进程 / 网络 / Docker
  -> 稳定开发环境、脚本自动化、服务器部署

CS336
  -> tokenizer / Transformer / optimizer
  -> GPU profiling / Triton / distributed training
  -> scaling law / data pipeline / evaluation / alignment

Agent
  -> prompt / tool use / function calling
  -> RAG / memory / planning / multi-agent workflow
  -> evaluation / observability / deployment / safety
```

三条线不要完全串行学习。推荐顺序是：

1. 先用 2 到 3 周打 Linux 基础。
2. 之后 Linux 作为日常环境继续练，主线转向 CS336。
3. 学到 CS336 的模型、数据和评测后，再系统进入 Agent。

## 第一部分：Linux 101

Linux 101 的定位是零基础到实用入门。官方讲义的正文包含 9 章，覆盖 Linux 文化与生态、安装、个性化配置、软件安装、文件操作、进程、服务、例行任务、用户与权限、网络、文本处理、Shell 脚本、Linux 编程、Docker、正则表达式等内容。

### 阶段 1：系统与命令行入门

学习内容：

- Linux 的历史、发行版、开源社区文化。
- 安装 Linux 或 WSL。
- 命令行基本操作：`pwd`、`ls`、`cd`、`cp`、`mv`、`rm`、`mkdir`、`touch`。
- 手册与帮助：`man`、`--help`、发行版文档。

必须掌握：

- 能独立进入终端并完成目录切换、文件创建、复制、移动和删除。
- 能用 `man` 查命令含义，而不是只靠搜索。
- 能解释路径、根目录、家目录、相对路径和绝对路径。

练习任务：

1. 在 Linux 环境下建立一个 `workspace` 目录，里面包含 `notes`、`scripts`、`projects` 三个子目录。
2. 写一份自己的常用命令表，每个命令至少包含用途、常用参数和一个例子。
3. 用 `man ls`、`man grep`、`man find` 各查一次参数，并记录最常用的 3 个参数。

### 阶段 2：软件安装、文件系统与权限

学习内容：

- 包管理器：`apt`、`dnf`、`pacman`、`brew` 的基本思想。
- 文件系统层次结构：`/bin`、`/etc`、`/home`、`/usr`、`/var`、`/tmp`。
- 用户、用户组与权限：`chmod`、`chown`、`umask`。
- 常用压缩与归档：`tar`、`zip`、`gzip`。

必须掌握：

- 能安装、升级、卸载常用软件。
- 能读懂 `ls -l` 输出里的权限、所有者、用户组、大小和修改时间。
- 能解释为什么脚本需要可执行权限。

练习任务：

1. 安装 `git`、`curl`、`vim` 或 `neovim`、`htop`、`tmux`。
2. 创建一个脚本文件，给它添加执行权限，并通过 `./script.sh` 运行。
3. 分别设置 `644`、`755` 权限，观察文件可读、可写、可执行状态。

### 阶段 3：进程、服务与任务管理

学习内容：

- 进程查看：`ps`、`top`、`htop`、`pgrep`。
- 前后台任务：`&`、`jobs`、`fg`、`bg`、`nohup`。
- 服务管理：`systemctl`。
- 定时任务：`cron`。

必须掌握：

- 能找到一个正在运行的进程并终止它。
- 能让长任务在后台继续运行。
- 能理解服务、守护进程、普通进程的区别。

练习任务：

1. 用 `sleep 300 &` 创建后台任务，再用 `jobs`、`fg`、`kill` 管理它。
2. 查看本机正在运行的服务，记录 3 个你能解释用途的服务。
3. 写一个每分钟输出时间到日志文件的 cron 任务。

### 阶段 4：网络、文本处理与 Shell 脚本

学习内容：

- 网络诊断：`ping`、`curl`、`wget`、`ss`、`ip`。
- 文本处理：`cat`、`less`、`head`、`tail`、`grep`、`sed`、`awk`、`sort`、`uniq`、`wc`。
- 管道与重定向：`|`、`>`、`>>`、`2>`。
- Shell 脚本：变量、条件、循环、函数。
- 正则表达式。

必须掌握：

- 能用管道组合多个命令解决实际问题。
- 能写 20 到 50 行以内的自动化脚本。
- 能用 `grep` 和正则表达式查日志。

练习任务：

1. 下载一个网页，统计里面出现频率最高的 20 个英文单词。
2. 写一个脚本，自动备份指定目录到 `backup-YYYY-MM-DD.tar.gz`。
3. 从日志文件中筛选错误行，按错误类型统计数量。

### 阶段 5：开发环境与 Docker

学习内容：

- Linux 下的 C++ / Python 开发。
- Git 基础工作流。
- SSH 与远程服务器。
- Docker 镜像、容器、卷、网络。

必须掌握：

- 能在 Linux 下配置 Python 虚拟环境。
- 能用 Git 管理自己的学习代码。
- 能运行一个 Docker 容器，并知道容器和虚拟机的区别。

练习任务：

1. 建立一个 Python 项目，使用虚拟环境安装依赖并运行脚本。
2. 用 Docker 启动一个 nginx 或 Python 服务。
3. 写一份“我的 Linux 开发环境初始化清单”。

## 第二部分：CS336 语言模型从零实现

CS336 是实现密集型课程，官网明确要求 Python、PyTorch、深度学习、系统优化、线性代数、概率统计和机器学习基础。课程不是只讲概念，而是从 tokenizer、Transformer、优化器、训练系统、数据管线、评测到对齐，完整走一遍语言模型构建过程。

### 预备知识清单

Python：

- 熟悉函数、类、模块、类型标注、虚拟环境。
- 能独立阅读中等规模 Python 项目。
- 能写测试和调试性能问题。

PyTorch：

- 理解 tensor、autograd、`nn.Module`、optimizer、dataloader。
- 能手写训练循环。
- 能区分 CPU、GPU、显存、batch size、gradient accumulation。

数学：

- 矩阵乘法、向量化、范数、softmax。
- 概率、期望、方差、交叉熵。
- 基础优化：SGD、Adam、学习率、梯度。

系统：

- 内存层级、吞吐、延迟。
- GPU 基本概念。
- profiling、benchmark、分布式训练的基本动机。

### Assignment 1：Basics

目标：

- 实现 tokenizer、模型架构和 optimizer。
- 训练一个最小语言模型。

学习重点：

- BPE 或其他 tokenizer 的基本思想。
- Transformer block：embedding、attention、MLP、residual、layer norm。
- causal language modeling 的训练目标。
- loss、perplexity、训练曲线。

建议输出物：

- `tokenizer.py`
- `model.py`
- `optimizer.py`
- `train.py`
- 一份训练日志，记录 loss 下降情况和失败原因。

自测问题：

1. 为什么语言模型训练时要做 causal mask？
2. tokenization 会怎样影响模型的上下文长度和训练效率？
3. 如果 loss 不下降，优先检查哪些位置？

### Assignment 2：Systems

目标：

- profile 和 benchmark Assignment 1 的模型与层。
- 用 Triton 实现或理解 FlashAttention2 相关优化。
- 构建更省显存、可分布式的训练代码。

学习重点：

- FLOPs、memory bandwidth、arithmetic intensity。
- attention 的显存瓶颈。
- activation checkpointing。
- data parallel、tensor parallel、pipeline parallel 的区别。

建议输出物：

- 一份 benchmark 表格，包含 batch size、sequence length、tokens/s、显存占用。
- 一份 profiling 报告，说明主要瓶颈在哪里。
- 一个最小的分布式训练 demo。

自测问题：

1. 为什么 attention 容易成为长上下文训练瓶颈？
2. FlashAttention 的核心收益是什么？
3. 提升 batch size 为什么可能让吞吐提高，也可能导致显存爆炸？

### Assignment 3：Scaling

目标：

- 理解 Transformer 组件对性能的影响。
- 拟合 scaling law，用于预测不同模型规模和数据规模下的效果。

学习重点：

- 参数量、数据量、计算量之间的关系。
- under-training 与 over-training。
- loss 预测和资源分配。

建议输出物：

- 一份 scaling experiment 记录。
- 一张 loss vs compute 或 loss vs tokens 的图。
- 一段解释：在固定预算下如何选择模型大小和训练 token 数。

### Assignment 4：Data

目标：

- 将 Common Crawl 等原始数据转成可训练语料。
- 做过滤、去重和数据质量改进。

学习重点：

- 数据清洗、语言识别、质量过滤。
- deduplication。
- data mixture。
- 数据质量对模型表现的影响。

建议输出物：

- 一个数据处理 pipeline。
- 一份过滤规则说明。
- 一份清洗前后样例对比。

### Assignment 5：Alignment and Reasoning RL

目标：

- 用 SFT 和 RL 训练模型解决数学推理问题。
- 可选学习 DPO 等安全对齐方法。

学习重点：

- SFT、RLHF、DPO、reward model 的关系。
- reasoning 数据和普通指令数据的差异。
- 评测任务与过拟合风险。

建议输出物：

- 一个小规模 SFT 实验。
- 一个 reasoning benchmark 结果表。
- 一份对齐方法对比笔记。

## 第三部分：Agent 路线

当前语雀原文未读取到，因此这里先给出通用 Agent 学习骨架，后续以你提供的语雀内容为准做合并。

### 补充项目：learn-claude-code

项目地址：<https://github.com/shareAI-lab/learn-claude-code>

这个项目的主题是 Agent Harness Engineering。它用 12 个递进课程，从一个最小 agent loop 开始，逐步加入工具调用、规划、子 agent、按需加载知识、上下文压缩、任务系统、后台任务、多 agent 团队、团队通信协议、自主认领任务和 worktree 隔离。

它的核心观点是：

- Agent 的智能来自模型本身。
- 工程师主要构建的是 harness，也就是让模型能在现实环境中观察、调用工具、读写文件、执行命令、管理上下文和接受权限约束的运行环境。
- Claude Code 是一个适合学习的样本，因为它把重点放在工具、知识、上下文、任务、权限和工作区隔离上，而不是用复杂流程替模型做决策。

适合放在 Agent 路线的中段学习。前置要求是：

- 能使用 Python。
- 理解 Linux 命令行和 Shell。
- 理解 LLM API 的 messages、system prompt、tool use / function calling。
- 最好已经完成 Linux 101 的命令行、文件系统、进程、Shell 脚本部分。

推荐学习方式：

1. 先只读 `README-zh.md`，不要急着跑全量代码，先理解“模型 + harness”的分工。
2. 按 `s01` 到 `s12` 顺序学习，每次只关注新增的一个机制。
3. 每学一节，先读 `docs/zh/` 对应文档，再读 `agents/` 对应 Python 文件。
4. 每节都做一个小改造，而不是只运行示例。
5. 学完后用 `s_full.py` 做总复盘，画出完整架构图。

建议按下面 4 个阶段学习：

| 阶段 | 内容 | 目标 |
| --- | --- | --- |
| 1 | `s01`、`s02` | 理解 agent loop 与 tool dispatch |
| 2 | `s03` 到 `s06` | 理解规划、子 agent、技能加载、上下文压缩 |
| 3 | `s07`、`s08` | 理解任务持久化和后台执行 |
| 4 | `s09` 到 `s12` | 理解多 agent 协作、协议、自主认领和 worktree 隔离 |

每节学习记录模板：

```markdown
## 本节机制

## 它解决的问题

## 新增了哪些工具或数据结构

## agent loop 有没有变化

## 和 Claude Code 的对应关系

## 我做的小改造

## 可以迁移到自己 Agent 项目的地方
```

建议练习：

1. `s01`：把 bash 工具改成只允许执行白名单命令。
2. `s02`：新增 `read_file` 和 `write_file` 工具。
3. `s03`：让 agent 在动手前必须生成 todo list。
4. `s05`：写一个自己的 `SKILL.md`，让 agent 按需加载。
5. `s06`：比较压缩前后上下文里保留了哪些信息。
6. `s07`：把学习计划拆成任务图并持久化到文件。
7. `s09` 到 `s12`：模拟两个 agent 并行整理 Linux 和 CS336 笔记。

### 补充项目：ARIS

项目地址：<https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep>

中文 README：<https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/blob/main/README_CN.md>

ARIS，全名 Auto-Research-In-Sleep，是一套面向机器学习科研的 Agent skills / workflow 集合。它的目标不是教你从零实现 agent loop，而是把 Claude Code、Codex CLI、Cursor、Trae、Antigravity 等 agent 工具组织成“自动科研流水线”。

它的核心思想是：

- 用 Markdown skills 描述工作流，而不是绑定某个框架、数据库或平台。
- 执行模型负责读文件、写代码、跑实验、收集结果。
- 审稿模型负责打分、找弱点、提出修复建议。
- 通过跨模型协作避免单模型自我审稿的盲区。

ARIS 可以做的事情包括：

- `/research-pipeline`：从研究方向、参考论文或 base repo 出发，做文献、找弱点、生成改进方案、跑实验、写论文。
- `/rebuttal`：根据论文和审稿意见生成 rebuttal 策略与可粘贴版本。
- `/paper-slides`、`/paper-poster`：从论文生成 slides、poster、讲稿和 Q&A 预案。
- `/experiment-queue`：调度多 seed、多配置、大规模实验。
- `/experiment-audit`、`/result-to-claim`、`/paper-claim-audit`、`/citation-audit`：检查实验、结果、论文 claim 和引用是否诚实一致。
- `/research-wiki`：沉淀论文、idea、实验、claim 和失败经验，形成长期研究记忆。

它和 `learn-claude-code` 的关系：

| 项目 | 定位 | 应该学什么 |
| --- | --- | --- |
| `learn-claude-code` | Agent harness 原理课 | agent loop、工具、上下文、任务、多 agent、隔离 |
| `ARIS` | 科研 agent workflow 案例库 | 如何把 agent 用到文献、实验、审稿、论文写作与科研项目管理 |

学习顺序建议：

1. 先完成 `learn-claude-code` 的 `s01` 到 `s06`，至少理解工具调用、skills、子 agent、上下文压缩。
2. 读 ARIS 的 README_CN，只看“项目定位、基础命令、工作流、安装方式”，先不要急着跑完整科研流水线。
3. 打开 `skills/` 目录，选 3 个 skill 精读：`research-pipeline`、`experiment-audit`、`paper-write` 或类似核心 skill。
4. 把每个 skill 当作“Agent 工作说明书”学习：它要求什么输入、分几个 phase、调用什么工具、在哪里设置人工检查点、如何防止幻觉。
5. 用一个低风险主题做 dry run，例如“整理一篇论文的 related work 和弱点”，不要一开始就让它跑 GPU 实验或改真实论文。
6. 等理解工作流后，再接入自己的 CS336 或 ML 小项目，尝试让它做实验计划、结果检查和论文式总结。

前置要求：

- 熟悉 Linux、Git、Shell、Python 项目结构。
- 理解 Claude Code / Codex CLI 这类 coding agent 的基本使用方式。
- 能读懂 Markdown skill 文件。
- 如果要跑实验，需要了解 conda/uv、PyTorch、GPU、SSH、screen/tmux、实验日志管理。
- 如果要用论文写作流，需要了解 LaTeX、BibTeX、arXiv/DBLP/CrossRef、会议模板。

建议学习阶段：

| 阶段 | 学习内容 | 目标 |
| --- | --- | --- |
| 1 | README_CN + 项目结构 | 知道 ARIS 是方法论和 skill 集，不是单一平台 |
| 2 | 安装和 skill 发现机制 | 理解 `.claude/skills`、`.agents/skills`、项目级 symlink、manifest |
| 3 | 核心工作流阅读 | 读懂 research、experiment、paper、review 相关 skill |
| 4 | 小任务 dry run | 只做文献整理、idea critique、论文 claim 检查 |
| 5 | 接入真实项目 | 对自己的实验做计划、队列、审计和结果转 claim |
| 6 | 方法论复盘 | 总结哪些流程可复用到自己的长期科研系统 |

注意事项：

- 不要把它当作“睡一觉自动发论文”的魔法工具。更合理的定位是科研流程自动化与审稿压力测试工具。
- 需要保留 human checkpoint，尤其是在花 GPU 预算、改论文主结论、生成 rebuttal、push 到 Overleaf 或提交前。
- 审稿模型打分只能作为诊断信号，不能替代真实同行评审。
- 对实验结果、claim、引用、定理证明必须保留可追溯证据。

建议练习：

1. 阅读 `README_CN.md`，画出 ARIS 的“执行者模型 -> 审稿者模型 -> 修复循环”图。
2. 选一个 skill，提取它的输入、阶段、输出、失败处理和人工检查点。
3. 用一篇已读论文运行“人工版 ARIS”：自己完成文献总结、弱点列表、实验建议、claim audit，不调用 API。
4. 选一个 CS336 小实验，设计 `EXPERIMENT_PLAN.md`，包含假设、配置、指标、预算和失败标准。
5. 写一个自己的轻量 skill，例如 `linux-study-review/SKILL.md`，让 agent 检查 Linux 学习笔记是否有命令、例子和练习。

### 阶段 1：Agent 基础概念

学习内容：

- LLM、prompt、system prompt、上下文窗口。
- tool use / function calling。
- structured output。
- planning 与反思。

必须掌握：

- 能解释“普通聊天机器人”和“Agent”的区别。
- 能设计一个工具 schema。
- 能让模型稳定输出 JSON 或结构化结果。

练习任务：

1. 写一个能调用计算器工具的 Agent。
2. 写一个能读取本地 Markdown 文件并回答问题的 Agent。
3. 为 Agent 设计失败重试机制。

### 阶段 2：RAG 与知识库

学习内容：

- 文档切分、embedding、向量检索。
- rerank。
- citation。
- 检索评测。

必须掌握：

- 能把一批学习资料转成可检索知识库。
- 能区分“模型记忆”与“外部检索”。
- 能用引用约束减少幻觉。

练习任务：

1. 把 Linux 101 的章节笔记整理成一个小型知识库。
2. 写 20 个问题测试 RAG 是否能正确引用来源。
3. 比较不同 chunk size 对回答质量的影响。

### 阶段 3：Memory、Workflow 与多工具协作

学习内容：

- short-term memory 与 long-term memory。
- workflow graph。
- 多工具调用。
- human-in-the-loop。

必须掌握：

- 能设计一个可恢复的 Agent 状态。
- 能让 Agent 分步骤执行任务，而不是一次性生成答案。
- 能记录工具调用日志，方便复盘错误。

练习任务：

1. 做一个“学习计划 Agent”：输入课程和目标，输出周计划、每日任务和复盘问题。
2. 做一个“资料整理 Agent”：输入链接或文本，输出摘要、关键词、前置知识和练习题。
3. 做一个“代码学习 Agent”：读取项目文件，解释模块结构并生成学习路径。

### 阶段 4：评测、部署与安全

学习内容：

- Agent eval：任务成功率、步骤数、工具错误率、引用正确率。
- tracing 与 observability。
- 成本、延迟和缓存。
- prompt injection、防越权、敏感信息保护。

必须掌握：

- 能为 Agent 写一组固定测试任务。
- 能记录每次调用的输入、输出、工具调用和错误。
- 能识别 RAG 场景下的 prompt injection 风险。

练习任务：

1. 给自己的 Agent 建立 30 条 eval case。
2. 记录 10 次失败案例，分析失败原因。
3. 写一份 Agent 安全清单。

## 建议学习节奏

### 第 1 到 3 周：Linux 基础

目标：

- 完成 Linux 101 第 1 到 5 章。
- 建立 Linux 或 WSL 环境。
- 完成命令行、文件系统、权限、进程练习。

每周输出：

- 1 篇学习笔记。
- 1 份命令速查表。
- 1 个脚本练习。

### 第 4 到 6 周：Shell、网络、Docker

目标：

- 完成 Linux 101 第 6 到 9 章。
- 能写自动化脚本。
- 能用 Docker 跑一个服务。

每周输出：

- 1 个脚本项目。
- 1 份网络/日志排查笔记。
- 1 份 Docker 操作记录。

### 第 7 到 12 周：CS336 Basics + Systems

目标：

- 完成 tokenizer、Transformer、optimizer 和最小训练循环。
- 学会 profile 和 benchmark。
- 理解 GPU 训练的主要瓶颈。

每周输出：

- 代码提交记录。
- 实验日志。
- 错误复盘。

### 第 13 到 16 周：CS336 Data + Alignment

目标：

- 搭建数据清洗 pipeline。
- 学习评测、SFT、DPO/RL 基础。
- 形成完整语言模型训练流程的理解。

每周输出：

- 数据处理报告。
- 评测结果表。
- 方法对比笔记。

### 第 17 周以后：Agent 项目

目标：

- 做一个个人学习资料 Agent。
- 支持资料导入、摘要、检索、问答、复盘题生成。
- 建立 eval 和调用日志。

项目验收标准：

- 能读取自己的 Linux 与 CS336 笔记。
- 回答时能引用来源。
- 能生成下一周学习计划。
- 有一组固定测试题评估效果。

## 学习笔记模板

每学完一节，用同一模板沉淀：

```markdown
## 本节主题

## 核心概念

## 我能复述的内容

## 命令 / 公式 / API

## 做过的练习

## 遇到的问题

## 错误原因

## 下次复习问题
```

## 每周复盘问题

1. 这周真正掌握了哪 3 个概念？
2. 哪个概念只是看懂了，但还不会用？
3. 哪个练习失败了？失败原因是知识缺口、环境问题，还是粗心？
4. 下周最应该补哪一个前置知识？
5. 是否有一个可展示的输出物？

## 待补充

- 语雀 Agent 路线原文内容。
- CS336 每讲 lecture notes 的逐讲笔记。
- Linux 101 每章思考题答案整理。
- 最终发布形式：正式博客页面、PDF、Markdown 仓库或知识库导入文件。
