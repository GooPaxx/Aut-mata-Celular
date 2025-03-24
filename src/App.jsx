import { useState, useEffect } from "react";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 1],
  [1, 0],
  [-1, -1],
  [-1, 1],
  [-1, 0],
];

export const App = () => {
  const [numRows, setNumRows] = useState(10);
  const [numCols, setNumCols] = useState(10);
  const [numStages, setNumStages] = useState(4);
  const [grid, setGrid] = useState([]);
  const [history, setHistory] = useState([]);
  const [running, setRunning] = useState(false);

  const generateEmptyGrid = () => {
    return Array.from({ length: numRows }, () => Array(numCols).fill(0));
  };

  useEffect(() => {
    setGrid(generateEmptyGrid());
    setHistory([]);
    setRunning(false);
  }, [numRows, numCols]);

  useEffect(() => {
    if (running) {
      handleStart();
    }
  }, [numStages]); 

  const handleStart = () => {
    let newHistory = [grid];

    for (let stage = 1; stage < numStages; stage++) {
      const prevGrid = newHistory[stage - 1];
      const newGrid = prevGrid.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += prevGrid[newI][newJ];
            }
          });
          if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0;
          } else if (cell === 0 && neighbors === 3) {
            return 1;
          }
          return cell;
        })
      );
      newHistory.push(newGrid);
    }

    setHistory(newHistory);
    setRunning(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
      style={{
        backgroundImage:
          "url('/path/to/your/image.jpg'), linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundAttachment: "fixed", 
      }}
    >
      {}
      <div className="bg-black/30 py-4 text-center">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          Desarrollado por: GUIDO TITO PUÑA
        </h2>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {}
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            <span className="block mt-2 text-lg md:text-xl text-gray-300 font-light">
              Simulación de tiempo discreto con Autómata Celular
            </span>
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-transparent bg-clip-text animate-pulse">
              JUEGO DE LA VIDA
            </span>
          </h1>

          {}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl mt-8 items-center ">
            <div className="flex flex-col lg:flex-row gap-0 items-center lg:items-end justify-end flex-1 w-full">
              {}
              <div className="flex-1 space-y-3 gap-5 ml-30">
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 bg-black/20 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <label className="text-gray-300 w-24">Filas:</label>
                      <input
                        type="number"
                        value={numRows}
                        onChange={(e) => setNumRows(Number(e.target.value))}
                        className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-gray-300 w-24">Columnas:</label>
                      <input
                        type="number"
                        value={numCols}
                        onChange={(e) => setNumCols(Number(e.target.value))}
                        className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-gray-300 w-24">Evolución:</label>
                      <input
                        type="number"
                        value={numStages}
                        onChange={(e) => setNumStages(Number(e.target.value))}
                        className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleStart}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Iniciar Simulación
                    </button>
                    <button
                      onClick={() => {
                        setGrid(generateEmptyGrid());
                        setHistory([]);
                        setRunning(false);
                      }}
                      className="flex-1 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Limpiar Todo
                    </button>
                  </div>
                </div>
              </div>

              {}
              <div className="flex-1 w-full">
                <div className=" ">
                  <h2 className="text-xl font-semibold text-white mb-4 text-center">
                    Configuración Inicial
                  </h2>
                  <div
                    className="grid mx-auto overflow-auto max-h-96 justify-center"
                    style={{ gridTemplateColumns: `repeat(${numCols}, 25px)` }}
                  >
                    {grid.map((row, i) =>
                      row.map((col, j) => (
                        <div
                          key={`${i}-${j}`}
                          className={`w-6 h-6 border border-gray-600 transition-all duration-200 cursor-pointer ${
                            col
                              ? "bg-blue-500 hover:bg-blue-400"
                              : "bg-gray-900 hover:bg-gray-700"
                          } ${!running && "hover:scale-110"}`}
                          onClick={() => {
                            if (!running) {
                              const newGrid = grid.map((row, x) =>
                                row.map((cell, y) =>
                                  x === i && y === j ? (cell ? 0 : 1) : cell
                                )
                              );
                              setGrid(newGrid);
                            }
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {}
            {running && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Evolución
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {history.map((stageGrid, index) => (
                    <div
                      key={index}
                      className=" ml-4 p-4 rounded-xl hover:transform hover:scale-105 transition-all duration-30 "
                    >
                      <h4 className="text-center text-white font-medium mb-2">
                        T_({index + 1})
                      </h4>
                      <div
                        className="grid mx-auto"
                        style={{
                          gridTemplateColumns: `repeat(${numCols}, 20px)`,
                        }}
                      >
                        {stageGrid.map((rows, i) =>
                          rows.map((col, j) => (
                            <div
                              key={`${index}-${i}-${j}`}
                              className={`w-5 h-5 border border-gray-600 ${
                                col ? "bg-green-500" : "bg-gray-900"
                              }`}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer fijo */}
      <footer className="bg-black/30 py-3 text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} GUIDO TITO PUÑA - Todos los derechos
        reservados
      </footer>
    </div>
  );
};
