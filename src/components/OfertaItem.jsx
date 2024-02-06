import React from 'react'

function OfertaItem({imagen, titulo, resumen}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 w-60 h-40 p-4 overflow-hidden transition-transform transform-gpu hover:scale-105">
        <img src={imagen} alt={titulo} className="w-full h-full rounded" />
      </div>
      <div>
        <h2 className="text-white text-xl font-bold">{titulo}</h2>
        <p className="text-gray-600">{resumen}</p>
      </div>
    </div>
  )
}

export default OfertaItem