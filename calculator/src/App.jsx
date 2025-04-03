import { useState } from 'react'
import './App.css'

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculation = (operator) => {
    try {
      const number1 = parseFloat(num1);
      const number2 = parseFloat(num2);
      
      if (isNaN(number1) || isNaN(number2)) {
        throw new Error('Ingresa valores numéricos válidos');
      }
      let res;
      switch (operator) {
        case '+':
          res = number1 + number2;
          break;
        case '-':
          res = number1 - number2;
          break;
        case '*':
          res = number1 * number2;
          break;
        case '/':
          if (number2 === 0) {
            throw new Error('No se puede dividir entre cero');
          }
          res = number1 / number2;
          break;
        default:
          throw new Error('Operacion no válida');
      }

      setResult(res);
      setError(''); //Limpiar mensaje de error si la operación es exitosa
    } catch (err) {
      setError(err.message);
      setResult(null); // Limpiar resultado si hay un error
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Calculadora con manejo de errores</h1>
      <input
        type="text"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Número 1"
        style={{ padding: '10px', margin: '5px' }}
      />
      <input
        type="text"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Número 2"
        style={{ padding: '10px', margin: '5px' }}
      />
      <div>
        <button onClick={() => handleCalculation('+')}>+</button>
        <button onClick={() => handleCalculation('-')}>-</button>
        <button onClick={() => handleCalculation('*')}>*</button>
        <button onClick={() => handleCalculation('/')}>/</button>
      </div>
      {result !== null && <h2>Resultado: {result}</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      <div>
        <button onClick={() => { setNum1(''); setNum2(''); setResult(null); setError(''); }}>Limpiar</button>
      </div>
    </div>
  );
}

export default Calculator;