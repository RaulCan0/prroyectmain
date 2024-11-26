import { useQuery } from "@tanstack/react-query";
import {
  ProductosTemplate,
  SpinnerLoader,
  useProductosStore,
} from "../index";

export function Productos() {
  const { mostrarproductos, buscarproductos, buscador, dataproductos } = useProductosStore();

  // Cargar todos los productos
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar productos"],
    queryFn: () => mostrarproductos(),
  });

  // Buscar productos específicos con el valor de `buscador`
  const { data: buscardata } = useQuery({
    queryKey: ["buscar productos", { descripcion: buscador }],
    queryFn: () => buscarproductos({ buscador }),
    enabled: buscador.trim() !== "", // Solo ejecuta si `buscador` no está vacío
  });

  // Mostrar un loader si los datos están cargando
  if (isLoading) {
    return <SpinnerLoader />;
  }

  // Manejar errores de consulta
  if (error) {
    return <span>Error...</span>;
  }

  // Pasar datos a la plantilla
  return <ProductosTemplate data={buscador ? buscardata : dataproductos} />;
}
