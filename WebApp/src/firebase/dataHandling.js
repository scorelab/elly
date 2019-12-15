export function generateResult(data) {
    let result = []
    result.push(['map-marker', data.address.toString()])
    result.push(['map-marker', data.location.toString()])
    
    let time = new Date(data.time)
    time = time.toString().split(" ")
    time = time.splice(0, time.length - 3)
    time = time.toString().replace(/,/g, ' ')
    result.push(['clock', time.toString()])
    if(data.notes !== ''){
        result.push(['note-text', data.notes])
    }
    if (data.isAlive === 1) {
        result.push(['cards-heart', "Alive"])
        if (data.isSingle === 0) {
            result.push(['comment-question', "Single"])
            if (data.haveTusks === 0) {
                result.push(['comment-question', "Have tusks"])
            } else if (data.haveTusks === 1) {
                result.push(['comment-question', "No tusks"])
            } else {
                result.push(['comment-question', "Can't see tusks"])
            }
        } else if (data.isSingle === 1) {
            if (data.isSingle === 1) {
                result.push(['comment-question', "Group with calves"])
            } else {
                result.push(['comment-question', "Group without calves"])
            }

            if (data.noOfIndividuals === 0) {
                result.push(['comment-question', "2 to 5 individuals"])
            } else if (data.noOfIndividuals === 1) {
                result.push(['comment-question', "6 to 10 individuals"])
            } else {
                result.push(['comment-question', "More than 10 individuals"])
            }

            if (data.howManyTuskers === 0) {
                result.push(['comment-question', "No any tuskers"])
            } else if (data.howManyTuskers === 1) {
                result.push(['comment-question', "1 to 5 individual tuskers"])
            } else if (data.howManyTuskers === 1) {
                result.push(['comment-question', "6 to 10 individual tuskers"])
            } else {
                result.push(['comment-question', "More than 10 individual tuskers"])
            }

        }

        if (data.sex === 0) {
            result.push(['gender-male-female', "Male"])
        } else if (data.sex === 0) {
            result.push(['gender-male-female', "Female"])
        } else if (data.sex === 0) {
            result.push(['gender-male-female', "Both male and female"])
        } else {
            result.push(['gender-male-female', "Don't know the gender"])
        }
    } else {
        if (data.cause === 0) {
            result.push(['comment-question', "By Accident"])
            if (data.accidentKind === 0) {
                result.push(['comment-question', "A Vehicle strike"])
            } else if (data.accidentKind === 1) {
                result.push(['comment-question', "A Train strike"])
            } else if (data.accidentKind === 2) {
                result.push(['comment-question', "Has Fell into well"])
            } else if (data.accidentKind === 3) {
                result.push(['comment-question', "A Electrocution"])
            } else {
                result.push(['comment-question', data.accidentOther])
            }
        } else if (data.cause === 1) {
            result.push(['comment-question', "Intentional Death."])
            if (data.intentionalKind === 0) {
                result.push(['comment-question', "Conflict related"])
            } else if (data.intentionalKind === 1) {
                result.push(['comment-question', "Hunting related"])
            } else if (data.intentionalKind === 2) {
                result.push(['comment-question', data.intentionalOther])
            } else {
                result.push(['comment-question', "Don’t know how it died."])
            }
        } else {
            result.push(['comment-question', "Don't know how the death happened."])
        }
        result.push(['comment-question', data.noOfDeaths + " died."])
        result.push(['comment-question', data.noOfTusks + " tuskers."])
        if (data.tusksStatus === 0) {
            result.push(['comment-question', "Tusks naturally absent"])
        } else if (data.tusksStatus === 1) {
            result.push(['comment-question', "Tusks present"])
        } else if (data.tusksStatus === 2) {
            result.push(['comment-question', "Tusks removed"])
        } else {
            result.push(['comment-question', "Don’t know what happened to tusks."])
        }
    }

    //console.log(result)
    return result
}