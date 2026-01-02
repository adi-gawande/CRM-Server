import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import authRoutes from "./modules/Auth/routes.js";
import roleRoutes from "./modules/master/role/routes.js";
import prefixRoutes from "./modules/master/prefix/routes.js";
import diplomaRoutes from "./modules/master/diploma/routes.js";
import graduationRoutes from "./modules/master/graduation/routes.js";
import postGraduationRoutes from "./modules/master/PostGraduation/routes.js";
import SuperSpecializationRoutes from "./modules/master/SuperSpecialization/routes.js";
import councilRoutes from "./modules/master/Councils/routes.js";
import designationRoutes from "./modules/master/designation/routes.js";
import userRoutes from "./modules/User/routes.js";
import ledgerRoutes from "./modules/master/ledger/routes.js";
import subLedgerRoutes from "./modules/master/sub-ledger/routes.js";
import paymentModeRoutes from "./modules/master/payment-mode/routes.js";
import payeeCategoryRoutes from "./modules/master/payee-category/routes.js";
import billGroupRoutes from "./modules/master/service-group/routes.js";
import ourClientRoutes from "./modules/OurClient/routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// routes will go here later
app.get("/", (req, res) => res.send("CRM MadeSimplified API running"));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/our-client", ourClientRoutes);
// app.use("/role", roleRoutes);
// app.use("/ledger", ledgerRoutes);
// app.use("/sub-ledger", subLedgerRoutes);
// app.use("/payment-mode", paymentModeRoutes);
// app.use("/payee-category", payeeCategoryRoutes);
// app.use("/bill-group", billGroupRoutes);
// app.use("/prefix", prefixRoutes);
// app.use("/diploma", diplomaRoutes);
// app.use("/graduation", graduationRoutes);
// app.use("/post-graduation", postGraduationRoutes);
// app.use("/speciality", SuperSpecializationRoutes);
// app.use("/council", councilRoutes);
// app.use("/designation", designationRoutes);

export default app;
