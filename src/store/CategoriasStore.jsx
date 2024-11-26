import { create } from "zustand";
import {
  BuscarCategorias,
  EditarCategorias,
  EliminarCategorias,
  InsertarCategorias,
  MostrarCategorias,
} from "../index";

export const useCategoriasStore = create((set, get) => ({
  // Estado inicial
  buscador: "",
  datacategorias: [],
  categoriasItemSelect: null, // Mejor que un array vacío para seleccionar una sola categoría
  parametros: {},

  // Actualizar el buscador
  setBuscador: (p) => {
    set({ buscador: p });
  },

  // Mostrar categorías
  mostrarcategorias: async (p = {}) => {
    try {
      console.log("Mostrando categorías con parámetros:", p);
      const response = await MostrarCategorias(p);

      set({
        parametros: p,
        datacategorias: response,
        categoriasItemSelect: response.length > 0 ? response[0] : null,
      });

      console.log("Categorías obtenidas:", response);
      return response;
    } catch (error) {
      console.error("Error al mostrar categorías:", error);
      throw new Error("No se pudieron obtener las categorías.");
    }
  },

  // Seleccionar una categoría específica
  selectcategorias: (categoria) => {
    console.log("Seleccionando categoría:", categoria);
    set({ categoriasItemSelect: categoria });
  },

  // Insertar una categoría
  insertarcategorias: async (categoria) => {
    try {
      console.log("Insertando categoría:", categoria);
      await InsertarCategorias(categoria);
      console.log("Categoría insertada correctamente.");

      // Actualizar categorías tras insertar
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros);
    } catch (error) {
      console.error("Error al insertar categoría:", error);
      throw new Error("No se pudo insertar la categoría.");
    }
  },

  // Eliminar una categoría
  eliminarcategorias: async (idCategoria) => {
    try {
      console.log("Eliminando categoría con ID:", idCategoria);
      await EliminarCategorias(idCategoria);
      console.log("Categoría eliminada correctamente.");

      // Actualizar categorías tras eliminar
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      throw new Error("No se pudo eliminar la categoría.");
    }
  },

  // Editar una categoría
  editarcategorias: async (categoria) => {
    try {
      console.log("Editando categoría:", categoria);
      await EditarCategorias(categoria);
      console.log("Categoría editada correctamente.");

      // Actualizar categorías tras editar
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros);
    } catch (error) {
      console.error("Error al editar categoría:", error);
      throw new Error("No se pudo editar la categoría.");
    }
  },

  // Buscar categorías por filtro
  buscarcategorias: async (filtro) => {
    try {
      console.log("Buscando categorías con filtro:", filtro);
      const response = await BuscarCategorias(filtro);
      set({ datacategorias: response });

      console.log("Resultados de búsqueda:", response);
    } catch (error) {
      console.error("Error al buscar categorías:", error);
      throw new Error("No se pudieron buscar las categorías.");
    }
  },
}));
