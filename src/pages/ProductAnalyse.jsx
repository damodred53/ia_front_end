
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import ServiceFetchArticle from "../Services/ServiceFetchArticle";
import { useParams } from "react-router-dom";


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


        return (
            <>
                <Header/>
                    <div>
                        <h1>Produit : ${productToDisplay.title} </h1>

                        <div>
                            <img src={productToDisplay.image} alt={productToDisplay.title} className="card-image" />
                        </div>
                        <div>
                            <p>Contenu : ${productToDisplay.content}</p>
                            <p>Prix : ${productToDisplay.price} €</p>
                        </div>
                    </div>
                <Footer/>
            </>
        )

}


export default ProductAnalyse;