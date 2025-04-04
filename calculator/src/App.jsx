import { useState } from 'react';
import './App.css';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); // Historial de cálculos

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
        case '^':
          res = Math.pow(number1, number2);
          break;
        case '√':
          if (number1 < 0 && number2 % 2 === 0) {
            throw new Error('No se puede calcular la raíz par de un número negativo');
          }
          res = Math.pow(number1, 1 / number2);
          break;
        default:
          throw new Error('Operación no válida');
      }

      setResult(res);
      setError('');
      setHistory((prevHistory) => [
        ...prevHistory,
        `${number1} ${operator} ${number2} = ${res}`,
      ]); // Agregar al historial
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const clearHistory = () => {
    setHistory([]); // Limpiar historial
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
        <button onClick={() => handleCalculation('^')}>^</button>
        <button onClick={() => handleCalculation('√')}>n√x</button>
      </div>
      {result !== null && <h2>Resultado: {result}</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      <div>
        <button
          onClick={() => {
            setNum1('');
            setNum2('');
            setResult(null);
            setError('');
          }}
        >
          Limpiar
        </button>
      </div>
      <h3>Historial de cálculos</h3>
      <ul
        style={{
          color: '#333',
          listStyleType: 'none',
          padding: 0,
          maxWidth: '400px',
          margin: '20px auto',
          textAlign: 'left',
        }}
      >
        {history.map((entry, index) => (
          <li
            key={index}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f7f7f7',
            }}
          >
            {entry}
          </li>
        ))}
      </ul>
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Limpiar Historial
        </button>
      )}
    </div>
  );
}

export default Calculator;