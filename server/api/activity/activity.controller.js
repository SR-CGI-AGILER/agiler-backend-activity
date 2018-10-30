const activityDao = require('../../dao/activity/activity.dao')

function findProjectResponse(req, res) {
        let data = {
            l:req.query.limit || 10,
            p:req.query.page || 0
        };
    activityDao.findProject(data).then(data => {
        res.status('200').send({
            data: data
        });
    });
}
// function findTaskResponse(req, res) {
//     activityDao.findTask({

//     }).then(data => {
//         res.status('200').send({
//             data: data
//         })
//     })
// }
// function findSubTaskResponse(req, res) {
//     activityDao.findSubTask({

//     }).then(data => {
//         res.status('200').send({
//             data: data
//         })
//     })
// }


function findTeamMembersResponse(req, res) {
    let data = {
        teamId: req.params.teamId
    };
    activityDao.findTeamMembers(data).then(data => {
        res.status('200').send({
            data: data
        });
    });
}

function addTeamMemberResponse(req, res) {
    let data = {
        teamId: req.params.teamId,
        memberId: req.params.memberId
    };

    activityDao.addTeamMember(data).then(data => {
        res.status('200').send({
            data: data
        });
    });
}

function deleteTeamMemberResponse(req, res) {
    let data = {
        teamId: req.params.teamId,
        memberId: req.params.memberId
    };
    activityDao.deleteTeamMember(data).then(data=>{
        res.send({
            data: data
        });
    });
}

function findTeamResponse(req, res) {//team
   
    let data = {
        l: req.query.limit,
        p: req.query.page,
        member: req.params.memberId
    };
    activityDao.findTeam(data).then(data => {
        res.status('200').send({
            data: data
        });
    });
}

function createProjectResponse(req, res) {
    let projectName = req.body.projectName
    // if(req.body.assignTo){
    //     name1 = req.body.assignTo.map(function (e) {

    //         id = e.teamId,
    //             name = e.teamName

    //     });


        if ((req.body.assignTo).length >= 1) {
            if (projectName) {

            
                let temp = (projectName).trim()
                
                // let temp1 = name.trim()
                if (temp.length !== 0) {
                    let newProjectDetails = {
                        projectName: req.body.projectName,
                        assignTo: req.body.assignTo,
                        teamId:req.params.teamId
                    }
                    console.log(newProjectDetails, "is the data scructure correct ??")
                    activityDao.createProject(newProjectDetails).then(data => {

                        res.status('201').send({
                            data: data
                            
                        })

                    })
                // }
                // else {


                //     res.status(400).send({
                //         payload: {
                //             msg: "project or team  name should not be null"
                //         }
                //     })

                // }
            } else {
                res.status(400).send({
                    payload: {
                        msg: "please provide a project name"
                    }
                })
            }
        } else {
            res.status(400).send({
                payload: {
                    msg: "pass only one team name"
                }
            })
        }
    }else {
        res.status(400).send({
            payload: {
                msg: "pass assignTo"
            }
        })
    }
}

function addAssignToResponse(req, res) {
    name1 = req.body.assignTo.map(function (e) {

        id = e.teamId,
            name = e.teamName

    });
    if ((req.body.assignTo).length == 1) {
        if (name && id) {

            let temp = name.trim()
            let temp1 = id.trim()
            if ((temp1.length !== 0) && (temp.length !== 0)) {

                let newProjectDetails = {
                    id: req.params.projectId,
                    assignTo: req.body.assignTo

                }
                activityDao.addAssignTo(newProjectDetails).then(data => {

                    res.status('201').send({
                        data: data
                    })

                }).catch(function (err) {
                    res.send({
                        "message": "team already exist"
                    })
                })
            }
            else {
                res.status(400).send({
                    payload: {
                        msg: "team id or name should not be null"
                    }
                })

            }
        } else {
            res.status(400).send({
                payload: {
                    msg: "please provide a team name"
                }
            })
        }
    } else {
        res.status(400).send({
            payload: {
                msg: "pass only one team name"
            }
        })
    }
}

function createTaskResponse(req, res) {
    if (req.body.taskName) {
        let temp = (req.body.taskName).trim()
        if ((Object.prototype.constructor(req.body)) && (temp.length !== 0)) {
            let data = {
                id: req.params.projectId,
                task: req.body

            }
            activityDao.createTask(data).then(data => {
                res.status('200').send({
                    data: data
                })

            })
        }
        else {


            res.status(400).send({
                payload: {
                    msg: "task name should not be null"
                }
            })

        }
    } else {
        res.status(400).send({
            payload: {
                msg: "please provide a task name"
            }
        })
    }

}
function createSubTaskResponse(req, res) {
    if (req.body.subtaskName) {
        let temp = (req.body.subtaskName).trim()
        if ((Object.prototype.constructor(req.body)) && (temp.length !== 0)) {
            let data = {
                id: req.params.taskId,
                subtask: req.body
            }
            activityDao.createSubTask(data).then(data => {

                res.status('200').send({
                    data: data
                })

            })
        }
        else {


            res.status(400).send({
                payload: {
                    msg: "subtask name should not be null"
                }
            })

        }
    } else {
        res.status(400).send({
            payload: {
                msg: "please provide a subtask name"
            }
        })
    }

}

