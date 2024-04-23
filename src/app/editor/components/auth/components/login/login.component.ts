import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../layout/service/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { filter, take, takeUntil } from 'rxjs';
import { UserModel } from '../../../../models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent extends BaseComponent implements OnInit{

    password!: string;
    username!: string;
    returnUrl: string;
    loginValid = true;

    constructor(public layoutService: LayoutService,
      private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) { 
      super();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(
      filter((isAuthenticated: boolean) => isAuthenticated)
    ).pipe(takeUntil(this.destroyed)).subscribe( _ => this.router.navigateByUrl(this.returnUrl));
  }

  public onSubmit(): void {

    this.loginValid = true;
    var user: UserModel = new UserModel({});
    user.email = this.username;
    user.password = this.password;

    this.authService.Login(user).pipe(
      take(1)
    ).pipe(takeUntil(this.destroyed)).subscribe({
      next: _ => {
        this.loginValid = true;
        this.router.navigateByUrl('/');
      },
      error: _ => this.loginValid = false
    });
  }
}