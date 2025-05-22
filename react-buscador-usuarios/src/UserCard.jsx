
function UserCard({ usuario }) {
    return (
        <div style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            maxWidth: "1000px"
        }}>
            <h2>{usuario.name}</h2>
            <p><strong>Correo:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> {usuario.phone}</p>
            <p><strong>Empresa:</strong> {usuario.company.name}</p>
        </div>
    );
}
export default UserCard;
