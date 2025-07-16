import React from 'react';
import type { ClinicalTexts } from '../types/api';

interface ClinicalTextsFormProps {
  clinicalTexts: ClinicalTexts;
  onChange: (clinicalTexts: ClinicalTexts) => void;
}

const clinicalFields = [
  { key: 'diagnosis', label: 'Diagnostic', placeholder: 'Diagnostic principal du patient...' },
  { key: 'surgery', label: 'Chirurgie', placeholder: 'Type de chirurgie effectuée...' },
  { key: 'problems', label: 'Problèmes', placeholder: 'Complications ou problèmes identifiés...' },
  { key: 'investigations', label: 'Examens', placeholder: 'Examens et tests effectués...' },
  { key: 'clinical_course', label: 'Evolution clinique', placeholder: 'Evolution et cours clinique...' },
];

const ClinicalTextsForm: React.FC<ClinicalTextsFormProps> = ({ 
  clinicalTexts, 
  onChange 
}) => {
  const handleChange = (key: keyof ClinicalTexts, value: string) => {
    onChange({ ...clinicalTexts, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Données cliniques textuelles</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {clinicalFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <textarea
              value={clinicalTexts[field.key as keyof ClinicalTexts] || ''}
              onChange={(e) => handleChange(field.key as keyof ClinicalTexts, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalTextsForm;