function createTeamResponse(req,res){//create teammmm
    if (req.body.teamName) {
        
        let temp = (req.body.teamName).trim()
        if ((Object.prototype.constructor(req.body)) && (temp.length !== 0)) {
            let data = {
                teamName: req.body.teamName,
                memberId: req.params.memberId

            }
            activityDao.createTeam(data).then(data => {
                res.status('201').send({
                    data: data
                })

            })
        }
        else {


            res.status(400).send({
                payload: {
                    msg: "team name should not be null"
                }
            })

        }
    } else {
        res.status(400).send({
            payload: {
                msg: "please provide a team name"
            }
        })
    }

}
function findAllTeamResponse(req, res){
    let data = {
        l: req.query.limit,
        p: req.query.page
    };
    activityDao.findAllTeam(data).then(data => {
        res.status('200').send({
            data: data
        });
    });
}
function findSpecificProjectResponse(req, res) {
    let data = {
        p: req.params.projectId
    }
    activityDao.findSpecificProject(data).then(data => {
        res.status('200').send({
            data: data
        })
    })
}

function findTaskResponse(req, res) {
    console.log("is this thing comes here ???")
    let data = 
        {
            id:req.params.projectId,
            l:req.query.limit || 10,
            p:req.query.page || 0
        };
    activityDao.findTask(data).then(data => {
        res.status('200').send({
            data: data
        });
    }).catch(err => {
        res.send({
            length: 0,
            error: "some thing went Wrong",
            payload: []
        })
    });
}

function findSubTaskResponse(req, res) {
    let data = {
        id:req.params.taskId,
        l:req.query.limit || 10,
        p:req.query.page || 0
    };
    activityDao.findSubTask(data).then(data => {
        res.status('200').send({
            data: data
        });
    });
}



function updateProjectResponse(req, res) {
    activityDao.updateProject({
        projectName: req.params.projectName
    }).then(data => {
        res.status('200').send({
            data: data
        })

    })
}

function archiveTaskResponse(req, res) {
   let data = {
       p_id:req.params.projectId,
       t_id: req.params.taskId
   };
   activityDao.archiveTask(data).then(data=> {
       res.status('200').send({
           data:data
       })
   })
}

function archiveProjectResponse(req, res) {
    let data = {
        projectId: req.params.projectId
    }
    activityDao.archiveProject(data).then(data => {
        res.status('200').send({
            data: data
        })
    })
}

function findMemberTeamProjectsResponse(req, res) {
    let data = {
        memberId: req.params.memberId,
        l: req.query.limit || 10,
        p: req.query.page || 0
    }
    activityDao.findMemberProjects(data).then((data) => {
        activityDao.findMemberTeamProject(data).then(function (data) {
            res.send({
                length: data.length,
                payload: data
            })
        }).catch (function (err) {
            res.send({
                length: 0,
                error: "some error occured",
                payload: []
            })
    })
})
}

function findTeamProjectsResponse(req, res) {
    let data = {
        teamId: req.params.teamId
    };
    activityDao.findTeamProjects(data).then((data) => {
        res.status('200').send({
            data:data
        })
    })
}

function deleteProjectResponse(req, res) {
    let data = {
        projectId: req.params.projectId
    };
    activityDao.deleteProject(data).then((data) => {
        res.status('200').send({
            data:data
        })
    })
}

function deleteTaskResponse(req, res) {
    let data = {
        taskId: req.params.taskId
    };
    activityDao.deleteTask(data).then((data) => {
        res.status('200').send({
            data : data
        })
    })
}

function deleteTeamResponse(req, res) {
    let data = {
        teamId: req.params.teamId
    };
    activityDao.deleteTeam(data).then((data) => {
        res.status('200').send({
            data:data
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
    createSubTaskResponse,
    addAssignToResponse,
    updateProjectResponse,
    archiveTaskResponse,
    archiveProjectResponse,
    findMemberTeamProjectsResponse,
    findTeamProjectsResponse,
    findTeamResponse,
    findTeamMembersResponse,
    addTeamMemberResponse,
    deleteTeamMemberResponse,
    createTeamResponse,
    findAllTeamResponse,
    deleteProjectResponse,
    deleteTaskResponse,
    deleteTeamResponse
}