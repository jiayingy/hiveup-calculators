<template>
  <div id='mortgage_calc'>
    <h1>Estimate your Mortgage Payments</h1>
    <div class='userInputs'>
      <p>
        My home price is S$ <input type='number' min='0' id='homePrice' v-model='homePrice'>. <br>
        My down payment is S$ <input type='number' min='0' id='downPayment' v-model='downPayment'>. <br>
        The annual interest rate is <input type='number' min='1' max='100' step='0.01' id='annualInterest' v-model='annualInterest'>%.* <br>
        The loan term is <input type='number' min='0' id='loanTerm' v-model='loanTerm'> years. <br>
        The estimated monthly rental of my house is S$ <input type='number' min='0' id='monthlyRental' v-model='monthlyRental'>. <br>
        The annual homeowners insurance is S$<input type='number' id='annualInsurance' v-model='annualInsurance'> (if known). <br>
      </p>
      <input id='calcResults' type='submit' value='Calculate' v-on:click='showResults'>
    </div>
    <div id='results'>
      <p>
        <h1>Know your mortgage payments</h1>
        <p>
          Based on a home price of S$ <input type='number' :value='homePrice' v-model='homePrice'> in Singapore, 
          <br><br>
          My monthly mortgage payment is <strong>S$ {{ getMortgagePayment }}</strong> for the <input type='number' :value='loanTerm' v-model='loanTerm'> years fixed loan term with an annual interest rate of <input type='number' :value='annualInterest' v-model='annualInterest'>%.
        </p>
      </p>
      <input type='submit' value='See the breakdown' v-on:click='showBreakdown'>
    </div>
    <div ref="breakdown">
      <table>
        <tr>
          <th>Monthly Payment</th>
        </tr>
        <tr>
          <td>Total monthly mortgage payment(S$)</td>
          <td>{{ getMortgagePayment }}</td>
        </tr> 
        <tr>
          <td>Principal and interest (S$)</td>
          <td>{{ P }}</td>
        </tr>
        <tr>
          <td>Property taxes (S$)</td>
          <td>{{ tax }}</td>
        </tr>
        <tr>
          <td>Homeowners insurance (S$)</td>
          <td>{{ monthlyInsurance }}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Total Payment</th>
        </tr>
        <tr>
          <td>Total Interest Paid (S$)</td>
          <td> {{ totalInterest }}</td>
        </tr>
        <tr>
          <td>Principal (S$)</td>
          <td>{{ homePrice - downPayment }}</td>
        </tr>
        <tr>
          <td>Property Taxes (S$)</td>
          <td>{{ tax * loanTerm * 12 }}</td>
        </tr>
        <tr>
          <td>Homeowners Insurance (S$)</td>
          <td>{{ annualInsurance * loanTerm }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import calcResults from './calcResults';

export default {
  mixins: [calcResults],
  data() {
    return {
      results: document.getElementById('results'),
      homePrice: '',
      downPayment: '',
      loanTerm: '',
      annualInterest: '',
      monthlyRental: '',
      annualInsurance: '',
      P: '',
      tax: '',
      monthlyInsurance: '',
      totalInterest: '',
    };
  },
  watch: {
    annualInsurance() {
      this.monthlyInsurance = (this.annualInsurance / 12);
    },
  },
  computed: {
    getMortgagePayment() {
      const PV = this.homePrice - this.downPayment;
      const APR = this.annualInterest;
      const R = (APR / 100) / 12;
      const n = this.loanTerm * 12;

      this.P = this.calcPMT(PV, APR, R, n);
      this.tax = this.calculateTax(this.monthlyRental * 12);
      const mortgagePayment = (this.tax + this.P + ((this.annualInsurance) / 12));

      return mortgagePayment;
    },
  },
  methods: {
    showBreakdown() {
      (this.$refs.breakdown).style.display = 'block';
      this.totalInterest = (this.P * this.loanTerm * 12) - (this.homePrice - this.downPayment);
    },
    calculateTax(num) {
      if (num >= 0 && num <= 8000) {
        return 0;
      } else if (num > 8000 && num <= 55000) {
        return (((num - 8000) * 0.04) / 12);
      } else if (num > 55000 && num <= 70000) {
        return ((((num - 55000) * 0.06) + 1880) / 12);
      } else if (num > 70000 && num <= 85000) {
        return ((((num - 7000) * 0.08) + 2780) / 12);
      } else if (num > 85000 && num <= 100000) {
        return ((((num - 85000) * 0.1) + 3980) / 12);
      } else if (num > 100000 && num <= 115000) {
        return ((((num - 85000) * 0.1) + 5480) / 12);
      } else if (num > 115000 && num <= 130000) {
        return ((((num - 85000) * 0.1) + 7280) / 12);
      }

      return ((((num - 85000) * 0.1) + 9380) / 12);
    },
  },
  mounted() {
    (this.$refs.breakdown).style.display = 'none';
    this.hideResults();
  },
};
</script>

<style>

</style>


