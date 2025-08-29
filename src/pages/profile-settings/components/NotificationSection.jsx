import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSection = ({ isExpanded, onToggle, notificationSettings, onUpdateNotifications }) => {
  const [settings, setSettings] = useState(notificationSettings);
  const [isSaving, setIsSaving] = useState(false);

  const notificationCategories = [
    {
      id: 'contributions',
      title: 'Contributions',
      description: 'Payment reminders, confirmations, and due dates',
      icon: 'PiggyBank',
      settings: [
        { key: 'contributionReminders', label: 'Payment reminders', email: true, inApp: true },
        { key: 'contributionConfirmations', label: 'Payment confirmations', email: true, inApp: true },
        { key: 'contributionOverdue', label: 'Overdue notifications', email: true, inApp: true }
      ]
    },
    {
      id: 'loans',
      title: 'Loans',
      description: 'Application updates, approvals, and repayment reminders',
      icon: 'Banknote',
      settings: [
        { key: 'loanApplications', label: 'Application status updates', email: true, inApp: true },
        { key: 'loanApprovals', label: 'Loan approvals/rejections', email: true, inApp: true },
        { key: 'loanRepayments', label: 'Repayment reminders', email: true, inApp: true }
      ]
    },
    {
      id: 'meetings',
      title: 'Meetings',
      description: 'Meeting schedules, reminders, and updates',
      icon: 'Calendar',
      settings: [
        { key: 'meetingSchedules', label: 'Meeting schedules', email: true, inApp: true },
        { key: 'meetingReminders', label: 'Meeting reminders', email: true, inApp: true },
        { key: 'meetingUpdates', label: 'Meeting updates/cancellations', email: true, inApp: true }
      ]
    },
    {
      id: 'administrative',
      title: 'Administrative',
      description: 'System updates, security alerts, and announcements',
      icon: 'Settings',
      settings: [
        { key: 'systemUpdates', label: 'System updates', email: false, inApp: true },
        { key: 'securityAlerts', label: 'Security alerts', email: true, inApp: true },
        { key: 'announcements', label: 'Group announcements', email: true, inApp: true }
      ]
    }
  ];

  const handleSettingChange = (categoryId, settingKey, type, value) => {
    setSettings(prev => ({
      ...prev,
      [categoryId]: {
        ...prev?.[categoryId],
        [settingKey]: {
          ...prev?.[categoryId]?.[settingKey],
          [type]: value
        }
      }
    }));
  };

  const handleCategoryToggle = (categoryId, enabled) => {
    const category = notificationCategories?.find(cat => cat?.id === categoryId);
    const newCategorySettings = {};
    
    category?.settings?.forEach(setting => {
      newCategorySettings[setting.key] = {
        email: enabled && setting?.email,
        inApp: enabled && setting?.inApp
      };
    });

    setSettings(prev => ({
      ...prev,
      [categoryId]: newCategorySettings
    }));
  };

  const isCategoryEnabled = (categoryId) => {
    const categorySettings = settings?.[categoryId] || {};
    return Object.values(categorySettings)?.some(setting => 
      setting?.email || setting?.inApp
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateNotifications(settings);
      alert('Notification preferences updated successfully');
    } catch (error) {
      console.error('Error updating notifications:', error);
      alert('Failed to update notification preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(notificationSettings);

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Notification Preferences
            </h3>
            <p className="text-sm text-muted-foreground">
              Control how and when you receive notifications
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Choose how you want to be notified about important events
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {notificationCategories?.map((category) => (
              <div key={category?.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={category?.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-semibold text-foreground">
                        {category?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {category?.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isCategoryEnabled(category?.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryToggle(category?.id, !isCategoryEnabled(category?.id))}
                  >
                    {isCategoryEnabled(category?.id) ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="ml-11 space-y-3">
                  {category?.settings?.map((setting) => (
                    <div key={setting?.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-body text-foreground">
                        {setting?.label}
                      </span>
                      <div className="flex items-center space-x-4">
                        {setting?.email && (
                          <Checkbox
                            label="Email"
                            size="sm"
                            checked={settings?.[category?.id]?.[setting?.key]?.email || false}
                            onChange={(e) => handleSettingChange(category?.id, setting?.key, 'email', e?.target?.checked)}
                          />
                        )}
                        {setting?.inApp && (
                          <Checkbox
                            label="In-App"
                            size="sm"
                            checked={settings?.[category?.id]?.[setting?.key]?.inApp || false}
                            onChange={(e) => handleSettingChange(category?.id, setting?.key, 'inApp', e?.target?.checked)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {hasChanges && (
            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setSettings(notificationSettings)}
                disabled={isSaving}
              >
                Reset
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
              >
                Save Preferences
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSection;