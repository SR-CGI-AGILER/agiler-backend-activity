const db = require('../../db-connection/mongo');
const project = require('../../model/project');
const task = require('../../model/task');
const subtask = require('../../model/subtask');
const team = require('../../model/team');
const async = require('async');

function createProject(details) {
    console.log('is this this getting called ??')
    return new Promise(function (resolve, reject) {
        // console.log(details.assignTo[0].teamName)
        // const x = new project({
        //     "projectName": details.projectName,
        //     "createdAt": new Date,
        //     "archiveProject": "false",
        //     "assignTo": details.assignTo
        console.log(details, "this is the details in DAo while createing the project")
            let newProject  = new project()
            newProject.projectName = details.projectName
            newProject.createdAt = new Date()
            
            newProject.assignTo.push({teamId:details.teamId,teamName:details.assignTo[0].teamName})
      
        newProject.save(function (err, data) {
            console.log(err, data)
            resolve(data)
        })
    })
}


function addTeam(team) {
    return new Promise(function (resolve, reject) {
        project.findOne({
            "_id": team.projectId
        }).exec(function (err, doc) {
            if (err) {
                reject(err)
            } else {
                doc.assignTo.push(team.teamDetails)
                doc.save().then(function () {
                    resolve(doc)
                })
            }
        });
    });
}
function addAssignTo(name) {
    return new Promise(function (resolve, reject) {
        console.log(name,"name hai from ctr")
            project.findOne({
                "_id": name.id,
                "assignTo.teamName": name.assignTo.teamName,
                "assignTo.teamId": name.assignTo.teamId
            }).exec(function (err, doc) {
                if (err) {
                    throw err
                } else {
                    if (doc === null) {
                        addTeam({
                            projectId: name.id,
                            teamDetails: name.assignTo
                        }).then(function (doc) {
                            resolve(doc)
                        }).catch(function (err) {
                            resolve(err)
                        })
                    } else {
                        reject(doc)
                    }
                }
            })

        
    })
}


function createTask(details) {
    return new Promise(function (resolve, reject) {
        const x = new task({
            "projectId": details.id,
            "taskName": details.task.taskName,
            "createdAt": new Date,
            "archiveTask": "false"

        })
        x.save(function (err, data) {
            if (err)
            console.log(err, data)
            resolve(data)
        })

    })
}
function createSubTask(details) {
    return new Promise(function (resolve, reject) {
        const x = new subtask({
            "taskId": details.id,
            "subtaskName": details.subtask.subtaskName,
            "createdAt": new Date,
            "archiveTask": false,
            "assignTo": ["t1", "t2"]

        })
        x.save(function (err, data) {
            if (err)
            console.log(err, data)
            resolve(data)
        })
    })

}
function createTeam(details){
    // console.log(details)
    return new Promise(function (resolve, reject) {

        let newTeam  = new team()
        newTeam.teamName = details.teamName
        newTeam.createdAt = new Date()
        newTeam.teamMembers.push({memberId: details.memberId})
        

       
        newTeam.save(function (err, data) {
            if (err)
                console.log(err, data)
                resolve(data)
            })  
    })
}
function findAllTeam(project_data){
    return new Promise(function (resolve, reject) {
        let a = parseInt(project_data.l);
        let b = parseInt(project_data.p);
        let c = a * b;
        team.find().limit(a).skip(c).exec(function (err, data) {
            if(err){reject(err);}else{
                resolve(data);
            }
           
        })
    })
}
function findSpecificProject(data) {
    return new Promise(function (resolve, reject) {
        // console.log(data)
        project.find({
            "_id": data.p
        }).exec(function (err, data) {
            console.log(err, data)
            resolve(data)
        })
    })
}


function findTeam(data) {

    return new Promise((resolve, reject) => {
        let memberId = data.member;

        team.find({
            "teamMembers.memberId": memberId
        }, {
            "teamName": 1
        }).exec((err, data) => {
            console.log(err,  data);
            resolve(data);
        });
    });
}

function findTeamMembers(data) {
    return new Promise((resolve, reject) => {
        let teamId = data.teamId;

        team.find({
            "_id": teamId
        }, {
            "teamName": 1,
            "teamMembers": 1
        }).exec((err, data) => {
            // console.log(data);
            resolve(data);
        });

    });
}

function findProject(project_data) {
    return new Promise(function (resolve, reject) {
        // console.log(project_data)
        let a = parseInt(project_data.l);
        let b = parseInt(project_data.p);
        let c = a * b;
        // console.log(c)
        project.find().limit(a).skip(c).exec(function (err, data) {
            // console.log(data);
            resolve(data);
        })
    })
}

function deleteTeamMember(data) {
    return new Promise((resolve, reject) => {
        let teamId = data.teamId;
        let memberId = data.memberId;
        team.findOne({
            "_id": data.teamId,
            "teamMembers.memberId": data.memberId
        }, {
            teamMembers: 1
        }, function (err, doc) {
            if (err) {
                reject(err);
            } else {


                doc.teamMembers.pull(doc.teamMembers[0]._id);

                doc.save();
                resolve(doc);
            }
        })

    });
}

function addTeamMember(data) {
    return new Promise((resolve, reject) => {
        // console.log(data,"in dao");
        team.findById(
            {
                "_id": data.teamId
            }, function (err, doc) {
                if (err) {
                    reject(err)
                } else {
                    console.log(doc,"doc is here bro")
                    doc.teamMembers.push({
                        "memberId": data.memberId
                    })
                    // console.log(doc.teamMembers.memberId,"add team members");
                    doc.save()
                    resolve(doc)
                }
            })
        })
    }




function findTask(details) {
    return new Promise(function (resolve, reject) {
        // console.log(details.id);
        let a = parseInt(details.l);
        let b = parseInt(details.p);
        // console.log(a);
        let c = a * b;
        task.find({
            "projectId": details.id
        }).limit(a).skip(c).exec(function (err, data) {
            // console.log(data);
            resolve(data);
        });
    });
}

function findSubTask(subtask_data) {
    return new Promise(function (resolve, reject) {
        let a = parseInt(subtask_data.l);
        let b = parseInt(subtask_data.p);
        let c = a * b;
        subtask.find({
            "taskId": subtask_data.id
        }).limit(a).skip(c).exec(function (err, data) {
            // console.log("in sub-task model");
            if(err) {
                reject(err)
            }
            resolve(data);
        });
    });
}


function archiveProject(project_data) {
    return new Promise(function (resolve, reject) {
        project.findOneAndUpdate({
            _id: project_data.projectId
        }, {
            $set: {
                "archiveProject": true
            }
        }, function (err, data) {
            // console.log(data)
            resolve(data)
        })
    })
}

function archiveTask(task_data) {
    return new Promise(function (resolve, reject) {
        task.findOneAndUpdate({
                // project.task._id: name.t_id
                projectId: task_data.p_id,
                _id: task_data.t_id
            }, {
                $set: {
                    "archiveTask": true
                }
            },
            function (err, data) {
                // console.log(data)
                resolve(data)
            });

    })
}

function findMemberProjects(project_data) {
    return new Promise(function (resolve, reject) {
        team.find({
                "teamMembers.memberId": project_data.memberId
            }, {
                "_id": 1
            })
            .exec(function (err, doc) {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
    })
}

function findMemberTeams(teamId) {
    return new Promise(function (resolve, reject) {
        project.find({
                "assignTo.teamId": teamId
            }, {
                "projectName": 1,
                "createdAt" : 1,
                "dueDate":1,
            })
            .exec(function (err, doc) {
                if (err) {
                    console.log(err, "INSIDE THE LOOP")
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
    })
}

function findMemberTeamProject(doc) {
    console.log("this should not come here while getting the task of the specific project ")
    return new Promise(function (resolve, reject) {
        let arr = []
        doc.map(function (e) {
            arr.push(findMemberTeams(e._id));
        })
        let data = Promise.all(arr)
        // console.log(data)

        data.then(function (result) {
            // if(err){
            //     console.log(err, "are we here ?????")
            //     reject(err)
            // }else {

                console.log("where am i?",)
                result = result.reduce(function (acc = [], val) {
    
                  console.log(acc, "acc")
                    return acc.concat(val)
                })
                resolve(result)
            // }
        })
    })
}

function findTeamProjects(team_data) {
    return new Promise(function (resolve, reject) {
        project.find({
            "assignTo.teamId": team_data.teamId
        }, {
            "projectName": 1,
            "createdAt":1,
            "dueDate":1
        }).exec(function (err, data) {
            resolve(data)
        })
    })
}

function deleteProject(project_data) {
    return new Promise(function (resolve, reject) {
        project.deleteOne({
            "_id": project_data.projectId
        }).exec(function (err, data) {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

function deleteTask(task_data) {
    return new Promise(function (resolve, reject) {
        task.deleteOne({
            "_id": task_data.taskId
        }).exec(function (err, data) {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

function deleteTeam(team_data) {
    return new Promise(function (resolve, reject) {
        team.deleteOne({
            "_id": team_data.teamId
        }).exec(function (err, data) {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

function assignDueDate(task_data){
    console.log(task_data, "this is task data......in DAO")
    return new Promise(function (resolve, reject) {
        task.findOneAndUpdate({
            "_id":task_data.taskId
        }, 
            {
                $set: {
                    "dueDate": task_data.dueDate
                }
            }, function (err, data) {
                console.log(data, "this is data form the updated data from DB")
                resolve(data)
            })
        })
    }

   function markTaskComplete(task_data) {
       return new Promise( function (resolve, reject) {
           task.findOneAndUpdate({
               "_id":task_data.taskId
           }, {
               $set: {
                   "status":"complete"
               }
           }, function(err, data) {
               if(err)
               reject(err)
               else
               resolve(data)
           })
       })
   } 


//    function assignTask(task_data) {
//        return new Promise( function( resolve, reject) {
//            task.findOne({
//                "_id":task_data.taskId
//            }, function (err, data) {
//                if(err)
//                reject(err)
//                else{
//                    data.assignTo = {
//                        memberId: task_data.memberId
//                    }
//                    data.save()
//              console.log(data, "this task is in dao ...")
//                resolve(data)
//             }
//            })
//     })
// }

function assignTask(task_data) {
    return new Promise((resolve, reject) => {
        // console.log(data,"in dao");
        task.findById(
            {
                "_id": task_data.taskId
            }, function (err, doc) {
                if (err) {
                    reject(err)
                } else {
                    doc.assignTo.push({
                        "memberId": task_data.memberId
                    })
                    // console.log(doc.teamMembers.memberId,"add team members");
                    doc.save()
                    resolve(doc)
                }
            })
        })
    }

module.exports = {
    findSpecificProject,
    findProject,
    createProject,
    createSubTask,
    createTask,
    createTeam,
    archiveTask,
    findTask,
    findSubTask,
    archiveProject,
    findMemberProjects,
    findTeam,
    findTeamMembers,
    addTeamMember,
    deleteTeamMember,
    findMemberTeamProject,
    findTeamProjects,
    deleteProject,
    deleteTask,
    deleteTeam,
    findAllTeam,
    addAssignTo,
    assignDueDate,
    markTaskComplete,
    assignTask
}