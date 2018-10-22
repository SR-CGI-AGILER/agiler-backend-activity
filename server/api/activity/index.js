const router = require('express').Router();
const activityController = require('./activity.controller')
router.get('/project', activityController.findProjectResponse)
// router.get('/project/:projectName', activityController.findSpecificProjectResponse)
router.post('/project', activityController.createProjectResponse) 
router.post('/project/:projectId/assignTo',activityController.addAssignToResponse)
router.post('/project/projectId/task', activityController.createTaskResponse) 
router.post('/task/taskId/subtask', activityController.createSubTaskResponse) 
router.get('/task', activityController.findTaskResponse) 
router.get('/subtask', activityController.findSubTaskResponse) 


module.exports = router