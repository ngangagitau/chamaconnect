import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoanStatusCard = ({ loan, onViewDetails, onMakePayment }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': case'active':
        return 'text-success bg-success/10 border-success/20';
      case 'pending': case'under review':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected': case'overdue':
        return 'text-error bg-error/10 border-error/20';
      case 'completed':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': case'active':
        return 'CheckCircle';
      case 'pending': case'under review':
        return 'Clock';
      case 'rejected':
        return 'XCircle';
      case 'overdue':
        return 'AlertTriangle';
      case 'completed':
        return 'CheckCircle2';
      default:
        return 'Circle';
    }
  };

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCurrency = (amount) => {
    return `KES ${amount?.toLocaleString()}`;
  };

  const daysUntilDue = loan?.nextDueDate ? calculateDaysUntilDue(loan?.nextDueDate) : null;

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-soft-md transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            {loan?.purpose}
          </h3>
          <p className="text-sm text-muted-foreground">
            Application #{loan?.id}
          </p>
        </div>
        
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(loan?.status)}`}>
          <Icon name={getStatusIcon(loan?.status)} size={12} />
          <span className="capitalize">{loan?.status}</span>
        </div>
      </div>
      {/* Loan Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
          <p className="text-sm font-medium text-foreground">{formatCurrency(loan?.amount)}</p>
        </div>
        
        {loan?.status === 'active' && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Outstanding Balance</p>
            <p className="text-sm font-medium text-foreground">{formatCurrency(loan?.outstandingBalance)}</p>
          </div>
        )}
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Term</p>
          <p className="text-sm font-medium text-foreground">{loan?.term} months</p>
        </div>
        
        {loan?.status === 'active' && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
            <p className="text-sm font-medium text-foreground">{formatCurrency(loan?.monthlyPayment)}</p>
          </div>
        )}
      </div>
      {/* Progress Bar for Active Loans */}
      {loan?.status === 'active' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Repayment Progress</span>
            <span>{Math.round(((loan?.amount - loan?.outstandingBalance) / loan?.amount) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-smooth" 
              style={{ width: `${((loan?.amount - loan?.outstandingBalance) / loan?.amount) * 100}%` }}
            />
          </div>
        </div>
      )}
      {/* Next Due Date for Active Loans */}
      {loan?.status === 'active' && loan?.nextDueDate && (
        <div className={`bg-muted rounded-lg p-3 mb-4 ${
          daysUntilDue <= 7 ? 'bg-warning/10 border border-warning/20' : ''
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Next Payment Due</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(loan.nextDueDate)?.toLocaleDateString('en-GB')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Amount Due</p>
              <p className="text-sm font-medium text-foreground">{formatCurrency(loan?.monthlyPayment)}</p>
            </div>
          </div>
          
          {daysUntilDue !== null && (
            <div className="mt-2 flex items-center space-x-2">
              <Icon 
                name={daysUntilDue <= 3 ? "AlertTriangle" : daysUntilDue <= 7 ? "Clock" : "Calendar"} 
                size={14} 
                className={daysUntilDue <= 3 ? "text-error" : daysUntilDue <= 7 ? "text-warning" : "text-muted-foreground"} 
              />
              <span className={`text-xs ${
                daysUntilDue <= 3 ? "text-error" : daysUntilDue <= 7 ? "text-warning" : "text-muted-foreground"
              }`}>
                {daysUntilDue <= 0 ? 'Overdue' : 
                 daysUntilDue === 1 ? 'Due tomorrow' : 
                 `Due in ${daysUntilDue} days`}
              </span>
            </div>
          )}
        </div>
      )}
      {/* Application Date for Pending Loans */}
      {(loan?.status === 'pending' || loan?.status === 'under review') && (
        <div className="bg-muted rounded-lg p-3 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Application Date</p>
          <p className="text-sm font-medium text-foreground">
            {new Date(loan.applicationDate)?.toLocaleDateString('en-GB')}
          </p>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(loan)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        
        {loan?.status === 'active' && (
          <Button
            size="sm"
            onClick={() => onMakePayment(loan)}
            iconName="CreditCard"
            iconPosition="left"
            className="flex-1"
          >
            Make Payment
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoanStatusCard;