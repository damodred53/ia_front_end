
import PropTypes from 'prop-types';
import { useState } from 'react';
import '../styles/cart.css';

const Cart = ({ cartItems, decreaseQuantity, handleOrder}) => {


    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Votre panier</h2>
            {cartItems.length === 0 ? (
                <p className='empty_cart'>Votre panier est vide.</p>
            ) : (
                <>
                    <ul className='cart-items'>
                        {cartItems.map((item, index) => (
                            <li key={index} className='cart-item-row'>
                                <img className='cart-picture' src={item.image} alt={item.title} />
                                <p className='cart-price-quantity'>{item.title} - {item.price}</p>
                                <p className='cart-price-quantity'>Quantité: {item.quantity}</p>
                                <button onClick={() => decreaseQuantity(item)}>retirer un élément</button>
                            </li>
                        ))}
                    </ul>
                    <p className='cart-total'><strong>Total: {total.toFixed(2)}</strong></p>
                    <button className='cart-button' onClick={handleOrder}>Passer à la caisse</button>
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

