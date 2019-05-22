import { Component, Input } from '@angular/core';
import { ToolbarService } from '@progress/kendo-angular-scheduler';

@Component({
    selector: 'my-navigation',
    template: `
        <thf-button (t-click)="prev()" t-label="prev"></thf-button>
        {{ selectedDate | date:'short' }}
        <button (click)="next()">Next</button>
    `
})
export class MyNavigationComponent {
    @Input()
    public selectedDate: Date;

    constructor(public toolbarService: ToolbarService) { }

    public next(): void {
        this.toolbarService.navigate({
            type: 'next'
        });
    }

    public prev(): void {
        this.toolbarService.navigate({
            type: 'prev'
        });
    }
}

