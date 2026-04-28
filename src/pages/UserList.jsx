import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/list.css";

function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await api.get("/users");
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, [])

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário");

        if (!confirmDelete) {
            return
        }

        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
            alert("Usuário excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir: ", error);
            alert("Erro ao excluir usuário");
        }
    };

    const placeholderImage = "";

    return (
        <div className="container">
            <h1>Personagens de Haikyuu</h1>

            {users.length === 0 && <p>Nenhum usuário cadastrado.</p>}

            {users.map((user) => (
                <div className="card" key={user._id}>
                    <div className="avatar-container">
                        <img
                            className="avatar"
                            src={user.foto || placeholderImage}
                            alt={`Foto de ${user.nome}`}
                        />
                    </div>

                    <div className="card-content">
                        <strong>Nome: {user.nome}</strong>
                        <p>Time: {user.time}</p>
                        <p>Posição: {user.posição}</p>
                    </div>

                    <div className="actions">
                        <Link to={`/edit/${user._id}`}>
                            <button className="edit-btn" >Editar</button>
                        </Link>

                        <button className="delete-btn" onClick={() => deleteUser(user._id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserList;