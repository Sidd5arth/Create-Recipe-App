import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const Register = mongoose.model("registeredUser", registerSchema);

export default Register;
