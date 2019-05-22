import { Component } from '@angular/core';
import { ThfMenuItem, ThfPageAction } from '@totvs/thf-ui';
import { ToolbarService } from '@progress/kendo-angular-scheduler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public selectedViewIndex = 2;
    readonly menus: Array<ThfMenuItem> = [
        { label: 'Home', link: '/' },
    ];
    public readonly actions: Array<ThfPageAction> = [
        { label: 'Novo' /*, action: this.add*/, icon: 'thf-icon-plus' }
    ];
    
    onClick($event) {
        console.log($event);
    }
}
