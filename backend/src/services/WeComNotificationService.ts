import axios from 'axios';

// 企业微信配置接口
export interface WeComConfig {
  webhookUrl: string;
}

// Git 提交信息接口
export interface GitCommitInfo {
  commitId?: string;
  author?: string;
  message: string;
  repoUrl?: string;
}

export class WeComNotificationService {
  private config: WeComConfig;

  constructor(config: WeComConfig) {
    this.config = config;
    
    if (!this.config.webhookUrl) {
      throw new Error('企业微信 Webhook URL 未配置');
    }
  }

  /**
   * 发送测试通知
   */
  async sendTestNotification(): Promise<void> {
    const testContent = `🚀 **Azure Performance Monitor 测试通知**\n\n这是一条来自 Azure Performance Monitor 的测试通知，用于验证企业微信通知功能是否正常工作。`;
    
    await this.sendMarkdownMessage(testContent);
  }

  /**
   * 发送自定义通知
   * @param content 通知内容
   */
  async sendCustomNotification(content: string): Promise<void> {
    await this.sendMarkdownMessage(content);
  }

  /**
   * 发送代码推送通知
   * @param commitInfo 提交信息
   */
  async sendCodePushNotification(commitInfo: GitCommitInfo): Promise<void> {
    const content = this.buildCodePushMessage(commitInfo);
    await this.sendMarkdownMessage(content);
  }

  /**
   * 构建代码推送消息
   * @param commitInfo 提交信息
   */
  private buildCodePushMessage(commitInfo: GitCommitInfo): string {
    let message = `📝 **代码推送通知**\n\n`;
    
    if (commitInfo.author) {
      message += `**提交作者**: ${commitInfo.author}\n`;
    }
    
    if (commitInfo.commitId) {
      message += `**提交 ID**: \`${commitInfo.commitId}\`\n`;
    }
    
    if (commitInfo.message) {
      message += `**提交信息**: ${commitInfo.message}\n`;
    }
    
    if (commitInfo.repoUrl) {
      message += `**仓库地址**: [查看仓库](${commitInfo.repoUrl})\n`;
    }
    
    return message;
  }

  /**
   * 发送 Markdown 消息到企业微信
   * @param content Markdown 格式的消息内容
   */
  private async sendMarkdownMessage(content: string): Promise<void> {
    const axios = (await import('axios')).default;
    
    const response = await axios.post(this.config.webhookUrl, {
      msgtype: 'markdown',
      markdown: {
        content
      }
    });
    
    // 添加类型断言来解决 unknown 类型问题
    const result = response.data as { errcode: number; errmsg: string };
    
    if (result.errcode !== 0) {
      throw new Error(`发送失败: ${result.errmsg} (错误码: ${result.errcode})`);
    }
  }
}