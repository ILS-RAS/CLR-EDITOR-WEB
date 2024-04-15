import { AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../base/base/base.component';
import { ProjectService } from '../../editor/components/project/services/project.service';
import { MetaService } from '../../editor/components/project/services/meta.service';
import { UserService } from '../../editor/components/user/services/user.service';
import { UserModel } from '../../editor/models';
import { Helper } from '../../utils';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() title?: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  loggedUser?:UserModel;
  public isAuthenticated = false;
  items: MenuItem[] | undefined;
  constructor(private authService: AuthService, private projectService: ProjectService, private metaService: MetaService, private userService: UserService) {
    super();
  }

  public ngOnInit(): void {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Quaesitio',
                  icon: 'pi pi-search',
                  routerLink: '/'
              },
              {
                  label: 'Proiectus',
                  icon: 'pi pi-book',
                  routerLink: '/proiectus'
              },
              {
                  label: 'Lexicon',
                  icon: 'pi pi-align-left',
                  routerLink: '/lexicon'
              },
              {
                  label: 'Meta',
                  icon: 'pi pi-list',
                  routerLink: '/meta'
              },
              {
                  label: 'Sodales',
                  icon: 'pi pi-user-edit',
                  routerLink: '/sodales'
              }
          ]
      }
  ];
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroyed)).subscribe((item)=>{
      this.isAuthenticated = item;
    });
    this.userService.$loggedUser.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.loggedUser = item;
    })
  }

  public logout(): void {
    this.userService.$loggedUser.next(undefined);
    this.projectService.InitProjectContext(undefined)
    this.authService.logout('/accipe');
  }

  ResolveRoleName(role:number){
    return `${Helper.ResolveRoleName(role)}`;
  }
  
  toggleSideBar() {
    this.toggle.emit();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  click(item: MenuItem) {

  }
}
