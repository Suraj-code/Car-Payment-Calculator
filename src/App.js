import { useState } from "react";

function App() {
  const [carPrice, setCarPrice] = useState(35000);

  return (
    <div>
      <h1>Car Deal Calculator</h1>

      <label>Car Price: $</label>
      <input
        type="number"
        value={carPrice}
        onChange={(e) => setCarPrice(Number(e.target.value))}
      />

      <p>You entered: ${carPrice}</p>
    </div>
  );
}

export default App;