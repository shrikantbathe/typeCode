import { IMatCustomConfirmDialogConfig } from "./IMatCustomConfirmDialogConfig";

export interface IMatConfirmModalDialogConfig extends IMatCustomConfirmDialogConfig {
    header?: string;
    message: string;
    minHeightInPixcel?: number;
    
    minWidthInPixcel?: number;
    
    maxHeightInPixcel?: number; 
    maxWidthInPixcel?: number;
}
