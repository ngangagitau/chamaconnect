import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GroupMembershipCard = ({ group }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'inactive':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <Image 
              src={group?.avatar || `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces`}
              alt={group?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{group?.name}</h3>
            <p className="text-sm text-muted-foreground">{group?.memberCount} members</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(group?.status)}`}>
          {group?.status}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Your Role</span>
          <span className="text-sm font-medium text-foreground capitalize">{group?.role}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Contribution Frequency</span>
          <span className="text-sm font-medium text-foreground">{group?.contributionFrequency}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Next Due Date</span>
          <span className="text-sm font-medium text-foreground">
            {new Date(group.nextDueDate)?.toLocaleDateString('en-GB')}
          </span>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Joined</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {new Date(group.joinedDate)?.toLocaleDateString('en-GB')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMembershipCard;