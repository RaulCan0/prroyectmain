import { v } from "../styles/variables";
import {
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";

export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: <v.iconoUser />,
    tipo: "miperfil",
  },
  {
    text: "Modulos",
    icono: <v.iconoSettings />,
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icono: <v.iconoCerrarSesion />,
    tipo: "cerrarsesion",
  },
];



//data SIDEBAR
export const LinksArray = [
  {
    label: "Inicio",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Inventario",
    icon: <v.iconocategorias />,
    to: "/inventario",
  },
  {
    label: "Reportes",
    icon: <v.iconoreportes />,
    to: "/reportes",
  },

];
export const SecondarylinksArray = [
  {
    label: "Modulos",
    icon: <AiOutlineSetting />,
    to: "/configurar",
  },

];
//temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",

  },
  {
    icono: "🌚",
    descripcion: "dark",

  },
];

//data configuracion
export const DataModulosConfiguracion = [
 
  {
    title: "Personal",
    subtitle: "ten el control de tu personal",
    icono: "https://i.ibb.co/5vgZ0fX/hombre.png",
    link: "/configurar/usuarios",

  },

  {
    title: "Clientes",
    subtitle: "ten el control de los clientes",
    icono: "https://i.ibb.co/5vgZ0fX/hombre.png",
    link: "/configurar/clientes",

  },

  {
    title: "Ordenes",
    subtitle: "registra tus ordenes",
    icono: "https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link: "/configurar/empresa",

  },
  {
    title: "Categoria de productos",
    subtitle: "Categorias a tus productos",
    icono: "https://i.ibb.co/VYbMRLZ/categoria.png",
    link: "/configurar/categorias",

  },
  {
    title: "Productos",
    subtitle: "registra tus productos",
    icono: "https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
    link: "/configurar/productos",

  },
  {
    title: "Paquetes",
    subtitle: "Genera paquetes de productos",
    icono: "https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link: "/configurar/paquetes",

  },

]
//tipo usuario
export const TipouserData = [
  {
    descripcion: "empleado",
    icono: "🪖",
  },
  {
    descripcion: "administrador",
    icono: "👑",
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];