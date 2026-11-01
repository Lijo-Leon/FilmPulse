//1. Import Express
const express = require('express')

const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const CMController = require('../controllers/CMController')
const STController = require('../controllers/STController')
const AllTechniqueController = require('../controllers/AllTechniqueController')
const multerMiddleware = require('../middlewares/multerMiddleware')
const adminJwtMiddleware = require('../middlewares/adminJwtMiddleware')
const paymentController = require('../controllers/paymentController')
const uploadImage = require('../middlewares/imageUpload')


//2. Create Router
const router = express.Router();

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/google-login',userController.googleAuth)

router.post('/addCameraMovement',jwtMiddleware,multerMiddleware.array("videos",10),CMController.addCameraMovement)
router.get('/getCameraMovements',jwtMiddleware,CMController.getCameraMovements)
router.get('/getACameraMovementResult/:id',jwtMiddleware,CMController.getACameraMovementResult)

router.post('/addShotType',jwtMiddleware,multerMiddleware.array("videos",10),STController.addShotType)
router.get('/getShotType',jwtMiddleware,STController.getShotType)
router.get('/getAShotTypeResult/:id',jwtMiddleware,STController.getAShotType)

//GET Users
router.get('/getUsersList',adminJwtMiddleware,userController.getUsersList)

//GET All Techniques - Admin page
router.get('/getAllTechniques',adminJwtMiddleware,AllTechniqueController.getAllTechniques)

router.post("/create-checkout-session",jwtMiddleware,paymentController.createCheckoutSession);
router.post("/activate-premium",jwtMiddleware,paymentController.activatePremium);

router.put("/update-profile", jwtMiddleware,uploadImage.single("profile"), userController.updateProfileWithImage);

router.get("/pending-camera-movements", adminJwtMiddleware,CMController.getPendingCameraMovements);
router.get("/pending-shot-types", adminJwtMiddleware,STController.getPendingShotTypes);

router.put("/approve-camera-movement/:id", adminJwtMiddleware,CMController.approvePendingRequest);
router.put("/approve-shot-type/:id", adminJwtMiddleware,STController.approvePendingRequest);

router.put("/reject-camera-movement/:id", adminJwtMiddleware,CMController.rejectPendingRequest);
router.put("/reject-shot-type/:id", adminJwtMiddleware,STController.rejectPendingRequest);

router.put("/add-fav-cm/:id", jwtMiddleware,CMController.addtoFavCM);
router.put("/remove-fav-cm/:id", jwtMiddleware,CMController.removefromFavCM);
router.get("/favourite-camera-movements", jwtMiddleware,CMController.getFavCM);


router.put("/add-fav-st/:id", jwtMiddleware,STController.addtoFavST);
router.put("/remove-fav-st/:id", jwtMiddleware,STController.removefromFavST);
router.get("/favourite-shot-types", jwtMiddleware,STController.getFavST);

router.get("/getSubmittedCM", jwtMiddleware,CMController.getPendingCameraMovements);
router.get("/getApprovedCM", jwtMiddleware,CMController.getApprovedCM);
router.get("/getRejectedCM", jwtMiddleware,CMController.getRejectedCM);

router.get("/getSubmittedST", jwtMiddleware,STController.getPendingShotTypes);
router.get("/getApprovedST", jwtMiddleware,STController.getApprovedST);
router.get("/getRejectedST", jwtMiddleware,STController.getRejectedST);

module.exports = router