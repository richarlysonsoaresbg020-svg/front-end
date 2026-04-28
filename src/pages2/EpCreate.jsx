import { useState, useRef } from "react";
import api from "../services/api";
import "../styles/form1.css"

function EpCreate() {
    const [name, setName] = useState("");
    const [temporada, setTemporada] = useState("");
    const [historia, setHistoria] = useState("");
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/ep", {
                nome: name,
                temporada: temporada,
                historia: historia,
            })

            console.log("Resposta da API:", response.data)

            setName("");
            setTemporada("");
            setHistoria("");
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
                    <label>Temporada</label>
                    <input type="text"
                        value={temporada}
                        onChange={(e) => setTemporada(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Historia</label>
                    <input type="text"
                        value={historia}
                        onChange={(e) => setHistoria(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row button-row">
                    <button type="submit">Criar</button>
                </div>

            </form>
        </div>
    );
}

export default EpCreate;