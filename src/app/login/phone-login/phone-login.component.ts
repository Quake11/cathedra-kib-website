import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { WindowService } from 'src/app/core/services/window.service';
import { firebase } from '@firebase/app';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

export class PhoneNumber {
  country = '+7';
  number: string;

  constructor(phoneNumber) {
    this.number = phoneNumber;
  }

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.number;
    return `+${num}`;
  }
}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit, AfterViewInit {
  windowRef: any;
  error: string;
  errorCount = 0;
  maxErrorCount = 3;

  // phoneNumber = new PhoneNumber();

  phone: FormControl;
  verificationCode: FormControl;

  confirmationResult: any;

  captchaSolved = false;

  verifying = false;

  isLinear = false;
  phoneForm: FormGroup;
  confirmForm: FormGroup;

  constructor(
    private win: WindowService,
    public auth: AuthService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.windowRef = this.win.windowRef;

    this.phoneForm = this._formBuilder.group({
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999)
        ])
      ]
    });
    this.confirmForm = this._formBuilder.group({
      verificationCode: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.initRecaptcha();
  }

  resetRecaptcha() {
    this.windowRef.grecaptcha.reset(this.windowRef.recaptchaWidgetId);
  }

  initRecaptcha() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: response => {
          this.captchaSolved = true;
          this.error = null;
        }
      }
    );

    this.windowRef.recaptchaVerifier.render().then(widgetId => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });
  }

  async sendLoginCode(phone) {
    const phoneNumber = new PhoneNumber(phone);
    this.error = null;
    const appVerifier = this.windowRef.recaptchaVerifier;
    const number: string = phoneNumber.e164;

    this.confirmationResult = await this.auth.phoneLogin(number, appVerifier);
  }

  async verifyCode(code) {
    this.verifying = true;

    const isLoggedIn = await this.auth.verifySmsCode(
      this.confirmationResult,
      code
    );

    if (isLoggedIn) {
      this.dialog.getDialogById('phone-confirm').close();
      this.verifying = false;
    } else {
      this.verifying = false;
      this.error = 'Неправильный код из СМС. Попробуйте ввести ещё раз.';
      this.errorCount++;
      if (this.errorCount >= 3) {
        this.confirmationResult = null;
        this.errorCount = 0;
        this.error = null;
        this.resetRecaptcha();
      }
    }
  }
}
