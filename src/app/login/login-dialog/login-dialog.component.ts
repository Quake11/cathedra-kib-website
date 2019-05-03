import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PhoneLoginComponent } from '../phone-login/phone-login.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit() {}

  smsLogin() {
    this.dialog.open(PhoneLoginComponent, {
      id: 'phone-confirm'
    });
  }

  closeDialog() {
    try {
      this.dialogRef.close();
    } catch (error) {}
  }
}
