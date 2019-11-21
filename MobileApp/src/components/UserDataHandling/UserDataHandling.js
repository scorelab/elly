
export function generateResult(data){
    let result = []
    result.push(['map-marker',data.location.toString()])
    result.push(['clock',(new Date(data.time)).toString()])

    if(data.isAlive===1){
        result.push(['cards-heart',"Alive"])
        if(data.isSingle===0){
            result.push(['comment-question',"Single"])
            if(data.haveTusks===0){
                result.push(['comment-question',"Have tusks"])
            }else if(data.haveTusks===1){
                result.push(['comment-question',"No tusks"])
            }else{
                result.push(['comment-question',"Can't see"])
            }
        }else if(data.isSingle===1){
            if(data.isSingle===1){
                result.push(['comment-question',"Group with calves"])
            }else{
                result.push(['comment-question',"Group without calves"])
            }

            if(data.noOfIndividuals===0){
                result.push(['comment-question',"2 to 5 individuals"])
            }else if(data.noOfIndividuals===1){
                result.push(['comment-question',"6 to 10 individuals"])
            }else{
                result.push(['comment-question',"More than 10 individuals"])
            }

            if(data.howManyTuskers===0){
                result.push([,"None"])
            }else if(data.howManyTuskers===1){
                result.push(['comment-question',"1 to 5 individuals"])
            }else if(data.howManyTuskers===1){
                result.push(['comment-question',"6 to 10 individuals"])
            }else{
                result.push(['comment-question',"More than 10 individuals"])
            }
 
        }

        if(data.sex===0){
            result.push(['gender-male-female',"Male"])
        }else if(data.sex===0){
            result.push(['gender-male-female',"Female"])
        }else if(data.sex===0){
            result.push(['gender-male-female',"Mixed"])
        }else{
            result.push(['gender-male-female',"Don't know"])
        }
    }else{
        if(data.cause===0){
            result.push(['comment-question',"Accident"])
            if(data.accidentKind===0){
                result.push(['comment-question',"Vehicle strike"])
            }else if(data.accidentKind===1){
                result.push(['comment-question',"Train strike"])
            }else if(data.accidentKind===2){
                result.push(['comment-question',"Fell into well"])
            }else if(data.accidentKind===3){
                result.push(['comment-question',"Electrocution"])
            }else{
                result.push(['comment-question',"Other (text note)"])
            }
        }else if(data.cause===1){
            result.push(['comment-question',"Intentional"])
            if(data.intentionalKind===0){
                result.push(['comment-question',"Conflict-related"])
            }else if(data.intentionalKind===1){
                result.push(['comment-question',"Hunting-related"])
            }else if(data.intentionalKind===2){
                result.push(['comment-question',"Other (text note)"])
            }else{
                result.push(['comment-question',"Don’t know"])
            }
        }else{
            result.push(['comment-question',"Don't know"])
        }
        result.push(data.noOfDeaths)
        result.push(data.noOfTusks)
        if(data.tusksStatus===0){
            result.push(['comment-question',"Tusks naturally absent"])
        }else if(data.tusksStatus===1){
            result.push(['comment-question',"Tusks present"])
        }else if(data.tusksStatus===2){
            result.push(['comment-question',"Tusks removed"])
        }else{
            result.push(['comment-question',"Don’t know"])
        }
    }

    //console.log(result)
    return result
}

export function generateUUID(){
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    //console.log(uuid)
    return uuid
}
