export const GetAllComments = async () => {
    try {
        const response = await fetch("http://localhost:5083/Com/GetMessage");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les commentaires :", error);
        throw error;
    }
};

export const DeleteComment = async (idComment) => {
    try {
        const response = await fetch(`http://localhost:5083/Com/DeleteMessage/${idComment}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression du commentaire avec l'id ${idComment}`);
        }

        console.log(`Commentaire ${idComment} supprimé`);
    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        throw error;
    }
};