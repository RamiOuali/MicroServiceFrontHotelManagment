export interface Reclamation {
    id: number;
    type: ReclamationType;
    description: string;
    date: Date;
    status: string; 
}

export enum  ReclamationType {
    BUG = 'BUG',
    FEATURE_REQUEST = 'FEATURE_REQUEST',
    GENERAL_FEEDBACK = 'GENERAL_FEEDBACK',
    OTHER = 'OTHER',

  }
  

