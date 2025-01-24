
import { useState } from "react";
import '../Styles/formAuthStyle.css';
import ServiceFetchForm from "../Services/ServiceFetchForm";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {

  const navigate = useNavigate();
  const { Loggin, Signup } = ServiceFetchForm;
    // État pour basculer entre connexion et inscription
    const [isLogin, setIsLogin] = useState(true);
  
    // Gestionnaire pour soumettre le formulaire
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
    
      if (isLogin) {
        console.log('Connexion...');
        const result = await Loggin(data);
        if (result.success) { 
          navigate("/user"); 
      } else {
          alert("Connexion échouée : " + result.message);
      }
      } else {
        console.log('Inscription...');
        const result = await Signup(data);
        if (result.success) { 
          navigate("/user"); 
      }
      }
    };
  
    return (
      <div className="form_container" >
        <h2 className="form_title">{isLogin ? 'Connexion' : 'Inscription'}</h2>
        <form onSubmit={handleSubmit} className="form_form">
          {/* Champ e-mail */}
          <div className="form_field" >
            <label htmlFor="username" className="form_label">
              Nom d utilisateur :
            </label>
            <input type="text" id="text" name="username" required className="form_input" />
          </div>
  
          {/* Champ mot de passe */}
          <div className="form_field" >
            <label htmlFor="password" className="form_label">
              Mot de passe :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="form_input"
            />
          </div>
  
          {/* Champ confirmation de mot de passe (inscription seulement) */}
          {!isLogin && (
            <div className="form_field">
              <label htmlFor="confirmPassword" className="form_label">
                Confirmer le mot de passe :
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="form_input"
              />
            </div>
          )}
  
          <button type="submit" className="form_button">
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
  
        {/* Bascule entre connexion et inscription */}
        <p className="form_toggle">
          {isLogin ? (
            <>
              Pas encore de compte ?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="form_button"
              >
                Inscrivez-vous
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="form_button"
              >
                Connectez-vous
              </button>
            </>
          )}
        </p>
      </div>
    );
  };

  export default AuthForm;