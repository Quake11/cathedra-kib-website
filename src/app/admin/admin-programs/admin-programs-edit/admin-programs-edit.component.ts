import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ProgramsService } from 'src/app/core/services/programs.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray
} from '@angular/forms';
import { Program } from 'src/app/models/program.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { Skill } from 'src/app/models/skill.interface';
import { Practice } from 'src/app/models/practice.interface';
import { Module } from 'src/app/models/module.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-programs-edit',
  templateUrl: './admin-programs-edit.component.html',
  styleUrls: ['./admin-programs-edit.component.scss'],
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
export class AdminProgramsEditComponent implements OnInit, OnDestroy {
  uid: string;
  id: string;
  routeSub: Subscription;

  program$: Observable<Program>;
  programSub: Subscription;

  form: FormGroup;

  backgroundColorPickerValue: string;
  backgroundColorPickerOpen: boolean;

  fontColorPickerValue: string;
  fontColorPickerOpen: boolean;

  sending: boolean;
  sent: boolean;
  errored: boolean;

  error: string;

  uploading: boolean;

  skills: FormArray;
  practices: FormArray;
  modules: FormArray;

  @ViewChild('hardSkillsContainer', { read: ElementRef })
  hardSkillsContainer: ElementRef;

  @ViewChild('softSkillsContainer', { read: ElementRef })
  softSkillsContainer: ElementRef;

  @ViewChild('practicesContainer', { read: ElementRef })
  practicesContainer: ElementRef;

  @ViewChild('modulesContainer', { read: ElementRef })
  modulesContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private programs: ProgramsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.program$ = this.programs.getById(this.id);

      this.form = this.fb.group({
        name: ['', Validators.required],
        graduation: ['', Validators.required],
        subtitle: ['', Validators.required],
        id: ['', Validators.required],
        backgroundColor: '',
        fontColor: '',
        imgLogo: '',
        imgCover: '',
        places: '',
        skills: this.fb.array([]),
        practices: this.fb.array([]),
        modules: this.fb.array([])
      });

