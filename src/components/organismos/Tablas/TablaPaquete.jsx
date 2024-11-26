import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
  } from "@tanstack/react-table";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaArrowsAltV} from "react-icons/fa";
import { ContentAccionesTabla,usePaqueteStore,v} from "../../../index";
import { FaA } from "react-icons/fa6";
import { useState } from "react";
  
  export function TablaPaquete({ data, setopenRegistraPaquete, setdataSelect, setAccion}) {
    const editar=(data) => {
      if(data.paquetes.nombre=== "Paquete para 10 personas"){
          Swal.fire({
              icon: "error",
              title: "No se puede editar este paquete",
              text: "Este paquete no puede ser editar",
          });
          return;    
      }
      setopenRegistraPaquete(true);
      setdataSelect(data);
      setAccion("Editar");

    };
    const[pagina, setPagina]=useState(1);
    const eliminar=(p) => {
        if(p.paquetes.nombre=== "Paquete para 10 personas"){
            Swal.fire({
                icon: "error",
                title: "No se puede eliminar este paquete",
                text: "Este paquete no puede ser eliminar",
            });
        return;
        }
        Swal.fire({
            title: "¿Estás seguro de eliminar este paquete?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async(result) => {
            if(result.isConfirmed){
                await eliminarPaquete({id_paquete: p.paquetes.id_paquete});

            }
        });
    };
    const columns = [
      {
        accessorKey: "paquetes.nombre",
        header: "Nombre del Paquete",
        cell: (info) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "paquetes.precio",
        header: "Precio del Paquete",
        cell: (info) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "products.name",
        header: "Nombre del Producto",
        cell: (info) => <span>{info.getValue() || "No disponible"}</span>,
      },
      {
        accessorKey: "cantidad",
        header: "Cantidad",
        cell: (info) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey:"acciones",
        header:"",
        enableSorting:false,
        cell:(info)=> (<td className="ContenCell">
            <ContentAccionesTabla 
                funcionEditar={()=>editar(info.row.original)}
                funcionEliminar={()=>eliminar(info.row.original)}
            />
        </td>)
      }
    ];
  
    const table = useReactTable({
      data: data || [], // Asegúrate de que siempre se pase un array, incluso si data es null
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
    return (
      <Container>
        <table className="responsive-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.column.columnDef.header}
                    {header.column.getCanSort() && (
                      <span style={{cursor:"pointer"}}
                      onClick={header.column.getToggleSortingHandler()}>
                        <FaArrowsAltV/>
                      </span>
                    )}
                    {
                      {
                        asc:"🔼",
                        desc:" 🔽"
                      }[header.column.getIsSorted()]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
  }
  
  const Container = styled.div`
  width: 100%; /* Ocupa todo el ancho del contenedor principal */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Permite desplazamiento horizontal en caso de tablas grandes */

  table {
    width: 100%; /* La tabla ocupa todo el ancho disponible */
    border-collapse: collapse;
    font-family: Arial, sans-serif;

    th, td {
      padding: 10px;
      text-align: center;
   
    }

    th {
      background-color: ; /* Color del encabezado */
      color: #050505;
      font-weight: bold;
      border-bottom: 1px solid #050505 ;
      
    }

    tr:hover {
      background-color: #c3e0ca; /* Color al pasar el mouse */
    }

    td {
      color: #333;
      font-size: 14px;

      &.ContenCell {
        text-align: center;
      }
    }
  }
`;