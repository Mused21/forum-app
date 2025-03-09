import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TopicListComponent } from './pages/topic-list/topic-list.component';
import { TopicDetailComponent } from './pages/topic-detail/topic-detail.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { EditTopicComponent } from './pages/edit-topic/edit-topic.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';

export const routes: Routes = [
  { path: '', redirectTo: '/topics', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'topics', component: TopicListComponent },
  { path: 'topics/:id', component: TopicDetailComponent },
  { path: 'create-topic', component: CreateTopicComponent },
  { path: 'edit-topic/:id', component: EditTopicComponent },
  { path: 'admin', component: AdminPanelComponent }
];
