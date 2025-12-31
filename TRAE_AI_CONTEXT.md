# Trae AI 对话上下文管理

## 📋 当前项目进展状态

### 基本信息
- 项目名称：Azure Performance Monitor
- 开发平台：Trae AI
- 当前功能状态：已完成 90%
- 最后工作时间：202X年X月X日

---

## 📝 已完成功能

### 后端服务
- Express API 服务 (端口 3000)
- 完整的 Azure 资源管理 API
- FinOps 工具集成 (优化建议、成本预测、节省摘要)
- 健康检查和基础路由结构

### 前端应用
- React 18 + Ant Design 框架
- 侧边导航菜单 (6个核心功能模块)
- ECharts 数据可视化
- React Router 6 路由配置

### 已修复的问题
- Ant Design Menu 组件弃用警告（已用 items 属性替换 children）
- React findDOMNode 弃用警告（未发现）

---

## 🚧 需要继续开发的功能

### 短期任务 (本周完成)
1. FinOps 工具 "应用建议" 按钮点击处理
2. 性能监控告警配置功能
3. Azure 连接设置保存功能
4. 前端和后端单元测试

### 中期任务 (本月完成)
1. 集成真实 Azure SDK
2. 添加用户身份验证
3. 生产构建配置
4. 代码重构和性能优化

---

## 🔧 开发环境配置

### 后端服务启动
```bash
cd backend
npm install
npm run dev
```
- 服务运行于: http://localhost:3000

### 前端服务启动
```bash
cd frontend
npm install
npm run dev
```
- 服务运行于: http://localhost:5173

---

## 📁 项目文件结构

```
AzurePerformanceMonitor/
├── README.md             # 项目说明
├── backend/              # Node.js 后端服务
├── frontend/             # React 前端应用
├── docs/                 # 文档目录
│   └── 项目详细说明书.md  # 完整项目文档
├── finops-toolkit/       # 子模块：FinOps 工具包
├── TRAE_AI_CONTEXT.md    # 此文件
└── 自动化思路.txt         # 开发思路记录
```

---

## 📌 关键提醒
- 需要在新设备上克隆 GitHub 仓库
- 安装所有依赖包（npm install）
- 启动前后端服务
- 可以将此文件内容复制粘贴到新 Trae AI 对话中，快速恢复上下文

---

## 🔄 切换设备时的对话恢复步骤
1. 在新设备的 Trae AI 中粘贴此文件内容
2. 提供项目根目录路径
3. 确认前后端服务运行状态
4. 继续开发后续功能
