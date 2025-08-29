import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ContributionHistory = ({ contributions = [], onDownloadReceipt, onFilterChange }) => {
  const [filters, setFilters] = useState({
    dateRange: '',
    status: '',
    group: '',
    searchTerm: ''
  });
  const [sortBy, setSortBy] = useState('date_desc');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'processing', label: 'Processing' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const groupOptions = [
    { value: '', label: 'All Groups' },
    { value: 'group1', label: 'Umoja Savings Group' },
    { value: 'group2', label: 'Harambee Circle' },
    { value: 'group3', label: 'Tumaini Chama' }
  ];

  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'amount_desc', label: 'Highest Amount' },
    { value: 'amount_asc', label: 'Lowest Amount' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'failed': return 'text-destructive bg-destructive/10';
      case 'processing': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      case 'processing': return 'Loader';
      default: return 'Circle';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalContributions = () => {
    return contributions?.filter(c => c?.status === 'completed')?.reduce((sum, c) => sum + c?.amount, 0);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="History" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">Contribution History</h2>
              <p className="text-sm text-muted-foreground">
                Total contributed: KES {getTotalContributions()?.toLocaleString()}
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Export all contributions')}
          >
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Input
            type="search"
            placeholder="Search contributions..."
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
          />
          
          <Select
            placeholder="Filter by date"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
          
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>
      <div className="p-6">
        {contributions?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="PiggyBank" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No Contributions Yet</h3>
            <p className="text-muted-foreground mb-4">Start making contributions to see your history here</p>
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Make First Contribution
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {contributions?.map((contribution) => (
              <div
                key={contribution?.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(contribution?.status)}`}>
                    <Icon name={getStatusIcon(contribution?.status)} size={18} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-body font-medium text-foreground">{contribution?.purpose}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(contribution?.status)}`}>
                        {contribution?.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{contribution?.groupName}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{formatDate(contribution?.date)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="CreditCard" size={14} />
                        <span>{contribution?.paymentMethod}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-heading font-semibold text-foreground">
                      KES {contribution?.amount?.toLocaleString()}
                    </div>
                    {contribution?.fee > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Fee: KES {contribution?.fee?.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {contribution?.status === 'completed' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDownloadReceipt?.(contribution?.id)}
                        title="Download Receipt"
                      >
                        <Icon name="Download" size={16} />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('View details', contribution?.id)}
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionHistory;