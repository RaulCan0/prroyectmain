import { useQuery } from "@tanstack/react-query";
import { CategoriasTemplate, SpinnerLoader, useCategoriasStore } from "../index";

export function Categorias() {
  const { mostrarcategorias, datacategorias, buscarcategorias, buscador } = useCategoriasStore();

  const { isLoading: isLoadingCategorias, error: errorCategorias, data: dataCategorias } = useQuery({
    queryKey: ["mostrar categorias"],
    queryFn: mostrarcategorias,
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

  const categoriasData = buscarData || dataCategorias || datacategorias;

  if (!categoriasData || categoriasData.length === 0) {
    return <span>No se encontraron categorías</span>;
  }

  return <CategoriasTemplate data={categoriasData} />;
}
