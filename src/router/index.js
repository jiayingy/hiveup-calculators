import Vue from 'vue';
import Router from 'vue-router';
import LoanCalc from '@/components/LoanCalc';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Loan Calculator',
      component: LoanCalc,
    },
  ],
});
