const Application = require("../models/Application.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const addApplication = asyncHandler(async (req, res) => {
  const { companyName, jobTitle, status } = req.body;
  
  if (!companyName || !jobTitle || !status) {
    throw new ApiError(400, "Fields cannot be empty");
  }
  const existingApplication = await Application.findOne({
    companyName,
    jobTitle,
    user: req.user._id,
  });
  if (existingApplication) {
    throw new ApiError(400, "Application already exists");
  }

  const newApp = await Application.create({
    companyName,
    jobTitle,
    status,
    user: req.user_id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Application registered", newApp));
});

const getApplications = asyncHandler(async (req,res)=>{
    const {companyName,jobTitle} = req.query

    const filter = {
        user : req.user._id
    }

    if (companyName) filter.companyName = companyName;
    if (jobTitle) filter.jobTitle = jobTitle;


    const applications = await Application.find(filter).sort({ createdAt: -1 });
    if (applications.length === 0) {
        throw new ApiError(404, "No applications found");
    }

    return res.status(200).json(new ApiResponse(200,"List of applications",applications))

})

const getApplicationById = asyncHandler(async (req,res)=>{
    const {id} = req.params

    const application = await Application.findById(id)
    if(!application){
        throw new ApiError(404,"Application not found")
    }
    if (application.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized access");
    }

    //OR
    // const application = await Application.findOne({
    //     _id: id,
    //     user: req.user._id
    // });

    return res.status(200).json(new ApiResponse(200,"Requested application",application))
})

const updateApplication = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const { companyName, jobTitle, status, location , notes , jobLink } = req.body;

    const application = await Application.findOne({
        _id: id,
        user: req.user._id
    })


    if(!application){
        throw new ApiError(404,"Application not found")
    }

    if (companyName) application.companyName = companyName;
    if (jobTitle) application.jobTitle = jobTitle;
    if (status) application.status = status;
    if (location) application.location = location;
    if (notes) application.notes = notes;
    if (jobLink) application.jobLink = jobLink;

    await application.save();

    return res.status(200).json(new ApiResponse(200,"Application updated",application))

})


const deleteApplication = asyncHandler(async (req,res)=>{
    const {id} = req.params

    const application = await Application.findOne({
        _id: id,
        user: req.user._id
    })

    if(!application){
        throw new ApiError(404,"Application not found")
    }

    await application.deleteOne()

    return res.status(200).json(new ApiResponse(200,"Application deleted",application))

})
module.exports = { addApplication, getApplications , getApplicationById , updateApplication , deleteApplication}