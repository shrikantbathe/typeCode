import { AsyncLoadStatus } from "./AsyncLoadStatus.type";
import { IDecomAlertPayload } from "./IDecomAlertPayload";

export interface IDecomAlertPayloadState { 
    uiStatus: AsyncLoadStatus;
    data: IDecomAlertPayload;
    selectedStockId: string;
    count: number;
    lastModifiedBy: string;
    showDeclarationInfo: boolean;
}