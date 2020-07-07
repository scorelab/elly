import moment from "moment";

export function generateResult(data) {
  let result = {};
  result["verified"] = { icon: "comment-question", value: data.verified };
  result["uname"] = { icon: "comment-question", value: data.uname };
  result["uimg"] = { icon: "comment-question", value: data.uimg };
  result["uid"] = { icon: "comment-question", value: data.uid };
  result["photoURL"] = { icon: "comment-question", value: data.photoURL };
  result["address"] = { icon: "map-marker", value: data.address.toString() };
  result["location"] = { icon: "map-marker", value: data.location.toString() };

  let time = moment(data.time).format("MMMM Do YYYY, h:mm:ss a");
  result["time"] = { icon: "clock", value: time };

  if (data.notes !== "") {
    result["notes"] = { icon: "note-text", value: data.notes };
  }
  if (data.isAlive === 1) {
    result["isAlive"] = { icon: "cards-heart", value: "Alive" };

    if (data.isSingle === 0) {
      result["isSingle"] = { icon: "comment-question", value: "Single" };

      if (data.haveTusks === 0) {
        result["tusksStatus"] = {
          icon: "comment-question",
          value: "Have tusks",
        };
      } else if (data.haveTusks === 1) {
        result["tusksStatus"] = { icon: "comment-question", value: "No tusks" };
      } else {
        result["tusksStatus"] = {
          icon: "comment-question",
          value: "Can't see tusks",
        };
      }
    } else if (data.isSingle === 1) {
      if (data.isSingle === 1) {
        result["isSingle"] = {
          icon: "comment-question",
          value: "Group with calves",
        };
      } else {
        result["isSingle"] = {
          icon: "comment-question",
          value: "Group without calves",
        };
      }

      if (data.noOfIndividuals === 0) {
        result["noOfIndividuals"] = {
          icon: "comment-question",
          value: "2 to 5 individuals",
        };
      } else if (data.noOfIndividuals === 1) {
        result["noOfIndividuals"] = {
          icon: "comment-question",
          value: "6 to 10 individuals",
        };
      } else {
        result["noOfIndividuals"] = {
          icon: "comment-question",
          value: "More than 10 individuals",
        };
      }

      if (data.howManyTuskers === 0) {
        result["howManyTuskers"] = {
          icon: "comment-question",
          value: "No any tuskers",
        };
      } else if (data.howManyTuskers === 1) {
        result["howManyTuskers"] = {
          icon: "comment-question",
          value: "1 to 5 individual tuskers",
        };
      } else if (data.howManyTuskers === 2) {
        result["howManyTuskers"] = {
          icon: "comment-question",
          value: "6 to 10 individual tuskers",
        };
      } else {
        result["howManyTuskers"] = {
          icon: "comment-question",
          value: "More than 10 individual tuskers",
        };
      }
    }

    if (data.sex === 0) {
      result["sex"] = {
        icon: "gender-male-female",
        value: "Male",
      };
    } else if (data.sex === 1) {
      result["sex"] = {
        icon: "gender-male-female",
        value: "Female",
      };
    } else if (data.sex === 2) {
      result["sex"] = {
        icon: "gender-male-female",
        value: "Both male and female",
      };
    } else {
      result["sex"] = {
        icon: "gender-male-female",
        value: "Don't know the gender",
      };
    }
  } else {
    if (data.cause === 0) {
      result["cause"] = {
        icon: "comment-question",
        value: "By Accident",
      };

      if (data.accidentKind === 0) {
        result["accidentKind"] = {
          icon: "comment-question",
          value: "A Vehicle strike",
        };
      } else if (data.accidentKind === 1) {
        result["accidentKind"] = {
          icon: "comment-question",
          value: "A Train strike",
        };
      } else if (data.accidentKind === 2) {
        result["accidentKind"] = {
          icon: "comment-question",
          value: "Has Fell into well",
        };
      } else if (data.accidentKind === 3) {
        result["accidentKind"] = {
          icon: "comment-question",
          value: "A Electrocution",
        };
      } else {
        result["accidentKind"] = {
          icon: "comment-question",
          value: data.accidentOther,
        };
      }
    } else if (data.cause === 1) {
      result["cause"] = {
        icon: "comment-question",
        value: "Intentional Death",
      };

      if (data.intentionalKind === 0) {
        result["intentionalKind"] = {
          icon: "comment-question",
          value: "Conflict related",
        };
      } else if (data.intentionalKind === 1) {
        result["intentionalKind"] = {
          icon: "comment-question",
          value: "Hunting related",
        };
      } else if (data.intentionalKind === 2) {
        result["intentionalKind"] = {
          icon: "comment-question",
          value: data.intentionalOther,
        };
      } else {
        result["intentionalKind"] = {
          icon: "comment-question",
          value: "Don't know how it died",
        };
      }
    } else {
      result["cause"] = {
        icon: "comment-question",
        value: "Don't know how the death happened",
      };
    }
    result["noOfDeaths"] = {
      icon: "comment-question",
      value: data.noOfDeaths + " died.",
    };

    result["noOfTusks"] = {
      icon: "comment-question",
      value: data.noOfTusks + " tuskers.",
    };

    if (data.tusksStatus === 0) {
      result["tusksStatus"] = {
        icon: "comment-question",
        value: "Tusks naturally absent",
      };
    } else if (data.tusksStatus === 1) {
      result["tusksStatus"] = {
        icon: "comment-question",
        value: "Tusks present",
      };
    } else if (data.tusksStatus === 2) {
      result["tusksStatus"] = {
        icon: "comment-question",
        value: "Tusks removed",
      };
    } else {
      result["tusksStatus"] = {
        icon: "comment-question",
        value: "Don’t know what happened to tusks.",
      };
    }
  }

  //console.log(result)
  return result;
}
