import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingTasksPanel = ({ tasks = [] }) => {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'normal':
        return 'bg-muted/10 text-muted-foreground border-border';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getPriorityIcon = (type) => {
    switch (type) {
      case 'membership':
        return 'UserPlus';
      case 'loan':
        return 'Banknote';
      case 'withdrawal':
        return 'ArrowUpRight';
      default:
        return 'AlertCircle';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Pending Tasks</h3>
        {tasks?.length > 0 && (
          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium">
            {tasks?.length} pending
          </span>
        )}
      </div>
      
      <div className="space-y-4">
        {tasks?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-2" />
            <p className="text-sm text-muted-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground">No pending tasks</p>
          </div>
        ) : (
          tasks?.map((task) => (
            <div key={task?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getPriorityIcon(task?.type)} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{task?.title}</h4>
                    <p className="text-xs text-muted-foreground">{task?.description}</p>
                  </div>
                </div>
                {task?.count > 1 && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {task?.count}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(task?.timestamp)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getPriorityStyles(task?.priority)}`}>
                  {task?.priority}
                </span>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <Button size="sm" variant="default" className="flex-1">
                  Review
                </Button>
                <Button size="sm" variant="outline">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingTasksPanel;