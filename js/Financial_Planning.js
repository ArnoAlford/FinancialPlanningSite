function Financial_Planning(val=0) {

var BondAllocation = Number(document.getElementById("BondAllocation").value);
var DomesticAllocation = Number(document.getElementById("DomesticAllocation").value);
var InternationalAllocation = Number(document.getElementById("InternationalAllocation").value);
if ((BondAllocation + DomesticAllocation + InternationalAllocation) != 100) {
  alert("Asset allocation must add up to 100%");
  return false;
}

var FourOhOnePrevious = Number(document.getElementById("FourOhOnePrevious").value);
if (FourOhOnePrevious > 19000 || FourOhOnePrevious < 0) {
  alert("401k contributions cannot exceed 19000 for this year");
  return false;
}

var IRAPrevious = Number(document.getElementById("IRAPrevious").value);
if (IRAPrevious > 6000 || IRAPrevious < 0) {
  alert("IRA contributions cannot exceed 6000 for this year");
  return false;
}

var Have401k1 = document.getElementById("have401k1").checked;
var HaveIRA1 = document.getElementById("haveIRA1").checked;
var Rollover = document.getElementById("rolling401k1").checked;
var RollingChose401k = document.getElementById("rollingChose401k").checked;
var RollingChoseIRA = document.getElementById("rollingChoseIRA").checked;
if (Rollover == true &&  HaveIRA1 == false && RollingChoseIRA == true){
  alert("You do not have a IRA to Rollover into");
  return false;
}
if (Rollover == true &&  Have401k1 == false && RollingChose401k == true){
  alert("You do not have a 401k to Rollover into");
  return false;
}

today = new Date();
var todayYear = today.getYear();
todayMonth = today.getMonth();

var FourOhOneBonds = Number(document.getElementById("FourOhOneBonds").value);
var FourOhOneDomestic = Number(document.getElementById("FourOhOneDomestic").value);
var FourOhOneInternational = Number(document.getElementById("FourOhOneInternational").value);
var BrokerageBonds = Number(document.getElementById("BrokerageBonds").value);
var BrokerageDomestic = Number(document.getElementById("BrokerageDomestic").value);
var BrokerageInternational = Number(document.getElementById("BrokerageInternational").value);
var IRABonds = Number(document.getElementById("IRABonds").value);
var IRADomestic = Number(document.getElementById("IRADomestic").value);
var IRAInternational = Number(document.getElementById("IRAInternational").value);
var MonthlyInvestment = Number(document.getElementById("MonthlyInvestment").value);
var Future401k = document.getElementById("have401k3").checked;
var FutureIRA = document.getElementById("haveIRA3").checked;
var PlannedFourOhOneMonthlyInvestment = Number(document.getElementById("PlannedFourOhOneMonthlyInvestment").value);
var PlannedIRAMonthlyInvestment = Number(document.getElementById("PlannedIRAMonthlyInvestment").value);

var Portfolio = {IRA: {Domestic: 0, International: 0, Bond: 0, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}},
             Taxable: {Domestic: 0, International: 0, Bond: 0, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}},
             FourOhOne: {Domestic: 0, International: 0, Bond: 0, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}}};
var DesiredRatio = {Domestic: 0, International: 0, Bond: 0};
var Monthly = {FourOhOne: 0, IRA: 0, Taxable: 0};
var Months = 12;
var FourOhOne = {Exist: true, Future: false, Months: 0, Limit: 19000, Past: {PreviousContributions: false, Amount: 0},
                  RemainingMonths: 0, FuturePayment: 0};
var IRA = {Exist: true, Future: false, Months: 0, Limit: 6000, Past: {PreviousContributions: false, Amount: 0},
          RemainingMonths: 0, FuturePayment: 0};
var Result = new Array();
var MonthlyInvestmentSnapshot = MonthlyInvestment

Portfolio.FourOhOne.Bond = FourOhOneBonds;
Portfolio.FourOhOne.Domestic = FourOhOneDomestic;
Portfolio.FourOhOne.International = FourOhOneInternational;
Portfolio.Taxable.Bond = BrokerageBonds;
Portfolio.Taxable.Domestic = BrokerageDomestic;
Portfolio.Taxable.International = BrokerageInternational;
Portfolio.IRA.Bond = IRABonds;
Portfolio.IRA.Domestic = IRADomestic;
Portfolio.IRA.International = IRAInternational;
DesiredRatio.Bond = BondAllocation * .01;
DesiredRatio.Domestic = DomesticAllocation * .01;
DesiredRatio.International = InternationalAllocation * .01;
FourOhOne.Past.Amount = FourOhOnePrevious;
IRA.Past.Amount = IRAPrevious;
FourOhOne.Exist = Have401k1;
FourOhOne.Future = Future401k;
IRA.Exist = HaveIRA1;
IRA.Future = FutureIRA;
FourOhOne.Months = PlannedFourOhOneMonthlyInvestment;
IRA.Months = PlannedIRAMonthlyInvestment;
if (FourOhOne.Past.Amount > 0) {
  FourOhOne.Past.PreviousContributions = true;
}
if (IRA.Past.Amount > 0) {
  IRA.Past.PreviousContributions = true;
}

// Function definitions
 function CalculateMonthly(MonthlyInvestmentFunction, fund, account, currentMonth) {
   if (account.Future == false) {
     if (currentMonth > 12) {
       currentMonth = currentMonth - 12
     }
     account.RemainingMonths = 12 - currentMonth;
   if (account.Past.PreviousContributions == true) {
     account.Limit = account.Limit - account.Past.Amount;
     account.Past.PreviousContributions = false;
     account.Past.Amount = 0;
   } if (account.Exist == false) {
       Monthly[fund] = 0;
       console.log("Hit return statement")
       return;
   } if ((account.Limit / account.RemainingMonths) > MonthlyInvestment) {
       Monthly[fund] = MonthlyInvestmentFunction;
       MonthlyInvestment = 0;
   } else {
       Monthly[fund] = (account.Limit / account.RemainingMonths);
       MonthlyInvestment = MonthlyInvestmentFunction - (account.Limit / account.RemainingMonths);
 }}}

function CalculateGrandTotal(Portfolio) {
  GrandTotal = Portfolio.FourOhOne.Domestic + Portfolio.IRA.Domestic + Portfolio.Taxable.Domestic +
               Portfolio.FourOhOne.International + Portfolio.IRA.International + Portfolio.Taxable.International +
               Portfolio.FourOhOne.Bond + Portfolio.IRA.Bond + Portfolio.Taxable.Bond;
  return GrandTotal
}

function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}

function resetMonthly() {
  console.log("Reset triggered on new year");
  Monthly.FourOhOne = 0;
  Monthly.IRA = 0;
  Monthly.Taxable = 0;
  MonthlyInvestment = MonthlyInvestmentSnapshot;
  FourOhOne.Limit = 19000;
  FourOhOne.Past.PreviousContributions = false;
  FourOhOne.Past.Amount = 0;
  IRA.Limit = 6000;
  IRA.Past.PreviousContributions = false;
  IRA.Past.Amount = 0;
  todayYear = todayYear + 1;
  CalculateMonthly(MonthlyInvestment, 'FourOhOne', FourOhOne, 0);
  CalculateMonthly(MonthlyInvestment, 'IRA', IRA, 0);
  Monthly.Taxable = MonthlyInvestment;
}

function toggleMainDiv() {
    var a = document.getElementById("mainDiv");
    var c = document.getElementById("resultsDiv");
    a.style.display = "none";
    c.style.display = "block";
    c.className = "animated--fade-in";
}

