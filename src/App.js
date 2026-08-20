import { useState } from "react";

function App() {
  const [carPrice, setCarPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(2000);
  const [apr, setApr] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [mode, setMode] = useState("Finance");

  const [msrp, setMsrp] = useState(35000);
  const [residualValue, setResidualValue] = useState(55);
  const [moneyFactor, setMoneyFactor] = useState(0.0025);
  const [leaseTerm, setLeaseTerm] = useState(36);

  const [monthlyTakeHome, setMonthlyTakeHome] = useState(4390);
  const [rent, setRent] = useState(1200);
  const [otherExpenses, setOtherExpenses] = useState(1000);
  const [estimatedInsurance, setEstimatedInsurance] = useState(150);
  const [savings, setSavings] = useState(0);

  let monthlyPayment = 0;
  let residualAmount = msrp * (residualValue / 100);
  let loanAmount = 0;

  //Finance and lease calculations
  if (mode === "Finance") {

    loanAmount = carPrice - downPayment;
    const monthlyRate = apr / 100 / 12;
    monthlyPayment =
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))
    / (Math.pow(1 + monthlyRate, loanTerm) - 1);

  } else if (mode === "Lease") {
    const depreciation = ((carPrice - downPayment) - residualAmount) / leaseTerm;
    const financeCharge = ((carPrice - downPayment) + residualAmount) * moneyFactor;
    monthlyPayment = depreciation + financeCharge;

  }

  //Total monthly expenses
  let monthlyCarCost = monthlyPayment + estimatedInsurance;
  let moneyLeft = monthlyTakeHome - (monthlyCarCost + rent + otherExpenses);
  let carCostPercentage = (monthlyCarCost / monthlyTakeHome) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 text-center">Car Deal Calculator</h1>

      <div className="flex gap-2 mb-8 mt-2 justify-center">
        <button className={`px-5 py-2 rounded-lg text-sm font-semibold ${mode === "Finance" ? "bg-cyan-500 text-slate-900" : "bg-slate-800 text-slate-400"}`} onClick={() => setMode("Finance")}>Finance</button>
        <button className={`px-5 py-2 rounded-lg text-sm font-semibold ${mode === "Lease" ? "bg-cyan-500 text-slate-900" : "bg-slate-800 text-slate-400"}`} onClick={() => setMode("Lease")}>Lease</button>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Car Price: $</label>
        <input
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
          type="number"
          value={carPrice}
          onChange={(e) => setCarPrice(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Down Payment: $</label>
        <input
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
        />
      </div>
 
      {mode === "Lease" && (
        <div>
          <div className="flex flex-col gap-1 mt-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">MSRP: $</label>
            <input
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
              type="number"
              value={msrp}
              onChange={(e) => setMsrp(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Residual Value: %</label>
            <input
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
              type="number"
              value={residualValue}
              onChange={(e) => setResidualValue(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Money Factor: </label>
            <input
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
              type="number"
              value={moneyFactor}
              step="0.0001"
              onChange={(e) => setMoneyFactor(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Lease Term (months): </label>
            <input
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
            type="number"
            value={leaseTerm}
            onChange={(e) => setLeaseTerm(Number(e.target.value))}
            />
          </div>
        
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 mt-4">
            <h2 className="text-2xl font-bold text-cyan-400">Monthly Lease Payment: ${monthlyPayment.toFixed(2)}</h2>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Residual Amount: ${residualAmount.toLocaleString()}</p>
          </div>
      </div>
      )}

      {mode === "Finance" && (
        <div>
          <div className="flex flex-col gap-1 mt-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">APR: %</label>
            <input
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
              type="number"
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Loan Term (months): </label>
            <input
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 mt-4">
            <h2 className="text-2xl font-bold text-cyan-400">Monthly Payment: ${monthlyPayment.toFixed(2)}</h2>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Loan Amount: ${loanAmount.toLocaleString()}</p>
          </div>
        </div>
      )}

      <h2 className="text-l font-bold uppercase tracking-widest mt-8 mb-4 text-cyan-400">Monthly Budget</h2>

      <div className="flex flex-col gap-1 mt-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Monthly Take-Home Pay: $</label>
          <input
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
            type="number"
            value={monthlyTakeHome}
            onChange={(e) => setMonthlyTakeHome(Number(e.target.value))}
          />
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Rent & Utilities: $</label>
        <input
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
          type="number"
          value={rent}
          onChange={(e) => setRent(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Other Expenses (Food, Fun, Entertainment etc): $</label>
        <input
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm outline-none w-full"
          type="number"
          value={otherExpenses}
          onChange={(e) => setOtherExpenses(Number(e.target.value))}
        />
      </div>

        <p className="text-2xl font-bold text-cyan-400">Total monthly car cost: ${monthlyCarCost.toLocaleString()}</p>
        <p>Money left: ${moneyLeft.toLocaleString()}</p>
        <p>Car cost %: {carCostPercentage.toFixed(2)}%</p>
        <p>Saving%: {(moneyLeft/monthlyTakeHome * 100).toLocaleString()}%</p>

        {carCostPercentage >= 15 && carCostPercentage <= 20 && (
          <p className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">Your car cost is 15%-20% of your monthly take-home pay. Tight but doable!</p>
        )}
        {carCostPercentage > 20 && (
          <p className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">Your car cost is more than 20% of your monthly take-home pay. Too EXPENSIVE!</p>
        )}
        {carCostPercentage < 15 && (
          <p className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">Your car cost is less than 15% of your monthly take-home pay. COMFORTABLE!</p>
        )}

      <p className="text-center text-xs text-slate-600 mt-8">Not financial advice. Double-check dealer worksheets.</p>

    </div>
  );
}

export default App;