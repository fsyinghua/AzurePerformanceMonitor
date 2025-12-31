#!/usr/bin/env node

// 用于在 GitHub Actions 中发送企业微信通知的脚本
const https = require('https');

// 获取环境变量
const webhookUrl = process.env.WECOM_WEBHOOK_URL;

if (!webhookUrl) {
  console.error('错误：未找到 WECOM_WEBHOOK_URL 环境变量');
  process.exit(1);
}

// 解析命令行参数
const [, , actionType = 'push'] = process.argv;

// 构建不同类型的通知消息
let message;
if (actionType === 'pull_request') {
  const repo = process.env.GITHUB_REPOSITORY || '未知仓库';
  const branch = process.env.GITHUB_REF_NAME || '未知分支';
  const actor = process.env.GITHUB_ACTOR || '未知用户';
  const prNumber = process.env.PR_NUMBER || '';
  const prTitle = process.env.PR_TITLE || '';
  
  message = {
    msgtype: 'markdown',
    markdown: {
      content: `📝 **Pull Request 通知**\n\n**仓库**: ${repo}\n**分支**: ${branch}\n**PR 号**: #${prNumber}\n**PR 标题**: ${prTitle}\n**提交者**: ${actor}\n\n新的 Pull Request 已创建！`
    }
  };
} else {
  // 默认是 push 通知
  const repo = process.env.GITHUB_REPOSITORY || '未知仓库';
  const branch = process.env.GITHUB_REF_NAME || '未知分支';
  const actor = process.env.GITHUB_ACTOR || '未知用户';
  const sha = process.env.GITHUB_SHA || '';
  const shortSha = sha.substring(0, 7);
  
  message = {
    msgtype: 'markdown',
    markdown: {
      content: `🚀 **代码推送通知**\n\n**仓库**: ${repo}\n**分支**: ${branch}\n**提交 ID**: \`${shortSha}\`\n**提交者**: ${actor}\n\n代码已成功推送并构建！`
    }
  };
}

// 转换为 JSON
const postData = JSON.stringify(message);

// 解析 Webhook URL
const url = new URL(webhookUrl);

// 配置 HTTPS 请求
const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

console.log('准备发送企业微信通知...');
console.log('Webhook URL:', webhookUrl.replace(/key=.*$/, 'key=***')); // 隐藏密钥
console.log('消息内容:', postData);

// 发送请求
const req = https.request(options, (res) => {
  console.log(`响应状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  
  let responseData = '';
  
  res.on('data', (d) => {
    responseData += d;
  });
  
  res.on('end', () => {
    console.log('响应体:', responseData);
    console.log('企业微信通知发送完成');
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('发送企业微信通知时出错:', error);
  process.exit(1);
});

// 写入数据
req.write(postData);
req.end();