import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ isExpanded, onToggle, userProfile, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    dateOfBirth: userProfile?.dateOfBirth || '',
    gender: userProfile?.gender || '',
    nationalId: userProfile?.nationalId || '',
    address: userProfile?.address || '',
    city: userProfile?.city || '',
    emergencyContactName: userProfile?.emergencyContactName || '',
    emergencyContactPhone: userProfile?.emergencyContactPhone || '',
    occupation: userProfile?.occupation || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      dateOfBirth: userProfile?.dateOfBirth || '',
      gender: userProfile?.gender || '',
      nationalId: userProfile?.nationalId || '',
      address: userProfile?.address || '',
      city: userProfile?.city || '',
      emergencyContactName: userProfile?.emergencyContactName || '',
      emergencyContactPhone: userProfile?.emergencyContactPhone || '',
      occupation: userProfile?.occupation || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Personal Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage your basic profile details and contact information
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
                Keep your information up to date for KYC compliance
              </span>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
                Basic Information
              </h4>
              
              <Input
                label="First Name"
                type="text"
                value={formData?.firstName}
                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                disabled={!isEditing}
                required
                placeholder="Enter your first name"
              />

              <Input
                label="Last Name"
                type="text"
                value={formData?.lastName}
                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                disabled={!isEditing}
                required
                placeholder="Enter your last name"
              />

              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                disabled={!isEditing}
                required
                placeholder="Enter your email address"
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                disabled={!isEditing}
                required
                placeholder="+254 700 000 000"
              />

              <Input
                label="Date of Birth"
                type="date"
                value={formData?.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                disabled={!isEditing}
                required
              />

              <Select
                label="Gender"
                options={genderOptions}
                value={formData?.gender}
                onChange={(value) => handleInputChange('gender', value)}
                disabled={!isEditing}
                placeholder="Select your gender"
              />
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
                Additional Information
              </h4>

              <Input
                label="National ID Number"
                type="text"
                value={formData?.nationalId}
                onChange={(e) => handleInputChange('nationalId', e?.target?.value)}
                disabled={!isEditing}
                required
                placeholder="Enter your national ID"
                description="Required for KYC verification"
              />

              <Input
                label="Occupation"
                type="text"
                value={formData?.occupation}
                onChange={(e) => handleInputChange('occupation', e?.target?.value)}
                disabled={!isEditing}
                placeholder="Enter your occupation"
              />

              <Input
                label="Address"
                type="text"
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                disabled={!isEditing}
                placeholder="Enter your address"
              />

              <Input
                label="City"
                type="text"
                value={formData?.city}
                onChange={(e) => handleInputChange('city', e?.target?.value)}
                disabled={!isEditing}
                placeholder="Enter your city"
              />

              <Input
                label="Emergency Contact Name"
                type="text"
                value={formData?.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
                disabled={!isEditing}
                placeholder="Enter emergency contact name"
              />

              <Input
                label="Emergency Contact Phone"
                type="tel"
                value={formData?.emergencyContactPhone}
                onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
                disabled={!isEditing}
                placeholder="+254 700 000 000"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;