var today = new Date();

var Portfolio = {IRA: {Domestic: 5714, International: 0, Bond: 4726, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}},
             Taxable: {Domestic: 5401, International: 3959, Bond: 0, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}},
             FourOhOne: {Domestic: 8599, International: 3666, Bond: 3128, PaymentTotal: {Domestic: 0, International: 0, Bond: 0}}};
var DesiredRatio = {Domestic: .525, International: .225, Bond: .25};
var Monthly = {FourOhOne: 0, IRA: 4000, Taxable: 5100};
var Months = 20;
var Rollover = "Yes";
var FourOhOne = {Future: true, Months: 8, Limit: 19000, Past: {PreviousContributions: false, Amount: 0},
                  RemainingMonths: 0, FuturePayment: 0};
var IRA = {Future: true, Months: 8, Limit: 6000, Past: {PreviousContributions: false, Amount: 0},
          RemainingMonths: 0, FuturePayment: 0};
var Result = new Array();

function CalculateFuture(account) {
  if (account.Future = true) {
  	var todayYear = today.getYear()
    var FutureDate = new Date(today.setMonth(today.getMonth() + account.Months));
    var FutureMonth = FutureDate.getMonth()
    var FutureYear = FutureDate.getYear()
    account.RemainingMonths = 12 - FutureMonth;
    if (todayYear != FutureYear) {
    	account.Past.PreviousContributions == false;
    	account.Past.Amount = 0;
  } if (account.Past.PreviousContributions == true) {
    	account.Limit = account.Limit - account.Past.Amount;
  }
  account.FuturePayment = account.Limit / account.RemainingMonths;
 }}

function CalculateGrandTotal(Portfolio) {
  GrandTotal = Portfolio.FourOhOne.Domestic + Portfolio.IRA.Domestic + Portfolio.Taxable.Domestic +
               Portfolio.FourOhOne.International + Portfolio.IRA.International + Portfolio.Taxable.International +
               Portfolio.FourOhOne.Bond + Portfolio.IRA.Bond + Portfolio.Taxable.Bond;
  return GrandTotal
}

function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
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
for (b = 0; b < Months; b++) {
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
