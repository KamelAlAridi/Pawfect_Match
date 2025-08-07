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
