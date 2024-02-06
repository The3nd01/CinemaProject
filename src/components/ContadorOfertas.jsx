import React, { useState, useEffect } from "react";

const ContadorOfertas = () => {
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 30,
    horas: 0,
    minutos: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTiempoRestante((prevTiempo) => {
        const { dias, horas, minutos } = prevTiempo;

        if (dias === 0 && horas === 0 && minutos === 0) {
          clearInterval(intervalId); // Detener el contador cuando alcanza cero
          return prevTiempo;
        }

        let nuevoDias = dias;
        let nuevoHoras = horas;
        let nuevoMinutos = minutos;

        if (minutos === 0) {
          if (horas === 0) {
            nuevoDias -= 1;
            nuevoHoras = 23;
          } else {
            nuevoHoras -= 1;
            nuevoMinutos = 59;
          }
        } else {
          nuevoMinutos -= 1;
        }

        return {
          dias: nuevoDias,
          horas: nuevoHoras,
          minutos: nuevoMinutos,
        };
      });
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(intervalId);
  }, []);

  const formatoNumero = (numero) => (numero < 10 ? `0${numero}` : numero);

  return (
    <div className="flex justify-center text-white p-3">
      <p className="text-white">
        {formatoNumero(tiempoRestante.dias)}d{" "}
        {formatoNumero(tiempoRestante.horas)}h{" "}
        {formatoNumero(tiempoRestante.minutos)}m restantes para el reseteo de ofertas
      </p>
    </div>
  );
};

export default ContadorOfertas;
