import React from 'react'

const SearchBar = () => {
    return (
        <div class="flex items-center gap-2 w-full max-w-sm">
       {/* Header de la sección */}
  <div className="mb-6">
    <h1 className="text-2xl font-semibold text-gray-800">Liquidación de Viáticos</h1>
    <p className="text-sm text-gray-500">Busca facturas para verificaciones y control.</p>
  

  {/* Barra de búsqueda */}
  <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 w-full max-w-xl">
    <div className="flex items-center gap-2">
      <input
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar Factura"
      />
      <button
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition">
        Buscar
      </button>
    </div>
  </div>
    </div>
        </div>

    )
}

export default SearchBar