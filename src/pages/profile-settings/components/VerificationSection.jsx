import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VerificationSection = ({ isExpanded, onToggle, verificationStatus, onUploadDocument }) => {
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');

  const documentTypes = [
    { value: 'national_id', label: 'National ID Card' },
    { value: 'passport', label: 'Passport' },
    { value: 'driving_license', label: 'Driving License' },
    { value: 'utility_bill', label: 'Utility Bill' },
    { value: 'bank_statement', label: 'Bank Statement' }
  ];

  const verificationSteps = [
    {
      id: 'personal_info',
      title: 'Personal Information',
      description: 'Complete your basic profile information',
      status: verificationStatus?.personalInfo,
      icon: 'User'
    },
    {
      id: 'identity_verification',
      title: 'Identity Verification',
      description: 'Upload government-issued ID document',
      status: verificationStatus?.identityVerification,
      icon: 'FileText'
    },
    {
      id: 'address_verification',
      title: 'Address Verification',
      description: 'Upload proof of address document',
      status: verificationStatus?.addressVerification,
      icon: 'MapPin'
    },
    {
      id: 'phone_verification',
      title: 'Phone Verification',
      description: 'Verify your phone number via SMS',
      status: verificationStatus?.phoneVerification,
      icon: 'Phone'
    }
  ];

  const uploadedDocuments = [
    {
      id: 1,
      type: 'National ID Card',
      fileName: 'national_id_front.jpg',
      uploadDate: '2025-08-25',
      status: 'approved',
      size: '2.4 MB'
    },
    {
      id: 2,
      type: 'Utility Bill',
      fileName: 'electricity_bill_aug_2025.pdf',
      uploadDate: '2025-08-26',
      status: 'pending',
      size: '1.8 MB'
    },
    {
      id: 3,
      type: 'Bank Statement',
      fileName: 'bank_statement_july_2025.pdf',
      uploadDate: '2025-08-27',
      status: 'rejected',
      size: '3.2 MB',
      rejectionReason: 'Document is older than 3 months'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { name: 'Clock', color: 'text-warning' };
      case 'rejected':
        return { name: 'XCircle', color: 'text-destructive' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentType) {
      alert('Please select a document type and file');
      return;
    }

    setUploadingDoc(documentType);
    try {
      await onUploadDocument({
        type: documentType,
        file: selectedFile
      });
      setSelectedFile(null);
      setDocumentType('');
      alert('Document uploaded successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document');
    } finally {
      setUploadingDoc(null);
    }
  };

  const calculateProgress = () => {
    const totalSteps = verificationSteps?.length;
    const completedSteps = verificationSteps?.filter(step => step?.status === 'completed')?.length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="ShieldCheck" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Account Verification
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete KYC verification • {progress}% complete
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border space-y-6">
          {/* Progress Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
                Verification Progress
              </h4>
              <span className="text-sm font-body font-medium text-foreground">
                {progress}% Complete
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-deliberate" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationSteps?.map((step) => {
                const statusIcon = getStatusIcon(step?.status);
                return (
                  <div key={step?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon name={statusIcon?.name} size={20} className={statusIcon?.color} />
                    <div className="flex-1">
                      <p className="text-sm font-body font-medium text-foreground">
                        {step?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step?.description}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-caption capitalize ${getStatusBadge(step?.status)}`}>
                      {step?.status || 'pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
              Upload Documents
            </h4>
            
            <div className="bg-muted/30 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Document Type"
                  options={documentTypes}
                  value={documentType}
                  onChange={setDocumentType}
                  placeholder="Select document type"
                  required
                />

                <Input
                  label="Upload File"
                  type="file"
                  onChange={handleFileSelect}
                  description="Max file size: 5MB. Formats: JPG, PNG, PDF"
                  accept=".jpg,.jpeg,.png,.pdf"
                  required
                />
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">
                        {selectedFile?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile?.size / (1024 * 1024))?.toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    onClick={() => setSelectedFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  variant="default"
                  onClick={handleUpload}
                  loading={uploadingDoc !== null}
                  disabled={!selectedFile || !documentType}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Upload Document
                </Button>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
              Uploaded Documents
            </h4>
            
            <div className="space-y-3">
              {uploadedDocuments?.map((doc) => (
                <div key={doc?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">
                        {doc?.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doc?.fileName} • {doc?.size} • Uploaded {doc?.uploadDate}
                      </p>
                      {doc?.status === 'rejected' && doc?.rejectionReason && (
                        <p className="text-xs text-destructive mt-1">
                          Rejected: {doc?.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-caption capitalize ${getStatusBadge(doc?.status)}`}>
                      {doc?.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => console.log('Download document:', doc?.id)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationSection;