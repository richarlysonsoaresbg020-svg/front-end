import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/list1.css";

function EpList() {
    const [Eps, setEps] = useState([]);

    const fetchEps = async () => {  
        const response = await api.get("/episodios");
        setEps(response.data);
    };

    useEffect(() => {
        fetchEps();
    }, [])

    const deleteEp = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este episódio");

        if (!confirmDelete) {
            return
        }

        try {
            await api.delete(`/episodios/${id}`);
            fetchEps();
            alert("Episódio excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir: ", error);
            alert("Erro ao excluir episódio");
        }
    };

    return (
        <div className="container">
            <h1>Episodios</h1>

            {Eps.length === 0 && <p>Nenhum episódio cadastrado.</p>}

            {Eps.map((ep) => (
                <div className="card" key={ep._id}>
                    <div className="card-content">
                        <strong>Nome: {ep.nome}</strong>
                        <p>Temporada: {ep.temporada}</p>
                        <p>História: {ep.historia}</p>
                    </div>

                    <div className="actions">
                        <Link to={`/edit/${ep._id}`}>
                            <button className="edit-btn" >Editar</button>
                        </Link>

                        <button className="delete-btn" onClick={() => deleteEp(ep._id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EpList;