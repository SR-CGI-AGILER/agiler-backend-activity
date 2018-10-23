const router = require('express').Router();
const activityController = require('./activity.controller')
const url = require('url');
const querystring = require('querystring');

router.get('/project/:limit?/:page?', activityController.findProjectResponse)
router.get('/projectx/:projectId', activityController.findSpecificProjectResponse)
// router.put('/project/:projectId/tasks', activityController.createTaskResponse) 
router.get('/projects/:projectId/tasks/:limit?/:page?', activityController.findTaskResponse)
router.get('/project/tasks/:taskId/subtasks/:limit?/:page?', activityController.findSubTaskResponse)
router.get('/member/:memberId/projects/:limit?/:page?', activityController.findMemberTeamProjectsResponse)//find projects of a specific team
// router.post('/project', activityController.createProjectResponse) 
// router.post('/tasks', activityController.createTaskResponse)
// router.post('/project/:projectId/tasks', activityController.createTaskResponse)
// router.put('/project/:projectName', activityController.updateProjectResponse)
router.put('/project/:projectId', activityController.archiveProjectResponse)
router.put('/project/:projectId/tasks/:taskId', activityController.archiveTaskResponse)
// router.put('tasks/:taskId/subtasks/:subtaskId', activityController.archiveSubTaskResponse)

router.get('/teams/:memberId',activityController.findTeamResponse);//find teams of a specific member
router.get('/teams/:teamId/members',activityController.findTeamMembersResponse);

router.patch('/teams/:teamId', activityController.addTeamMemberResponse);
// router.delete('/teams/:teamId', activityController.deleteTeamResponse);
router.delete('/teams/:teamId/:memberId', activityController.deleteTeamMemberResponse);

module.exports = router