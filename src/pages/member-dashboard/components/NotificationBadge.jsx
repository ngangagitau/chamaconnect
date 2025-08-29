import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationBadge = ({ notifications }) => {
  if (!notifications || notifications?.length === 0) return null;

  const urgentNotifications = notifications?.filter(n => n?.priority === 'urgent');
  const hasUrgent = urgentNotifications?.length > 0;

  return (
    <div className={`rounded-lg p-4 border-l-4 ${
      hasUrgent 
        ? 'bg-error/5 border-error' :'bg-warning/5 border-warning'
    }`}>
      <div className="flex items-start space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          hasUrgent ? 'bg-error/10' : 'bg-warning/10'
        }`}>
          <Icon 
            name={hasUrgent ? "AlertTriangle" : "Bell"} 
            size={16} 
            className={hasUrgent ? 'text-error' : 'text-warning'}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">
              {hasUrgent ? 'Urgent Attention Required' : 'Notifications'}
            </h4>
            <span className={`text-xs px-2 py-1 rounded-full ${
              hasUrgent 
                ? 'bg-error text-error-foreground' 
                : 'bg-warning text-warning-foreground'
            }`}>
              {notifications?.length}
            </span>
          </div>
          <div className="space-y-2">
            {notifications?.slice(0, 3)?.map((notification, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{notification?.message}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {notification?.time}
                </span>
              </div>
            ))}
            {notifications?.length > 3 && (
              <p className="text-xs text-primary font-medium cursor-pointer hover:underline">
                View {notifications?.length - 3} more notifications
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBadge;