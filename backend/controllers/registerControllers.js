import Register from "../schemas/registerSchema.js";

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await Register.findOne({ email: email });
    if (user) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = await Register.create(req.body);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Register.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          status: "logged-in",
          name: user.name,
          id: user._id,
        });
      } else {
        res.status(400).json("password is incorrect");
      }
    } else {
      res.status(400).json("no user exists");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
