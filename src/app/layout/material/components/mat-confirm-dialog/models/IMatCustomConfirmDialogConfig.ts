import { MatModelConfirmResult } from "./MatModelConfirmResult.type";

 
 
export interface IMatConfirmDialogButtonConfig {
text: string;
actionValue: MatModelConfirmResult;
}
 
export interface IMatCustomConfirmDialogConfig {
confirm?: IMatConfirmDialogButtonConfig;
confirm2?: IMatConfirmDialogButtonConfig;
dismiss?: IMatConfirmDialogButtonConfig;
confirmWithComment?: boolean;
showClickOnConfirmText?: boolean;
maxCommentCharacters?: number;
}