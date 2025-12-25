import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifySupabaseToken } from "../utils/verifySupabaseToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // ✅ REQUIRED on HTTPS
      sameSite: "none",      // ✅ REQUIRED for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

export const googleAuth = async (req, res) => {
  console.log("he");

  try {
    const authHeader = req.headers.authorization
    if (!authHeader)
      return res.status(401).json({ message: "Authorization header missing" })

    const token = authHeader.split(" ")[1]
    if (!token)
      return res.status(401).json({ message: "Token missing" })

    // 🔐 Verify Supabase token
    const decoded = await verifySupabaseToken(token)

    const email = decoded.email
    const name =
      decoded.user_metadata?.full_name ||
      decoded.user_metadata?.name ||
      "User"

    const providerId = decoded.sub // Supabase user id

    if (!email)
      return res.status(400).json({ message: "Invalid Google account" })

    let user = await User.findOne({ email })

    // 🧠 Case 1: New user
    if (!user) {
      user = await User.create({
        name,
        email,
        authProvider: "google",
        providerId,
      })
    }

    // 🔁 Case 2: Existing email/password user → link Google
    if (user.authProvider === "local" && !user.providerId) {
      user.authProvider = "google"
      user.providerId = providerId
      await user.save()
    }

    // 🔑 Issue YOUR app JWT
    const tokenn = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", tokenn, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token: tokenn,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    })
  } catch (err) {
    console.error("Google Auth Error:", err)
    res.status(401).json({ message: "Google authentication failed" })
  }
}

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};
