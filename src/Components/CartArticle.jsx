
import PropTypes from 'prop-types';

const Cart = ({ cartItems, removeFromCart }) => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="cart">
            <h2>Votre Panier</h2>
            {cartItems.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <p>{item.title} - ${item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Retirer</button>
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
    })).isRequired,
    removeFromCart: PropTypes.func.isRequired,
};

export default Cart;