function CalculatePayments(val) {
  if (val == 0) {
  document.getElementById("FourOhOneBondMonthlyIncrease").innerHTML = Math.round(Result[val].FourOhOne.Bond - FourOhOneBonds);
  document.getElementById("FourOhOneDomesticMonthlyIncrease").innerHTML = Math.round(Result[val].FourOhOne.Domestic - FourOhOneDomestic);
  document.getElementById("FourOhOneInternationalMonthlyIncrease").innerHTML = Math.round(Result[val].FourOhOne.International - FourOhOneInternational);
  document.getElementById("TaxableBondMonthlyIncrease").innerHTML = Math.round(Result[val].Taxable.Bond - BrokerageBonds);
  document.getElementById("TaxableDomesticMonthlyIncrease").innerHTML = Math.round(Result[val].Taxable.Domestic - BrokerageDomestic);
  document.getElementById("TaxableInternationalMonthlyIncrease").innerHTML = Math.round(Result[val].Taxable.International - BrokerageInternational);
  document.getElementById("IRABondMonthlyIncrease").innerHTML = Math.round(Result[val].IRA.Bond - IRABonds);
  document.getElementById("IRADomesticMonthlyIncrease").innerHTML = Math.round(Result[val].IRA.Domestic - IRADomestic);
  document.getElementById("IRAInternationalMonthlyIncrease").innerHTML = Math.round(Result[val].IRA.International - IRAInternational);

  document.getElementById('customRangeLabel').innerHTML = 'This Month';
  document.getElementById('customRangeLabelPhone').innerHTML = 'This Month';
} else {
  x = val - 1;
  document.getElementById("FourOhOneBondMonthlyIncrease").innerHTML = Math.round(Result[val].FourOhOne.Bond - Result[x].FourOhOne.Bond);
  document.getElementById("FourOhOneDomesticMonthlyIncrease").innerHTML = Math.round(Result[val].FourOhOne.Domestic - Result[x].FourOhOne.Domestic);
  document.getElementById("FourOhOneInternationalMonthlyIncrease").innerHTML = Math.round(Result[val].FourOhOne.International - Result[x].FourOhOne.International);
  document.getElementById("TaxableBondMonthlyIncrease").innerHTML = Math.round(Result[val].Taxable.Bond - Result[x].Taxable.Bond);
  document.getElementById("TaxableDomesticMonthlyIncrease").innerHTML = Math.round(Result[val].Taxable.Domestic - Result[x].Taxable.Domestic);
  document.getElementById("TaxableInternationalMonthlyIncrease").innerHTML = Math.round(Result[val].Taxable.International - Result[x].Taxable.International);
  document.getElementById("IRABondMonthlyIncrease").innerHTML = Math.round(Result[val].IRA.Bond - Result[x].IRA.Bond);
  document.getElementById("IRADomesticMonthlyIncrease").innerHTML = Math.round(Result[val].IRA.Domestic - Result[x].IRA.Domestic);
  document.getElementById("IRAInternationalMonthlyIncrease").innerHTML = Math.round(Result[val].IRA.International - Result[x].IRA.International);

  document.getElementById('customRangeLabel').innerHTML = val.toString().concat(" Month(s) later");
  document.getElementById('customRangeLabelPhone').innerHTML = val.toString().concat(" Month(s) later");
}

  document.getElementById("FourOhOneBondMonthlyIncrease2").innerHTML = Math.round(Result[val].FourOhOne.Bond);
  document.getElementById("FourOhOneDomesticMonthlyIncrease2").innerHTML = Math.round(Result[val].FourOhOne.Domestic);
  document.getElementById("FourOhOneInternationalMonthlyIncrease2").innerHTML = Math.round(Result[val].FourOhOne.International);
  document.getElementById("TaxableBondMonthlyIncrease2").innerHTML = Math.round(Result[val].Taxable.Bond);
  document.getElementById("TaxableDomesticMonthlyIncrease2").innerHTML = Math.round(Result[val].Taxable.Domestic);
  document.getElementById("TaxableInternationalMonthlyIncrease2").innerHTML = Math.round(Result[val].Taxable.International);
  document.getElementById("IRABondMonthlyIncrease2").innerHTML = Math.round(Result[val].IRA.Bond);
  document.getElementById("IRADomesticMonthlyIncrease2").innerHTML = Math.round(Result[val].IRA.Domestic);
  document.getElementById("IRAInternationalMonthlyIncrease2").innerHTML = Math.round(Result[val].IRA.International);

  document.getElementById("htmlBondAllocation").innerHTML = (((Result[val].FourOhOne.Bond + Result[val].Taxable.Bond + Result[val].IRA.Bond)/Result[val].GrandTotal).toFixed(3));
  document.getElementById("htmlDomesticAllocation").innerHTML = (((Result[val].FourOhOne.Domestic + Result[val].Taxable.Domestic + Result[val].IRA.Domestic)/Result[val].GrandTotal).toFixed(3));
  document.getElementById("htmlInternationalAllocation").innerHTML = (((Result[val].FourOhOne.International + Result[val].Taxable.International + Result[val].IRA.International)/Result[val].GrandTotal).toFixed(3));
  document.getElementById("htmlGrandTotal").innerHTML = Math.round(Result[val].GrandTotal);

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    showTooltips: false,
    type: 'bar',
    data: {
        labels: ['401k Bonds', '401k Domestic', '401k International', 'Taxable Bonds', 'Taxable Domestic', 'Taxable International', 'IRA Bonds', 'IRA Domestic', 'IRA International'],
        datasets: [{
            label: '$',
            data: [Math.round(Result[val].FourOhOne.Bond), Math.round(Result[val].FourOhOne.Domestic), Math.round(Result[val].FourOhOne.International),
                   Math.round(Result[val].Taxable.Bond), Math.round(Result[val].Taxable.Domestic), Math.round(Result[val].Taxable.International),
                   Math.round(Result[val].IRA.Bond), Math.round(Result[val].IRA.Domestic), Math.round(Result[val].IRA.International)],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
          display: false
        },
        events: [],
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  // var MonthlyIncreases = document.querySelectorAll("[id$='MonthlyIncrease'][innerHTML!='0']");
  // console.log(MonthlyIncreases);
}

function CalculateAccount(account, fund, ratio, monthly) {
CalculateGrandTotal(Portfolio);
if ( monthly > 0) {
  if ((Portfolio.IRA[fund] + Portfolio.Taxable[fund] + Portfolio.FourOhOne[fund] + monthly) <= (GrandTotal + monthly)*ratio) {
    account[fund] = (account[fund] + monthly)
    account.PaymentTotal[fund] += monthly
    return account
  } else {
      for (i = 0; i < monthly; i++) {
        if (( i + Portfolio.IRA[fund] + Portfolio.Taxable[fund] + Portfolio.FourOhOne[fund]) >= ((GrandTotal + monthly)*ratio)) {
            account[fund] += i
            account.PaymentTotal[fund] += i
            account.Domestic += ( monthly - i )
            account.PaymentTotal.Domestic += ( monthly - i )
            return account
}}}}}

// Execution phase
CalculateMonthly(MonthlyInvestment, 'FourOhOne', FourOhOne, todayMonth);
CalculateMonthly(MonthlyInvestment, 'IRA', IRA, todayMonth);
Monthly.Taxable = MonthlyInvestment;
for (b = 0; b < Months; b++) {
  var TestDate = new Date(today.setMonth(today.getMonth() + b));
  var TestYear = TestDate.getYear()
  if (TestYear != todayYear) {
    resetMonthly();
  }
  delete today;
  today = new Date();
  var OldIRAMonthly = Monthly.IRA;
  var Old401kMonthly = Monthly.FourOhOne;
  if (FourOhOne.Future == true && b == FourOhOne.Months) {
    FourOhOne.Future = false;
    FourOhOne.Exist = true;
    CalculateMonthly(MonthlyInvestment, 'FourOhOne', FourOhOne, (todayMonth + b));
    Monthly.Taxable = MonthlyInvestment;
    Old401kMonthly = Monthly.FourOhOne;
  } if ( IRA.Future == true && b == IRA.Months) {
    IRA.Future = false;
    IRA.Exist = true;
    CalculateMonthly(MonthlyInvestment, 'IRA', IRA, (todayMonth + b));
    Monthly.Taxable = MonthlyInvestment;
    OldIRAMonthly = Monthly.IRA;
  } if (Rollover == true && RollingChose401k == true) {
    Monthly.FourOhOne = (Monthly.FourOhOne + Portfolio.FourOhOne.Domestic + Portfolio.FourOhOne.International + Portfolio.FourOhOne.Bond);
    Portfolio.FourOhOne.Domestic = 0;
    Portfolio.FourOhOne.International = 0;
    Portfolio.FourOhOne.Bond = 0;
  } if (Rollover == true && RollingChoseIRA == true) {
    Monthly.IRA = (Monthly.IRA + Portfolio.FourOhOne.Domestic + Portfolio.FourOhOne.International + Portfolio.FourOhOne.Bond);
    Portfolio.FourOhOne.Domestic = 0;
    Portfolio.FourOhOne.International = 0;
    Portfolio.FourOhOne.Bond = 0;
  }
  CalculateAccount(Portfolio.IRA, 'Bond', DesiredRatio.Bond, Monthly.IRA);
  CalculateAccount(Portfolio.Taxable, 'International', DesiredRatio.International, Monthly.Taxable);
  CalculateAccount(Portfolio.FourOhOne, 'Bond', DesiredRatio.Bond, Monthly.FourOhOne);
  Monthly.IRA = OldIRAMonthly;
  Monthly.FourOhOne = Old401kMonthly;
  Rollover = false;
  CalculateGrandTotal(Portfolio);
  Portfolio.GrandTotal = Math.round(GrandTotal);
  Result[b] = jsonCopy(Portfolio);
}
console.log(Portfolio);
console.log(Result);
toggleMainDiv();
CalculatePayments(val);
}
