import styled from "styled-components";
import { BtnFiltro, Btnsave, ContentFiltro, Header, RegistratPaquetes, TablaPaquete, Title, v, Buscador, usePaqueteStore} from "../../index";
import { useState } from "react";

export function PaqueteTemplate({data}) {
    const [state, setState] = useState(false);
    const[dataSelect,setdataSelect]=useState({});
    const[accion,setAccion]=useState("");
    const[openRegistraPaquete,setOpenRegistraPaquete]=useState(false);
    const nuevoRegistro=()=>{
        setOpenRegistraPaquete(!openRegistraPaquete);
        setAccion("Nuevo");
        setdataSelect([]);
    }
    const {setBuscador}=usePaqueteStore();
    return (
      <Containeir>
        {
            openRegistraPaquete && <RegistratPaquetes dataSelect={dataSelect} accion={accion}
            onClose={()=>setOpenRegistraPaquete(!openRegistraPaquete)}/>
        }
        <header className="header">
            <Header
                stateConfig={{ state: state, setState: () => setState(!state) }}
            />
        </header>
        <section className="area1"></section>
        <ContentFiltro> 
                <Title>
                    Paquetes 
                </Title>
                <BtnFiltro funcion={nuevoRegistro} bgcolor="#f6f3f3"
                textcolor="#353535"
                icono={<v.agregar/>}/>
            </ContentFiltro>
        <section className="area2">
            <Buscador setBuscador={setBuscador}/>
        </section>
        <section className="main">
            <TablaPaquete data={data} setOpenRegistraPaquete={setOpenRegistraPaquete}
            setdataSelect ={setdataSelect} setAccion={setAccion}/>
        </section>
      </Containeir>
    );
}

const Containeir = styled.div` 
    height:100vh;
    width:100%;
    background-color:${({ theme }) => theme.bgtotal};
    color:${({ theme }) => theme.text};
    display:grid;
    padding:15px;
    grid-template: 
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;

    .header{
        grid-area:header;
        /*background-color:rgba(103,93,241,0.14);*/
        display:flex;
        align-items:center;
    }

    .area1{
        grid-area:area1;
        /*background-color:rgba(229,67,26,0.14);*/
        display:flex;
        align-items:center;
    }

    .area2{
        grid-area:area2;
        /*background-color:rgba(26,229,67,0.14);*/
        display:flex;
        align-items:center;
        justify-content:end;
    }

    .main{
        grid-area:main;
        /*background-color:rgba(26,67,229,0.14);*/
        display:flex;
        
    }
`;
