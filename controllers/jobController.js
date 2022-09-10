import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Input all credentials");
  }
  req.body.createdBy = req.body.userId;
  const job = await Job.create(req.body);
  console.log(job);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const updateJobs = async (req, res) => {
  res.send("update job");
};

const showStats = async (req, res) => {
  res.send("show stats job");
};

export { createJob, deleteJob, getAllJobs, updateJobs, showStats };
