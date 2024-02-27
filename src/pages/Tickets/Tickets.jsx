import React, { useState, useEffect } from "react";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Obtener los datos del localStorage al cargar la página
    const localStorageKeys = Object.keys(localStorage);
    const ticketKeys = localStorageKeys.filter((key) => key.startsWith("ticket_"));
    const storedTickets = ticketKeys.map((key) => {
      const ticket = JSON.parse(localStorage.getItem(key));
      // Formatear la fecha
      ticket.date = new Date(ticket.date).toLocaleString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC"
      });
      // Generar valores aleatorios para la sala y la hora
      ticket.room = Math.floor(Math.random() * 10) + 1; // Sala entre 1 y 10
      ticket.time = `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() < 0.5 ? 'AM' : 'PM'}`; // Hora aleatoria
      return ticket;
    });
    setTickets(storedTickets);
  }, []);

  return (
    <div className="bg-black h-screen w-full font-mono text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Tus Tickets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tickets.map((ticket, index) => (
          <div key={index} className="ticket-card bg-gray-800 rounded p-4">
            <h3 className="text-lg font-bold mb-2">{ticket.movieTitle}</h3>
            <p className="mb-2">Fecha: {ticket.date}</p>
            <p className="mb-2">Asiento: {ticket.seat}</p>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <p className="text-sm">Cinecor</p>
              <p className="text-sm">Sala: {ticket.room}</p>
              <p className="text-sm">Hora: {ticket.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tickets;
