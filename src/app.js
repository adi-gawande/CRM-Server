import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import authRoutes from "./modules/Auth/routes.js";
import roleRoutes from "./modules/master/role/routes.js";
import prefixRoutes from "./modules/master/prefix/routes.js";
import diplomaRoutes from "./modules/master/diploma/routes.js";
import graduationRoutes from "./modules/master/graduation/routes.js";
import sectorRoutes from "./modules/master/sector/routes.js";
import sizeRoutes from "./modules/master/size/routes.js";
import postGraduationRoutes from "./modules/master/PostGraduation/routes.js";
import designationRoutes from "./modules/master/designation/routes.js";
import userRoutes from "./modules/User/routes.js";
import ourClientRoutes from "./modules/OurClient/routes.js";
import bankDetailsRoutes from "./modules/master/bankdetails/routes.js";
import productCategoryRoutes from "./modules/master/product-category/routes.js";
import subProductCategoryRoutes from "./modules/master/sub-product-category/routes.js";
import leadReferenceRoutes from "./modules/master/lead-reference/routes.js";
import leadStatusRoutes from "./modules/master/lead-status/routes.js";
import leadTypeRoutes from "./modules/master/lead-type/routes.js";
import leadSourceRoutes from "./modules/master/lead-source/routes.js";
import gstPercentageRoutes from "./modules/master/gst-percentage/routes.js";
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
app.use("/role", roleRoutes);
app.use("/prefix", prefixRoutes);
app.use("/diploma", diplomaRoutes);
app.use("/bank-details", bankDetailsRoutes);
app.use("/product-category", productCategoryRoutes);
app.use("/sub-product-category", subProductCategoryRoutes);
app.use("/lead-reference", leadReferenceRoutes);
app.use("/lead-status", leadStatusRoutes);
app.use("/lead-type", leadTypeRoutes);
app.use("/lead-source", leadSourceRoutes);
app.use("/gst-percentage", gstPercentageRoutes);
app.use("/graduation", graduationRoutes);
app.use("/sector", sectorRoutes);
app.use("/size", sizeRoutes);
app.use("/lead", leadRoutes);
app.use("/prospect", prospectRoutes);
app.use("/post-graduation", postGraduationRoutes);
app.use("/designation", designationRoutes);

export default app;
