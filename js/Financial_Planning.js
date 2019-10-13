function Financial_Planning() {
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
var BondAllocation = Number(document.getElementById("BondAllocation").value);
var DomesticAllocation = Number(document.getElementById("DomesticAllocation").value);
var InternationalAllocation = Number(document.getElementById("InternationalAllocation").value);
var FourOhOnePrevious = Number(document.getElementById("FourOhOnePrevious").value);
var IRAPrevious = Number(document.getElementById("IRAPrevious").value);
var Rollover = document.getElementById("rolling401k1").checked;
var Have401k1 = document.getElementById("have401k1").checked;
var HaveIRA1 = document.getElementById("haveIRA1").checked;

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

console.log(typeof Rolling401k1);
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
IRA.Exist = HaveIRA1;
console.log("401k Exist: ", FourOhOne.Exist)
console.log("IRA Exist: ", IRA.Exist)
console.log("Rollover: ", Rollover)
console.log("401 past contributions", FourOhOne.Past.Amount);
if (FourOhOne.Past.Amount > 0) {
  FourOhOne.Past.PreviousContributions = true;
}
if (IRA.Past.Amount > 0) {
  IRA.Past.PreviousContributions = true;
}
console.log("Made 401 past contributions?", FourOhOne.Past.PreviousContributions);

function CalculateFuture(account) {
  if (account.Future == true) {
    var FutureDate = new Date(today.setMonth(today.getMonth() + account.Months));
    var FutureMonth = FutureDate.getMonth()
    var FutureYear = FutureDate.getYear()
    account.RemainingMonths = 12 - FutureMonth;
    if (todayYear != FutureYear) {
    	account.Past.PreviousContributions == false;
    	account.Past.Amount = 0;
  } if (account.Past.PreviousContributions == true) {
    	account.Limit = account.Limit - account.Past.Amount;
      account.Past.PreviousContributions == false;
    	account.Past.Amount = 0;
  }
  account.FuturePayment = account.Limit / account.RemainingMonths;
 }}

 function CalculateMonthly(MonthlyInvestmentFunction, fund, account, currentMonth) {
   if (account.Future == false) {
     console.log("TODAY'S MONTH", currentMonth);
     account.RemainingMonths = 12 - currentMonth;
     console.log("Remaining Months", account.RemainingMonths);
   if (account.Past.PreviousContributions == true) {
     account.Limit = account.Limit - account.Past.Amount;
     account.Past.PreviousContributions == false;
     account.Past.Amount = 0;
     console.log(fund, "Limit: ", account.Limit);
   } if ((account.Limit / account.RemainingMonths) > MonthlyInvestment) {
       Monthly[fund] = MonthlyInvestmentFunction;
       MonthlyInvestment = 0;
       console.log("Leftover monthly investment", MonthlyInvestment);
   } else {
       Monthly[fund] = (account.Limit / account.RemainingMonths);
       MonthlyInvestment = MonthlyInvestmentFunction - (account.Limit / account.RemainingMonths);
       console.log("Leftover monthly investment", MonthlyInvestment);
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
  IRA.Limit = 6000;
  todayYear = todayYear + 1;
  CalculateMonthly(MonthlyInvestment, 'FourOhOne', FourOhOne, 0);
  CalculateMonthly(MonthlyInvestment, 'IRA', IRA, 0);
  Monthly.Taxable = MonthlyInvestment;
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

CalculateFuture(FourOhOne);
CalculateFuture(IRA);
CalculateMonthly(MonthlyInvestment, 'FourOhOne', FourOhOne, todayMonth);
CalculateMonthly(MonthlyInvestment, 'IRA', IRA, todayMonth);
Monthly.Taxable = MonthlyInvestment;
for (b = 0; b < Months; b++) {
  var TestDate = new Date(today.setMonth(today.getMonth() + b));
  var TestYear = TestDate.getYear()
  console.log("Today's year", todayYear);
  console.log("Today's date", today);
  console.log(b, "Months ahead", TestDate);
  console.log("Months ahead year", TestYear);
  if (TestYear != todayYear) {
    resetMonthly();
  }
  delete today;
  today = new Date();
  var OldIRAMonthly = Monthly.IRA;
  if (FourOhOne.Future == true && b == FourOhOne.Months) {
    Monthly.FourOhOne = Math.round(FourOhOne.FuturePayment);
    Monthly.Taxable = (Monthly.Taxable - Monthly.FourOhOne);
  } if ( IRA.Future == true && b == IRA.Months) {
    Monthly.IRA = Math.round(IRA.FuturePayment);
    Monthly.Taxable = (Monthly.Taxable - Monthly.IRA);
  } if (Rollover == true) {
    Monthly.IRA = (Monthly.IRA + Portfolio.FourOhOne.Domestic + Portfolio.FourOhOne.International + Portfolio.FourOhOne.Bond);
    Portfolio.FourOhOne.Domestic = 0;
    Portfolio.FourOhOne.International = 0;
    Portfolio.FourOhOne.Bond = 0;
  }
  CalculateAccount(Portfolio.IRA, 'Bond', DesiredRatio.Bond, Monthly.IRA);
  CalculateAccount(Portfolio.Taxable, 'International', DesiredRatio.International, Monthly.Taxable);
  CalculateAccount(Portfolio.FourOhOne, 'Bond', DesiredRatio.Bond, Monthly.FourOhOne);
  Monthly.IRA = OldIRAMonthly;
  Rollover == false;
  Result[b] = jsonCopy(Portfolio);
}
console.log(Portfolio);
console.log(Result);
}
