import React from 'react';
import Icon from '../../../components/AppIcon';

const SavingsProgressCard = ({ currentAmount, targetAmount, currency, groupName, dueDate }) => {
  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const remainingAmount = Math.max(targetAmount - currentAmount, 0);
  
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{groupName}</h3>
            <p className="text-sm text-muted-foreground">Savings Target</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Due Date</p>
          <p className="text-sm font-medium text-foreground">{formatDate(dueDate)}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-foreground">{progressPercentage?.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-lg font-bold text-foreground">
              {currency} {currentAmount?.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-lg font-bold text-primary">
              {currency} {remainingAmount?.toLocaleString()}
            </p>
          </div>
        </div>

        {progressPercentage >= 100 && (
          <div className="flex items-center justify-center space-x-2 p-3 bg-success/10 rounded-lg">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Target Achieved!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsProgressCard;