import Footer from './Footer';
import Header from './Header';

const FrontOffice = () => { 

    return (
        <div>
            <Header isAdmin={false} />
            Ceci est la page front office pour l utilisateur
            <Footer />
        </div>
    )

}

export default FrontOffice