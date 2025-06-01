import { useState } from 'react';

function App() {
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    if (product.trim() !== "") {
      setProducts([
        ...products,
        { id: Date.now(), name: product, purchased: false }, // Generar un ID único
      ]);
      setProduct("");
    }
  };

  const toggleProduct = (id) => {
    const updatedProducts = products.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  // Contar cuántos productos faltan por comprar
  const remainingProducts = products.filter((item) => !item.purchased).length;

  // Ordenar la lista para que los productos comprados aparezcan al final
  const sortedProducts = [...products].sort((a, b) => {
    if (a.purchased === b.purchased) return 0;
    return a.purchased ? 1 : -1; // Los no comprados primero
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#fff" }}>Lista de Compras</h1>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Agregar Producto"
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />
      <button
        onClick={addProduct}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Agregar
      </button>
      <h3 style={{ marginTop: "20px", color: "#fff" }}>
        Productos por comprar: {remainingProducts}
      </h3>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          maxWidth: "600px",
          margin: "20px auto", // Centrar la lista
          textAlign: "left", // Alinear el texto a la izquierda
        }}
      >
        {sortedProducts.map((item) => (
          <li
            key={item.id} // Usar el ID único como clave
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: item.purchased ? "#f0f0f0" : "#fff",
              color: "#000", // Asegurar que el texto sea oscuro
              textDecoration: item.purchased ? "line-through" : "none",
            }}
          >
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => toggleProduct(item.id)} // Usar el ID único para identificar el producto
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor: item.purchased ? "#ffc107" : "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                {item.purchased ? "Desmarcar" : "Comprar"}
              </button>
              <button
                onClick={() => deleteProduct(item.id)} // Usar el ID único para eliminar
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>Hinojo López Jesús Eduardo - 21111119</div>

    </div>
  );
}

export default App;