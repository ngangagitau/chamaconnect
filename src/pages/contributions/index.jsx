import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ContributionForm from './components/ContributionForm';
import ContributionHistory from './components/ContributionHistory';
import PaymentProgress from './components/PaymentProgress';
import ScheduledContributions from './components/ScheduledContributions';
import ContributionSummary from './components/ContributionSummary';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ContributionsPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState({
    isVisible: false,
    currentStep: 1,
    paymentData: {}
  });

  // Mock data
  const mockContributions = [
    {
      id: 1,
      amount: 2500,
      fee: 25,
      purpose: 'Regular Contribution',
      groupName: 'Umoja Savings Group',
      paymentMethod: 'M-Pesa',
      status: 'completed',
      date: new Date('2025-01-15T10:30:00'),
      reference: 'CHM-001234'
    },
    {
      id: 2,
      amount: 1500,
      fee: 15,
      purpose: 'Emergency Fund',
      groupName: 'Harambee Circle',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      date: new Date('2025-01-10T14:20:00'),
      reference: 'CHM-001235'
    },
    {
      id: 3,
      amount: 3000,
      fee: 30,
      purpose: 'Project Fund',
      groupName: 'Tumaini Chama',
      paymentMethod: 'M-Pesa',
      status: 'pending',
      date: new Date('2025-01-08T09:15:00'),
      reference: 'CHM-001236'
    },
    {
      id: 4,
      amount: 2000,
      fee: 20,
      purpose: 'Regular Contribution',
      groupName: 'Umoja Savings Group',
      paymentMethod: 'Airtel Money',
      status: 'failed',
      date: new Date('2025-01-05T16:45:00'),
      reference: 'CHM-001237'
    }
  ];

  const mockScheduledContributions = [
    {
      id: 1,
      amount: 2500,
      frequency: 'monthly',
      groupName: 'Umoja Savings Group',
      purpose: 'Regular Contribution',
      isActive: true,
      nextPayment: new Date('2025-02-01T00:00:00'),
      startDate: '2025-01-01',
      endDate: '2025-12-31'
    },
    {
      id: 2,
      amount: 1000,
      frequency: 'weekly',
      groupName: 'Harambee Circle',
      purpose: 'Emergency Fund',
      isActive: true,
      nextPayment: new Date('2025-01-30T00:00:00'),
      startDate: '2025-01-15',
      endDate: ''
    },
    {
      id: 3,
      amount: 5000,
      frequency: 'quarterly',
      groupName: 'Tumaini Chama',
      purpose: 'Project Fund',
      isActive: false,
      nextPayment: new Date('2025-04-01T00:00:00'),
      startDate: '2025-01-01',
      endDate: '2025-12-31'
    }
  ];

  const mockGroups = [
    {
      id: 'group1',
      name: 'Umoja Savings Group',
      memberCount: 25,
      totalContributed: 45000,
      contributionPercentage: 75
    },
    {
      id: 'group2',
      name: 'Harambee Circle',
      memberCount: 18,
      totalContributed: 28500,
      contributionPercentage: 68
    },
    {
      id: 'group3',
      name: 'Tumaini Chama',
      memberCount: 32,
      totalContributed: 67200,
      contributionPercentage: 82
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'contribute', label: 'Make Contribution', icon: 'PiggyBank' },
    { id: 'history', label: 'History', icon: 'History' },
    { id: 'scheduled', label: 'Scheduled', icon: 'Calendar' }
  ];

  const handleContributionSubmit = async (contributionData) => {
    setIsPaymentProcessing(true);
    setPaymentProgress({
      isVisible: true,
      currentStep: 1,
      paymentData: {
        ...contributionData,
        groupName: mockGroups?.find(g => g?.id === contributionData?.groupId)?.name || 'Unknown Group',
        reference: 'CHM-' + Date.now()?.toString()?.slice(-6)
      }
    });

    // Simulate payment processing steps
    const steps = [1, 2, 3];
    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentProgress(prev => ({ ...prev, currentStep: step }));
    }

    // Complete payment
    setTimeout(() => {
      setPaymentProgress(prev => ({ ...prev, isVisible: false }));
      setIsPaymentProcessing(false);
      setActiveTab('history');
      
      // Show success notification
      console.log('Payment completed successfully!');
    }, 1000);
  };

  const handleDownloadReceipt = (contributionId) => {
    console.log('Downloading receipt for contribution:', contributionId);
    // Simulate PDF download
  };

  const handleFilterChange = (filters) => {
    console.log('Applying filters:', filters);
    // Implement filtering logic
  };

  const handleCreateSchedule = (scheduleData) => {
    console.log('Creating new schedule:', scheduleData);
    // Implement schedule creation
  };

  const handleUpdateSchedule = (scheduleId, updates) => {
    console.log('Updating schedule:', scheduleId, updates);
    // Implement schedule update
  };

  const handleDeleteSchedule = (scheduleId) => {
    console.log('Deleting schedule:', scheduleId);
    // Implement schedule deletion
  };

  const calculateSummaryData = () => {
    const completedContributions = mockContributions?.filter(c => c?.status === 'completed');
    const totalContributions = completedContributions?.reduce((sum, c) => sum + c?.amount, 0);
    
    const currentMonth = new Date()?.getMonth();
    const currentYear = new Date()?.getFullYear();
    const thisMonthContributions = completedContributions?.filter(c => {
        const date = new Date(c.date);
        return date?.getMonth() === currentMonth && date?.getFullYear() === currentYear;
      })?.reduce((sum, c) => sum + c?.amount, 0);

    const pendingContributions = mockContributions?.filter(c => c?.status === 'pending')?.reduce((sum, c) => sum + c?.amount, 0);

    return {
      totalContributions,
      thisMonthContributions,
      pendingContributions,
      nextDueDate: new Date('2025-02-01T00:00:00')
    };
  };

  const summaryData = calculateSummaryData();

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="member" userName="John Doe" notificationCount={3} />
      <Sidebar
        userRole="member"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        notificationCount={3}
      />
      <main className={`pt-16 transition-deliberate ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="PiggyBank" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Contributions
                </h1>
                <p className="text-muted-foreground">
                  Manage your group savings and payments
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <ContributionSummary
                totalContributions={summaryData?.totalContributions}
                thisMonthContributions={summaryData?.thisMonthContributions}
                pendingContributions={summaryData?.pendingContributions}
                nextDueDate={summaryData?.nextDueDate}
                groups={mockGroups}
              />
            )}

            {activeTab === 'contribute' && (
              <ContributionForm
                onSubmit={handleContributionSubmit}
                isProcessing={isPaymentProcessing}
                userBalance={25000}
              />
            )}

            {activeTab === 'history' && (
              <ContributionHistory
                contributions={mockContributions}
                onDownloadReceipt={handleDownloadReceipt}
                onFilterChange={handleFilterChange}
              />
            )}

            {activeTab === 'scheduled' && (
              <ScheduledContributions
                scheduledContributions={mockScheduledContributions}
                onCreateSchedule={handleCreateSchedule}
                onUpdateSchedule={handleUpdateSchedule}
                onDeleteSchedule={handleDeleteSchedule}
              />
            )}
          </div>

          {/* Mobile Quick Actions */}
          <div className="fixed bottom-4 right-4 lg:hidden">
            <Button
              variant="default"
              size="icon"
              className="w-14 h-14 rounded-full shadow-soft-lg"
              onClick={() => setActiveTab('contribute')}
            >
              <Icon name="Plus" size={24} />
            </Button>
          </div>
        </div>
      </main>
      {/* Payment Progress Modal */}
      <PaymentProgress
        isVisible={paymentProgress?.isVisible}
        currentStep={paymentProgress?.currentStep}
        paymentData={paymentProgress?.paymentData}
        onCancel={() => {
          setPaymentProgress(prev => ({ ...prev, isVisible: false }));
          setIsPaymentProcessing(false);
        }}
        onRetry={() => {
          setPaymentProgress(prev => ({ ...prev, currentStep: 1 }));
        }}
      />
    </div>
  );
};

export default ContributionsPage;