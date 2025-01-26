
const Loggin = async ({username, password}) => {

    console.log("voici ce que j'envoie :", username, password)
    try {
        const response = await fetch("http://localhost:5083/Utilisateur/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed. Please check your credentials.");
        } else {
            console.log("Login success");
        }

        const data = await response.json();

        console.log("voici ce que je veux voir : ", data);
        return data;

    } catch (error) {
        console.log("impossible d'envoyer les données à l'API", error);
    }
}



export default Loggin;
