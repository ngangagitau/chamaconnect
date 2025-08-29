import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'member', userName = 'John Doe', notificationCount = 0 }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'admin' ? '/admin-dashboard' : '/member-dashboard',
      icon: 'LayoutDashboard',
      roles: ['member', 'admin']
    },
    {
      label: 'Contributions',
      path: '/contributions',
      icon: 'PiggyBank',
      roles: ['member', 'admin']
    },
    {
      label: 'Loans',
      path: '/loans',
      icon: 'Banknote',
      roles: ['member', 'admin']
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: 'BarChart3',
      roles: ['member', 'admin']
    }
  ];

  const secondaryItems = [
    {
      label: 'Profile Settings',
      path: '/profile-settings',
      icon: 'Settings',
      roles: ['member', 'admin']
    }
  ];

  const visibleNavItems = navigationItems?.filter(item => item?.roles?.includes(userRole));
  const visibleSecondaryItems = secondaryItems?.filter(item => item?.roles?.includes(userRole));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getTotalNotifications = () => {
    return notificationCount > 99 ? '99+' : notificationCount?.toString();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100 shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              ChamaConnect
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {visibleNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
              {item?.label === 'Dashboard' && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-caption">
                  {getTotalNotifications()}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Menu & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          {/* Notifications (Desktop) */}
          {notificationCount > 0 && (
            <div className="hidden lg:flex relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => console.log('Show notifications')}
              >
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-caption">
                  {getTotalNotifications()}
                </span>
              </Button>
            </div>
          )}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-body font-medium text-foreground">{userName}</div>
                <div className="text-xs font-caption text-muted-foreground capitalize">{userRole}</div>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden lg:block text-muted-foreground" />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-soft-md z-200">
                <div className="p-3 border-b border-border">
                  <div className="text-sm font-body font-medium text-popover-foreground">{userName}</div>
                  <div className="text-xs font-caption text-muted-foreground capitalize">{userRole} Account</div>
                </div>
                <div className="py-2">
                  {visibleSecondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => {
                        handleNavigation(item?.path);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                  <hr className="my-2 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-destructive hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-soft-md">
          <nav className="p-4 space-y-2">
            {visibleNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-body font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.label === 'Dashboard' && notificationCount > 0 && (
                  <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-caption">
                    {getTotalNotifications()}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;