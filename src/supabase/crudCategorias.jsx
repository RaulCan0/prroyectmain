// src/crudCategorias.js

export const MostrarCategorias = async (id) => {
    console.log("MostrarCategorias ejecutada con ID:", id);
    // Implementa tu lógica aquí
    return [{ id, nombre: "Categoría de ejemplo" }];
  };
  
  export const BuscarCategorias = async (nombre) => {
    console.log("BuscarCategorias ejecutada con nombre:", nombre);
    // Implementa tu lógica aquí
    return [{ id: 1, nombre }];
  };
  
  export const EditarCategorias = async (id, nombre, descripcion) => {
    console.log(`EditarCategorias ejecutada con ID: ${id}, nombre: ${nombre}, descripción: ${descripcion}`);
    // Implementa tu lógica aquí
  };
  
  export const EliminarCategorias = async (id) => {
    console.log("EliminarCategorias ejecutada con ID:", id);
    // Implementa tu lógica aquí
  };
  
  export const InsertarCategorias = async (categoria) => {
    console.log("InsertarCategorias ejecutada con datos:", categoria);
    // Implementa tu lógica aquí
  };
  