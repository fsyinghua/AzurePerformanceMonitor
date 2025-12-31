const { MonitorClient } = require('@azure/arm-monitor');
const { CostManagementClient } = require('@azure/arm-costmanagement');

console.log('=== MonitorClient ===');
console.log('MonitorClient:', MonitorClient);
console.log('MonitorClient properties:', Object.keys(MonitorClient.prototype));
console.log('\n=== CostManagementClient ===');
console.log('CostManagementClient:', CostManagementClient);
console.log('CostManagementClient properties:', Object.keys(CostManagementClient.prototype));