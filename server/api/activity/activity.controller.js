const activityDao = require('../../dao/activity/activity.dao')

function findProjectResponse(req, res) {
        let data = {
            l:req.query.limit,
            p:req.query.page
        };
    activityDao.findProject(data).then(data => {
        res.status('200').send({
            data: data
        });
    });
}

function findTeamMembersResponse(req, res) {
    let data = {
        teamId: req.params.teamId
    };
    activityDao.findTeamMembers(data).then(data=>{
        res.status('200').send({
            data: data
        });
    });
}

function addTeamMemberResponse(req,res){
    let data = {
        teamId: req.params.teamId
    };
    activityDao.addTeamMember(data).then(data=>{
        res.status('200').send({
            data: data
        });
    });
}

function deleteTeamMemberResponse(req, res){
    let data = {
        teamId: req.params.teamId,
        memberId: req.params.memberId
    };
    console.log("HERE in Controller");
    activityDao.deleteTeamMember(data).then(data=>{
        res.send({
            data:data
        });
    });
}

function findTeamResponse(req, res){
    let data = {
        member: req.params.memberId
    }
    activityDao.findTeam(data).then(data=>{
        res.status('200').send({
            data:data
        });
    });
}

// function findSpecificProjectResponse(req, res) {
//     activityDao.findSpecificProject({
//         projectName: req.params.projectName
//     }).then(data => {
//         res.status('200').send({
//             data: data
//         })
//     })
// }

function findSpecificProjectResponse(req, res) {
    let data = {
        p:req.params.projectId
    }
    activityDao.findSpecificProject(data).then(data => {
        res.status('200').send({
            data:data
        })
    })
}

function findTaskResponse(req, res) {
   console.log("whjat is happening?")
    let data = 
        {
            id:req.params.projectId,
            l:req.query.limit,
            p:req.query.page
        };
    activityDao.findTask(data).then(data => {
        res.status('200').send({
            data:data
        });
    });
}

function findSubTaskResponse(req, res) {
    let data = {
        id:req.params.taskId,
        l:req.query.limit,
        p:req.query.page
    };
    activityDao.findSubTask(data).then(data=> {
        res.status('200').send({
            data:data
        });
    });
}

function createProjectResponse(req, res) {
    let newProjectDetails = {
        projectName: req.body.projectName
    }
    activityDao.createProject(newProjectDetails).then(data => {
      
        res.status('201').send({
            data: req.body
        })

    })
}

function createTaskResponse(req, res) {

   let data = {
       id: req.params.projectId,
       taskName: req.body.taskName
   };
    activityDao.createTask(data).then(data => {
        console.log(req.params.id)
        res.status('200').send({
            data: data
            // data1: req.params.projectId
    })
    })
}

// function createTaskResponse(req, res) {
//     let newTask = {
//         taskName: req.body.taskName
//     };
//     activityDao.createTask(newTask).then(data=> {
//         res.status('201').send({
//             data: req.body
//         })
//     })
// }

function updateProjectResponse(req, res) {
    activityDao.updateProject({
        projectName: req.params.projectName
    }).then(data =>{
        res.status('200').send({
            data: data
    })
   
    })
}

function archiveTaskResponse(req, res) {
   let data = {
   
       t_id: req.params.taskId
   };
   console.log(data)
   activityDao.archiveTask(data).then(data=> {
       res.status('200').send({
           data:data
       })
   })
}

function archiveProjectResponse(req, res) {
    let data = {
        projectName: req.params.projectName
    }
    activityDao.archiveProject(data).then(data => {
        res.status('200').send({
            data: data
        })
    })
}


module.exports = {
    findSpecificProjectResponse,
    findProjectResponse,
    findTaskResponse,
    findSubTaskResponse,
    createProjectResponse,
    createTaskResponse,
    updateProjectResponse,
    archiveTaskResponse,
    archiveProjectResponse,
    findTeamResponse,
    findTeamMembersResponse,
    addTeamMemberResponse,
    deleteTeamMemberResponse
}