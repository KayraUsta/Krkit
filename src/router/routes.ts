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
    children: [{ path: '', component: () => import('pages/maintenance.vue') }],
  },
  {
    path: '/toDoListadmin',
    component: () => import('layouts/adminLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/stocks',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/stocks.vue') }],
  },
  {
    path: '/',
      component: () => import('layouts/tasarimuclayout.vue'),
    children: [{ path: '', component: () => import('pages/tasarimuc.vue') }],
    
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
    {
    path: '/customer',
    component: () => import('layouts/adminlayout.vue'),
    children: [{ path: '', component: () => import('pages/customer.vue') }],
  },
      {
    path: '/view-customer',
    component: () => import('layouts/adminlayout.vue'),
    children: [{ path: '', component: () => import('pages/view-customer.vue') }],
  },
        {
    path: '/transactions',
    component: () => import('layouts/adminlayout.vue'),
    children: [{ path: '', component: () => import('pages/transactions.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/maintenance.vue'),
  },
];

export default routes;
