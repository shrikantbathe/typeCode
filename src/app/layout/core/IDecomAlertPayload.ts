
export interface IDecomAlertPayload { 
    stockId: number;
    sector?: string;
    comment?: string;
    activityDate?: string;
    country?: string;
    region?: string;
    name?: string;
    updatedBy: string;
    supressNotificationAlertInd: string;
}