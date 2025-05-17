import {useEffect, useState} from "react";
import {GetAllComments, DeleteComment, GetAllProducts} from "../Services/ServiceFetchComments";
import "../Styles/CommentsAdmin.css";

const CommentsAdmin = () => {
    const [comments, setComments] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        fetchComments();
        fetchProducts();
    }, []);

    const fetchComments = async () => {
        try {
            const data = await GetAllComments();
            setComments(data);
        } catch (error) {
            console.error("Erreur commentaires", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await GetAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Erreur produits", error);
        }
    };

    const handleDelete = async (idComment) => {
        const confirm = window.confirm("Voulez-vous vraiment supprimer ce commentaire ?");
        if (!confirm) return;

        try {
            await DeleteComment(idComment);
            setComments((prev) => prev.filter((c) => c.id !== idComment));
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire : ", error);
        }
    };

    const sortComments = (comments, option) => {
        const sorted = [...comments];
        switch (option) {
            case "date":
                return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            case "produit":
                return sorted.sort((a, b) => a.idProduit - b.idProduit);
            case "sentiment":
                return sorted.sort((a, b) => a.sentiment.localeCompare(b.sentiment));
            default:
                return sorted;
        }
    };

    const sortedComments = sortComments(comments, sortOption);

    return (
        <div>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Trier par...</option>
                <option value="date">Date</option>
                <option value="produit">Produit</option>
                <option value="sentiment">Sentiment</option>
            </select>

            <ul className="ul-class">
                {sortedComments.map((comment) => {
                    const product = products.find(p => p.id === comment.idProduit);
                    const dateFormatted = new Date(comment.date).toLocaleString();

                    return (
                        <li className="li-class" key={comment.id}>
                            <div className="comment-content">
                                <span className="text">{comment.message}</span>
                                <span className={`sentiment ${comment.sentiment.toLowerCase()}`}>
                                    {comment.sentiment}
                                </span>
                                <div className="meta">
                                    <strong>{product?.title || "Produit inconnu"}</strong><br/>
                                    {dateFormatted}
                                </div>
                            </div>
                            <button
                                className="btn btn-round btn-delete"
                                onClick={() => handleDelete(comment.id)}
                            >
                                Supprimer
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommentsAdmin;