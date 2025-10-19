
export interface WasteClassification {
  objectName: string;
  classification: 'Recyclable' | 'Compostable' | 'Non-Recyclable';
  disposalSuggestion: string;
  ecoTip: string;
}
