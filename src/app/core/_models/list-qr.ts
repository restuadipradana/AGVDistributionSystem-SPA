import { ListPO } from './list-po';
export class ListQRCode {
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
  pOlist: ListPO[];
  cell: string;
  totQty: number;
  isCheck: boolean;
  cellName: string;
}
