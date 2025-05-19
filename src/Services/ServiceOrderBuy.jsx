
 const ServiceOrderBuy = async (cardItems, idUser) => {

    console.log("Je suis dans le service OrderBuy", cardItems, idUser);

    const postData = {

        idUser: idUser,
        products: cardItems.map((item) => {
            return {
                idProduct: item.id,
                quantity: item.quantity
            }
        })
    }

    console.log("Voici mon postData : ", postData);

    
    const response = await fetch("http://localhost:5083/Buy", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
             "Authorization": "Bearer " + localStorage.getItem("tokenUser")
        },
        body: JSON.stringify(postData)
    })

    if (response.ok) {
        console.log("Vous venez de passer une commande");

    } else {
        console.error("Impossible de passer la commande")
    }
    return response
}

export default ServiceOrderBuy;