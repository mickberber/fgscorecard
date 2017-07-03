import { actions, actionCreators } from './actions';

const initialAppState = {
  players: [],
  game: null,
  finishedgames: [],
};

const fgScorecardApp = (state = initialAppState, action) => {
  switch (action.type) {
    case actions.NEWGAME:
      return Object.assign({}, state, {
        game: true,
      });
    case actions.RESUMEGAME:
      return Object.assign({}, state, {
        game: true,
      });
    case actions.FINISHGAME:
      return;
    case actions.VIEWSTATISTICS:
      return;
    default:
      return state;
  }
};

const initialPlayersState = {
  players: [],
};

const playersReducer = (state = initialPlayersState, action) => {
  switch (action.type) {
    case actions.ADDPLAYER:
      return;
    case actions.REMOVEPLAYER:
      return;
    case actions.ADDSCORE:
      return;
    case actions.REMOVESCORE:
      return;
    default:
      return state;
  }
};

const initialCourseState = {
  id: null,
  name: null,
  holes: [],
};

const courseReducer = (state = initialCourseState, action) => {
  switch (action.type) {
    case actions.ADDCOURSE:
      return;
    case actions.REMOVECOURSE:
      return;
    case actions.ADDHOLE:
      return;
    case actions.REMOVEHOLE:
      return;
    default:
      return state;
  }
};
