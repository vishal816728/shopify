class Controller{
    constructor(){

    }

    ok(res,result){ 
        res.status(200)
        .header('Content-Type','application/json')
        .header('Access-Control-Allow-Origin','*')
        .send({result:true,data:result})
    }

    error(res,err){
        res.status(500)
        .header('Access-Control-Allow-Origin',"*")
        .send({result:false,data:`Internal Error ${err.message}`})
    }
    errorWithMsg(res,msg){
        res.status(400)
        .header('Access-Control-Allow-Origin',"*")
        .send({result:false,message:msg})
    }
}

export default Controller;