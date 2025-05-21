import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/views-stocks',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/views-stocks.vue') }],
  },
  {
    path: '/toDoList',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/maintenance',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/maintenance.vue') }],
  },
  {
    path: '/admin',
    component: () => import('layouts/adminLayout.vue'),
    children: [{ path: '', component: () => import('pages/welcome.vue') }],
  },
  {
    path: '/stocks',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/stocks.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/tanitimLayout.vue'),
    
  },
  {
    path: '/firmalogin',
    children: [{ path: '', component: () => import('pages/firmalogin.vue') }],
  },
  {
    path: '/register',
    children: [{ path: '', component: () => import('pages/register.vue') }],
  },
  {
    path: '/prepare-list',
    children: [{ path: '', component: () => import('pages/prepare-list.vue') }],
  },
  {
    path: '/view-users',
    component: () => import('layouts/adminlayout.vue'),
    children: [{ path: '', component: () => import('pages/view-users.vue') }],
  },
  {
    path: '/welcome',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/welcome.vue') }],
  },
  {
    path: '/maintenance',
    children: [{ path: '', component: () => import('pages/maintenance.vue') }],
  },
  {
    path: '/tanitim',
    component: () => import('layouts/tasarimuclayout.vue'),
    children: [{ path: '', component: () => import('pages/tasarimuc.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
