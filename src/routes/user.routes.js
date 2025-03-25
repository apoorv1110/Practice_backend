import { Router }  from "express";
import { loginUser, loggedOutUser , registerUser , refreshAccessToken,
    changeCurrentPassword , getCurrentUser , updateAccountdetails , updateAvatar , updateCoverImage,
    getUserChannelProfile , getWatchHistiry
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router() 
// hame har operation ka route likhna hota hai

router.route("/register").post(
    upload.fields([ // yaha upload middleware se aaya tha
        {
            name: "avatar",
            maxCount:1
        },
        {
            name: "coverImage",
            maxCount:1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT , loggedOutUser)
// isme pehle verifyJWT run hoga or uske baad next() ki wajah se loggedOutUser ke paas aayega
// tab hum loggedOutuser me verijyJWT ki wajah se req me user ko access kar payenge
// bina kuch input liye user se

router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT , changeCurrentPassword)
router.route("/current-user").get(verifyJWT , getCurrentUser)
// agar isko post kiya to saari details update ho jayengi
router.route("/update-account-details").patch(verifyJWT , updateAccountdetails)
router.route("/update-avatar").patch(verifyJWT , upload.single("avatar"),updateAvatar)
router.route("/update-coverImage").patch(verifyJWT , upload.single("coverimage"),updateCoverImage)

// when we take data from params
router.route("/channel/:username").get(verifyJWT , getUserChannelProfile)
router.route("/history").get(verifyJWT , getWatchHistiry)


export default router