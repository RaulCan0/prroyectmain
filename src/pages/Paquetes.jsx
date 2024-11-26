import { useQuery } from "@tanstack/react-query";
import { PaqueteTemplate, usePaqueteStore, SpinnerLoader } from "../index";

export function Paquetes() {
    const { mostrarPaquete, buscarPaquete, datapaquete, buscador } = usePaqueteStore();
    const idPaquete = 1;

    console.log("Ejejcutando Paquetes con idPaquete", idPaquete);
    const { isLoading: isLoadingMostrar, error: errorMostrar, data: dataMostrar } =
        useQuery({
            queryKey: ["mostrar paquete", idPaquete],
            queryFn: () => mostrarPaquete({ id_paquete: idPaquete }),
            enabled: !!idPaquete,
        });

    const { isLoading: isLoadingBuscar, error: errorBuscar, data: buscarData } =
        useQuery({
            queryKey: ["buscar paquete", idPaquete, buscador],
            queryFn: () => buscarPaquete({ id_paquete: idPaquete, nombre: buscador }),
            enabled: idPaquete !== null && buscador !== null,
        });

    if (isLoadingMostrar) return <SpinnerLoader message="Cargando paquete..." />;
    if (isLoadingBuscar) return <SpinnerLoader message="Buscando paquetes..." />;
    if (errorMostrar) {
        console.error("Error en consultas:", errorMostrar);
        return <span>Error al cargar datos</span>;
    }

    const paqueteData = dataMostrar;

    if (!paqueteData || paqueteData.length === 0) {
        return <span>No se encontraron paquetes</span>;
    }

    return <PaqueteTemplate data={paqueteData} />;
}

