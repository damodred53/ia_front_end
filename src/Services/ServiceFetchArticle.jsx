 const fetchDropdownDatas = async () => {


    try {
        const result = await fetch("http://localhost:5083/Product/GetProduct");
        
        const data = await result.json();

        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données du dropdown ", error);
        throw error;
    }
    
}

export default fetchDropdownDatas