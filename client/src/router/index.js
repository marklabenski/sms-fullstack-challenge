import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Backend from '@/components/Backend';
import Frontend from '@/components/Frontend';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/frontend',
      name: 'Frontend',
      component: Frontend,
    },
    {
      path: '/backend',
      name: 'Backend',
      component: Backend,
    },
  ],
});
