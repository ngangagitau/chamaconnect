import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeedItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'contribution':
        return 'PiggyBank';
      case 'loan':
        return 'Banknote';
      case 'withdrawal':
        return 'ArrowUpRight';
      case 'announcement':
        return 'Bell';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'contribution':
        return 'text-success';
      case 'loan':
        return 'text-warning';
      case 'withdrawal':
        return 'text-error';
      case 'announcement':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return activityDate?.toLocaleDateString('en-GB');
  };

  return (
    <div className="flex items-start space-x-4 p-4 bg-card rounded-lg border border-border hover:shadow-soft transition-smooth">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        activity?.type === 'contribution' ? 'bg-success/10' :
        activity?.type === 'loan' ? 'bg-warning/10' :
        activity?.type === 'withdrawal'? 'bg-error/10' : 'bg-primary/10'
      }`}>
        <Icon 
          name={getActivityIcon(activity?.type)} 
          size={18} 
          className={getActivityColor(activity?.type)}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-foreground truncate">
            {activity?.title}
          </p>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {formatDate(activity?.timestamp)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {activity?.description}
        </p>
        {activity?.amount && (
          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold ${
              activity?.type === 'contribution' ? 'text-success' :
              activity?.type === 'withdrawal'? 'text-error' : 'text-foreground'
            }`}>
              {activity?.type === 'withdrawal' ? '-' : '+'}KES {activity?.amount?.toLocaleString()}
            </span>
            {activity?.status && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                activity?.status === 'completed' ? 'bg-success/10 text-success' :
                activity?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
                {activity?.status}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeedItem;