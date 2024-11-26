import { useEffect } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, Btnsave, ConvertirCapitalize,usePaqueteStore } from "../../../index";
import { useForm } from "react-hook-form";
export function RegistratPaquetes({ onClose,dataSelect,accion}) {
    const {insertarPaquete,editarPaquete}=usePaqueteStore();
    const { 
        register,
        formState: { errors },
        handleSubmit,
    }= useForm();
    async function insertar(data){
        if(accion ==="Editar"){
            const p = {
                id_paquete: dataSelect.id_paquete,
                nombre: ConvertirCapitalize(data.paquete.nombre),
                precio: ConvertirCapitalize(data.paquete.precio),
                products: ConvertirCapitalize(data.products.name),
                cantidad: ConvertirCapitalize(data.cantidad),
            };
            await editarPaquete(p);
            onClose();
        }else{
             const p = {
                nombre: ConvertirCapitalize(data.paquete.nombre),
                precio: ConvertirCapitalize(data.paquete.precio),
                products: ConvertirCapitalize(data.products.name),
                cantidad: ConvertirCapitalize(data.cantidad),
        };
        await insertarPaquete(p);
        onClose();
    }
    }
    useEffect(() => {
        if (accion === "Editar") {
        }
    }, []);
      return (
        <Container>
          <div className="sub-contenedor">
            <div className="headers">
              <section>
                <h1>
                  {accion == "Editar" ? "Editar paquete" : "Registrar nuevo paquete"}
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
                      defaultValue={dataSelect.descripcion}
                      type="text"
                      placeholder=""
                      {...register("nombre", {
                        required: true,
                      })}
                    />
                    <label className="form__label">paquete</label>
                    {errors.nombre?.type === "required" && <p>Campo requerido</p>}
                  </InputText>
                </article>
    
                <div className="btnguardarContent">
                  <Btnsave
                    icono={<v.iconoguardar />}
                    titulo="Guardar"
                    bgcolor="#ef552b"
                  />
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
    
    const ContentTitle = styled.div`
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 20px;
      svg {
        font-size: 25px;
      }
      input {
        border: none;
        outline: none;
        background: transparent;
        padding: 2px;
        width: 40px;
        font-size: 28px;
      }
    `;
    const ContainerEmojiPicker = styled.div`
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    `;

