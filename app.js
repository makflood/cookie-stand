'use strict';

var pikeStore = {
  location: '1st and Pike',
  openAt: 6, // 6 am
  closeAt: 20, // 8 pm
  minCustHr: 23,
  maxCustHr: 65,
  avgCookieCust: 6.3,
  cookiesHrs: [],

  // calculates random number of customers for one hour
  randomCustHr: function() {
    return Math.floor(Math.random() * (this.maxCustHr - this.minCustHr + 1) + this.minCustHr);
  },

  // simulates the number of cookies bought in each hour of a work day
  simCookiesHrs: function() {
    this.cookiesHrs = [];
    for (var i = 0; i <= (this.closeAt - this.openAt); i++) {
      var cookiesBought = Math.round(this.randomCustHr() * this.avgCookieCust);
      this.cookiesHrs.push(cookiesBought);
    }
  },
};
