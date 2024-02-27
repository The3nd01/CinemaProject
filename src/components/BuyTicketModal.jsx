import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BuyTicketModal({ isOpen, onClose, img, onBuyTicket }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const closeModal = () => {
    onClose();
    // Puedes agregar lógica adicional aquí, como enviar la compra al backend
  };

  const handleBuyTicket = () => {
    const ticketInfo = {
      date: selectedDate,
      seat: selectedSeat,
    };
    // Llamar a la función para manejar la compra de la entrada
    onBuyTicket(ticketInfo);
    // Cerrar el modal después de comprar la entrada
    closeModal();
  };

  const seats = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "D1", "D2", "D3"];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Comprar Entrada"
      className="modal"
    >
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={closeModal} className="text-blue-900">
            Cerrar
          </button>
        </div>
        <div className="modal-body flex flex-col items-center">
          {/* Imagen en la parte superior */}
          <img
            className="w-1/6 h-1/6 rounded-lg mb-4"
            src={img}
            alt="Imagen de la película"
          />

          {/* Selector de hora en el medio */}
          <div className="date-picker-container mb-4">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          {/* Panel de selección de asientos en la parte inferior */}
          <div className="seat-panel mb-4">
            <h3 className="text-xl mb-2">Selecciona tu asiento:</h3>
            <div className="seat-grid grid grid-cols-3 gap-2">
              {seats.map((seat) => (
                <div
                  key={seat}
                  className={`seat rounded-lg py-1 text-center ${
                    selectedSeat === seat
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleSeatSelection(seat)}
                >
                  {seat}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer flex justify-center">
          <button
            onClick={handleBuyTicket} // Llamar a la función de compra al hacer clic
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Comprar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default BuyTicketModal;
