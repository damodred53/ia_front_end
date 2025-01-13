
import PropTypes from 'prop-types';
import '../Styles/card.css';
import ServiceFetchArticle from "../Services/ServiceFetchArticle.jsx";

const CardArticle = ({ article, isAdmin }) => {

console.log(article);
    return (
        <div className="card">
            {/* <img src={article.image} alt={article.title} className="card-image" /> */}
            <div className="card-content">
                <h2 className="card-title">{article.title}</h2>
                <p className="card-text">{article.content}</p>
                <p>{article.price} €</p>
                <button className={isAdmin ? `` : `btn-delete`}
                        onClick={() => { isAdmin ? null : ServiceFetchArticle.DeleteArticle(article.id) }}>
                    {isAdmin ? "Acheter" : "Supprimer"}
                </button>
            </div>
        </div>
    )

}

CardArticle.propTypes = {
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