import { Router, Request, Response } from 'express';
import { WeComNotificationService } from '../services/WeComNotificationService';
import { config } from '../config/env';

const router = Router();

/**
 * 发送自定义企业微信通知
 * POST /api/v1/wecom/send
 */
router.post('/send', async (req: Request, res: Response) => {
  try {
    const { content, type = 'text' } = req.body;
    
    if (!content) {
      return res.status(400).json({ success: false, error: '通知内容不能为空' });
    }
    
    const notificationService = new WeComNotificationService(config.wecom);
    await notificationService.sendCustomNotification(content);
    
    res.json({ success: true, message: '通知发送成功' });
  } catch (error) {
    console.error('企业微信通知发送失败:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : '未知错误' 
    });
  }
});

/**
 * 测试企业微信通知功能
 * GET /api/v1/wecom/test
 */
router.get('/test', async (req: Request, res: Response) => {
  try {
    const notificationService = new WeComNotificationService(config.wecom);
    await notificationService.sendTestNotification();
    
    res.json({ success: true, message: '测试通知发送成功' });
  } catch (error) {
    console.error('企业微信测试通知发送失败:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : '未知错误' 
    });
  }
});

/**
 * 发送代码推送通知
 * POST /api/v1/wecom/code-push
 */
router.post('/code-push', async (req: Request, res: Response) => {
  try {
    const { commitId, author, message, repoUrl } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, error: '提交信息不能为空' });
    }
    
    const notificationService = new WeComNotificationService(config.wecom);
    await notificationService.sendCodePushNotification({
      commitId,
      author,
      message,
      repoUrl
    });
    
    res.json({ success: true, message: '代码推送通知发送成功' });
  } catch (error) {
    console.error('代码推送通知发送失败:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : '未知错误' 
    });
  }
});

export default router;