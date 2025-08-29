import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ 
  userRole = 'member', 
  isCollapsed = false, 
  onToggleCollapse,
  notificationCount = 0 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'admin' ? '/admin-dashboard' : '/member-dashboard',
      icon: 'LayoutDashboard',
      roles: ['member', 'admin'],
      description: 'Overview and summary'
    },
    {
      label: 'Contributions',
      path: '/contributions',
      icon: 'PiggyBank',
      roles: ['member', 'admin'],
      description: 'Manage payments'
    },
    {
      label: 'Loans',
      path: '/loans',
      icon: 'Banknote',
      roles: ['member', 'admin'],
      description: 'Loan applications'
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: 'BarChart3',
      roles: ['member', 'admin'],
      description: 'Financial reports'
    },
    {
      label: 'Profile Settings',
      path: '/profile-settings',
      icon: 'Settings',
      roles: ['member', 'admin'],
      description: 'Account settings'
    }
  ];

  const visibleNavItems = navigationItems?.filter(item => item?.roles?.includes(userRole));

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getTotalNotifications = () => {
    return notificationCount > 99 ? '99+' : notificationCount?.toString();
  };

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 bg-card border-r border-border z-100 transition-deliberate ${
        isCollapsed ? 'w-16' : 'w-64'
      } lg:fixed`}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wide">
              Navigation
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="ml-auto"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {visibleNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`relative w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body font-medium transition-smooth group ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed ? item?.label : ''}
            >
              <div className="flex-shrink-0">
                <Icon name={item?.icon} size={18} />
              </div>
              
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs opacity-75">{item?.description}</div>
                  </div>
                  
                  {item?.label === 'Dashboard' && notificationCount > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-caption">
                      {getTotalNotifications()}
                    </span>
                  )}
                </>
              )}

              {isCollapsed && item?.label === 'Dashboard' && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-caption">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-soft-md opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-200">
                  {item?.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* User Role Badge */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-body font-medium text-foreground capitalize">
                  {userRole} Account
                </div>
                <div className="text-xs font-caption text-muted-foreground">
                  Active Session
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group relative">
                <Icon name="User" size={16} color="white" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-soft-md opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-200">
                  {userRole} Account
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;