import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GroupSettingsTab = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  // Mock group settings data
  const [groupSettings, setGroupSettings] = useState({
    general: {
      groupName: 'Umoja Chama',
      description: 'A savings and investment group focused on financial growth',
      registrationNumber: 'REG-2024-001',
      establishedDate: '2024-01-15',
      meetingFrequency: 'monthly',
      meetingDay: 'first_saturday',
      currency: 'KES'
    },
    contribution: {
      minimumContribution: 5000,
      contributionFrequency: 'monthly',
      latePenalty: 200,
      gracePeriod: 7,
      allowPartialPayments: true,
      autoReminders: true
    },
    loans: {
      minimumLoanAmount: 10000,
      maximumLoanAmount: 200000,
      interestRate: 12,
      maximumTerm: 24,
      processingFee: 500,
      requireGuarantors: true,
      minimumGuarantors: 2
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      contributionReminders: true,
      loanReminders: true,
      meetingReminders: true,
      generalAnnouncements: true
    }
  });

  const sections = [
    { id: 'general', label: 'General Settings', icon: 'Settings' },
    { id: 'contribution', label: 'Contributions', icon: 'PiggyBank' },
    { id: 'loans', label: 'Loan Policy', icon: 'Banknote' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const handleInputChange = (section, field, value) => {
    setGroupSettings(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', groupSettings);
    setHasChanges(false);
    // Here you would typically send the data to your API
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Group Name
          </label>
          <input
            type="text"
            value={groupSettings?.general?.groupName}
            onChange={(e) => handleInputChange('general', 'groupName', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Registration Number
          </label>
          <input
            type="text"
            value={groupSettings?.general?.registrationNumber}
            onChange={(e) => handleInputChange('general', 'registrationNumber', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          value={groupSettings?.general?.description}
          onChange={(e) => handleInputChange('general', 'description', e?.target?.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Meeting Frequency
          </label>
          <select
            value={groupSettings?.general?.meetingFrequency}
            onChange={(e) => handleInputChange('general', 'meetingFrequency', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Meeting Day
          </label>
          <select
            value={groupSettings?.general?.meetingDay}
            onChange={(e) => handleInputChange('general', 'meetingDay', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          >
            <option value="first_saturday">First Saturday</option>
            <option value="second_saturday">Second Saturday</option>
            <option value="third_saturday">Third Saturday</option>
            <option value="last_saturday">Last Saturday</option>
            <option value="first_sunday">First Sunday</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Currency
          </label>
          <select
            value={groupSettings?.general?.currency}
            onChange={(e) => handleInputChange('general', 'currency', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          >
            <option value="KES">KES - Kenyan Shilling</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderContributionSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Minimum Contribution Amount
          </label>
          <input
            type="number"
            value={groupSettings?.contribution?.minimumContribution}
            onChange={(e) => handleInputChange('contribution', 'minimumContribution', parseInt(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Contribution Frequency
          </label>
          <select
            value={groupSettings?.contribution?.contributionFrequency}
            onChange={(e) => handleInputChange('contribution', 'contributionFrequency', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Late Payment Penalty
          </label>
          <input
            type="number"
            value={groupSettings?.contribution?.latePenalty}
            onChange={(e) => handleInputChange('contribution', 'latePenalty', parseInt(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Grace Period (Days)
          </label>
          <input
            type="number"
            value={groupSettings?.contribution?.gracePeriod}
            onChange={(e) => handleInputChange('contribution', 'gracePeriod', parseInt(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground">Allow Partial Payments</h4>
            <p className="text-xs text-muted-foreground">Members can make partial contributions</p>
          </div>
          <input
            type="checkbox"
            checked={groupSettings?.contribution?.allowPartialPayments}
            onChange={(e) => handleInputChange('contribution', 'allowPartialPayments', e?.target?.checked)}
            className="rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground">Auto Reminders</h4>
            <p className="text-xs text-muted-foreground">Send automatic contribution reminders</p>
          </div>
          <input
            type="checkbox"
            checked={groupSettings?.contribution?.autoReminders}
            onChange={(e) => handleInputChange('contribution', 'autoReminders', e?.target?.checked)}
            className="rounded border-border"
          />
        </div>
      </div>
    </div>
  );

  const renderLoanSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Minimum Loan Amount
          </label>
          <input
            type="number"
            value={groupSettings?.loans?.minimumLoanAmount}
            onChange={(e) => handleInputChange('loans', 'minimumLoanAmount', parseInt(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Maximum Loan Amount
          </label>
          <input
            type="number"
            value={groupSettings?.loans?.maximumLoanAmount}
            onChange={(e) => handleInputChange('loans', 'maximumLoanAmount', parseInt(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            step="0.1"
            value={groupSettings?.loans?.interestRate}
            onChange={(e) => handleInputChange('loans', 'interestRate', parseFloat(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Maximum Term (Months)
          </label>
          <input
            type="number"
            value={groupSettings?.loans?.maximumTerm}
            onChange={(e) => handleInputChange('loans', 'maximumTerm', parseInt(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Processing Fee
          </label>
          <input
            type="number"
            value={groupSettings?.loans?.processingFee}
            onChange={(e) => handleInputChange('loans', 'processingFee', parseInt(e?.target?.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground">Require Guarantors</h4>
            <p className="text-xs text-muted-foreground">All loans must have guarantors</p>
          </div>
          <input
            type="checkbox"
            checked={groupSettings?.loans?.requireGuarantors}
            onChange={(e) => handleInputChange('loans', 'requireGuarantors', e?.target?.checked)}
            className="rounded border-border"
          />
        </div>
        
        {groupSettings?.loans?.requireGuarantors && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Number of Guarantors
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={groupSettings?.loans?.minimumGuarantors}
              onChange={(e) => handleInputChange('loans', 'minimumGuarantors', parseInt(e?.target?.value))}
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground max-w-xs"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-foreground">Communication Preferences</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Email Notifications</h5>
              <p className="text-xs text-muted-foreground">Send notifications via email</p>
            </div>
            <input
              type="checkbox"
              checked={groupSettings?.notifications?.emailNotifications}
              onChange={(e) => handleInputChange('notifications', 'emailNotifications', e?.target?.checked)}
              className="rounded border-border"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">SMS Notifications</h5>
              <p className="text-xs text-muted-foreground">Send notifications via SMS</p>
            </div>
            <input
              type="checkbox"
              checked={groupSettings?.notifications?.smsNotifications}
              onChange={(e) => handleInputChange('notifications', 'smsNotifications', e?.target?.checked)}
              className="rounded border-border"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-foreground">Notification Types</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Contribution Reminders</h5>
              <p className="text-xs text-muted-foreground">Remind members about upcoming contributions</p>
            </div>
            <input
              type="checkbox"
              checked={groupSettings?.notifications?.contributionReminders}
              onChange={(e) => handleInputChange('notifications', 'contributionReminders', e?.target?.checked)}
              className="rounded border-border"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Loan Reminders</h5>
              <p className="text-xs text-muted-foreground">Remind members about loan repayments</p>
            </div>
            <input
              type="checkbox"
              checked={groupSettings?.notifications?.loanReminders}
              onChange={(e) => handleInputChange('notifications', 'loanReminders', e?.target?.checked)}
              className="rounded border-border"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Meeting Reminders</h5>
              <p className="text-xs text-muted-foreground">Remind members about group meetings</p>
            </div>
            <input
              type="checkbox"
              checked={groupSettings?.notifications?.meetingReminders}
              onChange={(e) => handleInputChange('notifications', 'meetingReminders', e?.target?.checked)}
              className="rounded border-border"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">General Announcements</h5>
              <p className="text-xs text-muted-foreground">Notify members about important updates</p>
            </div>
            <input
              type="checkbox"
              checked={groupSettings?.notifications?.generalAnnouncements}
              onChange={(e) => handleInputChange('notifications', 'generalAnnouncements', e?.target?.checked)}
              className="rounded border-border"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'contribution':
        return renderContributionSettings();
      case 'loans':
        return renderLoanSettings();
      case 'notifications':
        return renderNotificationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto pb-4">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 px-1 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeSection === section?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={section?.icon} size={16} />
              <span>{section?.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="min-h-[400px]">
        {renderActiveSection()}
      </div>

      {/* Save Actions */}
      {hasChanges && (
        <div className="flex items-center justify-between p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-warning">You have unsaved changes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                // Reset to original values
                setHasChanges(false);
              }}
            >
              Discard Changes
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSaveSettings}
              iconName="Save"
            >
              Save Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSettingsTab;