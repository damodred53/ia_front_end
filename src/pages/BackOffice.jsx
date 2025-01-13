import "../Styles/BackOffice.css"
import CommentsAdmin from "../Components/CommentsAdmin.jsx";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import ProduitAdmin from "../Components/ProduitAdmin.jsx";
import { useState } from "react";
import AddProduct from "../Components/AddProduct.jsx";
import Charts from "../Components/Charts.jsx";

const BackOffice = () => {
        // State pour suivre quel composant afficher
        const [activeComponent, setActiveComponent] = useState("produits");

        const renderComponent = () => {
            switch (activeComponent) {
                case "commentaires":
                    return <CommentsAdmin />;
                case "produits":
                    return <ProduitAdmin />;
                case "addProduct":
                    return <AddProduct />;
                case "charts":
                    return <Charts />;
            }
        }

    return (
        <div>
            <Header isAdmin={false} />
            <div className={`container`}>
                <div className={`left`}>
                    <p className={`left-p`}>Admin</p>
                    <ul>
                        <li onClick={() => setActiveComponent("produits")}>Produits</li>
                        <li onClick={() => setActiveComponent("addProduct")}>Ajouter un produit</li>
                        <li onClick={() => setActiveComponent("commentaires")}>Commentaires</li>
                        <li onClick={() => setActiveComponent("charts")}>Graphiques</li>
                    </ul>
                </div>
                <div className={`right`}>
                {renderComponent()}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BackOffice