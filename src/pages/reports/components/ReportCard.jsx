import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCard = ({ 
  title, 
  description, 
  icon, 
  reportCount, 
  lastGenerated, 
  onGenerate, 
  onView,
  isGenerating = false 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-body font-medium text-foreground">{reportCount} reports</div>
          {lastGenerated && (
            <div className="text-xs text-muted-foreground">Last: {lastGenerated}</div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={onGenerate}
          loading={isGenerating}
          iconName="FileText"
          iconPosition="left"
          className="flex-1"
        >
          Generate Report
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          iconName="Eye"
          iconPosition="left"
        >
          View History
        </Button>
      </div>
    </div>
  );
};

export default ReportCard;