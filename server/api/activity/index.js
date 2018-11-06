const router = require('express').Router();
const activityController = require('./activity.controller')

router.get('/team/:limit?/:page?',activityController.findAllTeamResponse)//get all teams
router.get('/project/:limit?/:page?', activityController.findProjectResponse)//get all projects
router.get('/projectx/:projectId', activityController.findSpecificProjectResponse)//get specific project
router.get('/projects/:projectId/tasks/:limit?/:page?', activityController.findTaskResponse)//get tasks of a project
router.get('/project/tasks/:taskId/subtasks/:limit?/:page?', activityController.findSubTaskResponse)//get subtasks of a task
router.get('/member/:memberId/projects/:limit?/:page?', activityController.findMemberTeamProjectsResponse)//find projects of a specific member
router.get('/teams/:memberId',activityController.findTeamResponse);//get teams of a member
router.get('/teams/:teamId/projects', activityController.findTeamProjectsResponse);//get all projects of a team
router.get('/teams/:teamId/members',activityController.findTeamMembersResponse);//get members of a team

router.post('/project/:teamId', activityController.createProjectResponse) //add project to a team
router.post('/team/:memberId',activityController.createTeamResponse)//add team to a member
router.post('/project/:projectId/assignTo',activityController.addAssignToResponse)//assign team to a project
router.post('/project/:projectId/task', activityController.createTaskResponse) //add task to a project
router.post('/task/:taskId/subtask', activityController.createSubTaskResponse) //add subtask to a project 

router.put('/project/:projectId', activityController.archiveProjectResponse)//archive project
router.put('/project/:projectId/tasks/:taskId', activityController.archiveTaskResponse)//archive task

router.delete('/teams/:teamId/:memberId', activityController.deleteTeamMemberResponse);
router.delete('/project/:projectId', activityController.deleteProjectResponse);
router.delete('/tasks/:taskId', activityController.deleteTaskResponse);
router.delete('/teams/:teamId', activityController.deleteTeamResponse);

router.patch('/task/:taskId', activityController.assignDueDateResponse);
router.patch('/tasks/:taskId', activityController.markTaskCompleteResponse);
router.patch('/taskz/:taskId',activityController.assignNullTaskResponse)
router.patch('/teams/:teamId/:memberId', activityController.addTeamMemberResponse);
router.patch('/taskx/:taskId/:memberId', activityController.assignTaskResponse);




module.exports = router