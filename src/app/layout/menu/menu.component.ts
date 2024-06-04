import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

    model: any[] = [];

    constructor() { }

    ngOnInit() {
        this.model = [
            {
                label: 'Public',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/search'] },
                    { label: 'Text', icon: 'pi pi-fw pi-align-left', routerLink: ['/text'] }
                ]
            },
            {
                label: 'Editor',
                items:[
                    { label: 'Project', icon: 'pi pi-fw pi-microsoft', routerLink: ['/project'] },
                    { label: 'Dictionary', icon: 'pi pi-fw pi-book', routerLink: ['/dictionary'] },
                    { label: 'Morphology', icon: 'pi pi-fw pi-list', routerLink: ['/morph'] },
                    { label: 'Taxonomy', icon: 'pi pi-fw pi-tags', routerLink: ['/meta'] },
                    { label: 'User', icon: 'pi pi-fw pi-user-edit', routerLink: ['/user'] }
                ]
            }
        ];
        
    }
}
