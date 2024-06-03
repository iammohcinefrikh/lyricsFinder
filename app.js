const express = require("express");

const userRoutes = require("./routes/userRouter.js");
const adminRoutes = require("./routes/adminRouter.js");
const artistRoutes = require("./routes/artistRouter.js");
const newsletterRoutes = require("./routes/newsletterRouter.js");
const songRoutes = require("./routes/songRouter.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(adminRoutes);
app.use(artistRoutes);
app.use(newsletterRoutes);
app.use(songRoutes);

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}.`);
});