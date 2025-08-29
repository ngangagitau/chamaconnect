import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ContributionForm = ({ onSubmit, isProcessing = false, userBalance = 0 }) => {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: '',
    purpose: '',
    groupId: ''
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { value: 'mpesa', label: 'M-Pesa', description: 'Mobile money payment' },
    { value: 'bank', label: 'Bank Transfer', description: 'Direct bank transfer' },
    { value: 'cash', label: 'Cash Deposit', description: 'Physical cash payment' },
    { value: 'airtel', label: 'Airtel Money', description: 'Airtel mobile money' }
  ];

  const purposes = [
    { value: 'regular', label: 'Regular Contribution', description: 'Monthly group savings' },
    { value: 'emergency', label: 'Emergency Fund', description: 'Emergency fund contribution' },
    { value: 'project', label: 'Project Fund', description: 'Special project funding' },
    { value: 'penalty', label: 'Late Payment', description: 'Penalty payment' },
    { value: 'bonus', label: 'Bonus Contribution', description: 'Additional voluntary payment' }
  ];

  const groups = [
    { value: 'group1', label: 'Umoja Savings Group', description: '25 active members' },
    { value: 'group2', label: 'Harambee Circle', description: '18 active members' },
    { value: 'group3', label: 'Tumaini Chama', description: '32 active members' }
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
      newErrors.amount = 'Minimum contribution amount is KES 100';
    } else if (parseFloat(formData?.amount) > 50000) {
      newErrors.amount = 'Maximum contribution amount is KES 50,000';
    }

    if (!formData?.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    if (!formData?.purpose) {
      newErrors.purpose = 'Please select contribution purpose';
    }

    if (!formData?.groupId) {
      newErrors.groupId = 'Please select a group';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="PiggyBank" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Make Contribution</h2>
          <p className="text-sm text-muted-foreground">Add funds to your group savings</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Contribution Amount"
              type="number"
              placeholder="Enter amount (KES)"
              value={formData?.amount}
              onChange={(e) => handleInputChange('amount', e?.target?.value)}
              error={errors?.amount}
              required
              min="100"
              max="50000"
              step="1"
              description="Minimum: KES 100, Maximum: KES 50,000"
            />
          </div>

          <Select
            label="Select Group"
            placeholder="Choose your group"
            options={groups}
            value={formData?.groupId}
            onChange={(value) => handleInputChange('groupId', value)}
            error={errors?.groupId}
            required
            searchable
          />

          <Select
            label="Payment Method"
            placeholder="Choose payment method"
            options={paymentMethods}
            value={formData?.paymentMethod}
            onChange={(value) => handleInputChange('paymentMethod', value)}
            error={errors?.paymentMethod}
            required
          />

          <div className="md:col-span-2">
            <Select
              label="Contribution Purpose"
              placeholder="Select purpose"
              options={purposes}
              value={formData?.purpose}
              onChange={(value) => handleInputChange('purpose', value)}
              error={errors?.purpose}
              required
            />
          </div>
        </div>

        {formData?.amount && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Amount to contribute:</span>
              <span className="font-semibold text-foreground">KES {parseFloat(formData?.amount || 0)?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Processing fee:</span>
              <span className="font-semibold text-foreground">KES {Math.ceil(parseFloat(formData?.amount || 0) * 0.01)?.toLocaleString()}</span>
            </div>
            <hr className="my-2 border-border" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span className="text-foreground">Total amount:</span>
              <span className="text-primary">KES {(parseFloat(formData?.amount || 0) + Math.ceil(parseFloat(formData?.amount || 0) * 0.01))?.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            variant="default"
            loading={isProcessing}
            iconName="Send"
            iconPosition="left"
            className="flex-1"
            disabled={!formData?.amount || !formData?.paymentMethod || !formData?.purpose || !formData?.groupId}
          >
            {isProcessing ? 'Processing Payment...' : 'Make Contribution'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => console.log('Schedule contribution')}
          >
            Schedule Payment
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} />
          <span>Your payment is secured with 256-bit SSL encryption</span>
        </div>
      </form>
    </div>
  );
};

export default ContributionForm;