const db = require('../../db-connection/mongo');
const project = require('../../model/project');
const task = require('../../model/task');
const subtask = require('../../model/subtask');

// function findSpecificProject(name) {
//     return new Promise(function (resolve, reject) {
//         // console.log(name)
//         project.find({
//             "projectName": name.projectName
//         }, function (err, data) {
//             // console.log(err, data)
//             resolve(data)
//         })
//     })

// }
function findProject() {
    return new Promise(function (resolve, reject) {
        project.find({
           
        }, function (err, data) {
            // console.log(err, data)
            resolve(data)
        })
    })
}

    function findTask() {
        return new Promise(function (resolve, reject) {
            task.find({
               
            }, function (err, data) {
                console.log(err, data)
                resolve(data)
            })
        })

}
function findSubTask() {
    return new Promise(function (resolve, reject) {
        subtask.find({
           
        }, function (err, data) {
            // console.log(err, data)
            resolve(data)
        })
    })

}
function createProject(details) {
    return new Promise(function (resolve, reject) {
        
     
        // console.log(details,  "sdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsdfsf")
        const x = new project({
            // "projectId": details.projectId,
            "projectName": details.projectName,
            "createdAt": new Date,
            "archiveProject": "false",
            "assignTo":details.assignTo
            
          
        })
        x.save(function (err, data) {
            if (err)
                console.log(err, data)
            resolve(data)
        })
    })
}
function addAssignTo(name) {
    console.log('here in dao')
    return new Promise(function(resolve, reject){
        // project.findById({
        //     "_id": name.id
        // },
        // function (err, data) {
        //     console.log(err)
        //     data.assignTo.map(function(a){
            //    console.log(a.teamName)
            //    name.assignTo.map(function(e) {
            //        console.log(e)
            //         if(a.teamName !== e.teamName ){
            //         // console.log("hgyhghgh",e)
            //         data.assignTo.push(e);
                  
            //       }
            //     });
            // if (a.teamName == name)
            // });
           
            
            // data.save()
            // resolve(data)
        
            // })
            name.assignTo.map(function(e) {
                project.findOne({
                   "_id": name.id, 
                   "assignTo.teamName" : e.teamName,
                   "assignTo.teamId": e.teamId 
                }).exec(function(err, doc) {
                    if (err) {
                        throw err
                    }else {
                        console.log(doc)
                        if(doc === null) {
                            addTeam({
                                projectId: name.id,
                                teamDetails: e
                            }).then(function(doc) {
                                resolve(doc)
                            }).catch(function (err) {
                                resolve(err)
                            })
                        }else {
                            console.log("this is reject , team is there already")
                            reject(doc)
                        }
                        // console.log(doc, "this is the doc @@@@@@@@@@@@@@@@@@@@@@@@@@@")
                        // resolve(doc)
                    }
                })

            })
    })
}

function addTeam(team) {
    return new Promise(function (resolve, reject) {
        console.log(team, "this is the team detials")
        project.findOne({
            "_id": team.projectId
        }).exec(function(err, doc) {
            if(err) {
                reject(err)
            }else {
                console.log("here when the team is getting added ", doc)
                doc.assignTo.push(team.teamDetails)
                // console.log(doc, )
                doc.save().then(function() {
                    resolve(doc)
                })
            }
        })

    })
}
//function createTask(name) {
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
function createTask(details) {
    // console.log((details.task))
 
    // console.log(details.constructor === Object)
    
        return new Promise(function (resolve, reject) {
            // console.log(details, "sdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsdfsf")
            // if((details.task == {})&&(details.task.taskName !==null)){
            const x = new task({
                "projectId": 66677696696,
                "taskName": details.task.taskName,
                "createdAt": new Date,
                "archiveTask": "false"
              
            })
                x.save(function (err, data) {
                    if (err)
                        console.log(err, data)
                    resolve(data)
                })
            // }
        })
    

   

}
function createSubTask(details) {
    return new Promise(function (resolve, reject) {
        // console.log(details, "sdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsdfsf")
        const x = new subtask({
            "taskId": 878687678,
            "subtaskName": details.subtask.subtaskName,
            "createdAt": new Date,
            "archiveTask": false,
            "assignTo" : ["t1","t2"]
          
        })
        x.save(function (err, data) {
            if (err)
                console.log(err, data)
            resolve(data)
        })
    })

}

// function updateProject(id) {
//     return new Promise(function (resolve, reject) {

//         project.findOneAndUpdate({
//             "projectName": id.projectName
//         }, {
//             $set: {
//                 "projectId": id.projectId 
//             }
//         }, function (err, data) {
//             // console.log(data)
//             resolve(data)
//         })

//     })
// }

// function archiveProject(name) {
//     return new Promise(function (resolve, reject) {
//         project.findOneAndUpdate({
//             projectName: name.projectName
//         }, {
//             $set: {
//                 "archiveProject": true
//             }
//         }, function (err, data) {
//             console.log(data)
//             resolve(data)
//         })
//     })
// }



module.exports = {
    // findSpecificProject,
    findProject,
    findTask,
    findSubTask,
    createProject,
    createTask,
    createSubTask,
    addAssignTo
    // updateProject,
    // archiveProject
}