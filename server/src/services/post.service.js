require("dotenv");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_REDIRECT_URI
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const uploadFile = async (data) => {
  try {
    console.log(data);
    // const createFile = await drive.files.create({
    //   requestBody: {
    //     name: "test2.mp4",
    //     mineType: "video/mp4",
    //   },
    //   media: {
    //     mimeType: "video/mp4",
    //     body: fs.createReadStream(
    //       path.join(__dirname, "../validations/video.mp4")
    //     ),
    //   },
    // });
    // const getUrl = await setFilePublic(createFile.data.id);
    // console.log(getUrl);
  } catch (error) {
    throw new Error(error);
  }
};

const setFilePublic = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const getUrl = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    return getUrl;
  } catch (error) {
    console.log(error);
  }
};
const deleteFile = async () => {
  try {
    const deleteFile = await drive.files.delete({
      fileId: "1",
    });
    console.log(deleteFile.status);
  } catch (error) {}
};
module.exports = {
  uploadFile,
  deleteFile,
};
