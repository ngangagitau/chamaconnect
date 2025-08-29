import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = ({ isExpanded, onToggle, securitySettings, onUpdateSecurity }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Nairobi, Kenya',
      lastActive: '2025-08-29 10:30:00',
      current: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Nairobi, Kenya',
      lastActive: '2025-08-28 18:45:00',
      current: false,
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Mombasa, Kenya',
      lastActive: '2025-08-27 14:20:00',
      current: false,
      ipAddress: '41.90.64.15'
    }
  ];

  const handlePasswordChange = async () => {
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsSaving(true);
    try {
      await onUpdateSecurity({
        type: 'password',
        data: passwordForm
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTwoFactorToggle = async (enabled) => {
    setIsSaving(true);
    try {
      await onUpdateSecurity({
        type: 'twoFactor',
        data: { enabled }
      });
      alert(enabled ? '2FA enabled successfully' : '2FA disabled successfully');
    } catch (error) {
      console.error('Error updating 2FA:', error);
      alert('Failed to update 2FA settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTerminateSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to terminate this session?')) {
      try {
        await onUpdateSecurity({
          type: 'terminateSession',
          data: { sessionId }
        });
        alert('Session terminated successfully');
      } catch (error) {
        console.error('Error terminating session:', error);
        alert('Failed to terminate session');
      }
    }
  };

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Security Settings
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage your password, 2FA, and active sessions
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
        <div className="px-6 pb-6 border-t border-border space-y-6">
          {/* Password Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
                Password Management
              </h4>
              {!isChangingPassword && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Key"
                  iconPosition="left"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Change Password
                </Button>
              )}
            </div>

            {isChangingPassword && (
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <Input
                  label="Current Password"
                  type={showPasswords ? "text" : "password"}
                  value={passwordForm?.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e?.target?.value }))}
                  placeholder="Enter current password"
                  required
                />

                <Input
                  label="New Password"
                  type={showPasswords ? "text" : "password"}
                  value={passwordForm?.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e?.target?.value }))}
                  placeholder="Enter new password"
                  description="Must be at least 8 characters with numbers and symbols"
                  required
                />

                <Input
                  label="Confirm New Password"
                  type={showPasswords ? "text" : "password"}
                  value={passwordForm?.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
                  placeholder="Confirm new password"
                  required
                />

                <Checkbox
                  label="Show passwords"
                  checked={showPasswords}
                  onChange={(e) => setShowPasswords(e?.target?.checked)}
                />

                <div className="flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handlePasswordChange}
                    loading={isSaving}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
              Two-Factor Authentication
            </h4>
            
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={securitySettings?.twoFactorEnabled ? "ShieldCheck" : "Shield"} 
                  size={20} 
                  className={securitySettings?.twoFactorEnabled ? "text-success" : "text-muted-foreground"} 
                />
                <div>
                  <p className="text-sm font-body font-medium text-foreground">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {securitySettings?.twoFactorEnabled 
                      ? 'Extra security layer is active' :'Add an extra layer of security to your account'
                    }
                  </p>
                </div>
              </div>
              <Button
                variant={securitySettings?.twoFactorEnabled ? "destructive" : "default"}
                size="sm"
                onClick={() => handleTwoFactorToggle(!securitySettings?.twoFactorEnabled)}
                loading={isSaving}
              >
                {securitySettings?.twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
              Active Sessions
            </h4>
            
            <div className="space-y-3">
              {activeSessions?.map((session) => (
                <div key={session?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon 
                        name={session?.device?.includes('iPhone') || session?.device?.includes('Android') ? "Smartphone" : "Monitor"} 
                        size={16} 
                        className="text-primary" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">
                        {session?.device}
                        {session?.current && (
                          <span className="ml-2 px-2 py-1 bg-success text-success-foreground text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session?.location} • {formatLastActive(session?.lastActive)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        IP: {session?.ipAddress}
                      </p>
                    </div>
                  </div>
                  {!session?.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="X"
                      onClick={() => handleTerminateSession(session?.id)}
                    >
                      Terminate
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;