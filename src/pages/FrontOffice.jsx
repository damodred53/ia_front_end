import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CardArticle from '../Components/CardArticle'; 
import { useEffect, useState } from 'react';
import ServiceFetchArticles from '../Services/ServiceFetchArticle';
import '../Styles/front_end.css';
import Cart from '../Components/CartArticle';
import ServiceOrderBuy from '../Services/ServiceOrderBuy';
import {GetToken} from '../Services/ServiceAuth';
 import { toast } from 'react-toastify';

const FrontOffice = () => { 

    const {fetchDropdownDatas} = ServiceFetchArticles;

    const [cartItems, setCartItems] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isAdmin, setIsAdmin] = useState();

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

    const decreaseQuantity = (article) => {
        const existingArticle = cartItems.find(item => item.title === article.title);
        if (existingArticle) {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.title === article.title
                        ? { ...item, quantity: item.quantity - 1 } 
                        : item
                )
            );
            if (existingArticle.quantity <= 1) {
                setCartItems(prevItems => prevItems.filter(item => item.title !== article.title));
                // setArticles(prevItems => prevItems.filter(item => item.title !== article.title));
            }
    }};

    const handleOrder = async () => {
        

        if (!cartItems) {
            return alert("Votre panier est vide");
        }

        const idUser = GetToken()

        const responseOrder = await ServiceOrderBuy(cartItems, idUser);
        if (responseOrder.ok) {
            console.log('coucou')
            toast.success('Merci beaucoup pour votre commande');
        }

    };

    useEffect(() => {
        console.log("Je suis dans le useEffect de FrontOffice");
        const getArticles = async () => {
            const article = await fetchDropdownDatas();

            setArticles(article);
        };
        getArticles();

    }, []);


    return (
        
        <div  className='main_page'>
            <Header isAdmin={false} cartItems={cartItems}/>
            <div className='front_office'>
                <section className='list_articles'>
                    {articles.map((article, key) => (
                        <div key={key}>
                            <CardArticle key={article.id} article={article} addToCart={addToCart} isAdmin={isAdmin} />
                        </div>
                    ))}
                </section>
                <hr className='line'/>
                <Cart cartItems={cartItems} decreaseQuantity={decreaseQuantity} handleOrder={handleOrder}  />
                
            </div>
            <Footer />
        </div>
        
       
    )

}

export default FrontOffice;