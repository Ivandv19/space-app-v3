import { useState, useEffect } from "react"; // Importa los hooks necesarios de React

function useOrderByLikes(items) {
  // Define el custom hook que recibe un array de items
  const [topFiveItems, setTopFiveItems] = useState([]); // Inicializa el estado para los cinco items con más likes

  useEffect(() => {
    // Hook que se ejecuta cuando 'items' cambia
    if (items.length > 0) {
      // Verifica si hay elementos en el array
      // Ordena los elementos de mayor a menor en base a la propiedad `likes`
      const sortedItems = [...items].sort((a, b) => b.likes - a.likes);

      // Toma los primeros 5 elementos del array ya ordenado
      const topFive = sortedItems.slice(0, 5);

      setTopFiveItems(topFive); // Actualiza el estado con los cinco items principales
    }
  }, [items]); // Dependencia que hace que el efecto se ejecute cada vez que 'items' cambia

  return topFiveItems; // Retorna el array de los cinco items con más likes
}

export default useOrderByLikes; // Exporta el hook para que pueda ser utilizado en otros componentes
