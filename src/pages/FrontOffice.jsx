import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CardArticle from '../Components/CardArticle'; 
import { useEffect, useState } from 'react';
import fetchDropdownDatas from '../Services/ServiceFetchArticle';
import '../Styles/front_end.css';
import CartArticle from '../Components/CartArticle';

const FrontOffice = () => { 

    const [articles, setArticles] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (article) => {
        // Vérifier si l'article est déjà dans le panier
        const existingArticle = cartItems.find(item => item.title === article.title);

        if (existingArticle) {
            // Si l'article existe déjà, augmenter la quantité
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.title === article.title
                        ? { ...item, quantity: item.quantity + 1 } // Augmenter la quantité
                        : item
                )
            );
        } else {
            // Si l'article n'est pas dans le panier, l'ajouter avec une quantité de 1
            setCartItems(prevItems => [...prevItems, { ...article, quantity: 1 }]);
        }
    };
    const [articles, setArticles] = useState([]);
    const [isAdmin, setIsAdmin  ] = useState(true);

    useEffect(() => {

        const getArticles = async () => {
            const articles = await fetchDropdownDatas();
            console.log("Voici mes articles : ", articles);
            setArticles(articles);
        };
        getArticles();

    }, []);

    console.log(cartItems);

    return (
        <div>
            <Header isAdmin={false} cartItems={cartItems}/>
            Ceci est la page front office pour l utilisateur
                <section className='list_articles'>
                    {articles.map((article, key) => (
                        <div key={key}>
                            <CardArticle key={article.id} article={article} isAdmin={isAdmin} />
                            <CardArticle key={article.id} article={article} addToCart={addToCart} />
                        </div>
                    ))}
                </section>
                <CartArticle cartItems={cartItems}  />
            <Footer />
        </div>
    )

}

export default FrontOffice