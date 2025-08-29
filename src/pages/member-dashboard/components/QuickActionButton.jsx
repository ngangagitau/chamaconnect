import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionButton = ({ title, description, iconName, onClick, variant = "outline" }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="h-auto p-6 flex flex-col items-center space-y-3 text-center hover:shadow-soft-md transition-smooth"
      iconName={iconName}
      iconSize={24}
    >
      <div className="space-y-1">
        <div className="font-semibold text-base">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </Button>
  );
};

export default QuickActionButton;