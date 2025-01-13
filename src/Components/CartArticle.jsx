
import PropTypes from 'prop-types';

const Cart = ({ cartItems}) => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);



    return (
        <div className="cart">
            <h2>Votre Panier</h2>
            {cartItems.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <img src={item.image} alt={item.title} />
                                <p>{item.title} - ${item.price}</p>
                                {/* <button onClick={() => removeFromCart(item.id)}>Retirer</button> */}
                                <p>Quantité: {item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total: ${total.toFixed(2)}</strong></p>
                    <button onClick={() => alert('Procéder au paiement')}>Passer à la caisse</button>
                </>
            )}
        </div>
    );
};
Cart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    })).isRequired
};

export default Cart;

