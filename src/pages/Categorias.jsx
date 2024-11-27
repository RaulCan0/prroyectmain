import { useQuery } from "@tanstack/react-query";
import { CategoriasTemplate, SpinnerLoader, useCategoriasStore } from "../index";

export function Categorias() {
  const { mostrarcategorias, datacategorias, buscarcategorias, buscador } = useCategoriasStore();

  // Pass the buscador state to the mostrarcategorias function
  const { isLoading: isLoadingCategorias, error: errorCategorias, data: dataCategorias } = useQuery({
    queryKey: ["mostrar categorias", buscador],
    queryFn: () => mostrarcategorias(buscador),  // Pass the search term here
  });

  const { data: buscarData, isLoading: isLoadingBuscar } = useQuery({
    queryKey: ["buscar categorias", buscador],
    queryFn: () => buscarcategorias({ descripcion: buscador }),
    enabled: !!buscador,
  });

  if (isLoadingCategorias) {
    return <SpinnerLoader message="Cargando categorías..." />;
  }

  if (isLoadingBuscar) {
    return <SpinnerLoader message="Buscando categorías..." />;
  }

  if (errorCategorias) {
    console.error("Error en mostrar categorías:", errorCategorias);
    return <span>Error al cargar categorías</span>;
  }

  // Use the filtered categories or fallback to the full list
  const categoriasData = buscarData || dataCategorias || datacategorias;

  if (!categoriasData || categoriasData.length === 0) {
    return <span>No se encontraron categorías</span>;
  }

  return <CategoriasTemplate data={categoriasData} />;
}
