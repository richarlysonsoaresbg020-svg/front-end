import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form1.css"

function EpEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [temporada, setTemporada] = useState("");
    const [historia, setHistoria] = useState("");
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/users");
                const user = response.data.find((u) => u._id === id);

                if (user) {
                    setName(user.nome);
                    setTemporada(user.temporada);
                    setHistoria(user.historia);
                }
            } catch (error) {
                console.error("Erro ao carregar usuário: ", error);
            }
        };
        fetchUser();
    }, [id])
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/users/${id}`,
                {
                    nome: name,
                    temporada: temporada,
                    historia: historia
                });

            alert("Episodio atualizado com sucesso!");
            navigate("/ep");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao atualizar episodio");
        }
    }

    return (
        <div className="create-container">
            <h2>Editar Episodio</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome:</label>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>

                <div className="form-row">
                    <label>Temporada:</label>
                    <input type="text"
                        value={temporada}
                        onChange={(e) => setTemporada(e.target.value)}
                        required />
                </div>

                <div className="form-row">
                    <label>História:</label>
                    <input type="text"
                        value={historia}
                        onChange={(e) => setHistoria(e.target.value)}
                        required />
                </div>
                <div className="form-row button-row">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default EpEdit;