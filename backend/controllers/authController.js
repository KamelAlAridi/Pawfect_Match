import authService from "../services/authService.js";

export async function requestCode(req, res) {
  const { email } = req.body;
  try {
    await authService.sendVerificationCode(email);
    res.json({ message: "Code sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function signup(req, res) {
  const { email, code, name, password } = req.body;
  try {
    const user = await authService.registerUser(email, code, name, password);
    res.json({
      message: "User registered successfully",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await authService.authenticateUser(email, password);
    res.json({
      message: "Signed in successfully",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function isUserCreated(req, res) {
  const { email } = req.body;
  try {
    const userExists = await authService.checkUserExists(email);
    res.json({ exists: userExists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateName(req, res) {
  const { userId, newName } = req.body;
  try {
    const updatedUser = await authService.changeUserName(userId, newName);
    res.json({
      message: "Name updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updatePassword(req, res) {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const updatedUser = await authService.changeUserPassword(
      email,
      oldPassword,
      newPassword
    );
    res.json({
      message: "Password updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteAccount(req, res) {
  const { email, password } = req.body;
  try {
    await authService.deleteUser(email, password);
    res.json({ message: "Account Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
