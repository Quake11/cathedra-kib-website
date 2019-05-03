import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { CanComponentDeactivate } from 'src/app/core/services/unsaved-changes.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  userForm: FormGroup;

  photoURL: AbstractControl;
  displayName: AbstractControl;
  firstname: AbstractControl;
  lastname: AbstractControl;
  middlename: AbstractControl;
  email: AbstractControl;
  description: AbstractControl;

  userSub: Subscription;

  userId: string;

  saving: boolean;
  saved: boolean;

  error: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private users: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.user$.subscribe((userData: User) => {
      this.userId = userData.uid;
      this.userForm.setValue({
        photoURL: userData.photoURL || '',
        displayName: userData.displayName || '',
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        middlename: userData.middlename || '',
        email: userData.email || '',
        description: userData.description || ''
      });
    });

    this.userForm = this.fb.group({
      photoURL: [''],
      displayName: [''],
      firstname: [''],
      lastname: [''],
      middlename: [''],
      email: [''],
      description: ['']
    });

    this.photoURL = this.userForm.controls.photoURL;
    this.displayName = this.userForm.controls.displayName;
    this.firstname = this.userForm.controls.firstname;
    this.lastname = this.userForm.controls.lastname;
    this.middlename = this.userForm.controls.middlename;
    this.email = this.userForm.controls.email;
    this.description = this.userForm.controls.description;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userForm.dirty) {
      return confirm('Вы не сохранили изменения. Всё равно покинуть страницу?');
    } else {
      return true;
    }
  }

  get user$(): Observable<User> {
    return this.auth.user$;
  }

  onSubmit() {
    console.log('onSubmit');
    this.saving = true;

    const photoURL = this.photoURL.value;
    const displayName = this.displayName.value;
    const firstname = this.firstname.value;
    const lastname = this.lastname.value;
    const middlename = this.middlename.value;
    const email = this.email.value;
    const description = this.description.value;
    const editDate = firestore.FieldValue.serverTimestamp();

    const publicData = {
      photoURL,
      firstname,
      lastname,
      middlename,
      displayName,
      email,
      description,
      editDate
    };

    this.users
      .update(this.userId, publicData)
      .then(() => {
        this.saving = false;
        this.saved = true;
        this.userForm.reset();
        this.router.navigateByUrl('/user/' + this.userId);
        this.error = null;
      })
      .catch(err => {
        console.error(err);
        this.error = err;
        this.saving = false;
        this.saved = false;
      });
  }

  hasName() {
    if (this.firstname.value || this.displayName.value) {
      return true;
    }
    return false;
  }
}
