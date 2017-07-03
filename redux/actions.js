//ACTIONS
export const NEWGAME = 'NEWGAME';
export const RESUMEGAME = 'RESUMEGAME';
export const FINISHGAME = 'FINISHGAME';

export const ADDCOURSE = 'ADDCOURSE';
export const REMOVECOURSE = 'REMOVECOURSE';

export const ADDHOLE = 'ADDHOLE';
export const REMOVEHOLE = 'REMOVEHOLE';

export const ADDPLAYER = 'ADDPLAYER';
export const REMOVEPLAYER = 'REMOVEPLAYER';

export const ADDSCORE = 'ADDSCORE';
export const REMOVESCORE = 'REMOVESCORE';

export const VIEWSTATISTICS = 'VIEWSTATISTICS';

export const actions = {
  NEWGAME,
  RESUMEGAME,
  FINISHGAME,
  ADDCOURSE,
  REMOVECOURSE,
  ADDHOLE,
  REMOVEHOLE,
  ADDPLAYER,
  REMOVEPLAYER,
  ADDSCORE,
  REMOVESCORE,
  VIEWSTATISTICS,
};

export const createNewGame = () => {
  return {
    type: NEWGAME,
  };
}

export const resumeGame = gameid => {
  return {
    type: RESUMEGAME,
    gameid
  };
}

export const finishGame = gameid => {
  return {
    type: FINISHGAME,
    gameid
  };
}

export const addCourse = () => {
  return {
    type: ADDCOURSE,
  }
}

export const removeCourse = courseid => {
  return {
    type: REMOVECOURSE,
    courseid
  }
}

export const addHole = (courseid, holenumber) => {
  return {
    type: ADDHOLE,
    courseid,
    holenumber,
  };
}

export const removeHole = (courseid, holenumber) => {
  return {
    type: REMOVEHOLE,
    courseid,
    holenumber
  }
}

export const addPlayer = player => {
  return {
    type: ADDPLAYER,
    player,
  };
}

export const removePlayer = playerid => {
  return {
    type: REMOVEPLAYER,
    playerid,
  };
}

export const addScore = (player, hole, score) => {
  return {
    type: ADDSCORE,
    player,
    hole,
    score,
  };
}

export const removeScore = scoreid => {
  return {
    type: REMOVESCORE,
    scoreid
  }
}

export const viewStatistics = () => {
  return {
    type: VIEWSTATISTICS,
  };
}


export const actionCreators = {
  createNewGame,
  resumeGame,
  finishGame,
  addCourse,
  removeCourse,
  addPlayer,
  removePlayer,
  addHole,
  removeHole,
  addScore,
  removeScore,
  viewStatistics,
};
