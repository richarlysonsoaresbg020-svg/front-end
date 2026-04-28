import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css"

function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [posição, setPosição] = useState("");
    const [foto, setFoto] = useState("");
    const [fotoPreview, setFotoPreview] = useState(null);
    const fotoInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/users");
                const user = response.data.find((u) => u._id === id);

                if (user) {
                    setName(user.nome);
                    setTime(user.time);
                    setPosição(user.posição);
                    setFoto(user.foto || "");
                    setFotoPreview(user.foto || null);
                }
            } catch (error) {
                console.error("Erro ao carregar usuário: ", error);
            }
        };
        fetchUser();
    }, [id])

    const handleFotoChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setFoto("");
            setFotoPreview(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFoto(reader.result);
            setFotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/users/${id}`,
                {
                    nome: name,
                    time: time,
                    posição: posição,
                    foto: foto
                });

            alert("Usuário atualizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao atualizar usuário");
        }
    }

    return (
        <div className="create-container">
            <h2>Editar Personagem</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome:</label>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>

                <div className="form-row">
                    <label>Time:</label>
                    <input type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required />
                </div>

                <div className="form-row">
                    <label>Posição:</label>
                    <input type="text"
                        value={posição}
                        onChange={(e) => setPosição(e.target.value)}
                        required />
                </div>

                <div className="form-row">
                    <label>Foto</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        ref={fotoInputRef}
                    />
                    {fotoPreview && (
                        <img
                            className="photo-preview"
                            src={fotoPreview}
                            alt="Prévia da foto"
                        />
                    )}
                </div>

                <div className="form-row button-row">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default UserEdit;