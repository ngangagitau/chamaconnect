import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportCard from './components/ReportCard';
import FilterPanel from './components/FilterPanel';
import ReportChart from './components/ReportChart';
import ReportTable from './components/ReportTable';
import QuickStats from './components/QuickStats';
import ExportModal from './components/ExportModal';

const Reports = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [generatingReports, setGeneratingReports] = useState({});
  const [filters, setFilters] = useState({
    dateRange: 'last_30_days',
    reportType: 'all',
    member: 'all',
    startDate: '',
    endDate: ''
  });

  // Mock user data - in real app, get from auth context
  const currentUser = {
    role: 'admin', // or 'member'
    name: 'John Doe',
    notifications: 3
  };

  // Mock report data
  const reportCategories = [
    {
      id: 'member_statements',
      title: 'Member Statements',
      description: 'Individual member contribution and loan statements',
      icon: 'FileText',
      reportCount: 24,
      lastGenerated: '2 hours ago'
    },
    {
      id: 'group_summary',
      title: 'Group Financial Summary',
      description: 'Comprehensive group financial overview and analytics',
      icon: 'BarChart3',
      reportCount: 8,
      lastGenerated: '1 day ago'
    },
    {
      id: 'contribution_analysis',
      title: 'Contribution Analysis',
      description: 'Detailed analysis of member contributions and trends',
      icon: 'PiggyBank',
      reportCount: 15,
      lastGenerated: '3 hours ago'
    },
    {
      id: 'loan_portfolio',
      title: 'Loan Portfolio Reports',
      description: 'Loan performance metrics and portfolio analysis',
      icon: 'Banknote',
      reportCount: 12,
      lastGenerated: '5 hours ago'
    },
    {
      id: 'audit_trails',
      title: 'Audit Trails',
      description: 'Complete transaction history and system audit logs',
      icon: 'Shield',
      reportCount: 6,
      lastGenerated: '1 day ago'
    },
    {
      id: 'compliance',
      title: 'Compliance Reports',
      description: 'Regulatory compliance and documentation reports',
      icon: 'CheckCircle',
      reportCount: 4,
      lastGenerated: '2 days ago'
    }
  ];

  // Mock statistics data
  const quickStats = [
    {
      icon: 'FileText',
      value: '156',
      label: 'Total Reports Generated',
      subtitle: 'This month',
      trend: 'up',
      change: '+12%'
    },
    {
      icon: 'Users',
      value: '24',
      label: 'Active Members',
      subtitle: 'With recent activity',
      trend: 'up',
      change: '+2'
    },
    {
      icon: 'DollarSign',
      value: 'KES 2.4M',
      label: 'Total Group Savings',
      subtitle: 'As of today',
      trend: 'up',
      change: '+8.5%'
    },
    {
      icon: 'TrendingUp',
      value: '94.2%',
      label: 'Contribution Rate',
      subtitle: 'Last 30 days',
      trend: 'up',
      change: '+2.1%'
    }
  ];

  // Mock chart data
  const contributionTrendData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 }
  ];

  const loanPerformanceData = [
    { name: 'Active', value: 18 },
    { name: 'Completed', value: 45 },
    { name: 'Overdue', value: 3 },
    { name: 'Defaulted', value: 2 }
  ];

  const memberActivityData = [
    { name: 'Week 1', value: 22 },
    { name: 'Week 2', value: 24 },
    { name: 'Week 3', value: 20 },
    { name: 'Week 4', value: 24 }
  ];

  // Mock table data
  const recentReportsData = [
    {
      id: 'RPT001',
      name: 'Monthly Contribution Summary',
      type: 'Contributions',
      generatedBy: 'John Doe',
      generatedAt: '2025-08-29 08:30',
      status: 'Completed',
      downloads: 12
    },
    {
      id: 'RPT002',
      name: 'Loan Portfolio Analysis',
      type: 'Loans',
      generatedBy: 'Jane Smith',
      generatedAt: '2025-08-28 14:15',
      status: 'Completed',
      downloads: 8
    },
    {
      id: 'RPT003',
      name: 'Member Statement - Mary Johnson',
      type: 'Statements',
      generatedBy: 'System',
      generatedAt: '2025-08-28 09:45',
      status: 'Completed',
      downloads: 3
    },
    {
      id: 'RPT004',
      name: 'Audit Trail Report',
      type: 'Audit',
      generatedBy: 'Admin',
      generatedAt: '2025-08-27 16:20',
      status: 'Processing',
      downloads: 0
    }
  ];

  const tableColumns = [
    { key: 'id', label: 'Report ID' },
    { key: 'name', label: 'Report Name' },
    { key: 'type', label: 'Type' },
    { key: 'generatedBy', label: 'Generated By' },
    { key: 'generatedAt', label: 'Generated At' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' 
            ? 'bg-success/10 text-success' 
            : value === 'Processing' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'downloads', label: 'Downloads' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'history', label: 'Report History', icon: 'Clock' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
    // In real app, trigger data refresh with new filters
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: 'last_30_days',
      reportType: 'all',
      member: 'all',
      startDate: '',
      endDate: ''
    });
  };

  const handleGenerateReport = (reportId) => {
    setGeneratingReports(prev => ({ ...prev, [reportId]: true }));
    
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReports(prev => ({ ...prev, [reportId]: false }));
      console.log(`Generated report: ${reportId}`);
    }, 2000);
  };

  const handleViewReportHistory = (reportId) => {
    console.log(`Viewing history for report: ${reportId}`);
    setActiveTab('history');
  };

  const handleExportTable = (format) => {
    setSelectedReportType(`table_${format}`);
    setIsExportModalOpen(true);
  };

  const handleExportReport = (config) => {
    console.log('Exporting report with config:', config);
    // In real app, trigger export process
  };

  const handleQuickExport = (reportType) => {
    setSelectedReportType(reportType);
    setIsExportModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={currentUser?.role}
        userName={currentUser?.name}
        notificationCount={currentUser?.notifications}
      />
      <Sidebar 
        userRole={currentUser?.role}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        notificationCount={currentUser?.notifications}
      />
      <main className={`pt-16 transition-deliberate ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Financial Reports
                </h1>
                <p className="text-muted-foreground">
                  Generate comprehensive financial reports and analytics for your Chama group
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => handleQuickExport('quick_summary')}
                  iconName="Download"
                  iconPosition="left"
                >
                  Quick Export
                </Button>
                <Button
                  variant="default"
                  onClick={() => setActiveTab('overview')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Report
                </Button>
              </div>
            </div>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <button 
                onClick={() => navigate('/member-dashboard')}
                className="hover:text-foreground transition-smooth"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Reports</span>
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="mb-8">
            <QuickStats stats={quickStats} />
          </div>

          {/* Filter Panel */}
          <div className="mb-8">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Report Categories */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
                  Report Categories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reportCategories?.map((category) => (
                    <ReportCard
                      key={category?.id}
                      title={category?.title}
                      description={category?.description}
                      icon={category?.icon}
                      reportCount={category?.reportCount}
                      lastGenerated={category?.lastGenerated}
                      onGenerate={() => handleGenerateReport(category?.id)}
                      onView={() => handleViewReportHistory(category?.id)}
                      isGenerating={generatingReports?.[category?.id]}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ReportChart
                  type="line"
                  data={contributionTrendData}
                  title="Contribution Trends"
                  description="Monthly contribution patterns over the last 6 months"
                />
                <ReportChart
                  type="pie"
                  data={loanPerformanceData}
                  title="Loan Portfolio Status"
                  description="Current status distribution of all loans"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <ReportChart
                  type="bar"
                  data={memberActivityData}
                  title="Member Activity"
                  description="Weekly member engagement and participation rates"
                />
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-8">
              <ReportTable
                data={recentReportsData}
                columns={tableColumns}
                title="Recent Reports"
                onExport={handleExportTable}
              />
            </div>
          )}
        </div>
      </main>
      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportReport}
        reportType={selectedReportType}
      />
    </div>
  );
};

export default Reports;