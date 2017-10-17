const express = require('express')
const cluster = require('cluster')
const os = require('os')

const app = express()

if(cluster.isMaster){

    for (var index = 0; index < os.cpus().length; index++) {
        var worker = cluster.fork()
        console.log(`Worker Running ${worker.id}...`)
    }

}else{
    app.get('/', (req, resp) => {
        console.log(`Executing...${cluster.worker.id}`)
        resp.send('Hello');
    })
    
    app.listen(3000)    
        
}


