import styled from "styled-components";
export function BtnFiltro({bgcolor, textcolor, icono, funcion}){
    return(
    <Container $textcolor={textcolor}
    $bgcolor={bgcolor} onClick={funcion}>
        <div className="contentIcon">
            <span>{icono}</span>

        </div>
    </Container>)
}
const Container = styled.div`
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    box-shadow: 5px 5px 10px #bebebe, -20px -20px 40px #ffffff;
    color: ${(props) => props.$textcolor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
   
    left: 95%; /* Centra horizontalmente */
    top: 24%; /* Centra verticalmente */
    transform: translate(15%, -10%); /* Ajusta la posición relativa */
    cursor: pointer;
    .contentIcon{
        position: absolute;
        top:25%;
        bottom:25%;
        left:0;
        right:0;
        display:flex;
        justify-content:center;
        transition: 0.2s;
        &:hover{
            transform: scale(1.2);
        }
    }
`;