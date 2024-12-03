import { useState, useEffect } from "react"; // Importa los hooks necesarios de React

function useRandomLikes(items) {
  // Define el custom hook que recibe un array de items
  const [itemsWithLikes, setItemsWithLikes] = useState([]); // Inicializa el estado para los items con likes

  useEffect(() => {
    // Hook que se ejecuta cuando 'items' cambia
    // Mapea los items originales y agrega un número aleatorio de likes a cada uno
    const addLikes = items.map((item) => ({
      ...item, // Mantiene las propiedades del item original
      likes: Math.floor(Math.random() * (1000 - 100 + 1)) + 100, // Genera un número aleatorio de likes entre 100 y 1000
    }));

    setItemsWithLikes(addLikes); // Actualiza el estado con los nuevos items que tienen likes
  }, [items]); // Dependencia que hace que el efecto se ejecute cada vez que 'items' cambia

  return itemsWithLikes; // Retorna el array de items con likes
}

export default useRandomLikes; // Exporta el hook para que pueda ser utilizado en otros componentes
