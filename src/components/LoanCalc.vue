<template>
  <div id="loan_calc">
    <h1>Estimate your loan payments</h1>
    <div class="userInputs">
      <p>
        My loan amount is <input type="number" min="0" v-model="loanAmt"> <br>
        My loan term is <input type="number" min="0" v-model="loanTerm"> <br>
        The annual interest rate is <input type="number" min="0" max="100" v-model="annualInterest">%.
      </p>
      <input type="submit" value="Calculate" v-on:click="getResults()">
    </div>
    <div id="results">
      <h1>Know your loan payments</h1>
      <p>My monthly loan payment is S${{ getLoanPayment }}*.</p>
      <p>*Assume fixed interest loan and the interest rate is compounded monthly.</p>

      <h1>Total Payment</h1>
      <table>
        <tr>
          <td>Total Interest paid (S$)</td>
          <td>{{getTotalInterest}}</td>
        </tr>
        <tr>
          <td>Principal</td>
          <td>{{loanAmt}}</td>
        </tr>
      </table>
      <canvas id="loan_pie" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import calcResults from './calcResults';

export default {
  name: 'LoanCalc',
  mixins: [calcResults],
  data() {
    return {
      loanAmt: '',
      annualInterest: '',
      loanPayment: '',
      loanTerm: '',
      loanPieChart: '',
    };
  },
  computed: {
    getLoanPayment() {
      const PV = this.loanAmt;
      const APR = this.annualInterest;
      const R = (APR / 100) / 12;
      const n = this.loanTerm * 12;

      this.loanPayment = this.calcPMT(PV, APR, R, n);
      return this.loanPayment;
    },
    getTotalInterest() {
      return (this.loanPayment * this.loanTerm * 12) - this.loanAmt;
    },
  },
  methods: {
    getResults() {
      if (this.checkInputs()) {
        this.showResults();
        this.drawChart();
      }
    },
    drawChart() {
      /* eslint-disable no-unused-vars */
      // const loanPieChart = new Chart(ctx, {
      //   type: 'pie',
      //   data: {
      //     labels: ['Total Interest Paid', 'Principal'],
      //     datasets: [{
      //       label: 'test',
      //       data: [this.getTotalInterest, this.loanAmt],
      //       backgroundColor: [
      //         'green',
      //         'darkorange',
      //       ],
      //       borderWidth: 3,
      //     }],
      //   },
      //   options: {
      //     responsive: false,
      //   },
      // });
    },
  },
  mounted() {
    this.hideResults();
    const ctx = document.getElementById('loan_pie');
    loanPieChart = new Chart(ctx, {
      type: 'pie',
      data: {},
      options: {
        responsive: false,
      },
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
