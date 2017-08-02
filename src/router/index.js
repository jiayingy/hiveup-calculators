import Vue from 'vue';
import Router from 'vue-router';
import LoanCalc from '@/components/LoanCalc';
import MortgageCalc from '@/components/MortgageCalc';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Loan Calculator',
      component: LoanCalc,
    },
    {
      path: '/mortgage-calc',
      name: 'Mortgage Calculator',
      component: MortgageCalc,
    },
  ],
});
