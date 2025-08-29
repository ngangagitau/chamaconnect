import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContributionSummary = ({ 
  totalContributions = 0,
  thisMonthContributions = 0,
  pendingContributions = 0,
  nextDueDate = null,
  groups = []
}) => {
  const summaryCards = [
    {
      title: 'Total Contributions',
      value: `KES ${totalContributions?.toLocaleString()}`,
      icon: 'PiggyBank',
      color: 'bg-primary',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'This Month',
      value: `KES ${thisMonthContributions?.toLocaleString()}`,
      icon: 'Calendar',
      color: 'bg-success',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Pending',
      value: `KES ${pendingContributions?.toLocaleString()}`,
      icon: 'Clock',
      color: 'bg-warning',
      change: '2 payments',
      changeType: 'neutral'
    },
    {
      title: 'Active Groups',
      value: groups?.length?.toString(),
      icon: 'Users',
      color: 'bg-secondary',
      change: 'All active',
      changeType: 'positive'
    }
  ];

  const formatDate = (date) => {
    if (!date) return 'No upcoming dues';
    return new Date(date)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards?.map((card, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${card?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={card?.icon} size={20} color="white" />
              </div>
              <span className={`text-sm font-caption ${getChangeColor(card?.changeType)}`}>
                {card?.change}
              </span>
            </div>
            
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                {card?.value}
              </h3>
              <p className="text-sm text-muted-foreground">{card?.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions & Next Due */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Due Payment */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">Next Due Payment</h3>
              <p className="text-sm text-muted-foreground">Upcoming contribution deadline</p>
            </div>
          </div>

          {nextDueDate ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-body font-medium text-foreground">Regular Contribution</div>
                  <div className="text-sm text-muted-foreground">Umoja Savings Group</div>
                </div>
                <div className="text-right">
                  <div className="font-heading font-semibold text-foreground">KES 2,500</div>
                  <div className="text-sm text-muted-foreground">{formatDate(nextDueDate)}</div>
                </div>
              </div>
              
              <Button variant="default" iconName="Send" iconPosition="left" className="w-full">
                Pay Now
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
              <p className="text-muted-foreground">All contributions are up to date!</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">Common contribution tasks</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              iconName="PiggyBank" 
              iconPosition="left" 
              className="w-full justify-start"
              onClick={() => console.log('Make contribution')}
            >
              Make Contribution
            </Button>
            
            <Button 
              variant="outline" 
              iconName="Calendar" 
              iconPosition="left" 
              className="w-full justify-start"
              onClick={() => console.log('Schedule payment')}
            >
              Schedule Payment
            </Button>
            
            <Button 
              variant="outline" 
              iconName="Download" 
              iconPosition="left" 
              className="w-full justify-start"
              onClick={() => console.log('Download statement')}
            >
              Download Statement
            </Button>
            
            <Button 
              variant="outline" 
              iconName="BarChart3" 
              iconPosition="left" 
              className="w-full justify-start"
              onClick={() => console.log('View analytics')}
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>
      {/* Group Contributions Overview */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">Group Contributions</h3>
              <p className="text-sm text-muted-foreground">Your contribution status across groups</p>
            </div>
          </div>
          
          <Button variant="ghost" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {groups?.slice(0, 3)?.map((group) => (
            <div key={group?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-body font-medium text-foreground">{group?.name}</div>
                  <div className="text-sm text-muted-foreground">{group?.memberCount} members</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-heading font-semibold text-foreground">
                  KES {group?.totalContributed?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {group?.contributionPercentage}% of target
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionSummary;