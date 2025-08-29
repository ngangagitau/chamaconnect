import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create User Account',
      description: 'Add new member to the group',
      icon: 'UserPlus',
      action: () => console.log('Create user account'),
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      title: 'Record Contribution',
      description: 'Manually add contribution',
      icon: 'PiggyBank',
      action: () => navigate('/contributions'),
      bgColor: 'bg-success/10',
      iconColor: 'text-success'
    },
    {
      title: 'Generate Report',
      description: 'Create financial statement',
      icon: 'FileText',
      action: () => navigate('/reports'),
      bgColor: 'bg-warning/10',
      iconColor: 'text-warning'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {quickActions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.action}
            className="w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:shadow-soft transition-smooth hover:bg-muted/30"
          >
            <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={action?.icon} size={20} className={action?.iconColor} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-medium text-foreground">{action?.title}</h4>
              <p className="text-xs text-muted-foreground">{action?.description}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="border-t border-border mt-6 pt-4">
        <Button variant="outline" className="w-full" iconName="Settings">
          Advanced Settings
        </Button>
      </div>
    </div>
  );
};

export default QuickActionPanel;