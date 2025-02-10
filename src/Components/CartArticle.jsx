
import PropTypes from 'prop-types';
import '../styles/cart.css';

const Cart = ({ cartItems, decreaseQuantity, handleOrder}) => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  

    return (
        <div className="cart">
            <h2>Votre Panier</h2>
            {cartItems.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <>
                    <ul className='cart-items'>
                        {cartItems.map((item, index) => (
                            <li key={index} className='cart-item-row'>
                                <img src={item.image} alt={item.title} />
                                <p>{item.title} - ${item.price}</p>
                                {/* <button onClick={() => removeFromCart(item.id)}>Retirer</button> */}
                                <p>Quantité: {item.quantity}</p>
                                <button onClick={() => decreaseQuantity(item)}>retirer un élément</button>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total: ${total.toFixed(2)}</strong></p>
                    <button onClick={handleOrder}>Passer à la caisse</button>
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
    decreaseQuantity: PropTypes.func.isRequired,
    handleOrder: PropTypes.func.isRequired
};

export default Cart;

