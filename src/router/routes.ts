import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/admin',
    component: () => import('layouts/adminlayout.vue'),
    children: [{ path: '', component: () => import('pages/adminpage.vue') }],
  },
  {
    path: '/stocks',
    component: () => import('layouts/adminlayout.vue'),
    children: [{ path: '', component: () => import('pages/stocks.vue') }],
  },
  {
    path: '/login',
    children: [{ path: '', component: () => import('pages/login.vue') }],
  },
  {
    path: '/register',
    children: [{ path: '', component: () => import('pages/register.vue') }],
  },
  {
    path: '/prepare-list',
    children: [{ path: '', component: () => import('pages/prepare-list.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
