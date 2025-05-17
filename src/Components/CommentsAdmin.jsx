import {useEffect, useState} from "react";
import {GetAllComments, DeleteComment} from "../Services/ServiceFetchComments";
import "../Styles/CommentsAdmin.css";

const CommentsAdmin = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const data = await GetAllComments();
            setComments(data);
        } catch (error) {
            console.error("Erreur lors du chargement des commentaires :", error);
        }
    };

    const handleDelete = async (idComment) => {
        try {
            await DeleteComment(idComment);
            setComments(prev => prev.filter(c => c.id !== idComment));
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error);
        }
    };

    return (
        <div>
            <select>
                <option value="">Choisir une option</option>
                <option value="date">Date</option>
                <option value="produit">Produit</option>
                <option value="score">Score</option>
            </select>

            <ul className="ul-class">
                {comments.map((comment) => (
                    <li className="li-class" key={comment.id}>
                        <div className="comment-content">
                            <span className="text">{comment.message}</span>
                            <span className={`sentiment ${comment.sentiment.toLowerCase()}`}>
                    {comment.sentiment}
                </span>
                        </div>
                        <button
                            className="btn btn-round btn-delete"
                            onClick={() => handleDelete(comment.id)}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsAdmin;