import { create } from "zustand";
import { InsertarUsuarios,MostrarUsuarios, supabase } from "../index";

export const useUsuariosStore = create((set, get) => ({
    insertarUsuarioAdmin: async (p) => {
        const { data, error } = await supabase.auth.signUp({
            email: p.correo,
            password: p.pass,
        });

        console.log("data del registro del user auth", data);
        if (error) return;
        const datauser = await InsertarUsuarios({
            idauth:data.user.id, 
            fecharegistro:new Date(),
            tipouser:"admin",
        });
        return datauser;
    },
    idusuario: 0,
    mostrarUsuarios: async () => {
        const response = await MostrarUsuarios();
        if (response) {
            set({ idusuario: response.id });
            return response;
        } else {
            console.warn("No se encontró ningún usuario");
            return null;
        }
    },

    mostrarUsuarios2: async () => {
        const response = await MostrarUsuarios();
        if (response) {
            set({ usuario: response }); // Guarda el usuario completo
        }
        return response;
    },
    usuario: null, // Estado inicial para el usuario
}));