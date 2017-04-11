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
    var cookiesBought
    for (var i = 0; i <= (this.closeAt - this.openAt); i++) {
      cookiesBought = Math.round(this.randomCustHr() * this.avgCookieCust);
      this.cookiesHrs.push(cookiesBought);
    }
  },
};

var airportStore = {
  location: 'SeaTac Airport',
  openAt: 6, // 6 am
  closeAt: 20, // 8 pm
  minCustHr: 3,
  maxCustHr: 24,
  avgCookieCust: 1.2,
  cookiesHrs: [],

  // calculates random number of customers for one hour
  randomCustHr: function() {
    return Math.floor(Math.random() * (this.maxCustHr - this.minCustHr + 1) + this.minCustHr);
  },

  // simulates the number of cookies bought in each hour of a work day
  simCookiesHrs: function() {
    this.cookiesHrs = [];
    var cookiesBought
    for (var i = 0; i <= (this.closeAt - this.openAt); i++) {
      cookiesBought = Math.round(this.randomCustHr() * this.avgCookieCust);
      this.cookiesHrs.push(cookiesBought);
    }
  },
};

var centerStore = {
  location: 'Seattle Center',
  openAt: 6, // 6 am
  closeAt: 20, // 8 pm
  minCustHr: 11,
  maxCustHr: 38,
  avgCookieCust: 3.7,
  cookiesHrs: [],

  // calculates random number of customers for one hour
  randomCustHr: function() {
    return Math.floor(Math.random() * (this.maxCustHr - this.minCustHr + 1) + this.minCustHr);
  },

  // simulates the number of cookies bought in each hour of a work day
  simCookiesHrs: function() {
    this.cookiesHrs = [];
    var cookiesBought
    for (var i = 0; i <= (this.closeAt - this.openAt); i++) {
      cookiesBought = Math.round(this.randomCustHr() * this.avgCookieCust);
      this.cookiesHrs.push(cookiesBought);
    }
  },
};

var capitolStore = {
  location: 'Capitol Hill',
  openAt: 6, // 6 am
  closeAt: 20, // 8 pm
  minCustHr: 20,
  maxCustHr: 38,
  avgCookieCust: 2.3,
  cookiesHrs: [],

  // calculates random number of customers for one hour
  randomCustHr: function() {
    return Math.floor(Math.random() * (this.maxCustHr - this.minCustHr + 1) + this.minCustHr);
  },

  // simulates the number of cookies bought in each hour of a work day
  simCookiesHrs: function() {
    this.cookiesHrs = [];
    var cookiesBought
    for (var i = 0; i <= (this.closeAt - this.openAt); i++) {
      cookiesBought = Math.round(this.randomCustHr() * this.avgCookieCust);
      this.cookiesHrs.push(cookiesBought);
    }
  },
};

var alkiStore = {
  location: 'Alki',
  openAt: 6, // 6 am
  closeAt: 20, // 8 pm
  minCustHr: 2,
  maxCustHr: 16,
  avgCookieCust: 4.6,
  cookiesHrs: [],

  // calculates random number of customers for one hour
  randomCustHr: function() {
    return Math.floor(Math.random() * (this.maxCustHr - this.minCustHr + 1) + this.minCustHr);
  },

  // simulates the number of cookies bought in each hour of a work day
  simCookiesHrs: function() {
    this.cookiesHrs = [];
    var cookiesBought
    for (var i = 0; i <= (this.closeAt - this.openAt); i++) {
      cookiesBought = Math.round(this.randomCustHr() * this.avgCookieCust);
      this.cookiesHrs.push(cookiesBought);
    }
  },
};

var storeLocations = [pikeStore, airportStore, centerStore, capitolStore, alkiStore];

/** turns the number of hours into an am/pm time **/
function numToTime(num) {
  if (num == 0) {
    return '12am';
  } else if (num <= 12) {
    return num + 'am';
  } else {
    return (num - 12) + 'pm';
  }
}

/** prints an unordered list of the hourly sale simulations to the page **/
function printLocationSims(store) {
  var position = document.getElementById('store-data');

  var container = document.createElement('div');
  container.setAttribute('class', 'sales-list')

  var locationHeading = document.createElement('h2');
  locationHeading.textContent = store.location;
  container.appendChild(locationHeading);
  var hrsCookiesList = document.createElement('ul');
  container.appendChild(hrsCookiesList);

  store.simCookiesHrs(); // activate simulation of cookies
  var hrCookiesEntry;
  var hour;
  var totCookies = 0;
  for (var i = 0; i <= (store.closeAt - store.openAt); i++) {
    hrCookiesEntry = document.createElement('li');
    hour = store.openAt + i;
    hrCookiesEntry.textContent = numToTime(hour) + ': ' + store.cookiesHrs[i] + ' cookies';
    hrsCookiesList.appendChild(hrCookiesEntry)
    totCookies += store.cookiesHrs[i];
  }
  var totCookiesEntry = document.createElement('li');
  totCookiesEntry.textContent = 'Total: ' + totCookies + ' cookies';
  hrsCookiesList.appendChild(totCookiesEntry);

  position.appendChild(container);
}
