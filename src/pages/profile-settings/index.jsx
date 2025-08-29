import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import PersonalInfoSection from './components/PersonalInfoSection';
import SecuritySection from './components/SecuritySection';
import NotificationSection from './components/NotificationSection';
import VerificationSection from './components/VerificationSection';

const ProfileSettings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    security: false,
    notifications: false,
    verification: false
  });

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Wanjiku',
    email: 'sarah.wanjiku@email.com',
    phone: '+254 712 345 678',
    dateOfBirth: '1990-05-15',
    gender: 'female',
    nationalId: '12345678',
    address: '123 Kimathi Street',
    city: 'Nairobi',
    emergencyContactName: 'John Wanjiku',
    emergencyContactPhone: '+254 722 987 654',
    occupation: 'Small Business Owner',
    role: 'member'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: '2025-07-15',
    activeSessions: 3
  });

  const [notificationSettings, setNotificationSettings] = useState({
    contributions: {
      contributionReminders: { email: true, inApp: true },
      contributionConfirmations: { email: true, inApp: true },
      contributionOverdue: { email: true, inApp: true }
    },
    loans: {
      loanApplications: { email: true, inApp: true },
      loanApprovals: { email: true, inApp: true },
      loanRepayments: { email: true, inApp: true }
    },
    meetings: {
      meetingSchedules: { email: true, inApp: true },
      meetingReminders: { email: true, inApp: false },
      meetingUpdates: { email: false, inApp: true }
    },
    administrative: {
      systemUpdates: { email: false, inApp: true },
      securityAlerts: { email: true, inApp: true },
      announcements: { email: true, inApp: true }
    }
  });

  const [verificationStatus, setVerificationStatus] = useState({
    personalInfo: 'completed',
    identityVerification: 'pending',
    addressVerification: 'completed',
    phoneVerification: 'completed'
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleSaveProfile = async (profileData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserProfile(profileData);
    console.log('Profile updated:', profileData);
  };

  const handleUpdateSecurity = async (securityData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (securityData?.type === 'twoFactor') {
      setSecuritySettings(prev => ({
        ...prev,
        twoFactorEnabled: securityData?.data?.enabled
      }));
    }
    
    console.log('Security updated:', securityData);
  };

  const handleUpdateNotifications = async (notificationData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNotificationSettings(notificationData);
    console.log('Notifications updated:', notificationData);
  };

  const handleUploadDocument = async (documentData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Document uploaded:', documentData);
  };

  // Auto-expand sections based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setExpandedSections(prev => ({
          ...prev,
          personal: true
        }));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Profile Settings - ChamaConnect</title>
        <meta name="description" content="Manage your profile information, security settings, and notification preferences on ChamaConnect" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header 
          userRole={userProfile?.role}
          userName={`${userProfile?.firstName} ${userProfile?.lastName}`}
          notificationCount={3}
        />
        
        <Sidebar 
          userRole={userProfile?.role}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          notificationCount={3}
        />

        <main className={`pt-16 transition-deliberate ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-4 lg:p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                    Profile Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your account information, security, and preferences
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} className="text-primary" />
                    <span className="text-sm font-body font-medium text-foreground">Profile</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Complete</p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-warning" />
                    <span className="text-sm font-body font-medium text-foreground">Security</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {securitySettings?.twoFactorEnabled ? 'Enhanced' : 'Basic'}
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Bell" size={16} className="text-accent" />
                    <span className="text-sm font-body font-medium text-foreground">Notifications</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Configured</p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="ShieldCheck" size={16} className="text-success" />
                    <span className="text-sm font-body font-medium text-foreground">KYC Status</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">75% Complete</p>
                </div>
              </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              <PersonalInfoSection
                isExpanded={expandedSections?.personal}
                onToggle={() => toggleSection('personal')}
                userProfile={userProfile}
                onSave={handleSaveProfile}
              />

              <SecuritySection
                isExpanded={expandedSections?.security}
                onToggle={() => toggleSection('security')}
                securitySettings={securitySettings}
                onUpdateSecurity={handleUpdateSecurity}
              />

              <NotificationSection
                isExpanded={expandedSections?.notifications}
                onToggle={() => toggleSection('notifications')}
                notificationSettings={notificationSettings}
                onUpdateNotifications={handleUpdateNotifications}
              />

              <VerificationSection
                isExpanded={expandedSections?.verification}
                onToggle={() => toggleSection('verification')}
                verificationStatus={verificationStatus}
                onUploadDocument={handleUploadDocument}
              />
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-muted/30 border border-border rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={20} className="text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-heading font-semibold text-foreground mb-2">
                    Need Help?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you need assistance with your profile settings or have questions about account verification, our support team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth">
                      <Icon name="MessageCircle" size={16} />
                      <span>Contact Support</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth">
                      <Icon name="BookOpen" size={16} />
                      <span>View Help Center</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSettings;