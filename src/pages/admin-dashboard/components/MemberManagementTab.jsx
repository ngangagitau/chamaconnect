import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MemberManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Mock member data
  const members = [
    {
      id: 1,
      name: 'Sarah Wanjiku',
      memberId: 'CM001234',
      email: 'sarah.wanjiku@email.com',
      phone: '+254712345678',
      status: 'active',
      joinDate: '2024-01-15',
      contribution: 125000,
      loanBalance: 25000,
      avatar: null
    },
    {
      id: 2,
      name: 'Peter Mwangi',
      memberId: 'CM001235',
      email: 'peter.mwangi@email.com',
      phone: '+254723456789',
      status: 'active',
      joinDate: '2024-01-20',
      contribution: 98000,
      loanBalance: 0,
      avatar: null
    },
    {
      id: 3,
      name: 'Mary Njeri',
      memberId: 'CM001236',
      email: 'mary.njeri@email.com',
      phone: '+254734567890',
      status: 'inactive',
      joinDate: '2024-02-01',
      contribution: 45000,
      loanBalance: 15000,
      avatar: null
    },
    {
      id: 4,
      name: 'John Kamau',
      memberId: 'CM001237',
      email: 'john.kamau@email.com',
      phone: '+254745678901',
      status: 'active',
      joinDate: '2024-02-10',
      contribution: 87000,
      loanBalance: 30000,
      avatar: null
    }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-error/10 text-error border-error/20';
      case 'suspended':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const filteredMembers = members?.filter(member =>
    member?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    member?.memberId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    member?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev => {
      if (prev?.includes(memberId)) {
        return prev?.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedMembers?.length === filteredMembers?.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers?.map(m => m?.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {selectedMembers?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedMembers?.length} selected
              </span>
              <Button size="sm" variant="outline">
                Bulk Actions
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" iconName="Download">
            Export
          </Button>
          <Button size="sm" variant="default" iconName="UserPlus">
            Add Member
          </Button>
        </div>
      </div>
      {/* Members Table */}
      <div className="bg-muted/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedMembers?.length === filteredMembers?.length && filteredMembers?.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Member
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Contributions
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Loan Balance
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers?.map((member) => (
                <tr key={member?.id} className="border-b border-border hover:bg-muted/20">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers?.includes(member?.id)}
                      onChange={() => handleSelectMember(member?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{member?.name}</div>
                        <div className="text-xs text-muted-foreground">{member?.memberId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-sm text-foreground">{member?.email}</div>
                      <div className="text-xs text-muted-foreground">{member?.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      KES {member?.contribution?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-medium ${member?.loanBalance > 0 ? 'text-warning' : 'text-success'}`}>
                      KES {member?.loanBalance?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize ${getStatusStyles(member?.status)}`}>
                      {member?.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="ghost" iconName="Eye" />
                      <Button size="sm" variant="ghost" iconName="Edit" />
                      <Button size="sm" variant="ghost" iconName="MoreHorizontal" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredMembers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No members found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first member'}
          </p>
          <Button variant="default" iconName="UserPlus">
            Add Member
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberManagementTab;