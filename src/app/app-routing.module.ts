import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { AuthGuard } from './core/auth.guard';
import { StudentComponent } from './student/student.component';
import { EnrolleeComponent } from './enrollee/enrollee.component';
import { ProgramsComponent } from './enrollee/programs/programs.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CathedraComponent } from './cathedra/cathedra.component';
import { AboutComponent } from './cathedra/about/about.component';
import { TeachersComponent } from './cathedra/teachers/teachers.component';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './core/role.guard';
import { EditScheduleComponent } from './admin/schedule/edit-schedule/edit-schedule.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminNewsListComponent } from './admin/news/admin-news-list/admin-news-list.component';
import { CreateNewsComponent } from './admin/news/create-news/create-news.component';
import { UnsavedChangesGuardService } from './core/services/unsaved-changes.service';
import { EditNewsComponent } from './admin/news/edit-news/edit-news.component';
import { AdminScheduleListComponent } from './admin/schedule/admin-schedule-list/admin-schedule-list.component';
import { CreateScheduleComponent } from './admin/schedule/create-schedule/create-schedule.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { AdminEventListComponent } from './admin/events/admin-event-list/admin-event-list.component';
import { EditEventComponent } from './admin/events/edit-event/edit-event.component';
import { CreateEventComponent } from './admin/events/create-event/create-event.component';
import { ChatComponent } from './chat/chat/chat.component';
import { ChatHomeComponent } from './chat/chat-home/chat-home.component';
import { EventsCalendarComponent } from './student/events/events-calendar/events-calendar.component';
import { ScheduleComponent } from './student/schedule/schedule.component';
import { ProgramComponent } from './enrollee/programs/program/program.component';
import { AdminProgramsComponent } from './admin/admin-programs/admin-programs.component';
import { AdminProgramsEditComponent } from './admin/admin-programs/admin-programs-edit/admin-programs-edit.component';
import { AdminProgramsCreateComponent } from './admin/admin-programs/admin-programs-create/admin-programs-create.component';
import { UsersComponent } from './admin/users/users.component';
import { GroupsComponent } from './admin/groups/groups.component';
import { ExamsComponent } from './admin/exams/exams.component';
import { ExamsListComponent } from './student/exams-list/exams-list.component';
import { PrivacyComponent } from './core/privacy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'privacy',
    component: PrivacyComponent
  },

  {
    path: 'student',
    component: StudentComponent
  },

  {
    path: 'student/schedule',
    component: ScheduleComponent
  },

  {
    path: 'student/sessions',
    component: ExamsListComponent
  },

  {
    path: 'student/events',
    component: EventsCalendarComponent
  },

  {
    path: 'enrollee',
    loadChildren: './enrollee/enrollee.module#EnrolleeModule'
  },

  {
    path: 'teacher',
    component: TeacherComponent
  },

  {
    path: 'cathedra',
    component: CathedraComponent
  },
  {
    path: 'cathedra/about',
    component: AboutComponent
  },
  {
    path: 'cathedra/teachers',
    component: TeachersComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'news',
    component: NewsComponent
  },

  {
    path: 'news/:id',
    component: NewsDetailComponent
  },
  {
    path: 'user/:id',
    component: UserProfileComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuardService]
  },

  {
    path: 'chat',
    component: ChatHomeComponent
  },
  {
    path: 'chat/:id',
    component: ChatComponent
  },

  {
    path: 'programs',
    component: ProgramsComponent
  },

  {
    path: 'programs/:id',
    component: ProgramComponent
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'teacher'] },
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'schedule', component: AdminScheduleListComponent },
      {
        path: 'news',
        component: AdminNewsListComponent
      },
      {
        path: 'events',
        component: AdminEventListComponent
      },

      {
        path: 'users',
        component: UsersComponent
      },

      {
        path: 'groups',
        component: GroupsComponent
      },

      {
        path: 'exams',
        component: ExamsComponent
      },

      {
        path: 'programs',
        component: AdminProgramsComponent,
        children: [
          { path: 'create', component: AdminProgramsCreateComponent },
          { path: ':id', component: AdminProgramsEditComponent }
        ]
      }
    ]
  },
  {
    path: 'admin/news/create',
    component: CreateNewsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'teacher'] },
    canDeactivate: [UnsavedChangesGuardService]
  },
  {
    path: 'admin/news/:id',
    component: EditNewsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'teacher'] },
    canDeactivate: [UnsavedChangesGuardService]
  },
  {
    path: 'admin/schedule/create',
    component: CreateScheduleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'teacher'] },
    canDeactivate: [UnsavedChangesGuardService]
  },
  {
    path: 'admin/schedule/:id',
    component: EditScheduleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'teacher'] },
    canDeactivate: [UnsavedChangesGuardService]
  },
  {
    path: 'admin/events/create',
    component: CreateEventComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'teacher'] },
    canDeactivate: [UnsavedChangesGuardService]
  },
  {
    path: 'admin/events/:id',
    component: EditEventComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'editor', 'teacher'] },
    canDeactivate: [UnsavedChangesGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const NavigationMenu = [
  {
    name: 'Новости',
    url: 'news'
  },
  {
    name: 'Абитуриенту',
    url: 'enrollee'
  },
  {
    name: 'Студенту',
    url: 'student'
  },
  {
    name: 'Преподавателю',
    url: 'admin'
  },
  {
    name: 'Программы',
    url: 'programs'
  },
  {
    name: 'Кафедра',
    url: 'cathedra'
  }
];
