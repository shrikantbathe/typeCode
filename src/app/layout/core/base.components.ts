import { OnDestroy, Injector, ChangeDetectorRef, } from "@angular/core";
import { BaseDirective } from "./base.directive";

//import { GenericComponentUpdateAction } from "./_models/GenericComponentUpdateAction.type";

export abstract class BaseComponent extends BaseDirective {

private __changeDetectorRef: ChangeDetectorRef;

public isComponentLoadComplete = false;
//public componentUpdateAction: GenericComponentUpdateAction = ‘none’;

//public get _changeDetectorRef(): ChangeDetectorRef ;

// if (!this.__changeDetectorRef)

// this.__changeDetectorRef = this.___injector.get(ChangeDetectorRef);

// return this.__changeDetectorRef;
// }

constructor(private ___1injector: Injector,) { super(___1injector); }


}