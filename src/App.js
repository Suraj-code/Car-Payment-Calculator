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
    <div>
      <h1>Car Deal Calculator</h1>

      <button style={{ fontWeight: mode === "Finance" ? "bold" : "normal" }} onClick={() => setMode("Finance")}>Finance</button>
      <button style={{ fontWeight: mode === "Lease" ? "bold" : "normal" }} onClick={() => setMode("Lease")}>Lease</button>

      <label>Car Price: $</label>
      <input
        type="number"
        value={carPrice}
        onChange={(e) => setCarPrice(Number(e.target.value))}
      />

      <label>Down Payment: $</label>
      <input
        type="number"
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
      />
      <br />

      {mode === "Lease" && (
        <div>
          <label>MSRP: $</label>
          <input
            type="number"
            value={msrp}
            onChange={(e) => setMsrp(Number(e.target.value))}
          />
          <br />

          <label>Residual Value: </label>
          <input
            type="number"
            value={residualValue}
            onChange={(e) => setResidualValue(Number(e.target.value))}
          />
          <span>%</span>
          <br />

          <label>Money Factor: </label>
          <input
            type="number"
            value={moneyFactor}
            step="0.0001"
            onChange={(e) => setMoneyFactor(Number(e.target.value))}
          />
          <br />

          <label>Lease Term: </label>
          <input
            type="number"
            value={leaseTerm}
            onChange={(e) => setLeaseTerm(Number(e.target.value))}
          />
          <span>months</span>
          <br />

          <h2>Monthly Lease Payment: ${monthlyPayment.toFixed(2)}</h2>
          <p>Residual Amount: ${residualAmount.toLocaleString()}</p>
        </div>
      )}

      {mode === "Finance" && (
        <div>
          <label>APR: </label>
          <input
            type="number"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
          />
          <span>%</span>
          <br />

          <label>Loan Term: </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
          />
          <span>months</span>
          <br />

          <h2>Monthly Payment: ${monthlyPayment.toFixed(2)}</h2>
          <p>Loan Amount: ${loanAmount.toLocaleString()}</p>
        </div>
      )}

      <h2>Monthly Budget</h2>

      <label>Monthly Take-Home Pay: $</label>
        <input
          type="number"
          value={monthlyTakeHome}
          onChange={(e) => setMonthlyTakeHome(Number(e.target.value))}
        />
        <br />

        <label>Rent & Utilities: $</label>
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(Number(e.target.value))}
        />
        <br />

        <label>Other Expenses (Food, Fun, Entertainment etc): $</label>
        <input
          type="number"
          value={otherExpenses}
          onChange={(e) => setOtherExpenses(Number(e.target.value))}
        />
        <br />

        <p>Total monthly car cost: ${monthlyCarCost.toLocaleString()}</p>
        <p>Money left: ${moneyLeft.toLocaleString()}</p>
        <p>Car cost %: ${carCostPercentage.toFixed(2)}%</p>
        <p>Saving%: ${(moneyLeft/monthlyTakeHome * 100).toLocaleString()}%</p>

        {carCostPercentage >= 15 && carCostPercentage <= 20 && (
          <p style={{ color: "orange" }}>Your car cost is 15%-20% of your monthly take-home pay. Tight but doable!</p>
        )}
        {carCostPercentage > 20 && (
          <p style={{ color: "red" }}>Your car cost is more than 20% of your monthly take-home pay. Too EXPENSIVE!</p>  
        )}
        {carCostPercentage < 15 && (
          <p style={{ color: "green" }}>Your car cost is less than 15% of your monthly take-home pay. COMFORTABLE!</p>
        )}


    </div>
  );
}

export default App;