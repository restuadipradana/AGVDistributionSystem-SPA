export interface SearchCriteriaDT {
  isPageLoad: boolean;
  filter: string;
  filter2: string;
  filter3: string;
}

export class ResponseDT {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

export interface SearchCriteriaInquiryRepDT {
  isPageLoad: boolean;
  line: string;
  po: string;
  startDate: Date;
  endDate: Date;
  status: string;
  building: string;
  seq: string;
}
