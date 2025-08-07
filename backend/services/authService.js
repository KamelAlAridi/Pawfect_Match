import bcrypt, { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import supabase from "../supabaseClient.js";
import * as codeModel from "../models/codeModel.js";

async function sendVerificationCode(email) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await codeModel.storeCode(email, code);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "Your verification code",
    text: `Your code is: ${code}`,
  });
}

async function registerUser(email, code, name, password) {
  const stored = await codeModel.getLatestCode(email);
  if (!stored) throw new Error("No code found");

  const now = new Date();
  const created = new Date(stored.created_at);
  const diffMinutes = (now - created) / 1000 / 60;
  if (diffMinutes > 2) throw new Error("Code expired");

  if (stored.code !== code) throw new Error("Incorrect code");

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  const { error } = await supabase.from("users").insert([
    {
      id,
      email,
      name,
      password: hashedPassword,
      verified: true,
    },
  ]);

  if (error) throw new Error(error.message);

  await codeModel.markCodeAsUsed(stored.id);

  return { id, email, name };
}

async function authenticateUser(email, password) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) throw new Error("User not found");

  const match = await bcrypt.compare(password, data.password);
  if (!match) throw new Error("Incorrect password");

  return data;
}

async function checkUserExists(email) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();
    if (error) throw error;
    return !!data;
  } catch (error) {
    throw new Error("Error checking if user exists: " + error.message);
  }
}

async function changeUserName(userId, newName) {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ name: newName })
      .eq("id", userId)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error("Error updating name: " + error.message);
  }
}

async function changeUserPassword(email, oldPassword, newPassword) {
  const user = await authenticateUser(email, oldPassword);
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const { data, error } = await supabase
    .from("users")
    .update({ password: hashedNewPassword })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) throw new Error("Error updating password: " + error.message);
  return data;
}

async function deleteUser(email, password) {
  const user = await authenticateUser(email, password);

  const { error } = await supabase.from("users").delete().eq("id", user.id);

  if (error) throw new Error("Error deleting account: " + error.message);

  return { message: "Account deleted successfully" };
}

export default {
  sendVerificationCode,
  registerUser,
  authenticateUser,
  checkUserExists,
  changeUserName,
  changeUserPassword,
  deleteUser,
};
