import { useState, useRef } from "react";
import api from "../services/api";
import "../styles/form.css"

function UserCreate() {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [posição, setPosição] = useState("");
    const [foto, setFoto] = useState("");
    const [fotoPreview, setFotoPreview] = useState(null);
    const fotoInputRef = useRef(null);

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
            const response = await api.post("/users", {
                nome: name,
                time: time,
                posição: posição,
                foto: foto,
            })

            console.log("Resposta da API:", response.data)

            setName("");
            setTime("");
            setPosição("");
            setFoto("");
            setFotoPreview(null);
            if (fotoInputRef.current) {
                fotoInputRef.current.value = "";
            }
            alert("Personagem criado com sucesso");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao criar personagem.")
        }
    }

    return (
        <div className="create-container">
            <h2>Personagem</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome</label>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Time</label>
                    <input type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Posição</label>
                    <input type="text"
                        value={posição}
                        onChange={(e) => setPosição(e.target.value)}
                        required
                    />
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
                    <button type="submit">Criar</button>
                </div>

            </form>
        </div>
    );
}

export default UserCreate;