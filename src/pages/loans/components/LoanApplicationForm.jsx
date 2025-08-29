import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoanApplicationForm = ({ onSubmit, onCancel, eligibilityData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    term: '',
    guarantor1: '',
    guarantor2: '',
    documents: []
  });
  const [errors, setErrors] = useState({});

  const purposeOptions = [
    { value: 'business', label: 'Business Expansion' },
    { value: 'education', label: 'Education Fees' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'agriculture', label: 'Agricultural Investment' },
    { value: 'home', label: 'Home Improvement' },
    { value: 'other', label: 'Other' }
  ];

  const termOptions = [
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
    { value: '18', label: '18 Months' },
    { value: '24', label: '24 Months' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData?.amount) newErrors.amount = 'Loan amount is required';
        else if (parseFloat(formData?.amount) < 1000) newErrors.amount = 'Minimum loan amount is KES 1,000';
        else if (parseFloat(formData?.amount) > eligibilityData?.maxAmount) {
          newErrors.amount = `Maximum eligible amount is KES ${eligibilityData?.maxAmount?.toLocaleString()}`;
        }
        break;
      case 2:
        if (!formData?.purpose) newErrors.purpose = 'Loan purpose is required';
        if (!formData?.term) newErrors.term = 'Repayment term is required';
        break;
      case 3:
        if (!formData?.guarantor1) newErrors.guarantor1 = 'First guarantor is required';
        if (!formData?.guarantor2) newErrors.guarantor2 = 'Second guarantor is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  const calculateMonthlyPayment = () => {
    if (!formData?.amount || !formData?.term) return 0;
    const principal = parseFloat(formData?.amount);
    const months = parseInt(formData?.term);
    const interestRate = 0.15; // 15% annual interest
    const monthlyRate = interestRate / 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    return monthlyPayment;
  };

  const steps = [
    { number: 1, title: 'Loan Amount', icon: 'DollarSign' },
    { number: 2, title: 'Loan Details', icon: 'FileText' },
    { number: 3, title: 'Guarantors', icon: 'Users' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps?.map((step, index) => (
            <div key={step?.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                currentStep >= step?.number 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-border text-muted-foreground'
              }`}>
                {currentStep > step?.number ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              {index < steps?.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step?.number ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {steps?.[currentStep - 1]?.title}
        </h3>
      </div>
      {/* Step Content */}
      <div className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <Input
              label="Loan Amount (KES)"
              type="number"
              placeholder="Enter amount"
              value={formData?.amount}
              onChange={(e) => handleInputChange('amount', e?.target?.value)}
              error={errors?.amount}
              required
            />
            
            {formData?.amount && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-body font-medium text-foreground mb-2">Eligibility Check</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maximum Eligible:</span>
                    <span className="font-medium">KES {eligibilityData?.maxAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Contributions:</span>
                    <span className="font-medium">KES {eligibilityData?.totalContributions?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Approval Likelihood:</span>
                    <span className={`font-medium ${
                      parseFloat(formData?.amount) <= eligibilityData?.maxAmount * 0.7 
                        ? 'text-success' 
                        : parseFloat(formData?.amount) <= eligibilityData?.maxAmount 
                        ? 'text-warning' :'text-error'
                    }`}>
                      {parseFloat(formData?.amount) <= eligibilityData?.maxAmount * 0.7 
                        ? 'High' 
                        : parseFloat(formData?.amount) <= eligibilityData?.maxAmount 
                        ? 'Medium' :'Low'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <Select
              label="Loan Purpose"
              options={purposeOptions}
              value={formData?.purpose}
              onChange={(value) => handleInputChange('purpose', value)}
              error={errors?.purpose}
              required
            />
            
            <Select
              label="Repayment Term"
              options={termOptions}
              value={formData?.term}
              onChange={(value) => handleInputChange('term', value)}
              error={errors?.term}
              required
            />
            
            {formData?.amount && formData?.term && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-body font-medium text-foreground mb-2">Repayment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Payment:</span>
                    <span className="font-medium">KES {calculateMonthlyPayment()?.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Interest:</span>
                    <span className="font-medium">KES {((calculateMonthlyPayment() * parseInt(formData?.term)) - parseFloat(formData?.amount))?.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Repayment:</span>
                    <span className="font-medium">KES {(calculateMonthlyPayment() * parseInt(formData?.term))?.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Guarantor Requirements</p>
                  <p className="text-muted-foreground">
                    Both guarantors must be active Chama members with good standing and minimum 6 months membership.
                  </p>
                </div>
              </div>
            </div>
            
            <Input
              label="First Guarantor"
              type="text"
              placeholder="Enter member name or ID"
              value={formData?.guarantor1}
              onChange={(e) => handleInputChange('guarantor1', e?.target?.value)}
              error={errors?.guarantor1}
              required
            />
            
            <Input
              label="Second Guarantor"
              type="text"
              placeholder="Enter member name or ID"
              value={formData?.guarantor2}
              onChange={(e) => handleInputChange('guarantor2', e?.target?.value)}
              error={errors?.guarantor2}
              required
            />
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
          
          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              iconName="Send"
              iconPosition="left"
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;