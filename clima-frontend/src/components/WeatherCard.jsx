// src/components/WeatherCard.jsx
import React from "react";

function WeatherCard({ data }) {
    if (!data) return null;
    const { city, temperature, humidity, condition } = data;

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
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
        >
            <h2 style={{ margin: "0 0 0.5rem 0" }}>{city}</h2>
            <p style={{ margin: "0.25rem 0" }}>
                <strong>Temperatura:</strong> {temperature} °C
            </p>
            <p style={{ margin: "0.25rem 0" }}>
                <strong>Humedad:</strong> {humidity}%
            </p>
            <p style={{ margin: "0.25rem 0" }}>
                <strong>Condición:</strong> {condition}
            </p>
        </div>
    );
}

export default WeatherCard;
