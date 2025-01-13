
import PropTypes from 'prop-types';
import '../Styles/card.css';

const CardArticle = ({ article, addToCart }) => {  

console.log(article);
    return (
        <div className="card">
            {/* <img src={article.image} alt={article.title} className="card-image" /> */}
            <div className="card-content">
                <h2 className="card-title">{article.title}</h2>
                <p className="card-text">{article.content}</p>
                <p>{article.price} €</p>
                <button onClick={() => addToCart(article)}>Acheter</button>
            </div>
        </div>
    )

}

CardArticle.propTypes = {
    addToCart: PropTypes.func.isRequired,
    article: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
};

export default CardArticle;