const router = require('express').Router();
const activityController = require('./activity.controller')
const url = require('url');
const querystring = require('querystring');

router.get('/project/:limit?/:page?', activityController.findProjectResponse)
// router.get('/project/:projectName', activityController.findSpecificProjectResponse)
// router.put('/project/:projectId/tasks', activityController.createTaskResponse) 
router.get('/projects/:projectId/tasks/:limit?/:page?', activityController.findTaskResponse)
router.get('/project/tasks/:taskId/subtasks/:limit?/:page?', activityController.findSubTaskResponse)
// router.post('/project', activityController.createProjectResponse) 
// router.post('/tasks', activityController.createTaskResponse)
// router.post('/project/:projectId/tasks', activityController.createTaskResponse)
// router.put('/project/:projectName', activityController.updateProjectResponse)
// router.put('/project/:projectName', activityController.archiveProjectResponse)
// router.put('/project/:projectId/tasks/:taskId', activityController.archiveTaskResponse)
// router.put('tasks/:taskId/subtasks', activityController.archiveSubTaskResponse)

module.exports = router