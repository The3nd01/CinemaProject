import React from "react";
import OfertaItem from "./OfertaItem";

const Ofertas = () => {
  const ofertasData = [
    {
      imagen: "../src/assets/promocionCinesa.jpg",
      titulo: "Oferta Cinesa",
      resumen: "¡Descuento especial en entradas!",
    },
    {
      imagen: "../src/assets/promocionPalomitas.jpg",
      titulo: "Oferta Palomitas",
      resumen: "¡Compra palomitas y obtén un refresco gratis!",
    },
    {
      imagen: "../src/assets/promocionTravel.jpg",
      titulo: "Oferta Viaje",
      resumen: "¡Planifica tu próximo viaje con nosotros!",
    },
    {
      imagen: "../src/assets/promocionChocolate.jpg",
      titulo: "Oferta Chocolate",
      resumen: "¡Ven y prueba nuestras nuevas tabletas de Chocolate!",
    },
    {
      imagen: "../src/assets/promocionGaming.jpg",
      titulo: "Oferta Gaming",
      resumen: "¡Descubre las ofertas gaming que tenemos con tu entrada!",
    },
    {
      imagen: "../src/assets/promocionFamilia.jpg",
      titulo: "Oferta Familia",
      resumen: "¡Ven con toda tu familia y descubre impresionantes promociones!",
    },
  ];

  const ofertasChunks = chunkArray(ofertasData, 3);

  return (
    <div>
      {ofertasChunks.map((ofertasGroup, index) => (
        <div key={index} className="flex justify-around p-10">
          {ofertasGroup.map((oferta, ofertaIndex) => (
            <OfertaItem
              key={ofertaIndex}
              imagen={oferta.imagen}
              titulo={oferta.titulo}
              resumen={oferta.resumen}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Función para dividir un array en subconjuntos de un tamaño específico
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default Ofertas;
