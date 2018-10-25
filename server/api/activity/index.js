const router = require('express').Router();
const activityController = require('./activity.controller')
const url = require('url');
const querystring = require('querystring');

router.get('/project/:limit?/:page?', activityController.findProjectResponse)
router.get('/projectx/:projectId', activityController.findSpecificProjectResponse)
router.get('/projects/:projectId/tasks/:limit?/:page?', activityController.findTaskResponse)
router.get('/project/tasks/:taskId/subtasks/:limit?/:page?', activityController.findSubTaskResponse)
router.get('/member/:memberId/projects/:limit?/:page?', activityController.findMemberTeamProjectsResponse)//find projects of a specific team
router.get('/teams/:teamId/projects', activityController.findTeamProjectsResponse)
router.put('/project/:projectId', activityController.archiveProjectResponse)
router.put('/project/:projectId/tasks/:taskId', activityController.archiveTaskResponse)

router.get('/teams/:memberId',activityController.findTeamResponse);
router.get('/teams/:teamId/members',activityController.findTeamMembersResponse);

router.patch('/teams/:teamId/:memberId', activityController.addTeamMemberResponse);
router.delete('/teams/:teamId/:memberId', activityController.deleteTeamMemberResponse);

module.exports = router