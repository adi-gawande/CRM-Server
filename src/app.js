import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import authRoutes from "./modules/Auth/routes.js";
import prefixRoutes from "./modules/master/prefix/routes.js";
import diplomaRoutes from "./modules/master/diploma/routes.js";
import graduationRoutes from "./modules/master/graduation/routes.js";
import postGraduationRoutes from "./modules/master/PostGraduation/routes.js";
import SuperSpecializationRoutes from "./modules/master/SuperSpecialization/routes.js";
import councilRoutes from "./modules/master/Councils/routes.js";
import designationRoutes from "./modules/master/designation/routes.js";
import userRoutes from "./modules/User/routes.js";
import ourClientRoutes from "./modules/OurClient/routes.js";
import clientRoutes from "./modules/Client/routes.js";
import leadRoutes from "./modules/Lead/routes.js";
import prospectRoutes from "./modules/Prospect/routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// routes will go here later
app.get("/", (req, res) => res.send("CRM MadeSimplified API running"));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/our-client", ourClientRoutes);
app.use("/client", clientRoutes);
app.use("/prefix", prefixRoutes);
app.use("/lead", leadRoutes);
app.use("/prospect", prospectRoutes);
// app.use("/post-graduation", postGraduationRoutes);
// app.use("/speciality", SuperSpecializationRoutes);
// app.use("/council", councilRoutes);
// app.use("/designation", designationRoutes);

export default app;
