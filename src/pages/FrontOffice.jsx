import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CardArticle from '../Components/CardArticle'; 
import { useEffect, useState } from 'react';
import fetchDropdownDatas from '../Services/ServiceFetchArticle';

const FrontOffice = () => { 

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
            <Header isAdmin={false} />
            Ceci est la page front office pour l utilisateur
            {articles.map((article) => (
                <CardArticle key={article.id} article={article} />
            ))}
            <Footer />
        </div>
    )

}

export default FrontOffice