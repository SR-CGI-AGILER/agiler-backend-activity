const db = require('../../db-connection/mongo');
const project = require('../../model/project');
const task = require('../../model/task');
const subtask = require('../../model/subtask');
const team = require('../../model/team');
const async = require('async');

function createProject(details) {
    return new Promise(function (resolve, reject) {
        console.log(details.assignTo[0].teamName)
        // const x = new project({
        //     "projectName": details.projectName,
        //     "createdAt": new Date,
        //     "archiveProject": "false",
        //     "assignTo": details.assignTo
            let newProject  = new project()
            newProject.projectName = details.projectName
            newProject.createdAt = new Date()
            newProject.assignTo.push({teamId:details.teamId,teamName:details.assignTo[0].teamName})
      
        newProject.save(function (err, data) {
            if (err)
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
        name.assignTo.map(function (e) {
            project.findOne({
                "_id": name.id,
                "assignTo.teamName": e.teamName,
                "assignTo.teamId": e.teamId
            }).exec(function (err, doc) {
                if (err) {
                    throw err
                } else {
                    if (doc === null) {
                        addTeam({
                            projectId: name.id,
                            teamDetails: e
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
    console.log(details)
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
            resolve(data);
        })
    })
}
function findSpecificProject(data) {
    return new Promise(function (resolve, reject) {
        console.log(data)
        project.find({
            "_id": data.p
        }).exec(function (err, data) {
            console.log(err, data)
            resolve(data)
        })
    })
}


function findTeam(data){
    
        return new Promise((resolve,reject)=>{
        let memberId = data.member;
    
        team.find({
            "teamMembers.memberId":memberId
        },{"teamName":1}
        ).exec((err,data)=>{
            // console.log(err,  data);
            resolve(data);
        });
    });
}

function findTeamMembers(data){
    return new Promise((resolve,reject)=>{
        let teamId = data.teamId;

        team.find({
            "_id":teamId
        },{"teamName":1,"teamMembers":1}
        ).exec((err,data)=>{
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
        let c = a*b;
        console.log(c)
        project.find().limit(a).skip(c).exec(function(err, data) {
                console.log(data);
                resolve(data);
            })
        })
}

function deleteTeamMember(data){
    return new Promise((resolve, reject)=>{
        let teamId = data.teamId;
        let memberId = data.memberId;
        team.findOne(
            {
                "_id":data.teamId,
                "teamMembers.memberId": data.memberId
            }, {teamMembers: 1},function(err,doc) {
                if (err) {
                    reject(err);
                }
                else {
                    
                    
                    doc.teamMembers.pull(doc.teamMembers[0]._id);
                    
                    doc.save();
                    resolve(doc);
                }
            }
        )
        
    });
}

function addTeamMember(data){
    return new Promise((resolve,reject)=>{
        
        team.findById(
            {
                "_id":data.teamId
            }, function(err, doc) {
                if (err ) {
                    reject(err)
                }else {
                    console.log(doc)
                    doc.teamMembers.push({
                        "memberId": doc.memberId
                    })
                    doc.save()
                    resolve(doc)
                }
            }
        )
    })
}

function createProject(details) {
    return new Promise(function (resolve, reject) {
        const x = new project({
            "projectId": details.projectId,
            "projectName": details.projectName,
            "createdAt": new Date(),
            "archiveProject": false
        })
        x.save(function (err, data) {
            if (err)
                console.log(err, data)
            resolve(data)
            console.log(data)
        });
    });
}

function createTask(details) {
    return new Promise(function (resolve, reject) {
        console.log(details)
        const x = new task({
            "taskName": details.taskName,
            "createdAt": new Date(),
            "archiveTask": false,
            "projectId": details.id
        })
        x.save(function (err, data) {
            if (err)
                console.log(err, data)
            resolve(data)
        });
    });
}

function findTask(details) {
    return new Promise(function (resolve, reject) {
        console.log(details.id);
        let a = parseInt(details.l);
        let b = parseInt(details.p);
        console.log(a);
        let c = a*b;
        task.find({"projectId": details.id}).limit(a).skip(c).exec(function(err, data) {
                // console.log(data);
                resolve(data);
            });
        });
}

function findSubTask(subtask_data) {
    return new Promise(function (resolve, reject) {
        let a = parseInt(subtask_data.l);
        let b = parseInt(subtask_data.p);
        let c = a*b;
        subtask.find({
            "taskId":subtask_data.id
        }).limit(a).skip(c).exec(function (err, data) {
            console.log("in sub-task model");
            resolve(data); 
        });
    });
}

function updateProject(id) {
    return new Promise(function (resolve, reject) {

        project.findOneAndUpdate({
            "projectName": id.projectName
        }, {
            $set: {
                "projectId": id.projectId
            }
        }, function (err, data) {
            // console.log(data)
            resolve(data)
        })

    })
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
            console.log(data)
            resolve(data)
        })
    })
}

function archiveTask(task_data) {
    return new Promise(function (resolve, reject) {
        task.findOneAndUpdate({
                // project.task._id: name.t_id
                projectId:task_data.p_id,
                _id: task_data.t_id
            }, {
                $set: {
                    "archiveTask": true
                }
            },
            function (err, data) {
                console.log(data)
                resolve(data)
            });

    })
}

function findMemberProjects(project_data) {
    return new Promise(function (resolve, reject){
        team.find({"teamMembers.memberId": project_data.memberId}, {"_id": 1})
        .exec(function (err, doc) {
            if (err) {
                console.log(err)
                reject(err)
            }else {
                resolve(doc)
            }
        })
    })
}
function findMemberTeams(teamId) {
    return new Promise(function (resolve, reject) {
        project.find({"assignTo.teamId": teamId}, {"projectName": 1})
        .exec(function (err, doc) {
            if (err) {
                console.log(err, "INSIDE THE LOOP")
                reject(err)
            }else {
                resolve(doc)
            }
        })
    })
}
function findMemberTeamProject(doc){
    return new Promise(function (resolve, reject) {
            let arr = []
            doc.map(function(e) {
                arr.push(findMemberTeams(e._id));
            })
            let data = Promise.all(arr)
            // console.log(data)

            data.then(function(result) {
                  result = result.reduce(function(acc = [], val){
                
                    return acc.concat(val)
                })
                resolve(result)
            })
    })
}

function findTeamProjects(team_data){
    return new Promise(function (resolve, reject) {
        project.find({"assignTo.teamId": team_data.teamId}, {"projectName":1}).exec(function(err, data){
            resolve(data)
        })
    })
}

module.exports = {
    findSpecificProject,
    findProject,
    createProject,
    createTask,
    createSubTask,
    createTeam,
    updateProject,
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
    findAllTeam,
    findTeamProjects,
    addAssignTo
}