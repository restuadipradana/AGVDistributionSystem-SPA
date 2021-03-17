export interface ProcessStat {
  id: string;
  kind: string;
  qrCode: string;
  status: string;
  generateAt: Date;
  generateBy: string;
  scanAt: Date;
  scanBy: string;
  scanDeliveryAt: Date;
  scanDeliveryBy: string;
  createAt: Date;
  updateAt: Date;
  cell: string;
}
