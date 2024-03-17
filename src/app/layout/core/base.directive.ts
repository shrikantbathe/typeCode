import { Injector, ElementRef, Renderer2, TemplateRef } from '@angular/core';

import { ServiceBase } from './ServiceBase.service';

export abstract class BaseDirective extends ServiceBase {

private __elementRef: ElementRef;

private __renderer: Renderer2;

private __templateRef: TemplateRef<any>;

public get _elementRef(): ElementRef {

if (!this.__elementRef) this.__elementRef = this.____injector.get(ElementRef);

return this.__elementRef;
}

public get _renderer(): Renderer2 {

 
if (!this.__renderer) this.__renderer = this.____injector.get(Renderer2);

return this.__renderer;
}

public get _templateRef(): TemplateRef<any> {

 

if (!this.__templateRef) this.__templateRef = this.____injector.get(TemplateRef);

return this.__templateRef;
}


public get host(): any {
    return this._elementRef.nativeElement;
}

    public get getBoundingClientRect(): any {
    return this.host.getBoundingClientRect();
    }

    constructor(private ____injector: Injector) {
    super(____injector);
    
    }
    
    public clearHost(): void {
    const childElements = this.host.children;
    for (let child of childElements) {
    this._renderer.removeChild(this.host, child);
    }
    }

    public insertBeforeElementHost(elementNode: any): void {
        this.host.parentElement.insertBefore(elementNode, this.host.nextSibling);
        
     }
        
    public insertAdjacentElement(elementNode: any, targetElement: any): void {
        targetElement.insertAdjacentElement('afterend', elementNode);
    
        }
        

}