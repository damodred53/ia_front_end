
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import ServiceFetchArticle from "../Services/ServiceFetchArticle";
import { useParams } from "react-router-dom";
import  {PostComments, GetOrderByUserId}  from "../Services/ServiceComments";


const ProductAnalyse = () => {

    const {getProductById} = ServiceFetchArticle;

    const {id} = useParams();
    const [productToDisplay, setProductToDisplay] = useState([]);
    const [allProductByUser, setAllProductByUser] = useState([]);

    useEffect(() => {

        const fetchProductById = async () => {
            const product = await getProductById({id});
            console.log("Voici mes produits : ", product);
            setProductToDisplay(product);
        }
        fetchProductById();
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

    console.log("Voici les produits déjà achetés par l'utilisateur : ", allProductByUser, "et l id du produit: ", id);

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
                                {
                                    allProductByUser.includes(id) ? <p>Vous n avez jamais acheté ce produit</p> 
                                    :
                                    <>
                                    <label htmlFor="comment">Votre commentaire : </label>
                                    <input type="textarea" id="comment" name="comment"  />
                                    <div>
                                        <button type="submit" >Ajouter un commentaire</button>
                                    </div>
                                    </>
                                }
                                
                            </form>
                        </div>
                    </div>
                <Footer/>
            </>
        )

}


export default ProductAnalyse;