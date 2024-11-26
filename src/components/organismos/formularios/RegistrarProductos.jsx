import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export function RegistrarProductos({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const newProduct = {
      _name: data._name,
      _description: data._description,
      _price: parseFloat(data._price),
      _stock_quantity: parseInt(data._stock_quantity, 10),
      _category_id: parseInt(data._category_id, 10),
      _is_active: data._is_active === "true",
      _created_at: new Date().toISOString(),
      _updated_at: new Date().toISOString(),
    };

    if (onSubmit) onSubmit(newProduct);
  };

  return (
    <Container>
      <h1>Registrar Producto</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        {/* Nombre */}
        <InputContainer>
          <label>Nombre:</label>
          <input
            type="text"
            {...register("_name", { required: "Este campo es obligatorio" })}
          />
          {errors._name && <ErrorMessage>{errors._name.message}</ErrorMessage>}
        </InputContainer>

        {/* Descripción */}
        <InputContainer>
          <label>Descripción:</label>
          <textarea
            {...register("_description", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors._description && (
            <ErrorMessage>{errors._description.message}</ErrorMessage>
          )}
        </InputContainer>

        {/* Precio */}
        <InputContainer>
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            {...register("_price", {
              required: "Este campo es obligatorio",
              min: { value: 0, message: "El precio debe ser mayor o igual a 0" },
            })}
          />
          {errors._price && <ErrorMessage>{errors._price.message}</ErrorMessage>}
        </InputContainer>

        {/* Cantidad en stock */}
        <InputContainer>
          <label>Cantidad en stock:</label>
          <input
            type="number"
            {...register("_stock_quantity", {
              required: "Este campo es obligatorio",
              min: { value: 0, message: "La cantidad debe ser mayor o igual a 0" },
            })}
          />
          {errors._stock_quantity && (
            <ErrorMessage>{errors._stock_quantity.message}</ErrorMessage>
          )}
        </InputContainer>

        {/* ID de la categoría */}
        <InputContainer>
          <label>ID de Categoría:</label>
          <input
            type="number"
            {...register("_category_id", {
              required: "Este campo es obligatorio",
              min: { value: 1, message: "El ID debe ser mayor a 0" },
            })}
          />
          {errors._category_id && (
            <ErrorMessage>{errors._category_id.message}</ErrorMessage>
          )}
        </InputContainer>

        {/* Estado Activo/Inactivo */}
        <InputContainer>
          <label>¿Está activo?</label>
          <select
            {...register("_is_active", { required: "Seleccione un estado" })}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          {errors._is_active && (
            <ErrorMessage>{errors._is_active.message}</ErrorMessage>
          )}
        </InputContainer>

        {/* Botón de Guardar */}
        <Button type="submit">Guardar Producto</Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  textarea,
  select {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
