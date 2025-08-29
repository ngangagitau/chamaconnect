import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport, reportType }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeRawData: true,
    emailDelivery: false,
    emailAddress: '',
    fileName: `${reportType}_report_${new Date()?.toISOString()?.split('T')?.[0]}`
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'csv', label: 'CSV Spreadsheet' },
    { value: 'excel', label: 'Excel Workbook' }
  ];

  const handleExport = () => {
    onExport(exportConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200">
      <div className="bg-card border border-border rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">Export Report</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <Input
            label="File Name"
            type="text"
            value={exportConfig?.fileName}
            onChange={(e) => setExportConfig(prev => ({ ...prev, fileName: e?.target?.value }))}
            placeholder="Enter file name"
          />
          
          <Select
            label="Export Format"
            options={formatOptions}
            value={exportConfig?.format}
            onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
          />
          
          <div className="space-y-3">
            <h3 className="text-sm font-body font-medium text-foreground">Include Options</h3>
            
            <Checkbox
              label="Include Charts & Visualizations"
              checked={exportConfig?.includeCharts}
              onChange={(e) => setExportConfig(prev => ({ ...prev, includeCharts: e?.target?.checked }))}
            />
            
            <Checkbox
              label="Include Raw Data Tables"
              checked={exportConfig?.includeRawData}
              onChange={(e) => setExportConfig(prev => ({ ...prev, includeRawData: e?.target?.checked }))}
            />
            
            <Checkbox
              label="Send via Email"
              checked={exportConfig?.emailDelivery}
              onChange={(e) => setExportConfig(prev => ({ ...prev, emailDelivery: e?.target?.checked }))}
            />
          </div>
          
          {exportConfig?.emailDelivery && (
            <Input
              label="Email Address"
              type="email"
              value={exportConfig?.emailAddress}
              onChange={(e) => setExportConfig(prev => ({ ...prev, emailAddress: e?.target?.value }))}
              placeholder="Enter email address"
              required
            />
          )}
        </div>
        
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;