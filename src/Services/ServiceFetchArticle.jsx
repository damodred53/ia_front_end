 const fetchDropdownDatas = async () => {
    
    try {
        const result = await fetch("http://localhost:5083/Product/GetProduct");
       
        const data = await result.json();
        console.log('Voici mes données : ', data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données du dropdown ", error);
        throw error;
    }
}

const getProductById = async ({id}) => {

    try {
        const result = await fetch(`http://localhost:5083/Product/GetProduct/${id}`);
        const data = await result.json();
        console.log('Voici mes données : ', data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données du dropdown ", error);
        throw error;
    }
}

 const CreateArticle = async (data) => {

     const response = await fetch("http://localhost:5083/Product/CreateProduct", {
         method: 'POST',
         headers: {
             "Content-Type": "application/json",
             // "Authorization": "Bearer " + localStorage.getItem("tokenUser")
         },
         body: JSON.stringify(data)
     })

     if (response.ok) {
         console.log("Vous venez de créer un nouveau produit");
     } else {
         console.error("Impossible de créer le nouveau produit")
     }
 }

 const DeleteArticle = async (id) => {
     try {
         const response = await fetch(`http://localhost:5083/Product/DeleteProduct/${id}`, {
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json",
             },
         });

         if (response.ok) {
             console.log(`Article avec l'ID ${id} a été supprimé avec succès.`);
         } else {
             const errorMessage = await response.text();
             console.error(`Échec de la suppression de l'article avec l'ID ${id} :`, errorMessage);
         }
     } catch (error) {
         console.error(`Erreur lors de la suppression de l'article avec l'ID ${id} :`, error);
     }
 };



export default {fetchDropdownDatas, CreateArticle, DeleteArticle, getProductById};