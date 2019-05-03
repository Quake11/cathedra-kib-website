import { EventsCalendarComponent } from './student/events/events-calendar/events-calendar.component';
import { AuthGuard } from './core/auth.guard';
import { WindowService } from './core/services/window.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { UserProfileMenuComponent } from './user/user-profile-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './core/navigation/navigation.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

import { NewsComponent } from './news/news.component';
import { PhoneLoginComponent } from './login/phone-login/phone-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { StudentComponent } from './student/student.component';
import { ScheduleComponent } from './student/schedule/schedule.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CathedraComponent } from './cathedra/cathedra.component';
import { AboutComponent } from './cathedra/about/about.component';
import { TeachersComponent } from './cathedra/teachers/teachers.component';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './core/role.guard';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DropZoneDirective } from './drop-zone.directive';
import { EditScheduleComponent } from './admin/schedule/edit-schedule/edit-schedule.component';
import { EditNewsComponent } from './admin/news/edit-news/edit-news.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { AdminNewsListComponent } from './admin/news/admin-news-list/admin-news-list.component';
import { AdminNewsItemComponent } from './admin/news/admin-news-item/admin-news-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MobileHeaderComponent } from './core/mobile-header/mobile-header.component';
import { CreateNewsComponent } from './admin/news/create-news/create-news.component';
import { AdminScheduleListComponent } from './admin/schedule/admin-schedule-list/admin-schedule-list.component';
import { CreateScheduleComponent } from './admin/schedule/create-schedule/create-schedule.component';
import { AdminScheduleItemComponent } from './admin/schedule/admin-schedule-item/admin-schedule-item.component';
import { ScheduleListComponent } from './student/schedule/schedule-list/schedule-list.component';
import { ScheduleItemComponent } from './student/schedule/schedule-item/schedule-item.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { LoginDialogComponent } from './login/login-dialog/login-dialog.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { CreateEventComponent } from './admin/events/create-event/create-event.component';
import { EditEventComponent } from './admin/events/edit-event/edit-event.component';
import { AdminEventItemComponent } from './admin/events/admin-event-item/admin-event-item.component';
import { AdminEventListComponent } from './admin/events/admin-event-list/admin-event-list.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localeRu);
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT
} from 'angular-calendar';
import * as moment from 'moment';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { ChatComponent } from './chat/chat/chat.component';
import { ChatHomeComponent } from './chat/chat-home/chat-home.component';

import { FullCalendarModule } from 'primeng/fullcalendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { ProgramComponent } from './enrollee/programs/program/program.component';
import { SkillsComponent } from './enrollee/programs/program/skills/skills.component';
import { SkillComponent } from './enrollee/programs/program/skills/skill/skill.component';
import { ModuleComponent } from './enrollee/programs/program/skills/module/module.component';
import { AdminProgramsComponent } from './admin/admin-programs/admin-programs.component';
import { AdminProgramsEditComponent } from './admin/admin-programs/admin-programs-edit/admin-programs-edit.component';
import { AdminProgramsCreateComponent } from './admin/admin-programs/admin-programs-create/admin-programs-create.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  MatSelectModule,
  MatChipsModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UsersComponent } from './admin/users/users.component';
import { GroupsComponent } from './admin/groups/groups.component';
import { HoldableDirective } from './core/holdable.directive';
import { ExamsComponent } from './admin/exams/exams.component';
import { PresenceService } from './core/presence.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ExamsListComponent } from './student/exams-list/exams-list.component';
import { GroupComponent } from './admin/groups/group/group.component';
import { ExamItemComponent } from './admin/exams/exam-item/exam-item.component';
import { ExamsGroupComponent } from './student/exams-list/exams-group/exams-group.component';
import { PrivacyComponent } from './core/privacy/privacy.component';
import { PresenceComponent } from './user/presence/presence.component';
import { EnrolleeModule } from './enrollee/enrollee.module';
import { PipesModule } from './core/pipes/pipes.module';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserProfileMenuComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    NewsComponent,
    PhoneLoginComponent,
    HeaderComponent,
    FooterComponent,
    StudentComponent,
    ScheduleComponent,
    TeacherComponent,
    CathedraComponent,
    AboutComponent,
    TeachersComponent,
    AdminComponent,
    FileUploadComponent,
    DropZoneDirective,
    EditScheduleComponent,
    EditNewsComponent,
    AdminHomeComponent,
    NewsItemComponent,
    NewsDetailComponent,
    NewsListComponent,
    AdminNewsListComponent,
    AdminNewsItemComponent,
    MobileHeaderComponent,
    CreateNewsComponent,
    AdminScheduleListComponent,
    CreateScheduleComponent,
    EditScheduleComponent,
    AdminScheduleItemComponent,
    ScheduleListComponent,
    ScheduleItemComponent,
    LoginDialogComponent,
    EditProfileComponent,
    EventsCalendarComponent,
    CreateEventComponent,
    EditEventComponent,
    AdminEventItemComponent,
    AdminEventListComponent,
    ChatComponent,
    ChatHomeComponent,
    ProgramComponent,
    SkillsComponent,
    SkillComponent,
    ModuleComponent,
    AdminProgramsComponent,
    AdminProgramsEditComponent,
    AdminProgramsCreateComponent,
    UsersComponent,
    GroupsComponent,
    HoldableDirective,
    ExamsComponent,
    ExamsListComponent,
    GroupsComponent,
    GroupComponent,
    ExamItemComponent,
    ExamsGroupComponent,
    PrivacyComponent,
    PresenceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence({
      experimentalTabSynchronization: true
    }),
    AngularFireStorageModule,
    AngularFireMessagingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    ScrollingModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,

    NgxEditorModule,
    HttpClientModule,
    FlexLayoutModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: momentAdapterFactory
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter
        }
      }
    ),
    NgbModule,
    FullCalendarModule,
    ToastModule,
    EditorModule,

    ColorPickerModule,
    ServiceWorkerModule.register('/kib-service-worker.js', {
      enabled: environment.production
    }),
    EnrolleeModule,
    PipesModule
    // ServiceWorkerModule.register('/firebase-messaging-sw.js')
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    WindowService,
    AuthGuard,
    RoleGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: MOMENT,
      useValue: moment
    },
    MessageService,
    PresenceService
  ],
  bootstrap: [AppComponent],
  entryComponents: [PhoneLoginComponent, LoginDialogComponent]
})
export class AppModule {}
