
export const PostComments = async ( message, idUser, idArticle ) => {


    const postData = {
        message: message,
        id: idUser,
        idProduct: idArticle
    }

    console.log("voici ce que j'envoie :", postData)

  const response = await fetch("http://localhost:5083/Com/AddMessage", {

    method: 'POST',
    headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify( postData )
  })

    if (response.ok) {
        console.log("Vous venez de créer un nouveau commentaire");
    }
    else {
        console.error("Impossible de créer le nouveau commentaire")
    }

}

export const GetOrderByUserId = async (idUser) => {

    
    try {
        
        const fetchOrderedProducts = await fetch(`http://localhost:5083/Buy?idUser=${idUser}`);
        const result = await fetchOrderedProducts.json();

        return result;
    } 
    catch (error) {
        console.error("Erreur lors de la récupération des commandes effectuées par l'utilisateur ", error);
        throw error;
    }

}
