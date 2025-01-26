
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import ServiceFetchArticle from "../Services/ServiceFetchArticle";
import { useParams } from "react-router-dom";
import  PostComments  from "../Services/ServiceComments";

const ProductAnalyse = () => {

    const {getProductById} = ServiceFetchArticle;

    const {id} = useParams();
    console.log("Voici l'id du produit : ", id);
    const [productToDisplay, setProductToDisplay] = useState([]);

    useEffect(() => {

        const fetchProductById = async () => {
            const product = await getProductById({id});
            console.log("Voici mes produits : ", product);
            setProductToDisplay(product);
        }
        fetchProductById();
    }
    , []);

    console.log("voici le produit que je vais afficher", productToDisplay);

    const handleSubmitComment = async (event) => {
        event.preventDefault();

        const comment = event.target.elements.comment.value;
        console.log("Voici le commentaire : ", comment);

        const userId = localStorage.getItem('tokenUser');
        console.log("Voici l'id de l'utilisateur : ", userId);

        console.log("Voici l'id du produit : ", id);

        PostComments(comment, userId, id );
    }


        return (
            <>
                <Header/>
                    <div>
                        <h1>Produit : ${productToDisplay.title} </h1>

                        <div>
                            
                        </div>
                        <div>
                            <p>Contenu : ${productToDisplay.content}</p>
                            <p>Prix : ${productToDisplay.price} €</p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmitComment}>
                                <label htmlFor="comment">Votre commentaire : </label>
                                <input type="textarea" id="comment" name="comment" />
                                <div>
                                    <button type="submit" >Ajouter au panier</button>
                                </div>
                            </form>
                        </div>
                    </div>
                <Footer/>
            </>
        )

}


export default ProductAnalyse;