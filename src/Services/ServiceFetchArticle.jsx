 const fetchDropdownDatas = async () => {


    try {
        const result = await fetch("../../public/Data/article.json");
        
        const data = await result.json();

        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données du dropdown ", error);
        throw error;
    }
    
}

export default fetchDropdownDatas