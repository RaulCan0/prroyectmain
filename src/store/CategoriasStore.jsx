import { create } from "zustand";
import { MostrarCategorias, agregarCategoria, editarCategoria, eliminarCategoria } from "../index";

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
  mostrarcategorias: async () => {
    try {
      console.log("Mostrando categorías...");
      const response = await MostrarCategorias(); 

      set({
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

  // Agregar una nueva categoría
  agregarCategoria: async (category_name, description) => {
    try {
      const result = await agregarCategoria(category_name, description); // Call the function to add category

      if (result.success) {
        window.location.reload();
        console.log("Categoría añadida exitosamente:", result.data);
        return result.data; // Return the added category
      } else {
        console.error("Error al agregar categoría:", result.message);
        return null;
      }
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      throw new Error("No se pudo agregar la categoría.");
    }
  },
  editarCategoria: async (id, category_name, description) => {
    try {
      const result = await editarCategoria(id, category_name, description); // Call the function to edit category

      if (result.success) {
        window.location.reload();
        console.log("Categoría editada exitosamente:", result.data);
        return result.data; // Return the updated category
      } else {
        console.error("Error al editar categoría:", result.message);
        return null;
      }
    } catch (error) {
      console.error("Error al editar categoría:", error);
      throw new Error("No se pudo editar la categoría.");
    }
  },

  eliminarCategoria: async (data) => {
    //id = parseInt(id);
    console.log("Eliminar categoría: ", data.id);
    try {
      const result = await eliminarCategoria(data.id); // Call the function to delete category

      if (result.success) {
        window.location.reload();
        console.log("Categoría eliminada exitosamente:", result.data);
        return result.data; // Return the deleted category
      } else {
        console.error("Error al eliminar categoría:", result.message);
        return null;
      }
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      throw new Error("No se pudo eliminar la categoría.");
    }
  },
}));
