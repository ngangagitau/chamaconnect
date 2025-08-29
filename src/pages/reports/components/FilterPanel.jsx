import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onClearFilters,
  isCollapsed,
  onToggleCollapse 
}) => {
  const dateRangeOptions = [
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_3_months', label: 'Last 3 Months' },
    { value: 'last_6_months', label: 'Last 6 Months' },
    { value: 'last_year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const reportTypeOptions = [
    { value: 'all', label: 'All Reports' },
    { value: 'contributions', label: 'Contributions' },
    { value: 'loans', label: 'Loans' },
    { value: 'statements', label: 'Statements' },
    { value: 'audit', label: 'Audit Trails' }
  ];

  const memberOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'john_doe', label: 'John Doe' },
    { value: 'jane_smith', label: 'Jane Smith' },
    { value: 'mary_johnson', label: 'Mary Johnson' },
    { value: 'david_wilson', label: 'David Wilson' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Report Filters</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
        >
          <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
        </Button>
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => onFilterChange('dateRange', value)}
            />
            
            <Select
              label="Report Type"
              options={reportTypeOptions}
              value={filters?.reportType}
              onChange={(value) => onFilterChange('reportType', value)}
            />
            
            <Select
              label="Member"
              options={memberOptions}
              value={filters?.member}
              onChange={(value) => onFilterChange('member', value)}
              searchable
            />
          </div>
          
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={filters?.startDate}
                onChange={(e) => onFilterChange('startDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.endDate}
                onChange={(e) => onFilterChange('endDate', e?.target?.value)}
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant="default"
              onClick={onApplyFilters}
              iconName="Filter"
              iconPosition="left"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;