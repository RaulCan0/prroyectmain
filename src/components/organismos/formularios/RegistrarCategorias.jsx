import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useCategoriasStore,
} from "../../../index";
import { useForm } from "react-hook-form";

export function RegistrarCategorias({ onClose, dataSelect, accion }) {
  console.log(accion);
  const { agregarCategoria, editarCategoria } = useCategoriasStore(); // Call both functions from the store
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Memoize dataSelect to prevent re-renders if it doesn't change
  const memoizedData = useMemo(() => {
    return {
      category_name: dataSelect?.category_name || "",
      description: dataSelect?.description || "",
    };
  }, [dataSelect]);

  // Function to insert or edit a category
  async function insertar(data) {
    console.log(data);
    console.log(accion);
    console.log("ID: " +dataSelect.category_id);
    const payload = {
      category_name: data.nombre, // category_name instead of descripcion
      description: data.descripcion || "", // We also pass description as part of the data
    };

    if (accion == "Nuevo") {
      // If adding a new category
       const newCategory = await agregarCategoria(payload.category_name, payload.description);
      if (newCategory) {
        console.log("Categoría añadida:", newCategory);
      } 
    } else if (accion == "Editar") {
      // If editing an existing category
      const updatedCategory = await editarCategoria(dataSelect.category_id, payload.category_name, payload.description);
      if (updatedCategory) {
        console.log("Categoría editada:", updatedCategory);
      }
    }

    onClose(); // Close the modal after the operation
  }

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion === "Editar" ? "Editar categoría" : "Registrar nueva categoría"}
            </h1>
          </section>
          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={memoizedData.category_name}
                  type="text"
                  placeholder=""
                  {...register("nombre", { required: true })}
                />
                <label className="form__label">Categoría</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={memoizedData.description} // Default value for description
                  type="text"
                  placeholder=""
                  {...register("descripcion", { required: true })}
                />
                <label className="form__label">Descripción</label>
                {errors.descripcion?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <div className="btnguardarContent">
              <Btnsave icono={<v.iconoguardar />} titulo="Guardar" bgcolor="#ef552b" />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }

    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;
