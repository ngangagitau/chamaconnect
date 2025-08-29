import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LoanApplicationForm from './components/LoanApplicationForm';
import LoanStatusCard from './components/LoanStatusCard';
import LoanCalculator from './components/LoanCalculator';
import PaymentHistoryTable from './components/PaymentHistoryTable';
import EligibilityChecker from './components/EligibilityChecker';

const LoansPage = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [userRole] = useState('member');
  const [userName] = useState('Sarah Wanjiku');

  // Mock data
  const memberData = {
    totalContributions: 45000,
    membershipMonths: 18,
    activeLoans: 1,
    paymentHistory: 'good'
  };

  const eligibilityData = {
    maxAmount: 112500,
    totalContributions: 45000,
    isEligible: true
  };

  const mockLoans = [
    {
      id: 'LN001',
      purpose: 'Business Expansion',
      amount: 50000,
      outstandingBalance: 32000,
      monthlyPayment: 4500,
      term: 12,
      status: 'active',
      nextDueDate: '2025-09-15',
      applicationDate: '2024-12-01'
    },
    {
      id: 'LN002',
      purpose: 'Medical Emergency',
      amount: 25000,
      term: 6,
      status: 'pending',
      applicationDate: '2025-08-25'
    },
    {
      id: 'LN003',
      purpose: 'Education Fees',
      amount: 75000,
      outstandingBalance: 0,
      monthlyPayment: 7200,
      term: 12,
      status: 'completed',
      applicationDate: '2024-01-15'
    }
  ];

  const mockPayments = [
    {
      id: 'PAY001',
      date: '2025-08-15',
      reference: 'TXN789012345',
      loanId: 'LN001',
      amount: 4500,
      type: 'monthly payment',
      status: 'completed'
    },
    {
      id: 'PAY002',
      date: '2025-07-15',
      reference: 'TXN789012344',
      loanId: 'LN001',
      amount: 4500,
      type: 'monthly payment',
      status: 'completed'
    },
    {
      id: 'PAY003',
      date: '2025-06-15',
      reference: 'TXN789012343',
      loanId: 'LN001',
      amount: 4500,
      type: 'monthly payment',
      status: 'completed'
    },
    {
      id: 'PAY004',
      date: '2025-05-15',
      reference: 'TXN789012342',
      loanId: 'LN001',
      amount: 4500,
      type: 'monthly payment',
      status: 'completed'
    },
    {
      id: 'PAY005',
      date: '2025-04-15',
      reference: 'TXN789012341',
      loanId: 'LN001',
      amount: 4500,
      type: 'monthly payment',
      status: 'failed'
    }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStartApplication = (eligibilityResults) => {
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (formData) => {
    console.log('Submitting loan application:', formData);
    // Simulate API call
    setTimeout(() => {
      setShowApplicationForm(false);
      setActiveTab('overview');
      // Show success message or redirect
    }, 1000);
  };

  const handleCancelApplication = () => {
    setShowApplicationForm(false);
  };

  const handleViewLoanDetails = (loan) => {
    setSelectedLoan(loan);
    // Could open a modal or navigate to details page
    console.log('Viewing loan details:', loan);
  };

  const handleMakePayment = (loan) => {
    console.log('Making payment for loan:', loan);
    // Navigate to payment page or open payment modal
  };

  const handleDownloadReceipt = (payment) => {
    console.log('Downloading receipt for payment:', payment);
    // Simulate receipt download
  };

  const getActiveLoans = () => mockLoans?.filter(loan => loan?.status === 'active');
  const getPendingLoans = () => mockLoans?.filter(loan => loan?.status === 'pending' || loan?.status === 'under review');
  const getCompletedLoans = () => mockLoans?.filter(loan => loan?.status === 'completed');

  const calculateTotalOutstanding = () => {
    return getActiveLoans()?.reduce((total, loan) => total + (loan?.outstandingBalance || 0), 0);
  };

  const calculateNextPaymentDue = () => {
    const activeLoans = getActiveLoans();
    if (activeLoans?.length === 0) return 0;
    return activeLoans?.reduce((total, loan) => total + (loan?.monthlyPayment || 0), 0);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'apply', label: 'Apply for Loan', icon: 'FileText' },
    { id: 'calculator', label: 'Calculator', icon: 'Calculator' },
    { id: 'history', label: 'Payment History', icon: 'History' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole} 
        userName={userName}
        notificationCount={3}
      />
      <Sidebar 
        userRole={userRole}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        notificationCount={3}
      />
      <main className={`pt-16 transition-deliberate ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Banknote" size={24} className="text-primary" />
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Loans
              </h1>
            </div>
            <p className="text-muted-foreground">
              Apply for loans, track applications, and manage repayments
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Banknote" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Outstanding</p>
                  <p className="text-lg font-heading font-semibold text-foreground">
                    KES {calculateTotalOutstanding()?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Next Payment Due</p>
                  <p className="text-lg font-heading font-semibold text-foreground">
                    KES {calculateNextPaymentDue()?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Active Loans</p>
                  <p className="text-lg font-heading font-semibold text-foreground">
                    {getActiveLoans()?.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pending Applications</p>
                  <p className="text-lg font-heading font-semibold text-foreground">
                    {getPendingLoans()?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg border border-border mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
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
            {activeTab === 'overview' && !showApplicationForm && (
              <>
                {/* Active Loans */}
                {getActiveLoans()?.length > 0 && (
                  <div>
                    <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Active Loans
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {getActiveLoans()?.map((loan) => (
                        <LoanStatusCard
                          key={loan?.id}
                          loan={loan}
                          onViewDetails={handleViewLoanDetails}
                          onMakePayment={handleMakePayment}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Pending Applications */}
                {getPendingLoans()?.length > 0 && (
                  <div>
                    <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Pending Applications
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {getPendingLoans()?.map((loan) => (
                        <LoanStatusCard
                          key={loan?.id}
                          loan={loan}
                          onViewDetails={handleViewLoanDetails}
                          onMakePayment={handleMakePayment}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Loans */}
                {getCompletedLoans()?.length > 0 && (
                  <div>
                    <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Completed Loans
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {getCompletedLoans()?.slice(0, 2)?.map((loan) => (
                        <LoanStatusCard
                          key={loan?.id}
                          loan={loan}
                          onViewDetails={handleViewLoanDetails}
                          onMakePayment={handleMakePayment}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* No Loans Message */}
                {mockLoans?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Banknote" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      No loans yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Start by checking your eligibility and applying for your first loan
                    </p>
                    <Button
                      onClick={() => setActiveTab('apply')}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Apply for Loan
                    </Button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'apply' && !showApplicationForm && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EligibilityChecker
                  memberData={memberData}
                  onStartApplication={handleStartApplication}
                />
                <LoanCalculator />
              </div>
            )}

            {showApplicationForm && (
              <LoanApplicationForm
                onSubmit={handleSubmitApplication}
                onCancel={handleCancelApplication}
                eligibilityData={eligibilityData}
              />
            )}

            {activeTab === 'calculator' && (
              <div className="max-w-4xl">
                <LoanCalculator />
              </div>
            )}

            {activeTab === 'history' && (
              <PaymentHistoryTable
                payments={mockPayments}
                onDownloadReceipt={handleDownloadReceipt}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoansPage;