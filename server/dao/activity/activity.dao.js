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
        

        // console.log(new Date,  "sdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsdfsf")
        const x = new project({
            // "projectId": details.projectId,
            "projectName": details.projectName,
            "createdAt": new Date,
            "archiveProject": "false"
          
        })
        x.save(function (err, data) {
            if (err)
                console.log(err, data)
            resolve(data)
        })
    })
}

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
    createSubTask
    // updateProject,
    // archiveProject
}