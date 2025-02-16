
import PropTypes from 'prop-types';
import '../Styles/card.css';
import ServiceFetchArticle from "../Services/ServiceFetchArticle.jsx";
import { useNavigate } from 'react-router-dom';

const CardArticle = ({ article, isAdmin, addToCart }) => {

    const navigate = useNavigate();

    const NavigatePageProduct = (id) => {
        navigate(`/product/${id}`);
    }

console.log(article);
console.log(isAdmin);

    return (
        <div className="card">
            {/* <img src={article.image} alt={article.title} className="card-image" /> */}
            <div className="card-content">
                <h2 className="card-title">{article.title}</h2>
                <img className='card-picture' src={article.image} alt={article.title}/>
                <p className="card-text">{article.content}</p>
                <p className="card-price">{article.price} €</p>
                <button className={isAdmin ? `` : `btn-delete`}
                        onClick={() => { isAdmin ? ServiceFetchArticle.DeleteArticle(article.id) : addToCart(article) }}>
                    {isAdmin ? "Supprimer" : "Acheter"}
                </button>
                {!isAdmin ? <button className="btn-comment" onClick={() => NavigatePageProduct(article.id)}>Laisser un commentaire</button> : null}
            </div>
        </div>
    )
}

CardArticle.propTypes = {
    addToCart: PropTypes.func.isRequired,
    article: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default CardArticle;