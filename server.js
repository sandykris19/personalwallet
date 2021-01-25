const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Transc = require("./models/Transactions");

const app = express();

const dbURI = process.env.URL;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client/build"));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  // res.sendFile("./client/build/index.html");
  res.send("success");
});

app.post("/user", async (req, res) => {
  User.create({
    name: req.body.name,
    mobile: req.body.mobile,
    balance: req.body.balance,
  }).then(() => {
    res.send("success");
  });
});

app.get("/users", (req, res) => {
  User.find({}).then((response) => {
    res.json(response);
  });
});

app.get("/balance", async (req, res) => {
  const id = req.query.user_id;
  User.findById(id).then((response) => {
    res.json(response);
  });
});

app.put("/addfunds", (req, res) => {
  const { user, amount } = req.body;
  User.findOneAndUpdate({ _id: user }, { $inc: { balance: amount } }).then(
    async () => {
      const foo = await User.findById(user);
      await User.findByIdAndUpdate(
        { _id: user },
        {
          $push: {
            transactions: {
              ttype: "self",
              transValue: `+${amount}`.trim(),
              balance: foo.balance,
            },
          },
        }
      );
      Transc.create({
        userID: user,
        name: foo.name,
        transValue: `+${amount}`,
        balance: foo.balance,
      });
      res.send("Successfuly Added funds");
    }
  );
});
app.put("/spendfunds", async (req, res) => {
  const { user, amount } = req.body;
  const remBal = await User.findById({ _id: user });
  if (remBal.balance - amount < 0) {
    res.send("Cannot spend less than available balance");
  } else {
    User.findOneAndUpdate({ _id: user }, { $inc: { balance: -amount } }).then(
      async () => {
        const foo = await User.findById(user);
        await User.findByIdAndUpdate(
          { _id: user },
          {
            $push: {
              transactions: {
                ttype: "self",
                transValue: `-${amount}`.trim(),
                balance: foo.balance,
              },
            },
          }
        );
        Transc.create({
          userID: user,
          name: foo.name,
          transValue: `-${amount}`,
          balance: foo.balance,
        });
        res.send("Successfuly Spent funds");
      }
    );
  }
});

app.get("/transactions", (req, res) => {
  Transc.find({}).then((response) => {
    res.json(response);
  });
});

app.listen(process.env.PORT || 4000, (req, res) => {
  console.log("Listening at PORT 4000");
});
