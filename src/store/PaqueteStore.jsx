import { create } from "zustand";
import { BuscarPaquete, 
    MostrarPaquete, 
    EliminarPaquete, 
    InsertarPaquete, 
} from "../index";

export const usePaqueteStore = create((set, get) => ({
    buscador: "",
    isLoading: false,
    datapaquete: [],
    paqueteItemSelect: [],
    parametros: {},

    setBuscador: (p) => set({ buscador: p }),

    mostrarPaquete: async (p) => {
        console.log("Ejecutando mostrarPaquete con", p);
        if (!p || !p.id_paquete) {
            console.error("Parámetro inválido para mostrarPaquete");
            return;
        }
        try {
            const response = await MostrarPaquete(p);
            set({ parametros: p, datapaquete: response, paqueteItemSelect: response[0] });
            return response;
        } catch (error) {
            console.error("Error al mostrar el paquete:", error);
        }
    },

    reconsultarPaquetes: () => {
        const { mostrarPaquete, parametros } = get();
        if (parametros) mostrarPaquete(parametros);
    },

    insertarPaquete: async (p) => {
        set({ isLoading: true });
        try {
            await InsertarPaquete(p);
            get().reconsultarPaquetes();
        } catch (error) {
            console.error("Error al insertar paquete:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    eliminarPaquete: async (p) => {
        set({ isLoading: true });
        try {
            await EliminarPaquete(p);
            get().reconsultarPaquetes();
        } catch (error) {
            console.error("Error al eliminar paquete:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    buscarPaquete: async (p) => {
        if (!p || !p.nombre) {
            console.error("Parámetro inválido para buscarPaquete");
            return;
        }
        try {
            const response = await BuscarPaquete(p);
            set({ datapaquete: response });
        } catch (error) {
            console.error("Error al buscar paquete:", error);
        }
    },
}));
