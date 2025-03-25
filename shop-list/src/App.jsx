import { useState } from 'react';

function App() {
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    if (product.trim() !== "") {
      setProducts([...products, { name: product, purchased: false }]);
      setProduct("");
    }
  };

  const toggleProduct = (index) => {
    const updatedProducts = products.map((item, i) =>
      i === index ? { ...item, purchased: !item.purchased } : item
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Agregar Producto"
      />
      <button onClick={addProduct}>Agregar</button>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {products.map((item, index) => (
          <li key={index} style={{ textDecoration: item.purchased ? "line-through" : "none", margin: "10px 0" }}>
            {item.name}
            <button onClick={() => toggleProduct(index)}
              style={{ marginLeft: "10px" }}>
              {item.purchased ? "Desmarcar" : "Comprado"}
            </button>
            <button onClick={() => deleteProduct(index)}
              style={{ marginLeft: "5px", color: "red" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;