# Azure Performance Monitor - Azure云资源自动化管理平台

一个功能完整的前后端分离 Azure 云资源自动化管理平台，用于监控、管理和优化 Azure 云资源，集成了完整的 FinOps (云财务管理) 工具。

---

## 📊 项目概览

Azure Performance Monitor 是一个专为 Azure 云环境设计的综合管理平台，提供资源监控、性能分析、成本优化和自动化管理等功能。通过可视化仪表板和智能分析，帮助用户全面掌控 Azure 云资源的使用情况和成本。

---

## 📁 项目架构

```
AzurePerformanceMonitor/
├── frontend/           # React + TypeScript 前端应用
├── backend/            # Node.js + TypeScript 后端服务
├── finops-toolkit/     # FinOps 工具包（官方资源）
├── config/             # 配置文件
├── docs/               # 文档资料
├── scripts/            # 部署和管理脚本
├── shared/             # 共享代码
├── tests/              # 测试文件
├── README.md           # 项目说明
├── 跨设备开发指南.md     # 跨设备开发和 GitHub 同步
├── TRAE_AI_CONTEXT.md  # Trae AI 对话上下文
└── 自动化思路.txt       # 开发思路记录
```

---

## 🛠️ 技术栈

### 前端
- React 18
- TypeScript
- Ant Design (UI 组件库)
- ECharts (数据可视化)
- React Router (路由管理)
- Vite (构建工具)

### 后端
- Node.js
- Express.js
- TypeScript
- Azure SDK for JavaScript
- PostgreSQL
- InfluxDB

---

## 🚀 核心功能

### 1. 系统管理
- 用户管理
- 角色权限控制
- Azure 配置管理
- 系统设置

### 2. 资源管理
- Azure 虚拟机器管理
- 可用 SKU 信息
- 资源分组和标签
- 资源状态监控

### 3. 监控分析
- 性能指标采集 (5分钟粒度)
- 自定义监控规则
- 阈值告警
- 告警通知

### 4. 成本管理 (FinOps)
- **成本分析**：实时查看资源成本
- **优化建议**：智能推荐资源调整方案
- **成本预测**：未来 6 个月成本趋势预测
- **节省摘要**：节省机会和分布分析

### 5. 可视化
- 仪表板
- 性能趋势图
- 费用分析报表
- 资源利用率统计

### 6. 通知系统
- 企业微信集成
- 代码推送自动通知
- 自定义消息模板
- 实时状态更新

---

## ⚡ 快速开始

### 开发环境要求
- Node.js 18+
- npm 或 yarn
- PostgreSQL 14+ (可选，当前使用模拟数据)
- InfluxDB 2.x (可选)

### 📦 安装和启动

#### 1. 后端服务
```bash
cd backend
npm install
# 使用模拟数据，无需 Azure 配置
npm run dev
```

后端服务将运行在: `http://localhost:3000`

#### 2. 前端应用
```bash
cd frontend
npm install
npm run dev
```

前端应用将运行在: `http://localhost:5173`

---

## 📖 使用指南

### 🌐 访问应用

启动服务后，在浏览器中访问: `http://localhost:5173`

### 📱 主要功能菜单

1. **仪表板** - 系统概览和关键指标
2. **Azure 资源** - 管理和监控 Azure 资源
3. **性能监控** - 资源性能指标和趋势
4. **成本分析** - 资源成本分析
5. **FinOps 工具** - 成本优化和管理
6. **系统设置** - 用户和系统配置

### 💰 使用 FinOps 工具

1. 在左侧导航栏点击「FinOps 工具」
2. 在打开的页面中，您将看到三个标签页：
   
   **a. 概览**
   - 显示未来 6 个月的成本预测趋势图
   - 关键指标：预估成本、总资源、优化建议数量
   
   **b. 优化建议**
   - 显示所有资源优化机会
   - 包括：预留实例购买、资源调整大小、关闭闲置资源等
   - 每个建议包含：资源 ID、推荐操作、预期节省金额等
   
   **c. 节省摘要**
   - 显示按资源组分类的节省摘要
   - 使用饼图可视化节省分布
   - 显示预计总节省金额

### 📧 企业微信通知

企业微信通知功能用于在代码推送或系统重要事件时自动发送通知到企业微信群。详细配置和使用方法请参考：
- `docs/企业微信通知使用指南.md`

---

## 🧪 测试

### API 端点测试

#### 1. 健康检查
```bash
curl http://localhost:5173/api/v1/health
```

#### 2. 虚拟机器列表
```bash
curl http://localhost:5173/api/v1/azure/virtual-machines
```

#### 3. FinOps 成本预测
```bash
curl http://localhost:5173/api/v1/azure/finops/cost-forecast
```

#### 4. FinOps 优化建议
```bash
curl http://localhost:5173/api/v1/azure/finops/optimization-recommendations
```

#### 5. FinOps 节省摘要
```bash
curl http://localhost:5173/api/v1/azure/finops/savings-summary
```

---

## 🔧 开发

### 添加新功能

1. 后端：在 `backend/src/controllers/` 中添加新的控制器
2. 前端：在 `frontend/src/components/` 中添加新的组件
3. 更新路由配置：`backend/src/routes/v1.ts` 和 `frontend/src/main.tsx`

### 构建生产版本

```bash
# 构建前端
cd frontend
npm run build

# 构建后端
cd backend
npm run build
```

---

## 📋 项目路线图

### 已完成
- ✅ 系统基础架构
- ✅ 虚拟机器管理
- ✅ 成本分析
- ✅ FinOps 工具集成
- ✅ 模拟数据支持

### 计划中
- 📝 真实 Azure 连接
- 📝 数据库集成
- 📝 监控告警
- 📝 资源变更审批
- 📝 机器学习优化建议

---

## 📝 待办事项

### 已完成
- ✅ 系统基础架构搭建
- ✅ 虚拟机器管理功能
- ✅ 成本分析和 FinOps 工具集成
- ✅ 完整的前后端构建
- ✅ 项目上传到 GitHub

### 下一步需要做
- 📝 **集成真实 Azure API**: 将模拟数据替换为真实的 Azure SDK 调用
- 📝 **添加单元测试**: 为前后端关键功能编写测试用例
- 📝 **生产环境部署配置**: 配置 Docker、CI/CD 等部署工具
- 📝 **数据库集成**: 连接 PostgreSQL 和 InfluxDB 存储真实数据
- 📝 **监控告警功能**: 实现性能阈值告警和通知
- 📝 **资源变更审批流**: 添加资源操作的审批机制
- 📝 **机器学习优化建议**: 集成 AI 模型提供更智能的成本优化建议
- 📝 **企业微信通知集成**: 完成企业微信通知功能的全面集成和测试

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License