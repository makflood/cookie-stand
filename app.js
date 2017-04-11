'use strict';

/** Creates a Store with a string for a location name, the minimum customers per hour, maximum cusomers per hour, and average cookies per customer **/
function Store(location, minCustHr, maxCustHr, avgCookieCust) {
  this.location = location;
  this.openAt = 6; // 6 am
  this.closeAt = 20; // 8 pm
  this.minCustHr = minCustHr;
  this.maxCustHr = maxCustHr;
  this.avgCookieCust = avgCookieCust;
  this.cookiesHrs = [];
}

/** Returns a random number of customers for one hour at the store **/
Store.prototype.randomCustHr = function() {
  return Math.floor(Math.random() * (this.maxCustHr - this.minCustHr + 1) + this.minCustHr);
};

/** Simulates the number of cookies bought in each hour of a work day **/
Store.prototype.simCookiesHrs = function() {
  this.cookiesHrs = [];
  var cookiesBought;
  for (var i = 0; i < (this.closeAt - this.openAt); i++) {
    cookiesBought = Math.round(this.randomCustHr() * this.avgCookieCust);
    this.cookiesHrs.push(cookiesBought);
  }
};

/** Returns a tr element refernence with the location name, all the simulated cookie data and the total for the day **/
Store.prototype.render = function() {
  var cookiesDayRow = document.createElement('tr');
  cookiesDayRow.setAttribute('class', 'sales-data');

  var locationCell = document.createElement('td');
  locationCell.textContent = this.location;
  cookiesDayRow.appendChild(locationCell);

  this.simCookiesHrs(); // activate simulation of cookies
  var cookiesCell;
  var totCookies = 0;
  for (var i = 0; i < this.cookiesHrs.length; i++) {
    cookiesCell = document.createElement('td');
    cookiesCell.textContent = this.cookiesHrs[i];
    cookiesDayRow.appendChild(cookiesCell);
    totCookies += this.cookiesHrs[i];
  }
  var totCookiesCell = document.createElement('td');
  totCookiesCell.textContent = totCookies;
  cookiesDayRow.appendChild(totCookiesCell);

  return cookiesDayRow;
};

/** turns the number of hours into an am/pm time **/
function numToTime(num) {
  if (num == 0) {
    return '12am';
  } else if (num < 12) {
    return num + 'am';
  } else if (num == 12) {
    return '12pm';
  } else {
    return (num - 12) + 'pm';
  }
}

/** prints an unordered list of the hourly sale simulations to the page **/
function printStoreSalesSimsList(store) {
  var position = document.getElementById('store-data');

  if (position) {
    var container = document.createElement('div');
    container.setAttribute('class', 'sales-list');

    var locationHeading = document.createElement('h2');
    locationHeading.textContent = store.location;
    container.appendChild(locationHeading);
    var hrsCookiesList = document.createElement('ul');
    container.appendChild(hrsCookiesList);

    store.simCookiesHrs(); // activate simulation of cookies
    var hrCookiesEntry;
    var hour;
    var totCookies = 0;
    for (var i = 0; i < store.cookiesHrs.length; i++) {
      hrCookiesEntry = document.createElement('li');
      hour = store.openAt + i;
      hrCookiesEntry.textContent = numToTime(hour) + ': ' + store.cookiesHrs[i] + ' cookies';
      hrsCookiesList.appendChild(hrCookiesEntry);
      totCookies += store.cookiesHrs[i];
    }
    var totCookiesEntry = document.createElement('li');
    totCookiesEntry.textContent = 'Total: ' + totCookies + ' cookies';
    hrsCookiesList.appendChild(totCookiesEntry);

    position.appendChild(container);
  }
}

/** PRINTS THE LISTS TO THE PAGE **/
var pikeStore = new Store('1st and Pike', 23, 65, 6.3);
var airportStore = new Store('SeaTac Airport', 3, 24, 1.2);
var centerStore = new Store('Seattle Center', 11, 38, 3.7);
var capitolStore = new Store('Capitol Hill', 20, 38, 2.3);
var alkiStore = new Store('Alki', 2, 16, 4.6);

var storeLocations = [pikeStore, airportStore, centerStore, capitolStore, alkiStore];

for (var i = 0; i < storeLocations.length; i++) {
  printStoreSalesSimsList(storeLocations[i]);
}
