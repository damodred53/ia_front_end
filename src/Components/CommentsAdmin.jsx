import "../Styles/CommentsAdmin.css";

const CommentsAdmin = () => {
    const comments = Array.from({ length: 50 }, (_, index) => {
        const length = Math.floor(Math.random() * 50) + 10; // Longueur aléatoire entre 10 et 60
        return `Commentaire ${index + 1}: ` + "x".repeat(length);
    });

    return (
        <div>
            {/* Menu de tri */}
            <select>
                <option value="">Choisir une option</option>
                <option value="date">Date</option>
                <option value="produit">Produit</option>
                <option value="score">Score</option>
            </select>

            {/* Liste des commentaires */}
            <ul className="ul-class">
                {comments.map((comment, index) => (
                    <li className="li-class" key={index}>
                        <span className="text">{comment}</span>
                        <button className="btn btn-round btn-delete">Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsAdmin;