import { DefaultAzureCredential } from '@azure/identity';
import { ComputeManagementClient } from '@azure/arm-compute';
import { MonitorClient } from '@azure/arm-monitor';
import { CostManagementClient } from '@azure/arm-costmanagement';
import { config } from '../config/env';

export class AzureService {
  private credential: DefaultAzureCredential;

  constructor() {
    this.credential = new DefaultAzureCredential();
  }

  async getVirtualMachines(subscriptionId?: string, resourceGroup?: string) {
    const subId = subscriptionId || config.azure.subscriptionId;
    const client = new ComputeManagementClient(this.credential, subId);
    
    try {
      const vms = [];
      const vmList = await client.virtualMachines.listAll();
      for await (const vm of vmList) {
        if (resourceGroup && vm.id?.includes(resourceGroup)) {
          vms.push({
            id: vm.id,
            name: vm.name,
            status: vm.provisioningState,
            size: vm.hardwareProfile?.vmSize,
            region: vm.location,
            resourceGroup: vm.id?.split('/')[4] || ''
          });
        } else if (!resourceGroup) {
          vms.push({
            id: vm.id,
            name: vm.name,
            status: vm.provisioningState,
            size: vm.hardwareProfile?.vmSize,
            region: vm.location,
            resourceGroup: vm.id?.split('/')[4] || ''
          });
        }
      }
      return vms;
    } catch (error) {
      console.error('Error fetching VMs:', error);
      throw error;
    }
  }

  async getVmMetrics(vmId: string, startDate?: string, endDate?: string) {
    const subId = config.azure.subscriptionId;
    const client = new MonitorClient(this.credential, subId);

    try {
      const end = endDate ? new Date(endDate) : new Date();
      const start = startDate ? new Date(startDate) : new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);

      const metrics = await client.metricsOperations.list(vmId, {
        timespan: `${start.toISOString()}/${end.toISOString()}`,
        interval: 'PT5M',
        metricnames: 'Percentage CPU,Network In,Network Out,Available Memory Bytes',
        aggregation: 'Average,Maximum'
      });

      return metrics;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  }

  async getAvailableSkus(region: string = 'eastasia') {
    const subId = config.azure.subscriptionId;
    const client = new ComputeManagementClient(this.credential, subId);

    try {
      const skus = [];
      const skuList = await client.resourceSkus.list({ filter: `location eq '${region}'` });
      for await (const sku of skuList) {
        skus.push(sku);
      }
      return skus;
    } catch (error) {
      console.error('Error fetching SKUs:', error);
      throw error;
    }
  }

  async getCostData(startDate?: string, endDate?: string, granularity: string = 'Monthly') {
    const subId = config.azure.subscriptionId;
    const client = new CostManagementClient(this.credential);

    try {
      const end = endDate ? new Date(endDate) : new Date();
      const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

      const result = await client.query.usage(`/subscriptions/${subId}`, {
        type: 'Usage',
        timeframe: 'Custom',
        timePeriod: {
          from: start,
          to: end
        },
        dataset: {
          granularity: granularity as any,
          aggregation: {
            totalCost: {
              name: 'PreTaxCost',
              function: 'Sum'
            }
          },
          grouping: [
            { 
              type: 'Dimension', 
              name: 'ResourceGroupName'
            },
            { 
              type: 'Dimension', 
              name: 'ResourceType'
            }
          ]
        }
      });

      return result;
    } catch (error) {
      console.error('Error fetching cost data:', error);
      throw error;
    }
  }
}