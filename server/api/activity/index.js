const router = require('express').Router();
const activityController = require('./activity.controller')
router.get('/project', activityController.findProjectResponse)

router.post('/project/:teamId', activityController.createProjectlResponse) 
router.post('/team/:memberId',activityController.createTeamResponse)//add team
router.get('/team/:limit?/:page?',activityController.findAllTeamResponse)//get all teams
router.post('/project/:projectId/assignTo',activityController.addAssignToResponse)
router.post('/project/:projectId/task', activityController.createTaskResponse) 
router.post('/task/:taskId/subtask', activityController.createSubTaskResponse) 
// router.get('/projects/:projectId/tasks', activityController.findTaskResponse) 
// router.get('/task/:taskId/subtask', activityController.findSubTaskResponse) 
router.get('/project/:limit?/:page?', activityController.findProjectResponse)
router.get('/projectx/:projectId', activityController.findSpecificProjectResponse)
router.get('/projects/:projectId/tasks/:limit?/:page?', activityController.findTaskResponse)
router.get('/project/tasks/:taskId/subtasks/:limit?/:page?', activityController.findSubTaskResponse)
router.get('/member/:memberId/projects/:limit?/:page?', activityController.findMemberTeamProjectsResponse)//find projects of a specific team
router.put('/project/:projectId', activityController.archiveProjectResponse)
router.put('/project/:projectId/tasks/:taskId', activityController.archiveTaskResponse)
router.get('/teams/:memberId',activityController.findTeamResponse);
router.get('/teams/:teamId/projects', activityController.findTeamProjectsResponse);
router.get('/teams/:memberId', activityController.findMemberTeamsResponse);
router.patch('/teams/:teamId/:memberId', activityController.addTeamMemberResponse);
router.delete('/teams/:teamId/:memberId', activityController.deleteTeamMemberResponse);
router.delete('/project/:projectId', activityController.deleteProjectResponse);
router.delete('/tasks/:taskId', activityController.deleteTaskResponse);
router.delete('/teams/:teamId', activityController.deleteTeamResponse);
router.patch('/tasks/:taskId', activityController.markTaskCompleteResponse);
// router.patch('/project/:projectId', activityController.assignDueDateResponse);

module.exports = router