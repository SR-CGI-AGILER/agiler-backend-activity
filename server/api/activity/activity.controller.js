const activityDao = require('../../dao/activity/activity.dao')

function findProjectResponse(req, res) {
    activityDao.findProject({
      
    }).then(data => {
        res.status('200').send({
            data: data
        })
    })
}
function findTaskResponse(req, res) {
    activityDao.findTask({
      
    }).then(data => {
        res.status('200').send({
            data: data
        })
    })
}
function findSubTaskResponse(req, res) {
    activityDao.findSubTask({
      
    }).then(data => {
        res.status('200').send({
            data: data
        })
    })
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

function createProjectResponse(req, res) {
   
    if(req.body.projectName)
    {
        
       
        let temp=(req.body.projectName).trim()
        // console.log(temp.length)
        if((Object.prototype.constructor(req.body))&&(temp.length !== 0)){
            let newProjectDetails = {
                projectName: req.body.projectName,
               assignTo:req.body.assignTo
            }
            activityDao.createProject(newProjectDetails).then(data => {
            
                res.status('201').send({
                    data: req.body
                })

            })
        }
        else{
            
            
                res.status(400).send({
                    payload:{
                        msg : "project name should not be null"
                    }
                })
               
        }
    }else{res.status(400).send({
        payload:{
            msg : "please provide a project name"
        }
    })}
}

function addAssignToResponse(req, res) {
    // console.log("here in the assigned to response",req.body.assignTo)
    name1 = req.body.assignTo.map(function(e) {
                
        id = e.teamId,
        name = e.teamName
             
    });
    //   console.log(name,id)
    if((req.body.assignTo).length == 1){
        if(name && id)
        {
            
            let temp=name.trim()
            let temp1=id.trim()
            // console.log(temp.length)
            if((temp1.length !==0)&&(temp.length !== 0)){
        
                let newProjectDetails = {
                    id: req.params.projectId,
                    assignTo: req.body.assignTo
                
                }
                activityDao.addAssignTo(newProjectDetails).then(data => {
                
                    res.status('201').send({
                        data: req.body
                    })

                }).catch(function(err) {
                    res.send({
                        "message": "team already exist"
                    })
                })
            }
            else{
                    res.status(400).send({
                        payload:{
                            msg : "team id or name should not be null"
                        }
                    })
                
            } 
        }else{res.status(400).send({
            payload:{
                msg : "please provide a team name"
            }
        })}
    }else{res.status(400).send({
        payload:{
            msg : "pass only one team name"
        }
    })}
}

function createTaskResponse(req, res) {
    // console.log(req.body)
    if(req.body.taskName)
    {
        let temp=(req.body.taskName).trim()
        // console.log(temp.length)
        if((Object.prototype.constructor(req.body))&&(temp.length !== 0)){
                let data = {
                id: req.params.projectId,
                task: req.body
                }
            activityDao.createTask(data).then(data => {
                // console.log(req.params._id)
                res.status('200').send({
                    data: req.body
                })
            
            })
        }
        else{
            
            
                res.status(400).send({
                    payload:{
                        msg : "task name should not be null"
                    }
                })
               
        }
    }else{res.status(400).send({
        payload:{
            msg : "please provide a task name"
        }
    })}
   
}
function createSubTaskResponse(req, res) {
    // console.log("here")
    if(req.body.subtaskName)
    {
        let temp=(req.body.subtaskName).trim()
        // console.log(temp.length)
        if((Object.prototype.constructor(req.body))&&(temp.length !== 0)){
            let data = {
                id: req.params.taskId,
                subtask: req.body
            }
            activityDao.createSubTask(data).then(data => {
              
                res.status('200').send({
                    data: req.body
                })
            
            })
        }
        else{
            
            
                res.status(400).send({
                    payload:{
                        msg : "subtask name should not be null"
                    }
                })
               
        }
    }else{res.status(400).send({
        payload:{
            msg : "please provide a subtask name"
        }
    })}

}


module.exports = {
   
    findProjectResponse,
    findTaskResponse,
    findSubTaskResponse,
    createProjectResponse,
    createTaskResponse,
    createSubTaskResponse,
    addAssignToResponse
   
}