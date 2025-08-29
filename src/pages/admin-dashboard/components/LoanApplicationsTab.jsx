import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoanApplicationsTab = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState([]);

  // Mock loan applications data
  const loanApplications = [
    {
      id: 1,
      applicant: 'John Kamau',
      memberId: 'CM001237',
      amount: 50000,
      purpose: 'Business expansion',
      status: 'pending',
      applicationDate: '2024-08-25',
      requestedTerm: 12,
      monthlyIncome: 85000,
      creditScore: 'Good',
      guarantors: ['Sarah Wanjiku', 'Peter Mwangi']
    },
    {
      id: 2,
      applicant: 'Grace Achieng',
      memberId: 'CM001238',
      amount: 30000,
      purpose: 'Medical emergency',
      status: 'approved',
      applicationDate: '2024-08-20',
      requestedTerm: 6,
      monthlyIncome: 65000,
      creditScore: 'Excellent',
      guarantors: ['Mary Njeri']
    },
    {
      id: 3,
      applicant: 'David Otieno',
      memberId: 'CM001239',
      amount: 75000,
      purpose: 'Education fees',
      status: 'under_review',
      applicationDate: '2024-08-28',
      requestedTerm: 18,
      monthlyIncome: 95000,
      creditScore: 'Fair',
      guarantors: ['Sarah Wanjiku', 'John Kamau']
    },
    {
      id: 4,
      applicant: 'Rose Wambui',
      memberId: 'CM001240',
      amount: 25000,
      purpose: 'Home improvement',
      status: 'rejected',
      applicationDate: '2024-08-15',
      requestedTerm: 8,
      monthlyIncome: 45000,
      creditScore: 'Poor',
      guarantors: []
    }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'under_review':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'rejected':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getCreditScoreColor = (score) => {
    switch (score) {
      case 'Excellent':
        return 'text-success';
      case 'Good':
        return 'text-primary';
      case 'Fair':
        return 'text-warning';
      case 'Poor':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredApplications = loanApplications?.filter(app => {
    if (filterStatus === 'all') return true;
    return app?.status === filterStatus;
  });

  const handleSelectApplication = (appId) => {
    setSelectedApplications(prev => {
      if (prev?.includes(appId)) {
        return prev?.filter(id => id !== appId);
      } else {
        return [...prev, appId];
      }
    });
  };

  const handleAction = (action, applicationId) => {
    console.log(`${action} application ${applicationId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="border border-border rounded-lg px-3 py-2 bg-card text-foreground text-sm"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          {selectedApplications?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedApplications?.length} selected
              </span>
              <Button size="sm" variant="outline">
                Bulk Approve
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" iconName="Download">
            Export
          </Button>
          <Button size="sm" variant="outline" iconName="Filter">
            Advanced Filter
          </Button>
        </div>
      </div>
      {/* Applications Grid */}
      <div className="grid gap-6">
        {filteredApplications?.map((application) => (
          <div key={application?.id} className="bg-muted/30 rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedApplications?.includes(application?.id)}
                  onChange={() => handleSelectApplication(application?.id)}
                  className="rounded border-border mt-1"
                />
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{application?.applicant}</h3>
                  <p className="text-sm text-muted-foreground">{application?.memberId}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(application?.status)}`}>
                {application?.status?.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Loan Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-medium text-foreground">KES {application?.amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Term:</span>
                    <span className="text-sm text-foreground">{application?.requestedTerm} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Purpose:</span>
                    <span className="text-sm text-foreground">{application?.purpose}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Applicant Info</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Income:</span>
                    <span className="text-sm text-foreground">KES {application?.monthlyIncome?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Credit Score:</span>
                    <span className={`text-sm font-medium ${getCreditScoreColor(application?.creditScore)}`}>
                      {application?.creditScore}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Applied:</span>
                    <span className="text-sm text-foreground">
                      {new Date(application?.applicationDate)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Guarantors</h4>
                <div className="space-y-1">
                  {application?.guarantors?.length > 0 ? (
                    application?.guarantors?.map((guarantor, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Shield" size={12} className="text-success" />
                        <span className="text-sm text-foreground">{guarantor}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-error">No guarantors</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button size="sm" variant="ghost" iconName="Eye">
                View Details
              </Button>
              <div className="flex items-center space-x-2">
                {application?.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      iconName="X"
                      onClick={() => handleAction('reject', application?.id)}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default" 
                      iconName="Check"
                      onClick={() => handleAction('approve', application?.id)}
                    >
                      Approve
                    </Button>
                  </>
                )}
                {application?.status === 'under_review' && (
                  <Button size="sm" variant="outline">
                    Continue Review
                  </Button>
                )}
                <Button size="sm" variant="ghost" iconName="MoreHorizontal" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredApplications?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Banknote" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No loan applications</h3>
          <p className="text-sm text-muted-foreground">
            {filterStatus === 'all' ?'No loan applications have been submitted yet'
              : `No ${filterStatus} applications found`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanApplicationsTab;