import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoanCalculator = ({ className = '' }) => {
  const [calculatorData, setCalculatorData] = useState({
    amount: '',
    term: '',
    interestRate: '15'
  });
  const [results, setResults] = useState(null);

  const termOptions = [
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
    { value: '18', label: '18 Months' },
    { value: '24', label: '24 Months' },
    { value: '36', label: '36 Months' }
  ];

  const calculateLoan = () => {
    const principal = parseFloat(calculatorData?.amount);
    const months = parseInt(calculatorData?.term);
    const annualRate = parseFloat(calculatorData?.interestRate) / 100;
    const monthlyRate = annualRate / 12;

    if (!principal || !months || principal <= 0 || months <= 0) {
      setResults(null);
      return;
    }

    // Calculate monthly payment using compound interest formula
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    // Generate payment schedule
    let balance = principal;
    const schedule = [];
    
    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule?.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [calculatorData]);

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount) => {
    return `KES ${amount?.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Calculator" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Loan Calculator
        </h3>
      </div>
      {/* Calculator Inputs */}
      <div className="space-y-4 mb-6">
        <Input
          label="Loan Amount (KES)"
          type="number"
          placeholder="Enter loan amount"
          value={calculatorData?.amount}
          onChange={(e) => handleInputChange('amount', e?.target?.value)}
          min="1000"
          step="1000"
        />
        
        <Select
          label="Repayment Term"
          options={termOptions}
          value={calculatorData?.term}
          onChange={(value) => handleInputChange('term', value)}
          placeholder="Select term"
        />
        
        <Input
          label="Interest Rate (%)"
          type="number"
          value={calculatorData?.interestRate}
          onChange={(e) => handleInputChange('interestRate', e?.target?.value)}
          min="1"
          max="50"
          step="0.1"
          description="Annual interest rate"
        />
      </div>
      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">Monthly Payment</span>
              </div>
              <p className="text-lg font-heading font-semibold text-foreground">
                {formatCurrency(results?.monthlyPayment)}
              </p>
            </div>
            
            <div className="bg-warning/5 rounded-lg p-4 border border-warning/10">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-warning" />
                <span className="text-xs text-muted-foreground">Total Interest</span>
              </div>
              <p className="text-lg font-heading font-semibold text-foreground">
                {formatCurrency(results?.totalInterest)}
              </p>
            </div>
            
            <div className="bg-success/5 rounded-lg p-4 border border-success/10">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="DollarSign" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">Total Payment</span>
              </div>
              <p className="text-lg font-heading font-semibold text-foreground">
                {formatCurrency(results?.totalPayment)}
              </p>
            </div>
          </div>

          {/* Payment Schedule */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">Payment Schedule</h4>
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background sticky top-0">
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium text-muted-foreground">Month</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Payment</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Principal</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Interest</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.schedule?.map((payment) => (
                      <tr key={payment?.month} className="border-b border-border/50">
                        <td className="p-3 font-medium text-foreground">{payment?.month}</td>
                        <td className="p-3 text-right text-foreground">
                          {formatCurrency(payment?.payment)}
                        </td>
                        <td className="p-3 text-right text-foreground">
                          {formatCurrency(payment?.principal)}
                        </td>
                        <td className="p-3 text-right text-warning">
                          {formatCurrency(payment?.interest)}
                        </td>
                        <td className="p-3 text-right text-muted-foreground">
                          {formatCurrency(payment?.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Important Note</p>
                <p className="text-muted-foreground">
                  This calculator provides estimates based on the information provided. 
                  Actual loan terms may vary based on your eligibility, credit history, 
                  and Chama policies. Please consult with administrators for final terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;