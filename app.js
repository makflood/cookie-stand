'use strict';

/**
Creates a CookieStore with a string for a storeLocation name, the minimum customers per hour, maximum cusomers per hour, and average cookies per customer. Also adds the new object to the given array.
@param storeLocation - string of the storeLocation name
       minCustHr - int of the minimum customers per hour
       maxCustHr - int of the maximum customers per hour
       avgCookieCust - float of the average cookies per customer
       storeArray - array for all the CookieStore objects
**/
function CookieStore(storeLocation, minCustHr, maxCustHr, avgCookieCust, storeArray) {
  this.storeLocation = storeLocation;
  this.openAt = 6; // 6 am
  this.closeAt = 20; // 8 pm
  this.minCustHr = minCustHr;
  this.maxCustHr = maxCustHr;
  this.avgCookieCust = avgCookieCust;
  this.cookiesHrs = [];
  this.tossersHrs = [];
  this.custHrByTosser = 20; // 20 customers per tosser
  this.minTosser = 2;
  if (storeArray) {
    storeArray.push(this);
  }
  this.simCookiesHrs();
  this.calculateTossers();
}

/**
Returns a random number of customers for one hour at the store
@return a random int between the max and min customers inclusivly
**/
CookieStore.prototype.randomCustHr = function() {
  return Math.floor(Math.random() * (this.maxCustHr - this.minCustHr + 1) + this.minCustHr);
};

/**
Simulates the number of cookies bought in each hour of a work day
**/
CookieStore.prototype.simCookiesHrs = function() {
  this.cookiesHrs = [];
  this.tossersHrs = [];
  var customers;
  var cookiesBought;
  for (var i = 0; i < (this.closeAt - this.openAt); i++) {
    customers = this.randomCustHr();
    this.tossersHrs.push(customers);
    cookiesBought = Math.round(customers * this.avgCookieCust);
    this.cookiesHrs.push(cookiesBought);
  }
};

/**
Calculates the required cookie tossers for each hour from the maximum of the amount required to handle the number of customers and the minimum staff
**/
CookieStore.prototype.calculateTossers = function() {
  var reqTosser;
  for (var i = 0; i < this.tossersHrs.length; i++) {
    reqTosser = Math.floor(this.tossersHrs[i] / this.custHrByTosser);
    reqTosser = Math.max(reqTosser, this.minTosser);
    this.tossersHrs[i] = reqTosser;
  }
};

/**
Returns a tr element with the location name, all the simulated cookie data and the total for the day
@return a reference to a table row of cookies
**/
CookieStore.prototype.render = function() {
  var cookiesDayRow = document.createElement('tr');
  cookiesDayRow.className = 'sales-data';

  var locationCell = document.createElement('td');
  locationCell.className = 'loc-cell';
  locationCell.textContent = this.storeLocation;
  cookiesDayRow.appendChild(locationCell);

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

  // table.appendChild(cookiesDayRow);
  return cookiesDayRow;
};

/**
Returns a tr element with the location name and all the required cookie tossers
@return a reference to a table row of tossers
**/
CookieStore.prototype.renderTossers = function() {
  var tossersDayRow = document.createElement('tr');
  tossersDayRow.className = 'sales-data';

  var locationCell = document.createElement('td');
  locationCell.className = 'loc-cell';
  locationCell.textContent = this.storeLocation;
  tossersDayRow.appendChild(locationCell);

  var tossersCell;
  for (var i = 0; i < this.tossersHrs.length; i++) {
    tossersCell = document.createElement('td');
    tossersCell.textContent = this.tossersHrs[i];
    tossersDayRow.appendChild(tossersCell);
  }

  return tossersDayRow;
};

/**
Turns the number of hours into an am/pm time
@param num - a number of hours from 0 to 24
@return a string representing the time with 'am' or 'pm' added
**/
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

/**
Adds the header row of times to the given table based on the hours of a given CookieStore
@param table - a reference to a 'table' element
       store - a CookieStore object
       renderTotal - a boolean of whether to  the totals cell or not
**/
function renderSalesTableHead(table, store, renderTotal) {
  var headRow = document.createElement('tr');
  headRow.className = 'head-row';

  headRow.appendChild(document.createElement('th')); //empty cell

  var hourCell;
  for (var i = 0; i < (store.closeAt - store.openAt); i++) {
    hourCell = document.createElement('th');
    hourCell.textContent = numToTime(store.openAt + i);
    headRow.appendChild(hourCell);
  }
  if (renderTotal) {
    var totCookiesCell = document.createElement('th');
    totCookiesCell.textContent = 'Daily Location Total';
    headRow.appendChild(totCookiesCell);
  }

  table.appendChild(headRow);
}

/**
Adds the footer row of totals for each hour to the given table based on an array of CookieStores
@param table - a reference to a 'table' element
       stores - an array of CookieStores
**/
function renderTotalsFoot(table, stores) {
  var footRow = document.getElementById('totals-row');
  if (footRow) {
    footRow.parentNode.removeChild(footRow);
  }
  footRow = document.createElement('tr');
  footRow.id = 'totals-row';

  var totalCell = document.createElement('td');
  totalCell.className = 'tot-cell';
  totalCell.textContent = 'Totals';
  footRow.appendChild(totalCell);

  var modelStore = stores[0];

  var totCookiesCell;
  var totForHour;
  var totForDay = 0;
  for (var i = 0; i < modelStore.cookiesHrs.length; i++) {
    totCookiesCell = document.createElement('td');
    totForHour = 0;
    for (var j = 0; j < stores.length; j++) {
      totForHour += stores[j].cookiesHrs[i];
      totForDay += stores[j].cookiesHrs[i];
    }
    totCookiesCell.textContent = totForHour;
    footRow.appendChild(totCookiesCell);
  }
  var totDayCookiesCell = document.createElement('td');
  totDayCookiesCell.textContent = totForDay;
  footRow.appendChild(totDayCookiesCell);

  table.appendChild(footRow);
}

