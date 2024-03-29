import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private login: LoginService,
  ) {
  }

  ngOnInit() {
    if (window.localStorage.getItem('vremember') === 'true') {
      this.validateForm = this.fb.group({
        userName: [window.localStorage.getItem('vuserName'), [Validators.required]],
        password: [window.localStorage.getItem('vpassword'), [Validators.required]],
        remember: [true]
      });
    } else {
      this.validateForm = this.fb.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        remember: [false]
      });
    }
  }

  async submitForm(base: 'skijump' | 'biathlon' | 'free_skijump') {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    const username = this.validateForm.value.userName;
    const password = this.validateForm.value.password;

    if (username !== '' && password !== '') {
      try {
        await this.login.login(username, password, base);
        this.router.navigate(['/table']);
      } catch (e) {
        this.message.error('登录失败');
        return;
      }
    }

    if (this.validateForm.value.remember) {
      window.localStorage.setItem('vremember', this.validateForm.value.remember.toString());
      window.localStorage.setItem('vuserName', this.validateForm.value.userName);
      window.localStorage.setItem('vpassword', this.validateForm.value.password);
    } else {
      window.localStorage.setItem('vremember', false.toString());
      window.localStorage.setItem('vuserName', '');
      window.localStorage.setItem('vpassword', '');
    }


  }
}
