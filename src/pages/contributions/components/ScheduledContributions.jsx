import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ScheduledContributions = ({ scheduledContributions = [], onCreateSchedule, onUpdateSchedule, onDeleteSchedule }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    frequency: '',
    startDate: '',
    endDate: '',
    groupId: '',
    purpose: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly', description: 'Every week' },
    { value: 'biweekly', label: 'Bi-weekly', description: 'Every 2 weeks' },
    { value: 'monthly', label: 'Monthly', description: 'Every month' },
    { value: 'quarterly', label: 'Quarterly', description: 'Every 3 months' }
  ];

  const purposeOptions = [
    { value: 'regular', label: 'Regular Contribution' },
    { value: 'emergency', label: 'Emergency Fund' },
    { value: 'project', label: 'Project Fund' },
    { value: 'bonus', label: 'Bonus Contribution' }
  ];

  const groupOptions = [
    { value: 'group1', label: 'Umoja Savings Group' },
    { value: 'group2', label: 'Harambee Circle' },
    { value: 'group3', label: 'Tumaini Chama' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (parseFloat(formData?.amount) < 100) {
      newErrors.amount = 'Minimum amount is KES 100';
    }

    if (!formData?.frequency) {
      newErrors.frequency = 'Please select frequency';
    }

    if (!formData?.startDate) {
      newErrors.startDate = 'Please select start date';
    }

    if (!formData?.groupId) {
      newErrors.groupId = 'Please select a group';
    }

    if (!formData?.purpose) {
      newErrors.purpose = 'Please select purpose';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onCreateSchedule?.(formData);
      setFormData({
        amount: '',
        frequency: '',
        startDate: '',
        endDate: '',
        groupId: '',
        purpose: '',
        isActive: true
      });
      setShowCreateForm(false);
    }
  };

  const getFrequencyLabel = (frequency) => {
    const option = frequencyOptions?.find(opt => opt?.value === frequency);
    return option ? option?.label : frequency;
  };

  const getNextPaymentDate = (schedule) => {
    const nextDate = new Date(schedule.nextPayment);
    return nextDate?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const toggleScheduleStatus = (scheduleId, currentStatus) => {
    onUpdateSchedule?.(scheduleId, { isActive: !currentStatus });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">Scheduled Contributions</h2>
              <p className="text-sm text-muted-foreground">Automate your regular payments</p>
            </div>
          </div>
          
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'New Schedule'}
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Create Schedule Form */}
        {showCreateForm && (
          <div className="bg-muted/30 rounded-lg p-6 mb-6 border border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Create New Schedule</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Amount (KES)"
                  type="number"
                  placeholder="Enter amount"
                  value={formData?.amount}
                  onChange={(e) => handleInputChange('amount', e?.target?.value)}
                  error={errors?.amount}
                  required
                  min="100"
                />
                
                <Select
                  label="Frequency"
                  placeholder="Select frequency"
                  options={frequencyOptions}
                  value={formData?.frequency}
                  onChange={(value) => handleInputChange('frequency', value)}
                  error={errors?.frequency}
                  required
                />
                
                <Input
                  label="Start Date"
                  type="date"
                  value={formData?.startDate}
                  onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                  error={errors?.startDate}
                  required
                  min={new Date()?.toISOString()?.split('T')?.[0]}
                />
                
                <Input
                  label="End Date (Optional)"
                  type="date"
                  value={formData?.endDate}
                  onChange={(e) => handleInputChange('endDate', e?.target?.value)}
                  min={formData?.startDate}
                />
                
                <Select
                  label="Group"
                  placeholder="Select group"
                  options={groupOptions}
                  value={formData?.groupId}
                  onChange={(value) => handleInputChange('groupId', value)}
                  error={errors?.groupId}
                  required
                />
                
                <Select
                  label="Purpose"
                  placeholder="Select purpose"
                  options={purposeOptions}
                  value={formData?.purpose}
                  onChange={(value) => handleInputChange('purpose', value)}
                  error={errors?.purpose}
                  required
                />
              </div>
              
              <Checkbox
                label="Activate schedule immediately"
                checked={formData?.isActive}
                onChange={(e) => handleInputChange('isActive', e?.target?.checked)}
              />
              
              <div className="flex space-x-3 pt-4">
                <Button type="submit" variant="default" iconName="Save" iconPosition="left">
                  Create Schedule
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Scheduled Contributions List */}
        {scheduledContributions?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No Scheduled Contributions</h3>
            <p className="text-muted-foreground mb-4">Set up automatic payments to never miss a contribution</p>
            <Button 
              variant="outline" 
              iconName="Plus" 
              iconPosition="left"
              onClick={() => setShowCreateForm(true)}
            >
              Create First Schedule
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledContributions?.map((schedule) => (
              <div
                key={schedule?.id}
                className={`p-4 rounded-lg border transition-smooth ${
                  schedule?.isActive 
                    ? 'bg-success/5 border-success/20' :'bg-muted/30 border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      schedule?.isActive 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={schedule?.isActive ? "Play" : "Pause"} size={18} />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-body font-medium text-foreground">
                          KES {schedule?.amount?.toLocaleString()} - {getFrequencyLabel(schedule?.frequency)}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                          schedule?.isActive 
                            ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                        }`}>
                          {schedule?.isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="Users" size={14} />
                          <span>{schedule?.groupName}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Target" size={14} />
                          <span>{schedule?.purpose}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="CalendarDays" size={14} />
                          <span>Next: {getNextPaymentDate(schedule)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleScheduleStatus(schedule?.id, schedule?.isActive)}
                      title={schedule?.isActive ? 'Pause Schedule' : 'Resume Schedule'}
                    >
                      <Icon name={schedule?.isActive ? "Pause" : "Play"} size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('Edit schedule', schedule?.id)}
                      title="Edit Schedule"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteSchedule?.(schedule?.id)}
                      title="Delete Schedule"
                      className="text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledContributions;