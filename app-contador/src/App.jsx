import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0); // Estado del contador
  const [step, setStep] = useState(1); // Estado del paso de incremento/decremento

  const increase = () => setCount(count + step); // Aumentar el contador
  const decrease = () => {
    if (count > 0) setCount(Math.max(0, count - step)); // Disminuir el contador solo si es mayor que 0
  };
  const reset = () => setCount(0); // Reiniciar el contador

  // Cambiar el color del fondo según el valor del contador
  const getBackgroundColor = () => {
    if (count === 0) return 'brown';
    return count % 2 === 0 ? 'gray' : 'purple';
  };

  // Cambiar el color del texto según el valor del contador
  const getColor = () => {
    if (count > 0) return 'green';
    if (count < 0) return 'red';
    return 'white';
  };

  // Actualizar el color de fondo del body
  useEffect(() => {
    document.body.style.backgroundColor = getBackgroundColor();
  }, [count]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1>Contador React</h1>
      <h1 style={{ color: getColor() }}>{count}</h1>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        style={{ marginBottom: "20px", padding: "5px", width: "50px" , textAlign: "center", fontSize: "16px"}}
      />
      <br />
      <button onClick={increase}>Aumentar</button>
      <button onClick={decrease}>Disminuir</button>
      <button onClick={reset}>Reiniciar</button>
    </div>
  );
}

export default App;