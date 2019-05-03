import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray
} from '@angular/forms';
import { ProgramsService } from 'src/app/core/services/programs.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-programs-create',
  templateUrl: './admin-programs-create.component.html',
  styleUrls: ['./admin-programs-create.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),
        animate('200ms', style({ opacity: 0, transform: 'translateY(30px)' }))
      ])
    ])
  ]
})
export class AdminProgramsCreateComponent implements OnInit {
  form: FormGroup;

  backgroundColorPickerValue = '#fff';
  backgroundColorPickerOpen: boolean;

  fontColorPickerValue = '#000';
  fontColorPickerOpen: boolean;

  sending: boolean;
  sent: boolean;
  errored: boolean;

  error: string;

  uploading: boolean;

  skills: FormArray;

  @ViewChild('skillsContainer', { read: ElementRef })
  skillsContainer: ElementRef;

  constructor(private fb: FormBuilder, private programs: ProgramsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      graduation: ['', Validators.required],
      subtitle: ['', Validators.required],
      id: ['', Validators.required],
      backgroundColor: this.backgroundColorPickerValue,
      fontColor: this.fontColorPickerValue,
      imgLogo: '',
      imgCover: '',
      places: '', // free places for education
      skills: this.fb.array([
        this.createSkill('hard'),
        this.createSkill('soft')
      ])
    });
  }

  addSkill(type: string): void {
    this.skills = this.form.get('skills') as FormArray;
    this.skills.push(this.createSkill(type));
    if (this.skillsContainer) {
      this.skillsContainer.nativeElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  removeSkill(index: number): void {
    console.log(index);
    this.skills = this.form.get('skills') as FormArray;
    this.skills.removeAt(index);
  }

  createSkill(type: string) {
    return this.fb.group({
      name: ['', Validators.required],
      year: [1, Validators.required],
      type: [type, Validators.required],
      videoSrc: ''
    });
  }

  async onSubmit() {
    this.sending = true;
    try {
      console.log(this.form.value);
      await this.programs.add(this.form.value);
      this.sent = true;
      this.resetForm();
    } catch (error) {
      console.log(error);
      this.error = error;
      this.errored = true;
    }
    this.sending = false;
  }

  getErrorMessage(control: AbstractControl) {
    if (control.errors && control.hasError('required')) {
      return 'Обязательное поле';
    }
  }

  getControl(name: string): AbstractControl {
    return this.form.get(name);
  }

  backgroundColorPicked(color) {
    this.form.patchValue({ backgroundColor: color });
  }

  fontColorPicked(color) {
    this.form.patchValue({ fontColor: color });
  }

  onLogoUploaded(data) {
    this.form.patchValue({ imgLogo: data });
  }

  onLogoDeleted() {
    this.form.patchValue({ imgLogo: '' });
  }

  onCoverUploaded(data) {
    this.form.patchValue({ imgCover: data });
  }

  onCoverDeleted() {
    this.form.patchValue({ imgCover: '' });
  }

  resetForm() {
    this.form.reset();
  }

  onUploadingFiles(bool) {
    if (bool) {
      this.uploading = true;
    } else {
      this.uploading = false;
    }
  }

  scroll(el: ElementRef) {
    el.nativeElement.scrollIntoView();
  }

  skillsTrackBy(index, skill) {
    return skill.name;
  }
}
