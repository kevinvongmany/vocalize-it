const db = require("../config/connection");
const { User, voiceclip } = require("../models");
const bcrypt = require("bcrypt");
const userData = require("./userData.json");
const clipsData = require("./clipsData.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    // Clean the User collection
    await cleanDB("User", "users");
    await cleanDB("voiceclip", "voiceclips");

    // Hash the passwords in userData
    const hashedUserData = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert seed user data
    await User.create(hashedUserData);

    for (let i = 0; i < clipsData.length; i++) {
      const users = await User.find();
      const user = users[Math.floor(Math.random() * users.length)];
      if (user) {
        const { _id } = await voiceclip.create({
          ...clipsData[i],
          userId: user._id,
        });
        await User.findOneAndUpdate(
          { username: clipsData[i].username },
          {
            $addToSet: {
              savedclips: _id,
            },
          }
        );
      }
    }

    console.log("Seed complete!");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    // Close the database connection
    process.exit(0);
  }
});
