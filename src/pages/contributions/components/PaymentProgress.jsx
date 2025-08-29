import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentProgress = ({ 
  isVisible = false, 
  currentStep = 1, 
  paymentData = {}, 
  onCancel,
  onRetry 
}) => {
  const steps = [
    {
      id: 1,
      title: 'Initiating Payment',
      description: 'Connecting to payment gateway...',
      icon: 'CreditCard'
    },
    {
      id: 2,
      title: 'Processing Payment',
      description: 'Verifying payment details...',
      icon: 'Loader'
    },
    {
      id: 3,
      title: 'Confirming Transaction',
      description: 'Updating your account balance...',
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'active': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-lg border border-border shadow-soft-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Wallet" size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            Processing Your Contribution
          </h2>
          <p className="text-muted-foreground">
            Please wait while we process your payment of KES {paymentData?.amount?.toLocaleString()}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === steps?.length - 1;

            return (
              <div key={step?.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepColor(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : status === 'active' ? (
                      <Icon name={step?.icon} size={16} className="animate-spin" />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 h-8 mt-2 ${
                      status === 'completed' ? 'bg-success' : 'bg-border'
                    }`} />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className={`font-body font-medium ${
                    status === 'active' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step?.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Details */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Amount:</span>
              <div className="font-semibold text-foreground">KES {paymentData?.amount?.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Method:</span>
              <div className="font-semibold text-foreground">{paymentData?.paymentMethod}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Group:</span>
              <div className="font-semibold text-foreground">{paymentData?.groupName}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Reference:</span>
              <div className="font-semibold text-foreground font-mono text-xs">
                {paymentData?.reference || 'CHM-' + Date.now()?.toString()?.slice(-6)}
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
          <Icon name="Shield" size={14} />
          <span>Your transaction is secured with bank-level encryption</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
          
          {currentStep === 1 && (
            <Button
              variant="ghost"
              onClick={onRetry}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Retry
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round((currentStep / steps?.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / steps?.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProgress;