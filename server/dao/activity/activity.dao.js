const db = require('../../db-connection/mongo');
const project = require('../../model/project');
const task = require('../../model/task');
const subtask = require('../../model/subtask');
const team = require('../../model/team');

const async = require('async');

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
    //     function findProject(project_data) {
//     return new Promise(function (resolve, reject) {
//         let a = parseInt(project_data.l);
//         let b = parseInt(project_data.p);
//         let c = a*b;
//         project.find({

//         }).limit(a).skip(c).exec(function(err, data) {
//             // console.log(err, data)
//             resolve(data)
//         })
//     })function findSpecificProjectResponse(req, res) {
//     activityDao.findSpecificProject({
//         projectName: req.params.projectName
//     }).then(data => {
//         res.status('200').send({
//             data: data
//         })
//     })
// }
// }



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
                       "memberId": "deddd8d2-e041-4fbb-a8ed-3c079af9930d"
                   })
   
                   doc.save()
                   resolve(doc)
                }               
            }
        )
    })
}

// function findProject(project_data) {
//     return new Promise( function(resolve, reject) {
//         project.find({

//         }).exec(function(err, data) {
//             resolve(data);
//         });
//     });
// }




    //    var x = new project({
    //        "projectId": "123456",
    //        "projectName": "agiler-1222dasd2",
    //        "createdAt": new Date(),
    //        "task": [{
    //            taskId: "1234",
    //            text: "fdsfsfsfdsdf"
    //        }]
    //    })
    //    x.save(function(err) {
    //        if(err) console.log(err)
    //    })


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



// function createTask(name) {
//     return new Promise(function (resolve, reject) {
//         console.log("here in DAO", JSON.stringify(name, 1, 1))
//         // project.findOneAndUpdate({'_id': name.id}, name.project ,function(err,data) {
//         //     // data.task.push(name.task)
//         //     if (err) console.log(err)
//         //     resolve({"msg": `update successfully ${data}`})
//         // })
//         project.findById({
//             "_id": name.id
//         }, function (err, data) {
//             data.task.push(name.task);
//             data.save()
//             resolve(data)
//         })

//     })

// }


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
                // console.log(doc)
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
    // console.log(doc, "finding the projects")
    return new Promise(function (resolve, reject) {
            let arr = []
            doc.map(function(e) {
                arr.push(findMemberTeams(e._id));
            })
            let data = Promise.all(arr)
            // console.log(data)

            data.then(function(result) {
                  result = result.reduce(function(acc = [], val){
                      let a = acc.concat(val)
                    //   console.log(a,"ajkld")
                    return acc.concat(val)
                })
                resolve(result)
            })
    })
}

function findMemberTeamProjects(project_data) {
    return new Promise(function (resolve, reject) {
        let a = parseInt(project_data.l);
        let b = parseInt(project_data.p);
        let c = a*b;
        
        // team.find({"teamMembers.memberId":project_data.memberId},{"_id":1}).exec(function(err, data){
        //     //let response=[];
        //     data.map((e)=>{
        //         project.find({"assignTo.teamId": e._id},{"projectName":1}).exec((function(err, data){
        //             // console.log(data);
        //             response = Object.assign(response, data);
        //             // console.log(response);

                    
        //         }))
        //     })
        //     // console.log(response);
            
        // })
        
        // // console.log("above");
        // project.find({"assignTo.teamId": project_data.teamId},{"projectName":1}).limit(a).skip(c).exec(function (err, data) {
        //     console.log(data)
        //     resolve(data)
        // })
        // console.log("below");
    })
}



module.exports = {
    findSpecificProject,
    findProject,
    createProject,
    createTask,
    updateProject,
    archiveTask,
    findTask,
    findSubTask,
    archiveProject,
    findMemberTeamProjects,
    findTeam,
    findTeamMembers,
    addTeamMember,
    deleteTeamMember,
    findMemberProjects,
    findMemberTeamProject
}