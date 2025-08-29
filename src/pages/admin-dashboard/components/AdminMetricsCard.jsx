import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminMetricsCard = ({ title, amount, currency, icon, trend, trendValue, bgColor, iconColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-soft transition-smooth hover:shadow-soft-md cursor-pointer`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={16} />
            <span className="font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">
          {currency && `${currency} `}{amount?.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AdminMetricsCard;