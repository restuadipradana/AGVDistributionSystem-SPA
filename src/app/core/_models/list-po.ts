export interface ListPO {
  factory: string;
  line: string;
  mO_No: string;
  mO_Seq: string;
  po: string;
  style_No: string;
  style_Name: string;
  article: string;
  qty: number;
  plan_Start_ASY: Date;
  act_End_ASY: Date;
  comfirm_Date: Date;
  cRD: Date;
  prepStatId: string;
  stiStatId: string;
  isPrepCheck: boolean;
  isStiCheck: boolean;
  prepStat: string;
  stiStat: string;
}
