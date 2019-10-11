function Financial_Planning() {
var today = new Date();
var todayMonth = today.getMonth();
var todayYear = today.getYear();

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

var Portfolio = {IRA: {Domestic: 0, International: 0, Bond: 0, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}},
             Taxable: {Domestic: 0, International: 0, Bond: 0, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}},
             FourOhOne: {Domestic: 0, International: 0, Bond: 0, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}}};
var DesiredRatio = {Domestic: 0, International: 0, Bond: 0};
var Monthly = {FourOhOne: 0, IRA: 0, Taxable: 0};
var Months = 12;
var Rollover = "No";
var FourOhOne = {Future: false, Months: 0, Limit: 19000, Past: {PreviousContributions: false, Amount: 0},
                  RemainingMonths: 0, FuturePayment: 0};
var IRA = {Future: false, Months: 0, Limit: 6000, Past: {PreviousContributions: false, Amount: 0},
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

 function CalculateMonthly(MonthlyInvestmentFunction, fund, account) {
   if (account.Future == false) {
     account.RemainingMonths = 12 - todayMonth;
   if (account.Past.PreviousContributions == true) {
     account.Limit = account.Limit - account.Past.Amount;
     account.Past.PreviousContributions == false;
     account.Past.Amount = 0;
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
  Monthly.FourOhOne = 0;
  Monthly.IRA = 0;
  Monthly.Taxable = 0;
  MonthlyInvestment = MonthlyInvestmentSnapshot;
  FourOhOne.Limit = 19000;
  IRA.Limit = 6000;
  CalculateMonthly(MonthlyInvestment, 'FourOhOne', FourOhOne);
  CalculateMonthly(MonthlyInvestment, 'IRA', IRA);
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
CalculateMonthly(MonthlyInvestment, 'FourOhOne', FourOhOne);
CalculateMonthly(MonthlyInvestment, 'IRA', IRA);
Monthly.Taxable = MonthlyInvestment;
for (b = 0; b < Months; b++) {
  var TestDate = new Date(today.setMonth(today.getMonth() + b));
  var TestYear = TestDate.getYear()
  if (TestYear != todayYear) {
    resetMonthly();
  }
  var OldIRAMonthly = Monthly.IRA;
  if (FourOhOne.Future == true && b == FourOhOne.Months) {
    Monthly.FourOhOne = Math.round(FourOhOne.FuturePayment);
    Monthly.Taxable = (Monthly.Taxable - Monthly.FourOhOne);
  } if ( IRA.Future == true && b == IRA.Months) {
    Monthly.IRA = Math.round(IRA.FuturePayment);
    Monthly.Taxable = (Monthly.Taxable - Monthly.IRA);
  } if (Rollover == "Yes") {
    Monthly.IRA = (Monthly.IRA + Portfolio.FourOhOne.Domestic + Portfolio.FourOhOne.International + Portfolio.FourOhOne.Bond);
    Portfolio.FourOhOne.Domestic = 0;
    Portfolio.FourOhOne.International = 0;
    Portfolio.FourOhOne.Bond = 0;
  }
  CalculateAccount(Portfolio.IRA, 'Bond', DesiredRatio.Bond, Monthly.IRA);
  CalculateAccount(Portfolio.Taxable, 'International', DesiredRatio.International, Monthly.Taxable);
  CalculateAccount(Portfolio.FourOhOne, 'Bond', DesiredRatio.Bond, Monthly.FourOhOne);
  Monthly.IRA = OldIRAMonthly;
  Rollover = "No";
  Result[b] = jsonCopy(Portfolio);
};
console.log(Portfolio);
console.log(Result);
}
