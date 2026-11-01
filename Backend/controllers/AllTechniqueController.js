const { response, json } = require('express');

const CameraMovements = require('../models/CMModel')
const ShotTypes = require('../models/STModel')

exports.getAllTechniques = async (req, res) => {
    console.log("Inside GET All Techniques");
    try {
        const cameraMovements = await CameraMovements.find()
        const shotTypes = await ShotTypes.find()
        console.log("CameraMovement: "+ cameraMovements, "ShotType: "+ shotTypes);
        
        res.status(200).json(cameraMovements,shotTypes)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding technique", error });
    }
}