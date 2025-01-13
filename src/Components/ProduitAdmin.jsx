import {useEffect, useState} from "react";
import fetchDropdownDatas from "../Services/ServiceFetchArticle.jsx";
import CardArticle from "./CardArticle.jsx";
import "../Styles/ProduitAdmin.css"

const ProduitAdmin = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {

        const getArticles = async () => {
            const articles = await fetchDropdownDatas();
            console.log("Voici mes articles : ", articles);
            setArticles(articles);
        };
        getArticles();

    }, []);

    return (
        <div>
            <h2>Liste des produits :</h2>

            <section className='list_articles'>
                {articles.map((article, key) => (
                    <div key={key}>
                        <CardArticle key={article.id} article={article}/>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default ProduitAdmin;