import React from 'react'

const ResponseWindow = ({ response, handleSubmit }) => {
    return (
        <div className="response-window">
            <h3>Escribe tu respuesta:</h3>
            <input
                type="text"
                // value={response}
                // onChange={(e) => setResponse(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="text-black">
                Enviar
            </button>
        </div>
    )
}

export default ResponseWindow
