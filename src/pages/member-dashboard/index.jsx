import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FinancialMetricsCard from './components/FinancialMetricsCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import QuickActionButton from './components/QuickActionButton';
import SavingsProgressCard from './components/SavingsProgressCard';
import NotificationBadge from './components/NotificationBadge';
import GroupMembershipCard from './components/GroupMembershipCard';
import BottomTabNavigation from './components/BottomTabNavigation';

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data
  const userData = {
    name: "Sarah Wanjiku",
    role: "member",
    memberId: "CM001234",
    joinedDate: "2024-01-15"
  };

  // Mock financial metrics
  const financialMetrics = [
    {
      title: "Current Balance",
      amount: 45750,
      currency: "KES",
      icon: "Wallet",
      trend: "up",
      trendValue: "+12.5%",
      bgColor: "bg-card",
      iconColor: "bg-primary"
    },
    {
      title: "Total Contributions",
      amount: 125000,
      currency: "KES",
      icon: "PiggyBank",
      trend: "up",
      trendValue: "+8.2%",
      bgColor: "bg-card",
      iconColor: "bg-success"
    },
    {
      title: "Active Loans",
      amount: 25000,
      currency: "KES",
      icon: "Banknote",
      trend: "down",
      trendValue: "-15.3%",
      bgColor: "bg-card",
      iconColor: "bg-warning"
    },
    {
      title: "Next Due Amount",
      amount: 5000,
      currency: "KES",
      icon: "Calendar",
      trend: null,
      trendValue: "Due in 5 days",
      bgColor: "bg-card",
      iconColor: "bg-accent"
    }
  ];

  // Mock activity feed
  const activityFeed = [
    {
      id: 1,
      type: "contribution",
      title: "Monthly Contribution",
      description: "Regular monthly contribution to Umoja Chama",
      amount: 5000,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "completed"
    },
    {
      id: 2,
      type: "loan",
      title: "Loan Application Approved",
      description: "Your loan application for KES 25,000 has been approved",
      amount: 25000,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "approved"
    },
    {
      id: 3,
      type: "announcement",
      title: "Group Meeting Reminder",
      description: "Monthly group meeting scheduled for tomorrow at 2:00 PM",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: null
    },
    {
      id: 4,
      type: "contribution",
      title: "Emergency Fund Contribution",
      description: "Special contribution to group emergency fund",
      amount: 2000,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "completed"
    },
    {
      id: 5,
      type: "withdrawal",
      title: "Withdrawal Request",
      description: "Withdrawal from savings account",
      amount: 10000,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "pending"
    }
  ];

  // Mock notifications
  const notifications = [
    {
      message: "Loan payment due in 3 days",
      time: "2h ago",
      priority: "urgent"
    },
    {
      message: "New group announcement posted",
      time: "5h ago",
      priority: "normal"
    },
    {
      message: "Monthly contribution reminder",
      time: "1d ago",
      priority: "normal"
    }
  ];

  // Mock savings progress
  const savingsProgress = {
    currentAmount: 45750,
    targetAmount: 100000,
    currency: "KES",
    groupName: "Umoja Chama",
    dueDate: "2024-12-31"
  };

  // Mock group membership
  const groupMembership = {
    name: "Umoja Chama",
    memberCount: 12,
    status: "active",
    role: "member",
    contributionFrequency: "Monthly",
    nextDueDate: "2024-09-05",
    joinedDate: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces"
  };

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'contribute': navigate('/contributions');
        break;
      case 'loan': navigate('/loans');
        break;
      case 'statements': navigate('/reports');
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  const formatGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userData?.role}
        userName={userData?.name}
        notificationCount={notifications?.length}
      />
      <div className="flex">
        <Sidebar
          userRole={userData?.role}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          notificationCount={notifications?.length}
        />
        
        <main className={`flex-1 transition-deliberate pt-16 pb-20 lg:pb-6 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {formatGreeting()}, {userData?.name?.split(' ')?.[0]}!
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome back to your Chama dashboard
                  </p>
                </div>
                <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>{currentTime?.toLocaleTimeString('en-GB', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            {notifications?.length > 0 && (
              <div className="mb-6">
                <NotificationBadge notifications={notifications} />
              </div>
            )}

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {financialMetrics?.map((metric, index) => (
                <FinancialMetricsCard
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

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Activity Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <QuickActionButton
                      title="Make Contribution"
                      description="Add to your savings"
                      iconName="PiggyBank"
                      onClick={() => handleQuickAction('contribute')}
                      variant="default"
                    />
                    <QuickActionButton
                      title="Apply for Loan"
                      description="Request financial assistance"
                      iconName="Banknote"
                      onClick={() => handleQuickAction('loan')}
                      variant="outline"
                    />
                    <QuickActionButton
                      title="View Statements"
                      description="Download reports"
                      iconName="FileText"
                      onClick={() => handleQuickAction('statements')}
                      variant="outline"
                    />
                  </div>
                </div>

                {/* Savings Progress */}
                <SavingsProgressCard
                  currentAmount={savingsProgress?.currentAmount}
                  targetAmount={savingsProgress?.targetAmount}
                  currency={savingsProgress?.currency}
                  groupName={savingsProgress?.groupName}
                  dueDate={savingsProgress?.dueDate}
                />

                {/* Activity Feed */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/reports')}
                      iconName="ExternalLink"
                      iconPosition="right"
                      iconSize={16}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {activityFeed?.slice(0, 4)?.map((activity) => (
                      <ActivityFeedItem key={activity?.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Group Info */}
              <div className="space-y-6">
                {/* Group Membership */}
                <GroupMembershipCard group={groupMembership} />

                {/* Member Stats */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Member Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Member Since</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {new Date(userData.joinedDate)?.toLocaleDateString('en-GB', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Hash" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Member ID</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{userData?.memberId}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Contribution Rate</span>
                      </div>
                      <span className="text-sm font-medium text-success">100%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Award" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Member Status</span>
                      </div>
                      <span className="text-sm font-medium text-primary">Active</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Users" size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Monthly Meeting</p>
                        <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Icon name="DollarSign" size={16} className="text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Contribution Due</p>
                        <p className="text-xs text-muted-foreground">Sep 5, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default MemberDashboard;