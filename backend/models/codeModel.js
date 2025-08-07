import supabase from "../supabaseClient.js";

export async function storeCode(email, code) {
  const { error } = await supabase
    .from("verification_codes")
    .insert([{ email, code, used: false }]);
  if (error) {
    console.error("Error storing code:", error);
    throw error;
  }
}

export async function getLatestCode(email) {
  const { data, error } = await supabase
    .from("verification_codes")
    .select("*")
    .eq("email", email)
    .eq("used", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  if (error) {
    console.error("Error fetching latest code:", error);
    return null;
  }
  return data;
}

export async function markCodeAsUsed(id) {
  const { error } = await supabase
    .from("verification_codes")
    .update({ used: true })
    .eq("id", id);
  if (error) {
    console.error("Error marking code as used:", error);
    throw error;
  }
}