/**
prints an table of the hourly sale simulations to the page
@param stores - an array of CookieStore objects
@return a reference to the table of simulated cookie data for every store
**/
function printStoresSimsTable(stores) {
  var position = document.getElementById('store-data');

  var tableTitle = document.createElement('h2');
  tableTitle.textContent = 'Cookies Needed By Location Each Day';
  position.appendChild(tableTitle);

  var simCookieTable = document.createElement('table');
  renderSalesTableHead(simCookieTable, stores[0], true);
  for (var i = 0; i < stores.length; i++) {
    simCookieTable.appendChild(stores[i].render());
  }
  renderTotalsFoot(simCookieTable, stores);

  position.appendChild(simCookieTable);

  return simCookieTable;
}

/**
prints an table of the required cookie tossers to the page
@param stores - an array of CookieStore objects
@return a reference to the table of required cookie tossers for every store
**/
function printStoresTossersTable(stores) {
  var position = document.getElementById('tossers-data');

  var tableTitle = document.createElement('h2');
  tableTitle.textContent = 'Cookie Tossers Needed By Location Each Hour';
  position.appendChild(tableTitle);

  var reqTosserTable = document.createElement('table');
  renderSalesTableHead(reqTosserTable, stores[0], false);
  for (var i = 0; i < stores.length; i++) {
    reqTosserTable.appendChild(stores[i].renderTossers());
  }

  position.appendChild(reqTosserTable);

  return reqTosserTable;
}

/**
On submit event, creates a new CookieStore object from user input and adds the store to the table, updating the totals row
@param event - the event passed in by the event listener
**/
function handleAddStoreSubmit(event) {
  event.preventDefault(); //no page reload

  var form = event.target;

  // get user input
  var storeLocation = form.locationInput.value.trim();
  var minCustHr = form.minCustHrInput.value;
  var maxCustHr = form.maxCustHrInput.value;
  var avgCookieCust = form.avgCookieCustInput.value;

  var warningDiv = document.getElementById('form-warning');
  warningDiv.innerHTML = '';
  var warningText = document.createElement('p');

  // check for user input
  if (storeLocation === '' || minCustHr === '' || maxCustHr === '' || avgCookieCust === '') {
    warningText.textContent = 'Please fill out all the fields.';
    warningDiv.appendChild(warningText);
  } else {

    // check for valid numbers
    if (isNaN(minCustHr) || isNaN(maxCustHr) || isNaN(avgCookieCust)) {
      warningText.textContent = 'Please enter numbers for the amount of customers and the average amout of cookies.';
      warningDiv.appendChild(warningText);
    } else if (minCustHr < 0 || maxCustHr < 0 || avgCookieCust < 0) {
      warningText.textContent = 'Please enter only positive numbers.';
      warningDiv.appendChild(warningText);
    } else if (parseInt(maxCustHr) < parseInt(minCustHr)) {
      warningText.textContent = 'The maximum number of customers per hour must be larger than the minimum.';
      warningDiv.appendChild(warningText);
    } else {

      var alreadyAdded = false;
      var storedIndex = -1;
      var storedStore;
      for (var i = 0; i < allStoreLocations.length; i++){
        storedStore = allStoreLocations[i].storeLocation.toUpperCase();
        alreadyAdded = storedStore === storeLocation.toUpperCase();
        if (alreadyAdded) {
          storedIndex = i;
          i = allStoreLocations.length;
        }
      }

      var store;

      if (alreadyAdded) {
        if (confirm(storeLocation + ' has already been added to the table.\nAre you sure you want to update this location?')) {
          // clear user input
          form.reset();

          store = allStoreLocations[storedIndex];
          var cookiesRow = document.querySelectorAll('#store-data .sales-data')[storedIndex];
          var tossersRow = document.querySelectorAll('#tossers-data .sales-data')[storedIndex];
          console.log(cookiesRow, tossersRow);

          store.minCustHr = minCustHr;
          store.maxCustHr = maxCustHr;
          store.avgCookieCust = avgCookieCust;

          store.simCookiesHrs();
          store.calculateTossers();

          cookiesRow.parentElement.replaceChild(store.render(), cookiesRow);
          renderTotalsFoot(simCookieTable, allStoreLocations);

          tossersRow.parentElement.replaceChild(store.renderTossers(), tossersRow);
        }
      } else {
        // clear user input
        form.reset();

        // create the new store from input
        store = new CookieStore(storeLocation, parseInt(minCustHr), parseInt(maxCustHr), parseFloat(avgCookieCust), allStoreLocations);

        simCookieTable.appendChild(store.render());
        renderTotalsFoot(simCookieTable, allStoreLocations);

        reqTosserTable.appendChild(store.renderTossers());
      }
    }
  }
}

/** PRINTS THE TABLE TO THE PAGE **/
var allStoreLocations = [];

new CookieStore('1st and Pike', 23, 65, 6.3, allStoreLocations);
new CookieStore('SeaTac Airport', 3, 24, 1.2, allStoreLocations);
new CookieStore('Seattle Center', 11, 38, 3.7, allStoreLocations);
new CookieStore('Capitol Hill', 20, 38, 2.3, allStoreLocations);
new CookieStore('Alki', 2, 16, 4.6, allStoreLocations);

var simCookieTable = printStoresSimsTable(allStoreLocations);
var reqTosserTable = printStoresTossersTable(allStoreLocations);

/** HANDLES THE FORM **/
var addStoreForm = document.getElementById('add-store');
addStoreForm.addEventListener('submit', handleAddStoreSubmit);
