import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminTransactionTable = ({ transactions = [] }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'approved':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'rejected':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'contribution':
        return 'PiggyBank';
      case 'loan_repayment':
        return 'ArrowDownRight';
      case 'loan_disbursement':
        return 'ArrowUpRight';
      case 'withdrawal':
        return 'Minus';
      default:
        return 'DollarSign';
    }
  };

  const formatTransactionType = (type) => {
    switch (type) {
      case 'contribution':
        return 'Contribution';
      case 'loan_repayment':
        return 'Loan Repayment';
      case 'loan_disbursement':
        return 'Loan Disbursement';
      case 'withdrawal':
        return 'Withdrawal';
      default:
        return type;
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleSelectTransaction = (transactionId) => {
    setSelectedTransactions(prev => {
      if (prev?.includes(transactionId)) {
        return prev?.filter(id => id !== transactionId);
      } else {
        return [...prev, transactionId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedTransactions?.length === transactions?.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions?.map(t => t?.id));
    }
  };

  const filteredTransactions = transactions?.filter(transaction => {
    if (filterStatus === 'all') return true;
    return transaction?.status === filterStatus;
  });

  const sortedTransactions = [...filteredTransactions]?.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'date':
        aValue = a?.date;
        bValue = b?.date;
        break;
      case 'amount':
        aValue = a?.amount;
        bValue = b?.amount;
        break;
      case 'member':
        aValue = a?.member;
        bValue = b?.member;
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-4">
      {/* Filter and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="border border-border rounded-lg px-3 py-2 bg-card text-foreground text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
          
          {selectedTransactions?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedTransactions?.length} selected
              </span>
              <Button size="sm" variant="outline">
                Export Selected
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" iconName="Download">
            Export
          </Button>
          <Button size="sm" variant="outline" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.length === transactions?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="text-left py-3 px-2 cursor-pointer hover:bg-muted"
                onClick={() => handleSort('member')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">Member</span>
                  <Icon name="ArrowUpDown" size={12} />
                </div>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">Type</span>
              </th>
              <th 
                className="text-left py-3 px-2 cursor-pointer hover:bg-muted"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">Amount</span>
                  <Icon name="ArrowUpDown" size={12} />
                </div>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
              <th 
                className="text-left py-3 px-2 cursor-pointer hover:bg-muted"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-muted-foreground">Date</span>
                  <Icon name="ArrowUpDown" size={12} />
                </div>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions?.map((transaction) => (
              <tr key={transaction?.id} className="border-b border-border hover:bg-muted/30">
                <td className="py-3 px-2">
                  <input
                    type="checkbox"
                    checked={selectedTransactions?.includes(transaction?.id)}
                    onChange={() => handleSelectTransaction(transaction?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="py-3 px-2">
                  <div>
                    <div className="text-sm font-medium text-foreground">{transaction?.member}</div>
                    <div className="text-xs text-muted-foreground">{transaction?.memberId}</div>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getTypeIcon(transaction?.type)} size={14} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{formatTransactionType(transaction?.type)}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm font-medium text-foreground">
                    KES {transaction?.amount?.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusStyles(transaction?.status)}`}>
                    {transaction?.status}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(transaction?.date)}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-1">
                    <Button size="sm" variant="ghost" iconName="Eye">
                    </Button>
                    <Button size="sm" variant="ghost" iconName="MoreHorizontal">
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedTransactions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default AdminTransactionTable;