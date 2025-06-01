import React from "react";

function WeatherCard({ data }) {
    // 'data' debe ser el objeto con { city, temperature, humidity, condition }
    if (!data) {
        return null; // Si no hay datos, no renderizas nada.
    }

    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                maxWidth: "400px",
                background: "#f9f9f9",
                color: "#000",
            }}
        >
            <h2>Clima en {data.city}</h2>
            <p>
                <strong>Temperatura:</strong> {data.temperature} °C
            </p>
            <p>
                <strong>Humedad:</strong> {data.humidity}%
            </p>
            <p>
                <strong>Condición:</strong> {data.condition}
            </p>
        </div>
    );
}

export default WeatherCard;