import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EligibilityChecker = ({ memberData, onStartApplication }) => {
  const [eligibilityResults, setEligibilityResults] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkEligibility = async () => {
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      const totalContributions = memberData?.totalContributions || 0;
      const membershipMonths = memberData?.membershipMonths || 0;
      const activeLoans = memberData?.activeLoans || 0;
      const paymentHistory = memberData?.paymentHistory || 'good';
      
      // Calculate eligibility based on business rules
      const maxLoanMultiplier = paymentHistory === 'excellent' ? 3 : 
                               paymentHistory === 'good' ? 2.5 : 
                               paymentHistory === 'fair' ? 2 : 1.5;
      
      const maxAmount = Math.min(totalContributions * maxLoanMultiplier, 500000);
      
      const eligibilityScore = calculateEligibilityScore({
        totalContributions,
        membershipMonths,
        activeLoans,
        paymentHistory
      });
      
      const isEligible = eligibilityScore >= 60 && membershipMonths >= 6 && activeLoans < 2;
      
      setEligibilityResults({
        isEligible,
        maxAmount,
        eligibilityScore,
        factors: {
          contributions: {
            value: totalContributions,
            score: Math.min((totalContributions / 50000) * 30, 30),
            weight: 30
          },
          membership: {
            value: membershipMonths,
            score: Math.min((membershipMonths / 12) * 25, 25),
            weight: 25
          },
          activeLoans: {
            value: activeLoans,
            score: activeLoans === 0 ? 25 : activeLoans === 1 ? 15 : 0,
            weight: 25
          },
          paymentHistory: {
            value: paymentHistory,
            score: paymentHistory === 'excellent' ? 20 : 
                   paymentHistory === 'good' ? 15 : 
                   paymentHistory === 'fair' ? 10 : 5,
            weight: 20
          }
        },
        recommendations: generateRecommendations({
          totalContributions,
          membershipMonths,
          activeLoans,
          paymentHistory,
          eligibilityScore
        })
      });
      
      setIsChecking(false);
    }, 2000);
  };

  const calculateEligibilityScore = ({ totalContributions, membershipMonths, activeLoans, paymentHistory }) => {
    let score = 0;
    
    // Contributions score (30%)
    score += Math.min((totalContributions / 50000) * 30, 30);
    
    // Membership duration score (25%)
    score += Math.min((membershipMonths / 12) * 25, 25);
    
    // Active loans score (25%)
    score += activeLoans === 0 ? 25 : activeLoans === 1 ? 15 : 0;
    
    // Payment history score (20%)
    const historyScore = paymentHistory === 'excellent' ? 20 : 
                        paymentHistory === 'good' ? 15 : 
                        paymentHistory === 'fair' ? 10 : 5;
    score += historyScore;
    
    return Math.round(score);
  };

  const generateRecommendations = ({ totalContributions, membershipMonths, activeLoans, paymentHistory, eligibilityScore }) => {
    const recommendations = [];
    
    if (totalContributions < 20000) {
      recommendations?.push({
        type: 'improvement',
        icon: 'TrendingUp',
        title: 'Increase Your Contributions',
        description: 'Make regular contributions to improve your loan eligibility. Target at least KES 20,000 in total contributions.'
      });
    }
    
    if (membershipMonths < 12) {
      recommendations?.push({
        type: 'info',
        icon: 'Calendar',
        title: 'Build Your Membership History',
        description: `You've been a member for ${membershipMonths} months. Longer membership improves your eligibility.`
      });
    }
    
    if (activeLoans >= 2) {
      recommendations?.push({
        type: 'warning',
        icon: 'AlertTriangle',
        title: 'Reduce Active Loans',
        description: 'Consider paying off existing loans before applying for new ones to improve your eligibility.'
      });
    }
    
    if (paymentHistory !== 'excellent' && paymentHistory !== 'good') {
      recommendations?.push({
        type: 'improvement',
        icon: 'CheckCircle',
        title: 'Improve Payment History',
        description: 'Make timely payments on existing loans and contributions to build a better credit profile.'
      });
    }
    
    if (eligibilityScore >= 80) {
      recommendations?.push({
        type: 'success',
        icon: 'Star',
        title: 'Excellent Profile',
        description: 'You have an excellent loan profile. You qualify for our best rates and terms.'
      });
    }
    
    return recommendations;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const formatCurrency = (amount) => {
    return `KES ${amount?.toLocaleString()}`;
  };

  useEffect(() => {
    if (memberData) {
      checkEligibility();
    }
  }, [memberData]);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Shield" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Loan Eligibility Check
        </h3>
      </div>
      {isChecking ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking your eligibility...</p>
        </div>
      ) : eligibilityResults ? (
        <div className="space-y-6">
          {/* Eligibility Status */}
          <div className={`rounded-lg p-4 border ${
            eligibilityResults?.isEligible 
              ? 'bg-success/5 border-success/20' :'bg-error/5 border-error/20'
          }`}>
            <div className="flex items-center space-x-3">
              <Icon 
                name={eligibilityResults?.isEligible ? "CheckCircle" : "XCircle"} 
                size={24} 
                className={eligibilityResults?.isEligible ? "text-success" : "text-error"} 
              />
              <div>
                <h4 className="font-body font-semibold text-foreground">
                  {eligibilityResults?.isEligible ? 'You are eligible for a loan!' : 'Not eligible at this time'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {eligibilityResults?.isEligible 
                    ? `Maximum loan amount: ${formatCurrency(eligibilityResults?.maxAmount)}`
                    : 'Please review the recommendations below to improve your eligibility'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Eligibility Score */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Eligibility Score</span>
              <span className={`text-lg font-bold ${getScoreColor(eligibilityResults?.eligibilityScore)}`}>
                {eligibilityResults?.eligibilityScore}/100
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full transition-smooth ${
                  eligibilityResults?.eligibilityScore >= 80 ? 'bg-success' :
                  eligibilityResults?.eligibilityScore >= 60 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${eligibilityResults?.eligibilityScore}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {getScoreLabel(eligibilityResults?.eligibilityScore)} - {
                eligibilityResults?.eligibilityScore >= 60 ? 'Meets minimum requirements' : 'Below minimum requirements'
              }
            </p>
          </div>

          {/* Score Breakdown */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">Score Breakdown</h4>
            <div className="space-y-3">
              {Object.entries(eligibilityResults?.factors)?.map(([key, factor]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {typeof factor?.value === 'number' 
                        ? key === 'contributions' ? formatCurrency(factor?.value)
                        : key === 'membership' ? `${factor?.value} months`
                        : key === 'activeLoans' ? `${factor?.value} active`
                        : factor?.value
                        : factor?.value
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {Math.round(factor?.score)}/{factor?.weight}
                    </p>
                    <div className="w-16 bg-background rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full bg-primary transition-smooth"
                        style={{ width: `${(factor?.score / factor?.weight) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {eligibilityResults?.recommendations?.length > 0 && (
            <div>
              <h4 className="font-body font-medium text-foreground mb-3">Recommendations</h4>
              <div className="space-y-3">
                {eligibilityResults?.recommendations?.map((rec, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    rec?.type === 'success' ? 'bg-success/5 border-success/20' :
                    rec?.type === 'warning' ? 'bg-warning/5 border-warning/20' :
                    rec?.type === 'improvement'? 'bg-primary/5 border-primary/20' : 'bg-muted border-border'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <Icon 
                        name={rec?.icon} 
                        size={16} 
                        className={`mt-0.5 ${
                          rec?.type === 'success' ? 'text-success' :
                          rec?.type === 'warning' ? 'text-warning' :
                          rec?.type === 'improvement'? 'text-primary' : 'text-muted-foreground'
                        }`} 
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">{rec?.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{rec?.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {eligibilityResults?.isEligible && (
            <div className="pt-4 border-t border-border">
              <Button
                onClick={() => onStartApplication(eligibilityResults)}
                iconName="FileText"
                iconPosition="left"
                className="w-full"
              >
                Start Loan Application
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Shield" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-4">Check your loan eligibility</p>
          <Button onClick={checkEligibility} iconName="Play" iconPosition="left">
            Check Eligibility
          </Button>
        </div>
      )}
    </div>
  );
};

export default EligibilityChecker;