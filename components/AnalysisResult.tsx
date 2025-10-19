
import React from 'react';
import type { WasteClassification } from '../types';
import { RecycleIcon, CompostIcon, TrashIcon, LeafIcon } from '../constants';

interface AnalysisResultProps {
  result: WasteClassification | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    <span className="text-slate-600">Analyzing your item...</span>
  </div>
);

const ResultCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    colorClass: string;
}> = ({ title, icon, children, colorClass }) => (
    <div className={`bg-slate-50 p-4 rounded-lg border-l-4 ${colorClass}`}>
        <div className="flex items-start">
            <div className="flex-shrink-0 text-slate-500">{icon}</div>
            <div className="ml-3">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h4>
                <p className="mt-1 text-slate-800">{children}</p>
            </div>
        </div>
    </div>
);


const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const getClassificationDetails = () => {
    switch (result.classification) {
      case 'Recyclable':
        return {
          icon: <RecycleIcon className="h-6 w-6 text-blue-500" />,
          color: 'bg-blue-500',
          borderColor: 'border-blue-500',
        };
      case 'Compostable':
        return {
          icon: <CompostIcon className="h-6 w-6 text-orange-500" />,
          color: 'bg-orange-500',
          borderColor: 'border-orange-500',
        };
      case 'Non-Recyclable':
        return {
          icon: <TrashIcon className="h-6 w-6 text-slate-600" />,
          color: 'bg-slate-600',
          borderColor: 'border-slate-600',
        };
      default:
        return {
          icon: <TrashIcon className="h-6 w-6 text-slate-600" />,
          color: 'bg-slate-600',
          borderColor: 'border-slate-600',
        };
    }
  };

  const details = getClassificationDetails();

  return (
    <div className="mt-8 p-6 bg-white rounded-xl animate-fade-in">
        <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Analysis Complete</h3>
            <p className="text-slate-500">Here's what we found for: <strong className="text-green-700">{result.objectName}</strong></p>
        </div>

        <div className="flex justify-center items-center space-x-3 mb-8 p-4 rounded-full bg-slate-100 max-w-sm mx-auto">
            {details.icon}
            <span className={`text-lg font-bold ${details.color.replace('bg-', 'text-')}`}>
                {result.classification}
            </span>
        </div>

        <div className="space-y-4">
           <ResultCard title="Disposal Suggestion" icon={<TrashIcon className="w-5 h-5"/>} colorClass={details.borderColor}>
                {result.disposalSuggestion}
           </ResultCard>
           <ResultCard title="Eco-Friendly Tip" icon={<LeafIcon className="w-5 h-5"/>} colorClass="border-green-500">
                {result.ecoTip}
           </ResultCard>
        </div>
    </div>
  );
};

export default AnalysisResult;
