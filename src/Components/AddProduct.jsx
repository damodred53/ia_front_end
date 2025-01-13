import { useState } from "react";
import "../Styles/AddProduct.css"
import ServiceFetchArticle from "../Services/ServiceFetchArticle.jsx";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: "",
        price: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation simple
        if (!formData.title || !formData.content || !formData.image || !formData.price) {
            alert("Tous les champs sont requis.");
            return;
        }

        if (isNaN(formData.price)) {
            alert("Le prix doit être un nombre.");
            return;
        }

        // Enregistrer ou envoyer les données (exemple : API)
        console.log("Produit enregistré :", formData);
        ServiceFetchArticle.CreateArticle(formData);

        // Réinitialiser le formulaire
        setFormData({
            title: "",
            content: "",
            image: "",
            price: "",
        });
    };

    return (
        <div>
            <h2>Enregistrer un Produit</h2>
            <form onSubmit={handleSubmit}>
                <div className={`d-flex`}>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Titre du produit"
                    />
                </div>

                <div className={`d-flex`}>
                    <label htmlFor="content">Description :</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Description du produit"
                    ></textarea>
                </div>

                <div className={`d-flex`}>
                    <label htmlFor="image">URL de l&#39;image :</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Lien de l'image"
                    />
                </div>

                <div className={`d-flex`}>
                    <label htmlFor="price">Prix :</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Prix du produit"
                    />
                </div>

                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default ProductForm;