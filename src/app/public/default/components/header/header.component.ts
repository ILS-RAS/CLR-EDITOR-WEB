import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@shared/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Input() title: string;
  closeResult = '';
  @Output() loginEvent: EventEmitter<any> = new EventEmitter<any>();
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    super();
    this.loginForm = this.formBuilder.group({
      api: new FormControl('http://localhost:3000/v1', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  login(contentLogin){
    
  }

}
