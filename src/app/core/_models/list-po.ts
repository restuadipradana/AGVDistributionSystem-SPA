export interface ListPO {
  Factory: string;
  Line: string;
  MO_No: string;
  MO_Seq: string;
  PO: string;
  Style_No: string;
  Style_Name: string;
  Article: string;
  Qty: number;
  Plan_Start_ASY: Date;
  Act_End_ASY: Date;
  Comfirm_Date: Date;
  CRD: Date;
  PrepStatId: string;
  StiStatId: string;
  IsPrepCheck: boolean;
  IsStiCheck: boolean;
}
