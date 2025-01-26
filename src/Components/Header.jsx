import '../Styles/header.css';
import PropTypes from 'prop-types';

function Header({ isAdmin }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>Bienvenue sur notre site !</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          {/* Onglets visibles uniquement si l'utilisateur est administrateur */}
          {!isAdmin && 
            <img src="../../public/assets/cart.svg" alt='logo de caddie' className='logo_cart'/>
          }
          
          {isAdmin && (
            <>
              <li className="nav-item">
                <a href="/graphiques" className="nav-link">
                  Graphiques
                </a>
              </li>
              <li className="nav-item">
                <a href="/commentaires" className="nav-link">
                  Commentaires
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
    isAdmin: PropTypes.bool // isAdmin doit être un booléen et est requis
  };

export default Header;
