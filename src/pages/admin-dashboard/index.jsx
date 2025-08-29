import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AdminMetricsCard from './components/AdminMetricsCard';
import PendingTasksPanel from './components/PendingTasksPanel';
import AdminTransactionTable from './components/AdminTransactionTable';
import QuickActionPanel from './components/QuickActionPanel';
import MemberManagementTab from './components/MemberManagementTab';
import LoanApplicationsTab from './components/LoanApplicationsTab';
import FinancialReportsTab from './components/FinancialReportsTab';
import GroupSettingsTab from './components/GroupSettingsTab';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('members');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock admin user data
  const adminData = {
    name: "David Kiprotich",
    role: "admin",
    memberId: "ADM001",
    groupId: "UMJ001"
  };

  // Mock admin KPI metrics
  const adminMetrics = [
    {
      title: "Total Group Funds",
      amount: 2450000,
      currency: "KES",
      icon: "Banknote",
      trend: "up",
      trendValue: "+15.2%",
      bgColor: "bg-card",
      iconColor: "bg-primary"
    },
    {
      title: "Total Members",
      amount: 24,
      currency: "",
      icon: "Users",
      trend: "up",
      trendValue: "+2 this month",
      bgColor: "bg-card",
      iconColor: "bg-success"
    },
    {
      title: "Pending Approvals",
      amount: 7,
      currency: "",
      icon: "Clock",
      trend: null,
      trendValue: "Requires attention",
      bgColor: "bg-card",
      iconColor: "bg-warning"
    },
    {
      title: "Overdue Payments",
      amount: 3,
      currency: "",
      icon: "AlertTriangle",
      trend: "down",
      trendValue: "-2 from last week",
      bgColor: "bg-card",
      iconColor: "bg-error"
    }
  ];

  // Mock pending tasks
  const pendingTasks = [
    {
      id: 1,
      type: "membership",
      title: "New Member Application",
      description: "Jane Wanjiru - Documentation review",
      priority: "high",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      count: 2
    },
    {
      id: 2,
      type: "loan",
      title: "Loan Applications",
      description: "3 applications awaiting approval",
      priority: "urgent",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      count: 3
    },
    {
      id: 3,
      type: "withdrawal",
      title: "Withdrawal Requests",
      description: "Emergency withdrawal approvals",
      priority: "normal",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      count: 2
    }
  ];

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 1,
      member: "Sarah Wanjiku",
      memberId: "CM001234",
      type: "contribution",
      amount: 5000,
      status: "completed",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      description: "Monthly contribution"
    },
    {
      id: 2,
      member: "Peter Mwangi",
      memberId: "CM001235",
      type: "loan_repayment",
      amount: 3000,
      status: "completed",
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
      description: "Loan installment payment"
    },
    {
      id: 3,
      member: "Mary Njeri",
      memberId: "CM001236",
      type: "withdrawal",
      amount: 15000,
      status: "pending",
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      description: "Emergency withdrawal"
    },
    {
      id: 4,
      member: "John Kamau",
      memberId: "CM001237",
      type: "loan_disbursement",
      amount: 50000,
      status: "approved",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      description: "Business loan disbursement"
    },
    {
      id: 5,
      member: "Grace Achieng",
      memberId: "CM001238",
      type: "contribution",
      amount: 5000,
      status: "completed",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      description: "Monthly contribution"
    }
  ];

  // Mock notifications for admin
  const adminNotifications = [
    {
      message: "3 loan applications require approval",
      time: "30m ago",
      priority: "urgent"
    },
    {
      message: "Monthly financial report is ready",
      time: "2h ago",
      priority: "normal"
    },
    {
      message: "New member registration pending",
      time: "4h ago",
      priority: "normal"
    }
  ];

  // Tab configuration
  const tabs = [
    { id: 'members', label: 'Member Management', icon: 'Users' },
    { id: 'loans', label: 'Loan Applications', icon: 'Banknote' },
    { id: 'reports', label: 'Financial Reports', icon: 'BarChart3' },
    { id: 'settings', label: 'Group Settings', icon: 'Settings' }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'members':
        return <MemberManagementTab />;
      case 'loans':
        return <LoanApplicationsTab />;
      case 'reports':
        return <FinancialReportsTab />;
      case 'settings':
        return <GroupSettingsTab />;
      default:
        return <MemberManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={adminData?.role}
        userName={adminData?.name}
        notificationCount={adminNotifications?.length}
      />
      <div className="flex">
        <Sidebar
          userRole={adminData?.role}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          notificationCount={adminNotifications?.length}
        />
        
        <main className={`flex-1 transition-deliberate pt-16 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-4 lg:p-6 max-w-full">
            {/* Admin Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {formatGreeting()}, {adminData?.name?.split(' ')?.[0]}!
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome to your admin dashboard - manage your Chama with confidence
                  </p>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} className="inline mr-1" />
                    {currentTime?.toLocaleTimeString('en-GB', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Group ID: {adminData?.groupId}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {adminMetrics?.map((metric, index) => (
                <AdminMetricsCard
                  key={index}
                  title={metric?.title}
                  amount={metric?.amount}
                  currency={metric?.currency}
                  icon={metric?.icon}
                  trend={metric?.trend}
                  trendValue={metric?.trendValue}
                  bgColor={metric?.bgColor}
                  iconColor={metric?.iconColor}
                />
              ))}
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
              {/* Left Section - Tabs and Content */}
              <div className="xl:col-span-3 space-y-6">
                {/* Tab Navigation */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <div className="border-b border-border mb-6">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                            activeTab === tab?.id
                              ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                          }`}
                        >
                          <Icon name={tab?.icon} size={16} />
                          <span>{tab?.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="min-h-[500px]">
                    {renderTabContent()}
                  </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/reports')}
                      iconName="ExternalLink"
                      iconPosition="right"
                      iconSize={16}
                    >
                      View All
                    </Button>
                  </div>
                  <AdminTransactionTable transactions={recentTransactions} />
                </div>
              </div>

              {/* Right Sidebar - Pending Tasks & Quick Actions */}
              <div className="space-y-6">
                {/* Pending Tasks */}
                <PendingTasksPanel tasks={pendingTasks} />

                {/* Quick Actions */}
                <QuickActionPanel />

                {/* Admin Statistics */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Admin Since</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">Jan 2024</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Monthly Growth</span>
                      </div>
                      <span className="text-sm font-medium text-success">+15.2%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Active Members</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">22/24</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Tasks Completed</span>
                      </div>
                      <span className="text-sm font-medium text-primary">147</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;