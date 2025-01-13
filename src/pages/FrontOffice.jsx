import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CardArticle from '../Components/CardArticle'; 
import { useEffect, useState } from 'react';
import fetchDropdownDatas from '../Services/ServiceFetchArticle';
import '../Styles/front_end.css';

const FrontOffice = () => { 

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

    return (
        <div>
            <Header isAdmin={false} />
            Ceci est la page front office pour l utilisateur
                <section className='list_articles'>
                    {articles.map((article, key) => (
                        <div key={key}>
                            <CardArticle key={article.id} article={article} isAdmin={isAdmin} />
                        </div>
                    ))}
                </section>
            <Footer />
        </div>
    )

}

export default FrontOffice