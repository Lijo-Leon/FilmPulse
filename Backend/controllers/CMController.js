const { response, json } = require('express');

const CameraMovements = require('../models/CMModel')

exports.addCameraMovement = async (req, res) => {
  try {
    console.log('Inside Add CM Techniques');
    console.log(req.body);
    const { title,
      shortDescription,
      description,
      howItWorks,
      whenToUse,
      emotionalImpact,
      technicalSetup
    } = req.body;

    const parsedWhenToUse = JSON.parse(whenToUse || "[]");
    const parsedEmotionalImpact = JSON.parse(emotionalImpact || "[]");
    const parsedTechnicalSetup = JSON.parse(technicalSetup || "[]");

    const videoFiles = req.files?.map(file => ({
      video: file.filename
    }));

    const newEntry = new CameraMovements({
      title,
      shortDescription,
      description,
      howItWorks,
      whenToUse: parsedWhenToUse,
      emotionalImpact: parsedEmotionalImpact,
      technicalSetup: parsedTechnicalSetup,
      videos: videoFiles,
      status: "pending",
      submittedBy: req.user.id,
      favourite: false

    });
    const saved = await newEntry.save();

    res.status(201).json({
      message: "Technique submitted for admin approval",
      saved
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding technique", error });
  }
};




exports.getCameraMovements = async (req, res) => {
  console.log(req.query);
  const searchKey = req.query.search

  try {
    const query = {
      status: "approved",
      title: {
        $regex: searchKey,
        $options: "i"
      }
    }
    const cameraMovements = await CameraMovements.find(query)
    console.log(cameraMovements);
    res.status(200).json(cameraMovements)
  }

  catch (error) {
    res.status(500).json("Error : " + error)
  }
}



exports.getACameraMovementResult = async (req, res) => {
  console.log("Inside results");

  const { id } = req.params
  console.log(id);

  try {
    const CameraMovement = await CameraMovements.findOne({ _id: id })
    console.log(CameraMovement);

    res.status(200).json(CameraMovement)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }

}




//GET Pending Requests
exports.getPendingCameraMovements = async (req, res) => {
  try {
    const pending = await CameraMovements.find({ status: "pending" }).populate("submittedBy", "username email")
    res.status(200).json(pending)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}


//Approve Pending Requests
exports.approvePendingRequest = async (req, res) => {
  try {
    const approvedRequest = await CameraMovements.findByIdAndUpdate(req.params.id, {
      status: "approved",
      notification: true
    })
    res.status(200).json({
      message: "Request Approved",
      approvedRequest
    })
  }

  catch (err) {
    res.status(500).json("Error :", err)
  }
}

//Reject Pending Requests
exports.rejectPendingRequest = async (req, res) => {
  try {
    const rejectedRequest = await CameraMovements.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    })
    res.status(200).json({
      message: "Request Rejected",
      rejectedRequest
    })
  }

  catch (err) {
    res.status(500).json("Error :", err)
  }
}

//add to favourite
exports.addtoFavCM = async (req, res) => {
  const { id } = req.params
  console.log(id);
  try {
    const updatedCM = await CameraMovements.findByIdAndUpdate(req.params.id, { favourite: true })
    console.log(updatedCM);
    res.status(200).json(updatedCM)

  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}

//remove from favourite
exports.removefromFavCM = async (req, res) => {
  const { id } = req.params
  console.log(id);
  try {
    const updatedCM = await CameraMovements.findByIdAndUpdate(req.params.id, { favourite: false })
    console.log(updatedCM);
    res.status(200).json(updatedCM)

  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}

//get favourite
exports.getFavCM = async (req, res) => {
  try {
    const favouriteCM = await CameraMovements.find({ favourite: true })
    res.status(200).json(favouriteCM)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}


// get approved
exports.getApprovedCM = async (req, res) => {
  try {
    const approvedCM = await CameraMovements.find({ status: 'approved' })
    res.status(200).json(approvedCM)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}

// get rejected
exports.getRejectedCM = async (req, res) => {
  try {
    const rejectedCM = await CameraMovements.find({ status: 'rejected' })
    res.status(200).json(rejectedCM)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}