      this.program$.pipe(take(1)).subscribe(program => {
        this.resetForm();
        this.uid = program.uid;
        if (program.skills) {
          program.skills.forEach(skill => this.addSkillWithData(skill));
        }

        if (program.practices) {
          program.practices.forEach(practice =>
            this.addPracticeWithData(practice)
          );
        }

        if (program.modules) {
          program.modules.forEach(module => this.addModuleWithData(module));
        }

        delete program.uid;
        this.form.patchValue(program);

        this.backgroundColorPickerValue = program.backgroundColor;
        this.fontColorPickerValue = program.fontColor;
        this.ref.markForCheck();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.programSub) {
      this.programSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  async onSubmit() {
    this.sending = true;
    try {
      console.log(this.form.value);
      await this.programs.update(this.uid, this.form.value);
      this.sent = true;
      this.resetForm();
    } catch (error) {
      console.log(error);
      this.error = error;
      this.errored = true;
    }
    this.sending = false;
  }

  /* SKILLS */

  addSkill(type: string): void {
    this.skills = this.form.get('skills') as FormArray;
    this.skills.push(this.createSkillGroup(type));

    switch (type) {
      case 'hard': {
        this.hardSkillsContainer.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        return;
      }
      case 'soft': {
        this.softSkillsContainer.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        return;
      }
    }
  }

  createSkillGroup(type: string) {
    return this.fb.group({
      name: ['', Validators.required],
      year: [null, Validators.required],
      type,
      videoSrc: ''
    });
  }

  addSkillWithData(data: Skill): void {
    this.skills = this.form.get('skills') as FormArray;
    this.skills.push(this.createSkillGroupWithData(data));
  }

  createSkillGroupWithData(skillData: Skill) {
    return this.fb.group({
      name: [skillData.name, Validators.required],
      year: skillData.year,
      type: skillData.type,
      videoSrc: skillData.videoSrc ? skillData.videoSrc : ''
    });
  }

  removeSkill(index: number): void {
    this.skills = this.form.get('skills') as FormArray;
    this.skills.removeAt(index);
  }

  /* PRACTICES */

  addPractice(): void {
    this.practices = this.form.get('practices') as FormArray;
    this.practices.push(this.createPracticeGroup());

    this.practicesContainer.nativeElement.scrollIntoView({
      behavior: 'smooth'
    });
  }

  createPracticeGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      year: [null, Validators.required]
    });
  }

  addPracticeWithData(data: Practice): void {
    this.practices = this.form.get('practices') as FormArray;
    this.practices.push(this.createPracticeGroupWithData(data));

    if (this.practicesContainer) {
      this.practicesContainer.nativeElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  createPracticeGroupWithData(practiceData: Practice) {
    return this.fb.group({
      name: [practiceData.name, Validators.required],
      year: [practiceData.year, Validators.required]
    });
  }

  removePractice(index: number): void {
    console.log(index);
    this.practices = this.form.get('practices') as FormArray;
    this.practices.removeAt(index);
  }

  /* MODULES */

  addModule(): void {
    console.log('addModule');

    this.modules = this.form.get('modules') as FormArray;
    this.modules.push(this.createModuleGroup());
    console.log(this.form.get('modules')['controls']);
    this.modulesContainer.nativeElement.scrollIntoView({
      behavior: 'smooth'
    });
  }

  createModuleGroup() {
    console.log('createModuleGroup');
    return this.fb.group({
      name: ['', Validators.required],
      year: [null, Validators.required],
      skills: this.fb.array([this.createModuleSkillGroup()])
    });
  }

  addModuleWithData(data: Module): void {
    console.log('addModuleWithData');
    this.modules = this.form.get('modules') as FormArray;
    this.modules.push(this.createModuleGroupWithData(data));

    if (this.modulesContainer) {
      this.modulesContainer.nativeElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  createModuleGroupWithData(moduleData: Module) {
    return this.fb.group({
      name: [moduleData.name, Validators.required],
      year: [moduleData.year, Validators.required],
      skills: this.createModuleSkillsArrayWithData(moduleData.skills)
    });
  }

  addModuleSkillGroup(index: number) {
    this.modules = this.form.get('modules') as FormArray;
    const moduleGroup = this.modules.at(index) as FormGroup; // .push(this.createPracticeGroup());
    console.log(moduleGroup);

    const skillsArray = moduleGroup.controls.skills as FormArray;
    console.log(skillsArray);

    skillsArray.push(this.createModuleSkillGroup());

    /*     this.modulesContainer.nativeElement.scrollIntoView({
      behavior: 'smooth'
    }); */

    // this.modules[index].skills
    // return this.fb.group({ name: ['', Validators.required] }));
  }

  createModuleSkillGroup(): FormGroup {
    return this.fb.group({ name: ['', Validators.required] });
  }

  createModuleSkillsArrayWithData(skills: Array<string>): FormArray {
    const moduleSkills: FormArray = this.fb.array([]);
    if (skills.length === 0) {
      return moduleSkills;
    }
    skills.forEach(skill => {
      moduleSkills.push(this.fb.group({ name: [skill, Validators.required] }));
    });
    return moduleSkills;
  }

  removeModule(index: number): void {
    console.log(index);
    this.modules = this.form.get('modules') as FormArray;
    this.modules.removeAt(index);
  }

  removeModuleSkill(moduleIndex: number, skillIndex: number): void {
    this.modules = this.form.get('modules') as FormArray;
    const moduleGroup = this.modules.at(moduleIndex) as FormGroup; // .push(this.createPracticeGroup());
    console.log(moduleGroup);

    const skillsArray = moduleGroup.controls.skills as FormArray;
    skillsArray.removeAt(skillIndex);
  }

  /* UTILITY */

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
    this.programs.update(this.uid, {
      imgLogo: null
    });
  }

  onCoverUploaded(data) {
    this.form.patchValue({ imgCover: data });
  }

  onCoverDeleted() {
    this.form.patchValue({ imgCover: '' });

    this.programs.update(this.uid, {
      imgCover: null
    });
  }

  resetForm() {
    if (this.skills) {
      this.skills.reset();
      this.skills = null;
    }
    if (this.form) {
      this.form.reset();
    }
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
