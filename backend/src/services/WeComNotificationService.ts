import axios from 'axios';

interface WeComNotificationConfig {
  webhookUrl: string;
  agentId?: string;
  corpId?: string;
  corpSecret?: string;
}

interface GitCommitInfo {
  message: string;
  author: string;
  timestamp: string;
  hash: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
}

class WeComNotificationService {
  private config: WeComNotificationConfig;

  constructor(config: WeComNotificationConfig) {
    this.config = config;
  }

  /**
   * 发送代码推送通知到企业微信
   */
  async sendCodePushNotification(
    commitInfo: GitCommitInfo,
    projectName: string = 'Azure Performance Monitor',
    repositoryUrl: string = 'https://github.com/fsyinghua/AzurePerformanceMonitor.git'
  ): Promise<void> {
    const message = this.buildCodePushMessage(commitInfo, projectName, repositoryUrl);
    await this.sendWeComMessage(message);
  }

  /**
   * 构建代码推送通知消息
   */
  private buildCodePushMessage(
    commitInfo: GitCommitInfo,
    projectName: string,
    repositoryUrl: string
  ): any {
    return {
      msgtype: 'markdown',
      markdown: {
        content: `
**🚀 ${projectName} 代码推送通知**

> 仓库地址：[${repositoryUrl}](${repositoryUrl})

**提交信息**：${commitInfo.message}
**提交作者**：${commitInfo.author}
**提交时间**：${commitInfo.timestamp}
**提交哈希**：${commitInfo.hash}
**变更文件数**：${commitInfo.filesChanged} 个
**新增行数**：${commitInfo.insertions} 行
**删除行数**：${commitInfo.deletions} 行

---

⚠️ 请及时同步代码并进行测试验证！
        `.trim()
      }
    };
  }

  /**
   * 发送企业微信消息
   */
  private async sendWeComMessage(message: any): Promise<void> {
    try {
      const response = await axios.post(this.config.webhookUrl, message);
      
      if (response.data.errcode !== 0) {
        throw new Error(`企业微信API调用失败: ${response.data.errmsg}`);
      }
      
      console.log('企业微信通知发送成功');
    } catch (error) {
      console.error('发送企业微信通知失败:', error);
      throw error;
    }
  }

  /**
   * 发送自定义通知消息
   */
  async sendCustomNotification(
    title: string,
    content: string,
    projectName: string = 'Azure Performance Monitor'
  ): Promise<void> {
    const message = {
      msgtype: 'markdown',
      markdown: {
        content: `
**${title}**

> 项目：${projectName}

${content}
        `.trim()
      }
    };
    
    await this.sendWeComMessage(message);
  }
}

export default WeComNotificationService;
export type { GitCommitInfo, WeComNotificationConfig };