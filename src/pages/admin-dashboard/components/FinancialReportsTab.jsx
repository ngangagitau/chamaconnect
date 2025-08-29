import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinancialReportsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReports, setSelectedReports] = useState([]);

  // Mock financial reports data
  const reports = [
    {
      id: 1,
      title: 'Monthly Contribution Summary',
      description: 'Detailed breakdown of all member contributions',
      type: 'contribution',
      period: 'August 2024',
      generatedDate: '2024-08-29',
      size: '2.3 MB',
      format: 'PDF',
      status: 'ready'
    },
    {
      id: 2,
      title: 'Loan Portfolio Analysis',
      description: 'Overview of active loans and repayment status',
      type: 'loan',
      period: 'August 2024',
      generatedDate: '2024-08-28',
      size: '1.8 MB',
      format: 'PDF',
      status: 'ready'
    },
    {
      id: 3,
      title: 'Financial Statement',
      description: 'Complete financial position and cash flow',
      type: 'statement',
      period: 'Q2 2024',
      generatedDate: '2024-08-25',
      size: '3.1 MB',
      format: 'PDF',
      status: 'ready'
    },
    {
      id: 4,
      title: 'Member Activity Report',
      description: 'Individual member transaction history',
      type: 'activity',
      period: 'August 2024',
      generatedDate: null,
      size: null,
      format: 'Excel',
      status: 'generating'
    },
    {
      id: 5,
      title: 'Tax Compliance Report',
      description: 'Tax-related financial information',
      type: 'tax',
      period: 'Annual 2024',
      generatedDate: '2024-08-20',
      size: '1.2 MB',
      format: 'PDF',
      status: 'ready'
    }
  ];

  // Mock analytics data
  const analytics = {
    totalContributions: 2450000,
    totalLoans: 385000,
    activeMembers: 22,
    monthlyGrowth: 15.2,
    contributionTrend: [
      { month: 'Apr', amount: 180000 },
      { month: 'May', amount: 195000 },
      { month: 'Jun', amount: 210000 },
      { month: 'Jul', amount: 225000 },
      { month: 'Aug', amount: 245000 }
    ]
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'contribution':
        return 'PiggyBank';
      case 'loan':
        return 'Banknote';
      case 'statement':
        return 'FileText';
      case 'activity':
        return 'Activity';
      case 'tax':
        return 'Receipt';
      default:
        return 'FileText';
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'ready':
        return 'bg-success/10 text-success border-success/20';
      case 'generating':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'PDF':
        return 'FileText';
      case 'Excel':
        return 'Sheet';
      case 'CSV':
        return 'Table';
      default:
        return 'File';
    }
  };

  const filteredReports = reports?.filter(report => {
    // Add filtering logic based on selectedPeriod if needed
    return true;
  });

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev => {
      if (prev?.includes(reportId)) {
        return prev?.filter(id => id !== reportId);
      } else {
        return [...prev, reportId];
      }
    });
  };

  const handleGenerateReport = (type) => {
    console.log(`Generating ${type} report`);
  };

  const handleDownloadReport = (reportId) => {
    console.log(`Downloading report ${reportId}`);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Total Contributions</span>
          </div>
          <p className="text-2xl font-bold text-foreground">KES {analytics?.totalContributions?.toLocaleString()}</p>
        </div>
        
        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Banknote" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Active Loans</span>
          </div>
          <p className="text-2xl font-bold text-foreground">KES {analytics?.totalLoans?.toLocaleString()}</p>
        </div>
        
        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Active Members</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{analytics?.activeMembers}</p>
        </div>
        
        <div className="bg-error/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-error" />
            <span className="text-sm font-medium text-error">Growth Rate</span>
          </div>
          <p className="text-2xl font-bold text-foreground">+{analytics?.monthlyGrowth}%</p>
        </div>
      </div>
      {/* Report Generation */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            iconName="PiggyBank"
            onClick={() => handleGenerateReport('contribution')}
            className="h-auto p-4 flex-col space-y-2"
          >
            <span>Contribution Report</span>
            <span className="text-xs text-muted-foreground">Member contributions summary</span>
          </Button>
          <Button 
            variant="outline" 
            iconName="Banknote"
            onClick={() => handleGenerateReport('loan')}
            className="h-auto p-4 flex-col space-y-2"
          >
            <span>Loan Analysis</span>
            <span className="text-xs text-muted-foreground">Loan portfolio overview</span>
          </Button>
          <Button 
            variant="outline" 
            iconName="FileText"
            onClick={() => handleGenerateReport('statement')}
            className="h-auto p-4 flex-col space-y-2"
          >
            <span>Financial Statement</span>
            <span className="text-xs text-muted-foreground">Complete financial position</span>
          </Button>
        </div>
      </div>
      {/* Existing Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Available Reports</h3>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e?.target?.value)}
              className="border border-border rounded-lg px-3 py-2 bg-card text-foreground text-sm"
            >
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
              <option value="all">All Time</option>
            </select>
            
            {selectedReports?.length > 0 && (
              <Button size="sm" variant="outline">
                Download Selected
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports?.map((report) => (
            <div key={report?.id} className="bg-card rounded-lg p-4 border border-border hover:shadow-soft transition-smooth">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedReports?.includes(report?.id)}
                    onChange={() => handleSelectReport(report?.id)}
                    className="rounded border-border"
                  />
                  
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getReportIcon(report?.type)} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-sm font-medium text-foreground">{report?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles(report?.status)}`}>
                        {report?.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{report?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{report?.period}</span>
                      </span>
                      {report?.generatedDate && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>Generated {new Date(report?.generatedDate)?.toLocaleDateString()}</span>
                        </span>
                      )}
                      {report?.size && (
                        <span className="flex items-center space-x-1">
                          <Icon name={getFormatIcon(report?.format)} size={12} />
                          <span>{report?.size} ({report?.format})</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {report?.status === 'ready' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      iconName="Download"
                      onClick={() => handleDownloadReport(report?.id)}
                    >
                      Download
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" iconName="Eye">
                    Preview
                  </Button>
                  <Button size="sm" variant="ghost" iconName="MoreHorizontal" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {filteredReports?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No reports available</h3>
          <p className="text-sm text-muted-foreground mb-4">Generate your first financial report to get started</p>
          <Button variant="default" iconName="Plus">
            Generate Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default FinancialReportsTab;