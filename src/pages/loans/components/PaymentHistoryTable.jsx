import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentHistoryTable = ({ payments, onDownloadReceipt }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'status', label: 'Status' }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'failed':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatCurrency = (amount) => {
    return `KES ${amount?.toLocaleString()}`;
  };

  const filteredAndSortedPayments = payments?.filter(payment => {
      const matchesSearch = payment?.reference?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           payment?.loanId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = !statusFilter || payment?.status === statusFilter;
      return matchesSearch && matchesStatus;
    })?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = a?.amount;
          bValue = b?.amount;
          break;
        case 'status':
          aValue = a?.status;
          bValue = b?.status;
          break;
        default:
          aValue = a?.date;
          bValue = b?.date;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="History" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Payment History
        </h3>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Search by reference or loan ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          iconName="Search"
        />
        
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Filter by status"
        />
        
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Date</span>
                  <Icon 
                    name={sortBy === 'date' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">Reference</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Loan ID</th>
              <th className="text-right p-3 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth ml-auto"
                >
                  <span>Amount</span>
                  <Icon 
                    name={sortBy === 'amount' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-center p-3 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth mx-auto"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortBy === 'status' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-center p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPayments?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-8 text-muted-foreground">
                  <Icon name="FileX" size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No payment records found</p>
                  {(searchTerm || statusFilter) && (
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  )}
                </td>
              </tr>
            ) : (
              filteredAndSortedPayments?.map((payment) => (
                <tr key={payment?.id} className="border-b border-border/50 hover:bg-muted/50 transition-smooth">
                  <td className="p-3 font-medium text-foreground">
                    {new Date(payment.date)?.toLocaleDateString('en-GB')}
                    <div className="text-xs text-muted-foreground">
                      {new Date(payment.date)?.toLocaleTimeString('en-GB', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="p-3 text-foreground font-mono text-xs">
                    {payment?.reference}
                  </td>
                  <td className="p-3 text-foreground">
                    {payment?.loanId}
                  </td>
                  <td className="p-3 text-right font-medium text-foreground">
                    {formatCurrency(payment?.amount)}
                    {payment?.type && (
                      <div className="text-xs text-muted-foreground capitalize">
                        {payment?.type}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(payment?.status)}`}>
                      <Icon name={getStatusIcon(payment?.status)} size={10} />
                      <span className="capitalize">{payment?.status}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    {payment?.status === 'completed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownloadReceipt(payment)}
                        iconName="Download"
                        iconPosition="left"
                      >
                        Receipt
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Summary */}
      {filteredAndSortedPayments?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground mb-1">Total Payments</p>
              <p className="font-medium text-foreground">
                {filteredAndSortedPayments?.length} transactions
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground mb-1">Total Amount</p>
              <p className="font-medium text-foreground">
                {formatCurrency(
                  filteredAndSortedPayments?.filter(p => p?.status === 'completed')?.reduce((sum, p) => sum + p?.amount, 0)
                )}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground mb-1">Success Rate</p>
              <p className="font-medium text-foreground">
                {Math.round(
                  (filteredAndSortedPayments?.filter(p => p?.status === 'completed')?.length / 
                   filteredAndSortedPayments?.length) * 100
                )}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryTable;