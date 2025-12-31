#!/usr/bin/env node

// 企业微信通知发送脚本 - 在 GitHub Actions 环境中使用

// 获取环境变量
const webhookUrl = process.env.WECOM_WEBHOOK_URL;
const eventType = process.argv[2] || 'push';

// 验证必需参数
if (!webhookUrl) {
    console.error('❌ 缺少环境变量: WECOM_WEBHOOK_URL 未设置');
    process.exit(1);
}

console.log(`🚀 开始发送企业微信通知...`);
console.log(`📌 事件类型: ${eventType}`);
console.log(`🔗 Webhook URL: ${webhookUrl}`);

// 构建不同类型的通知消息
function buildMessage() {
    let content = '';
    
    if (eventType === 'pull_request') {
        const prNumber = process.env.PR_NUMBER;
        const prTitle = process.env.PR_TITLE || 'Pull Request';
        const repo = process.env.GITHUB_REPOSITORY;
        const actor = process.env.GITHUB_ACTOR;
        const branch = process.env.GITHUB_REF_NAME;
        
        content = `📋 **Pull Request 通知**\n\n` +
                 `📝 标题: ${prTitle}\n` +
                 `#️⃣ 编号: #${prNumber}\n` +
                 `📁 仓库: ${repo}\n` +
                 `🌿 分支: ${branch}\n` +
                 `👤 作者: ${actor}\n\n` +
                 `🔗 [查看 Pull Request](https://github.com/${repo}/pull/${prNumber})`;
    } else {
        // 默认处理 push 事件
        const repo = process.env.GITHUB_REPOSITORY;
        const actor = process.env.GITHUB_ACTOR;
        const branch = process.env.GITHUB_REF_NAME;
        const sha = process.env.GITHUB_SHA;
        
        content = `📊 **代码推送通知**\n\n` +
                 `📁 仓库: ${repo}\n` +
                 `🌿 分支: ${branch}\n` +
                 `👤 推送者: ${actor}\n` +
                 `📄 提交 SHA: ${sha?.substring(0, 7)}\n\n` +
                 `🔗 [查看提交](https://github.com/${repo}/commit/${sha})`;
    }
    
    return {
        msgtype: 'markdown',
        markdown: {
            content: content
        }
    };
}

// 发送 HTTP 请求到企业微信 Webhook
const https = require('https');
const url = require('url');

const message = buildMessage();
const postData = JSON.stringify(message);
const parsedUrl = url.parse(webhookUrl);

const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log(`📤 发送的消息: ${JSON.stringify(message, null, 2)}`);
console.log(`📊 请求选项: ${JSON.stringify(options, null, 2)}`);

const req = https.request(options, (res) => {
    console.log(`✅ 响应状态码: ${res.statusCode}`);
    console.log(`📋 响应头: ${JSON.stringify(res.headers, null, 2)}`);
    
    let responseData = '';
    
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    
    res.on('end', () => {
        console.log(`📥 响应体: ${responseData}`);
        console.log(`✅ 企业微信通知发送完成`);
        process.exit(0);
    });
});

req.on('error', (error) => {
    console.error(`❌ 请求发送失败: ${error.message}`);
    console.error(`❌ 错误详情: ${JSON.stringify(error, null, 2)}`);
    process.exit(1);
});

req.write(postData);
req.end();