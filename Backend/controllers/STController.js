const { response, json } = require('express');

const ShotTypes = require('../models/STModel')


exports.addShotType = async (req, res) => {
    try {
        console.log('Inside Add Shot Type');
        console.log(req.body);
        const {
            title,
            shortDescription,
            description,
            whyItUsed,
            whenToUse,
            emotionalImpact,
            technicalSetup
        } = req.body;

        const parsedWhenToUse = JSON.parse(whenToUse || "[]")
        const parsedEmotionalImpact = JSON.parse(emotionalImpact || "[]")
        const parsedTechnicalSetup = JSON.parse(technicalSetup || "[]")

        const videoFiles = req.files?.map(file => ({
            video: file.filename
        }))

        const newShotType = new ShotTypes({
            title,
            shortDescription,
            description,
            whyItUsed,
            whenToUse: parsedWhenToUse,
            emotionalImpact: parsedEmotionalImpact,
            technicalSetup: parsedTechnicalSetup,
            videos: videoFiles,
            status: "pending",
            submittedBy: req.user.id,
            favourite: false
        })
        const saved = await newShotType.save()

        res.status(201).json({
            message: "Shot Type added successfully",
            saved
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding technique", error });
    }
}

exports.getShotType = async (req, res) => {
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
        const shotTypes = await ShotTypes.find(query)
        console.log(shotTypes);
        res.status(200).json(shotTypes)
    }

    catch (error) {
        res.status(500).json("Error : " + error)
    }
}


exports.getAShotType = async (req, res) => {
    console.log("inside get a shot type result");

    const { id } = req.params
    console.log(id);

    try {
        const ShotType = await ShotTypes.findOne({ _id: id })
        console.log(ShotType);
        res.status(200).json(ShotType)

    }
    catch (error) {
        res.status(500).json("Error :", err)
    }

}


exports.getPendingShotTypes = async (req, res) => {
    try {
        const pending = await ShotTypes.find({ status: "pending" }).populate("submittedBy", "username email")
        res.status(200).json(pending)
    }
    catch (err) {
        res.status(500).json("Error :", err)
    }
}

exports.approvePendingRequest = async (req, res) => {
    try {
        const approvedRequest = await ShotTypes.findByIdAndUpdate(req.params.id, {
            status: "approved"
        })
        console.log(approvedRequest);

        res.status(200).json({
            message: "Request Approved",
            approvedRequest
        })
    }
    catch (err) {
        res.status(500).json("Error :", err)
    }
}

exports.rejectPendingRequest = async (req, res) => {
    try {
        const rejectedRequest = await ShotTypes.findByIdAndUpdate(req.params.id, {
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
exports.addtoFavST = async(req,res)=>{
  const {id} = req.params
  console.log(id);
  try {
    const updatedST  = await ShotTypes.findByIdAndUpdate(req.params.id,{favourite:true})
    console.log(updatedST );
    res.status(200).json(updatedCM )
    
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}


//remove from favourite
exports.removefromFavST = async(req,res)=>{
  const {id} = req.params
  console.log(id);
  try {
    const updatedST  = await ShotTypes.findByIdAndUpdate(req.params.id,{favourite:false})
    console.log(updatedST );
    res.status(200).json(updatedST )
    
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}

//get favourite
exports.getFavST = async (req, res) => {
  try {
    const favouriteST = await ShotTypes.find({ favourite: true })
    res.status(200).json(favouriteST)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}



// get approved
exports.getApprovedST = async (req, res) => {
  try {
    const approvedCM = await ShotTypes.find({ status: 'approved' })
    res.status(200).json(approvedCM)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}

// get rejected
exports.getRejectedST = async (req, res) => {
  try {
    const rejectedCM = await ShotTypes.find({ status: 'rejected' })
    res.status(200).json(rejectedCM)
  }
  catch (err) {
    res.status(500).json("Error :", err)
  }
}