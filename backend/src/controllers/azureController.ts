import { Router, Request, Response } from 'express';
import { AzureService } from '../services/azureService';

const router = Router();
const azureService = new AzureService();

export const azureController = router;

router.get('/virtual-machines', async (req: Request, res: Response) => {
  try {
    // 返回模拟数据用于演示
    const mockVMs = [
      {
        id: '/subscriptions/1234-5678-90ab-cdef/resourceGroups/test-rg/providers/Microsoft.Compute/virtualMachines/vm-1',
        name: 'vm-1',
        status: 'Succeeded',
        size: 'Standard_DS2_v2',
        region: 'eastasia',
        resourceGroup: 'test-rg'
      },
      {
        id: '/subscriptions/1234-5678-90ab-cdef/resourceGroups/production-rg/providers/Microsoft.Compute/virtualMachines/prod-vm-1',
        name: 'prod-vm-1',
        status: 'Succeeded',
        size: 'Standard_E4_v3',
        region: 'eastasia',
        resourceGroup: 'production-rg'
      },
      {
        id: '/subscriptions/1234-5678-90ab-cdef/resourceGroups/dev-rg/providers/Microsoft.Compute/virtualMachines/dev-vm-1',
        name: 'dev-vm-1',
        status: 'Stopped',
        size: 'Standard_B2ms',
        region: 'eastasia',
        resourceGroup: 'dev-rg'
      }
    ];
    
    res.json({
      success: true,
      data: mockVMs,
      count: mockVMs.length
    });
  } catch (error) {
    console.error('Error fetching virtual machines:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch virtual machines' 
    });
  }
});

router.get('/virtual-machines/:vmId/metrics', async (req: Request, res: Response) => {
  try {
    const mockMetrics = {
      value: [
        {
          name: { value: 'Percentage CPU', localizableValue: { value: 'Percentage CPU' } },
          unit: 'Percent',
          timeseries: [
            {
              data: [
                { timeStamp: '2025-12-30T00:00:00Z', average: 25 },
                { timeStamp: '2025-12-30T01:00:00Z', average: 35 },
                { timeStamp: '2025-12-30T02:00:00Z', average: 45 }
              ]
            }
          ]
        }
      ]
    };

    res.json({
      success: true,
      data: mockMetrics
    });
  } catch (error) {
    console.error('Error fetching VM metrics:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch VM metrics' 
    });
  }
});

router.get('/available-skus', async (req: Request, res: Response) => {
  try {
    const mockSkus = [
      { name: 'Standard_DS1_v2', tier: 'Standard', capacity: 1 },
      { name: 'Standard_DS2_v2', tier: 'Standard', capacity: 2 },
      { name: 'Standard_E4_v3', tier: 'Standard', capacity: 4 }
    ];

    res.json({
      success: true,
      data: mockSkus,
      count: mockSkus.length
    });
  } catch (error) {
    console.error('Error fetching available SKUs:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch available SKUs' 
    });
  }
});

router.get('/cost-analysis', async (req: Request, res: Response) => {
  try {
    const mockCostData = {
      id: 'cost-analysis-id',
      name: 'Cost Analysis',
      type: 'Usage',
      properties: {
        rows: [
          { 'ResourceGroupName': 'test-rg', 'ResourceType': 'Microsoft.Compute/virtualMachines', 'PreTaxCost': 150 },
          { 'ResourceGroupName': 'production-rg', 'ResourceType': 'Microsoft.Compute/virtualMachines', 'PreTaxCost': 350 },
          { 'ResourceGroupName': 'dev-rg', 'ResourceType': 'Microsoft.Storage/storageAccounts', 'PreTaxCost': 50 }
        ]
      }
    };

    res.json({
      success: true,
      data: mockCostData
    });
  } catch (error) {
    console.error('Error fetching cost data:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch cost data' 
    });
  }
});

// 添加 FinOps 相关 API 路由
router.get('/finops/optimization-recommendations', async (req: Request, res: Response) => {
  try {
    const mockRecommendations = [
      {
        id: 'rec-1',
        type: 'Reservation Purchase',
        resource: 'prod-vm-1',
        resourceGroup: 'production-rg',
        currentCost: 350,
        estimatedSavings: 140,
        savingsPercentage: 40,
        description: 'Purchase reserved instances for prod-vm-1 to save 40% on monthly costs'
      },
      {
        id: 'rec-2',
        type: 'Rightsizing',
        resource: 'vm-1',
        resourceGroup: 'test-rg',
        currentSize: 'Standard_DS2_v2',
        recommendedSize: 'Standard_DS1_v2',
        estimatedSavings: 50,
        savingsPercentage: 25,
        description: 'Rightsize vm-1 from Standard_DS2_v2 to Standard_DS1_v2 for better performance-to-cost ratio'
      },
      {
        id: 'rec-3',
        type: 'Shutdown Idle VM',
        resource: 'dev-vm-1',
        resourceGroup: 'dev-rg',
        currentStatus: 'Stopped',
        estimatedSavings: 80,
        savingsPercentage: 80,
        description: 'Dev-vm-1 is idle during non-business hours. Implement scheduled shutdown to save costs'
      }
    ];

    res.json({
      success: true,
      data: mockRecommendations,
      count: mockRecommendations.length
    });
  } catch (error) {
    console.error('Error fetching optimization recommendations:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch optimization recommendations' 
    });
  }
});

router.get('/finops/cost-forecast', async (req: Request, res: Response) => {
  try {
    const mockForecast = {
      currentMonthCost: 550,
      nextMonthForecast: 620,
      trend: 'increasing',
      trendPercentage: 12.7,
      forecastData: [
        { month: '2025-10', cost: 480 },
        { month: '2025-11', cost: 520 },
        { month: '2025-12', cost: 550 },
        { month: '2026-01', cost: 620 },
        { month: '2026-02', cost: 650 },
        { month: '2026-03', cost: 680 }
      ]
    };

    res.json({
      success: true,
      data: mockForecast
    });
  } catch (error) {
    console.error('Error fetching cost forecast:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch cost forecast' 
    });
  }
});

router.get('/finops/savings-summary', async (req: Request, res: Response) => {
  try {
    const mockSavings = {
      totalSavings: 270,
      reservationSavings: 140,
      rightsizingSavings: 50,
      idleVMShutdownSavings: 80,
      savingsByResourceGroup: [
        { resourceGroup: 'production-rg', savings: 140 },
        { resourceGroup: 'test-rg', savings: 50 },
        { resourceGroup: 'dev-rg', savings: 80 }
      ]
    };

    res.json({
      success: true,
      data: mockSavings
    });
  } catch (error) {
    console.error('Error fetching savings summary:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch savings summary' 
    });
  }
});