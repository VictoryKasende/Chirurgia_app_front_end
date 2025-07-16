import React from 'react';
import type { Biomarkers } from '../types/api';

interface BiomarkersFormProps {
  biomarkers: Biomarkers;
  onChange: (biomarkers: Biomarkers) => void;
  onLoadTestData?: (testData: Biomarkers) => void;
}

const biomarkerFields = [
  // Ligne 1 - Température et gaz sanguins
  { key: 'temperature', label: 'Température (°C)', type: 'number', step: '0.1' },
  { key: 'ph', label: 'pH', type: 'number', step: '0.01' },
  { key: 'pco2', label: 'PCO2 (mmHg)', type: 'number', step: '0.1' },
  { key: 'po2', label: 'PO2 (mmHg)', type: 'number', step: '0.1' },
  { key: 'hco3', label: 'HCO3 (mmol/L)', type: 'number', step: '0.1' },
  { key: 'be', label: 'BE (mmol/L)', type: 'number', step: '0.1' },
  
  // Ligne 2 - Métabolisme et électrolytes
  { key: 'lactate', label: 'Lactate (mmol/L)', type: 'number', step: '0.1' },
  { key: 'na', label: 'Sodium (mmol/L)', type: 'number', step: '0.1' },
  { key: 'k', label: 'Potassium (mmol/L)', type: 'number', step: '0.1' },
  { key: 'cl', label: 'Chlorure (mmol/L)', type: 'number', step: '0.1' },
  { key: 'urea', label: 'Urée (mmol/L)', type: 'number', step: '0.1' },
  { key: 'creatinine', label: 'Créatinine (mg/dL)', type: 'number', step: '0.1' },
  
  // Ligne 3 - Hématologie et coagulation
  { key: 'hgt', label: 'Glucose (mg/dL)', type: 'number', step: '1' },
  { key: 'wcc', label: 'Globules blancs (×10³/μL)', type: 'number', step: '0.1' },
  { key: 'hgb', label: 'Hémoglobine (g/L)', type: 'number', step: '1' },
  { key: 'plt', label: 'Plaquettes (×10³/μL)', type: 'number', step: '1' },
  { key: 'inr', label: 'INR', type: 'number', step: '0.1' },
];

const BiomarkersForm: React.FC<BiomarkersFormProps> = ({ 
  biomarkers, 
  onChange 
}) => {
  const handleChange = (key: keyof Biomarkers, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value);
    onChange({ ...biomarkers, [key]: numericValue });
  };

  const renderField = (field: typeof biomarkerFields[0]) => (
    <div key={field.key} className="flex flex-col">
      <label className="text-xs font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <input
        type={field.type}
        step={field.step}
        value={biomarkers[field.key as keyof Biomarkers] || ''}
        onChange={(e) => handleChange(field.key as keyof Biomarkers, e.target.value)}
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="0"
      />
    </div>
  );

  // Diviser les champs en groupes de 6
  const fieldGroups = [];
  for (let i = 0; i < biomarkerFields.length; i += 6) {
    fieldGroups.push(biomarkerFields.slice(i, i + 6));
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Biomarqueurs</h3>
      {fieldGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="grid grid-cols-6 gap-3">
          {group.map((field) => renderField(field))}
        </div>
      ))}
    </div>
  );
};

export default BiomarkersForm;
