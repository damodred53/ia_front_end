import {useEffect, useRef} from "react";
import Chart from "chart.js/auto";

const Charts = () => {
    const chartRefs = useRef([]); // Références pour tous les canvases
    const chartInstances = useRef([]); // Références pour toutes les instances Chart.js

    useEffect(() => {
        const createChart = (index, type, data, options) => {
            const ctx = chartRefs.current[index].getContext("2d");

            // Détruit l'instance précédente si elle existe
            if (chartInstances.current[index]) {
                chartInstances.current[index].destroy();
            }

            // Créez une nouvelle instance de graphique
            chartInstances.current[index] = new Chart(ctx, {
                type,
                data,
                options,
            });
        };

        // Évolution des produits ajoutés au fil du temps
        createChart(0, "line", {
            labels: ["Janvier", "Février", "Mars", "Avril", "Mai"],
            datasets: [
                {
                    label: "Produits ajoutés",
                    data: [5, 10, 15, 20, 25],
                    borderColor: "#36A2EB",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderWidth: 2,
                },
            ],
        }, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Temps (mois)",
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Nombre de produits ajoutés",
                    },
                },
            },
        });

        // Nombre de commentaires par produit
        createChart(1, "bar", {
            labels: ["Produit A", "Produit B", "Produit C", "Produit D"],
            datasets: [
                {
                    label: "Nombre de commentaires",
                    data: [12, 19, 8, 5],
                    backgroundColor: [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
                    ],
                    borderColor: [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
                    ],
                    borderWidth: 1,
                },
            ],
        }, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        });

        // Évolution des commentaires au fil du temps
        createChart(2, "line", {
            labels: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
            datasets: [
                {
                    label: "Commentaires ajoutés",
                    data: [5, 15, 10, 20],
                    borderColor: "#FF6384",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                },
            ],
        }, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Temps (semaines)",
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Nombre de commentaires",
                    },
                },
            },
        });

        // Répartition des notes ou des avis
        createChart(3, "doughnut", {
            labels: ["1 étoile", "2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles"],
            datasets: [
                {
                    label: "Répartition des avis",
                    data: [2, 5, 8, 10, 25],
                    backgroundColor: [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
                    ],
                    borderWidth: 1,
                },
            ],
        }, {
            responsive: true,
            maintainAspectRatio: false,
        });

        // Nettoyage de tous les graphiques lors du démontage du composant
        return () => {
            chartInstances.current.forEach((instance) => {
                if (instance) instance.destroy();
            });
        };
    }, []);

    return (
        <div>
            <p>Évolution des produits ajoutés</p>
            <div style={{width: "300px", height: "300px"}}>
                <canvas ref={(el) => chartRefs.current[0] = el}></canvas>
            </div>

            <p>Nombre de commentaires par produit</p>
            <div style={{width: "300px", height: "300px"}}>
                <canvas ref={(el) => chartRefs.current[1] = el}></canvas>
            </div>

            <p>Évolution des commentaires au fil du temps</p>
            <div style={{width: "300px", height: "300px"}}>
                <canvas ref={(el) => chartRefs.current[2] = el}></canvas>
            </div>

            <p>Répartition des notes ou des avis</p>
            <div style={{width: "300px", height: "300px"}}>
                <canvas ref={(el) => chartRefs.current[3] = el}></canvas>
            </div>
        </div>
    );
};

export default Charts;