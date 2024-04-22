const path = require("path");
const UserAuth = require("../../models/user_auth_model");
const UserDetails = require("../../models/user_model");
const BusinessInfo = require("../../models/business_info_model");

const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

router.get("/ping", (req, res) => {
  res.send("Namaste! Welcome to the products API.");
  console.log("Request at /ping");
});

router.post("/get-user-profile", upload.none(), async (req, res) => {
  console.log("Request at /get-user-profile");
  const user_auth_token = req.body.user_auth_token;
  let user_auth = await UserAuth.findOne({ user_auth_token });
  console.log("user auth: ", user_auth);
  if (user_auth) {
    let user_details = await UserDetails.findOne({
      personal_contact_number: user_auth.personal_contact_number,
    });
    console.log("User details: " + user_details);
    let business_info = await BusinessInfo.findOne({
      personal_contact_number: user_auth.personal_contact_number,
    });
    console.log("business info: " + business_info);
    if (user_details) {
      console.log(user_details);
      return res
        .status(200)
        .json({
          user_details: user_details,
          business_info: business_info,
          status: "ok",
        });
    } else {
      return res
        .status(400)
        .json({ msg: "User details not found", status: "error" });
    }
  } else {
    return res.status(400).json({ msg: "User not found", status: "error" });
  }
});

router.post("/profile-image", upload.none(), async (req, res) => {
  console.log("Request at /profile-image");
  try {
    const user_auth_token = req.body.user_auth_token;
    let user_auth = await UserAuth.findOne({ user_auth_token });
    if (!user_auth) {
      return res.status(404).json({ message: "User not found" });
    }
    let user_details = await UserDetails.findOne({
      personal_contact_number: user_auth.personal_contact_number,
    });
    if (!user_details) {
      return res.status(404).json({ message: "User details not found" });
    }
    const imagePath = path.join(
      __dirname,
      "../../public/uploads/profile_images/",
      user_details.profile_image_id,
    );
    res.sendFile(imagePath);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/update-profile", upload.none(), async (req, res) => {
  console.log("Request at /update-user-profile");

  const user_auth_token = req.body.user_auth_token;

  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const personal_email = req.body.personal_email;
  const personal_contact_number = req.body.personal_contact_number;
  const personal_address = req.body.personal_address;

  const business_name = req.body.business_name;
  const business_email = req.body.business_email;
  const business_contact_number = req.body.business_contact_number;
  const business_address = req.body.business_address;
  const business_about = req.body.business_about;
  const business_account_number = req.body.business_account_number;
  const business_gstin = req.body.business_gstin;

  let user_auth = await UserAuth.findOne({ user_auth_token });
  if (user_auth) {
    try {
      let user_details = await UserDetails.findOne({
        personal_contact_number: user_auth.personal_contact_number,
      });
      let business_info = await BusinessInfo.findOne({
        personal_contact_number: user_auth.personal_contact_number,
      });
      if (user_details) {
        user_details.first_name = first_name;
        user_details.last_name = last_name;
        user_details.personal_email = personal_email;
        user_details.personal_contact_number = personal_contact_number;
        user_details.personal_address = personal_address;
        await user_details.save();

        console.log("business_info: ", business_info);
        business_info.business_name = business_name;
        business_info.business_email = business_email;
        business_info.business_contact_number = business_contact_number;
        business_info.business_address = business_address;
        business_info.business_account_number = business_account_number;
        business_info.business_gstin = business_gstin;
        business_info.business_about = business_about;
        await business_info.save();
      } else {
        return res
          .status(400)
          .json({ msg: "User details not found", status: "error" });
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }

    return res.status(200).json({ status: "ok" });
  } else {
    return res.status(400).json({ msg: "User not found", status: "error" });
  }
});

module.exports = router;
