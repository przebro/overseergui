
const path = require('path')
const fs = require('fs')
const os = require('os')

const storename = 'ovsgui.config'
const dirname = ".ovsdata"


function Store(filepath){
    this.filepath = filepath;
    this.data = new Map();


        console.log("loading store from file")
        let data = fs.readFileSync(filepath);
        console.log(filepath)
        try{
            let res = JSON.parse(data);
            console.log("resources:",res,typeof(res))
            
            for (let k of Object.keys(res)) {
                this.data.set(k, { item : res[k], persist : true});
              }
        }
        catch(e){
            console.log("unable to read store:",e)
        }
    

    this.Get = function(key){

        let r = this.data.get(key)
        if (r == undefined){
            return undefined
        }
        return r.item
    
    }
    this.Set = function(key,item){
        this.data.set(key,{item: item,persist : false})
    }
    this.Save = function(key,item){
        this.data.set(key,{item: item,persist : true})

        let obj = {}
        this.data.forEach((v,k) => {
            if (v.persist){
                obj[k] = v.item
            }
        })

        obj["persist"] = {"persists": true}

        console.log("saving object:",obj)

        let result = JSON.stringify(obj)

        console.log("jsonified object:",result)

        fs.writeFileSync(this.filepath,result,(err, written) =>{
            console.log("error:",err)
            console.log(written)
        })
    }
}

var store;


export function InitStore(){
    var home = os.homedir()
    var pth = path.join(home,dirname)
    var filepath = ""
    
    if (!fs.existsSync(pth)){
        console.debug("directory does not exists, create one.")
        filepath = createStoreFile(pth)
    }else{
        console.debug("directory exists, getting file path")
        filepath = getStoreFilepath(pth)
    }

    store = new Store(filepath)
    console.log(Date.now())
}

export function $store(){
    return store
}


function createStoreFile(pth){
    console.log(pth)
    console.log("creating store")
    fs.mkdirSync(pth)
    var npth = path.join(pth,storename)
    fs.closeSync(fs.openSync(npth,'w+'))
    return npth
    
}
function getStoreFilepath(pth){
   
    let fpath = path.join(pth,storename)
    if (!fs.existsSync(fpath)){
        console.debug("file does not exists, create one.")
        fs.closeSync(fs.openSync(fpath,'w+'))
    }

    return fpath
}

