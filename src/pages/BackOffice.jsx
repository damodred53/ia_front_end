import "../Styles/BackOffice.css"
import CommentsAdmin from "./CommentsAdmin.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ProduitAdmin from "./ProduitAdmin.jsx";
import { useState } from "react";

const BackOffice = () => {
        // State pour suivre quel composant afficher
        const [activeComponent, setActiveComponent] = useState("comments");

        const renderComponent = () => {
            switch (activeComponent) {
                case "commentaires":
                    return <CommentsAdmin />;
                case "produits":
                    return <ProduitAdmin />;
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
                        <li onClick={() => setActiveComponent("commentaires")}>Commentaires</li>
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