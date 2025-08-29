import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BottomTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/member-dashboard'
    },
    {
      id: 'contributions',
      label: 'Contributions',
      icon: 'PiggyBank',
      path: '/contributions'
    },
    {
      id: 'loans',
      label: 'Loans',
      icon: 'Banknote',
      path: '/loans'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'BarChart3',
      path: '/reports'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActiveTab = (path) => {
    return location?.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 lg:hidden">
      <div className="grid grid-cols-4 h-16">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => handleTabClick(tab?.path)}
            className={`flex flex-col items-center justify-center space-y-1 transition-smooth ${
              isActiveTab(tab?.path)
                ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={20} />
            <span className="text-xs font-medium">{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTabNavigation;