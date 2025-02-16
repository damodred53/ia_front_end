
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import ServiceFetchArticle from "../Services/ServiceFetchArticle";
import { useParams } from "react-router-dom";
import  {PostComments, GetOrderByUserId, GetCommentsByIdProduct}  from "../Services/ServiceComments";
import '../Styles/commentsZone.css';
import '../Styles/product_display.css';

const ProductAnalyse = () => {

    const {getProductById} = ServiceFetchArticle;

    const {id} = useParams();
    const [productToDisplay, setProductToDisplay] = useState([]);
    const [allProductByUser, setAllProductByUser] = useState([]);
    const [commentsAll, setCommentsAll] = useState([]);
    const numericId = parseInt(id);

    useEffect(() => {

        const fetchProductById = async () => {
            const product = await getProductById({id});
            console.log("Voici mes produits : ", product);
            setProductToDisplay(product);
        }
        fetchProductById();

        const getComments = async () => {
            const comments = await GetCommentsByIdProduct(id);

            if (comments !== null) {
            setCommentsAll(comments);
            } else {
                return
            }

        }
        getComments()
    },[]);

    useEffect(() => {

        const idUser = localStorage.getItem('tokenUser');
        /**
         * Fonction pour récupérer l'utilisateur afin de voir si l'objet affiché a déjà été acheté par lui
         */
        if (idUser === null) {
            setAllProductByUser([]);
            console.warn("impossible d'identifier l'utilisateur connecté");
            return;
        }

        const getAllProductsByUser = async () => {
            const orderedProducts = await GetOrderByUserId(idUser);
            console.log("Voici les produits déjà achetés par l'utilisateur : ", orderedProducts);
            
            const allProducts = orderedProducts.flatMap((product) => product.products);

            const uniqueProducts = allProducts.reduce((acc, product) => {
                if (!acc.some(p => p.idProduct === product.idProduct)) {
                    acc.push(product.idProduct);
                }
                return acc;
            }, []);
            
            setAllProductByUser(uniqueProducts);
        }

        getAllProductsByUser();
    }, [productToDisplay]);

    console.log("Voici les produits déjà achetés par l'utilisateur : ", allProductByUser, "et l'id du produit: ", id);

    const handleSubmitComment = async (event) => {
        event.preventDefault();

        const comment = event.target.elements.comment.value;
        console.log("Voici le commentaire : ", comment);

        const userId = localStorage.getItem('tokenUser');
        console.log("Voici l'id de l'utilisateur : ", userId);

        console.log("Voici l'id du produit : ", id);

        try {
            await PostComments(comment, userId, id );

            const updatedComments = await GetCommentsByIdProduct(id);
            setCommentsAll(updatedComments);
        } catch {
            console.error("Impossible de créer le commentaire");
            throw new Error("Impossible de créer le commentaire");
        }
    }

        return (
            <>
                <Header/>
                    <div className="product_display_data">
                        <h1>Produit : {productToDisplay.title} </h1>

                        <div>
                            <img src={productToDisplay.image} />
                        </div>
                        
                        <div>
                            <p><strong>Contenu :</strong> {productToDisplay.content}</p>
                            <p><strong>Prix :</strong> {productToDisplay.price} €</p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmitComment}>
                                {
                                    allProductByUser.includes(numericId) ? 
                                    <>
                                    <label htmlFor="comment">Votre commentaire : </label>
                                    <input type="textarea" id="comment" name="comment"  />
                                    <div className="button_comment">
                                        <button type="submit" >Ajouter un commentaire</button>
                                    </div>
                                    <div className="comments_area">
                                        <h2>Commentaires</h2>
                                        <div className="comment_zone">
                                        <ul>
                                            {commentsAll.map((comment) => (
                                                <li className="list_comments" key={comment.id}>
                                                    <p >{comment.message}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        </div>
                                    </div>
                                    </>
                                    :
                                    <p>Vous ne pouvez pas publier de commentaire tant que vous n avez pas acheté ce produit</p> 
                                }
                                
                            </form>
                        </div>
                    </div>
                <Footer/>
            </>
        )

}


export default ProductAnalyse;