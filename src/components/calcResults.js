const calcResults = {
  data() {
    return {
      results: document.getElementById('results'),
    };
  },
  methods: {
    hideResults() {
      this.results = document.getElementById('results');
      this.results.style.display = 'none';
    },
    showResults() {
      this.results.style.display = 'block';
    },
    /*eslint-disable */
    calcPMT(PV, APR, R, n) {
      return (PV * R) / (1 - ((1 + R) ** (-n)));
    },
    checkInputs() {
      let i = 0;

      // check if all user inputs are empty
      const inputVal = document.getElementsByClassName('userInputs')[0].getElementsByTagName('input');
      for (i = 0; i < inputVal.length; i += 1) {
        if (inputVal[i].value.length === 0) {
          break;
        }
      }

      if (i === inputVal.length) {
        return true;
      }

      return false;
    },
  },
};

export default calcResults;
