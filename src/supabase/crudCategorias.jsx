import { supabase } from "../index";

export async function MostrarCategorias() {
  const { data, error } = await supabase
    .from('categories')
    .select('*'); 

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}

export async function agregarCategoria(category_name, description) {
  const { data, error } = await supabase
    .from('categories')
    .insert([
      { category_name, description } // Insert the new category with the provided fields
    ]);

  if (error) {
    console.error("Error adding category:", error);
    return { success: false, message: "Failed to add category" };
  }

  return { success: true, data }; // Return the inserted data if successful
}

export async function editarCategoria(id, category_name, description) {
  const { data, error } = await supabase
    .from('categories')
    .update({ category_name, description })
    .eq('category_id', id); // Ensuring we update the category with the matching ID

  if (error) {
    console.error("Error updating category:", error);
    return { success: false, message: "Failed to update category" };
  }

  return { success: true, data }; // Return the updated data
}

export async function eliminarCategoria(id) {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('category_id', id); // Ensuring we delete the category with the matching ID

  if (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Failed to delete category" };
  }

  return { success: true, data }; // Return the deleted data
}