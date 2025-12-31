const { MonitorClient } = require('@azure/arm-monitor');
const { CostManagementClient } = require('@azure/arm-costmanagement');

// 创建客户端实例（使用虚拟凭证和订阅 ID）
const dummyCredential = {
  getToken: async () => ({
    token: 'dummy',
    expiresOnTimestamp: Date.now() + 3600000
  })
};

const monitorClient = new MonitorClient(dummyCredential, 'dummy-subscription-id');
const costClient = new CostManagementClient(dummyCredential, 'dummy-subscription-id');

console.log('=== MonitorClient Instance Properties ===');
console.log('All properties:', Object.keys(monitorClient));
console.log('\n=== CostManagementClient Instance Properties ===');
console.log('All properties:', Object.keys(costClient));