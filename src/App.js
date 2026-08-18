import { useState } from "react";

function App() {
  const [carPrice, setCarPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(2000);
  const [apr, setApr] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [mode, setMode] = useState("Finance");

  const loanAmount = carPrice - downPayment;
  const monthlyRate = apr / 100 / 12;
  const monthlyPayment =
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))
    / (Math.pow(1 + monthlyRate, loanTerm) - 1);


  return (
    <div>
      <h1>Car Deal Calculator</h1>

      <button onClick={() => setMode("Finance")}>Finance</button>
      <button onClick={() => setMode("Lease")}>Lease</button>

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

      {mode === "Finance" && (
        <div>
          <label>APR: $</label>
          <input
            type="number"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
          />
          <span>%</span>
          <br />

          <label>Loan Term: $</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
          />
          <span>months</span>
          <br />
        </div>
      )}

      <h2>Monthly Payment: ${monthlyPayment.toFixed(2)}</h2>
      <p>Loan Amount: ${loanAmount.toLocaleString()}</p>
    </div>
  );
}

export default App;