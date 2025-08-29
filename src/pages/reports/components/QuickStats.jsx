import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const getIconColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={stat?.icon} size={24} className="text-primary" />
            </div>
            {stat?.trend && (
              <div className={`flex items-center space-x-1 ${getIconColor(stat?.trend)}`}>
                <Icon name={getTrendIcon(stat?.trend)} size={16} />
                <span className="text-sm font-body font-medium">{stat?.change}</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
              {stat?.value}
            </h3>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
            {stat?.subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{stat?.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;