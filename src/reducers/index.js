import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import actions from "../actions";

export const initialState = {
  tokens:{
    access_token:null,
    refresh_token:null
  },
  player: null,
  error: null,
  gid:null,
  queue: {},
  link:null
};

const tokenReducer = (state=null, action)=>{
  switch(action.type){
    case actions.AUTH_SUCCEEDED:
      return {
        access_token:action.payload.access_token,
        refresh_token:action.payload.refresh_token
      };
    case actions.AUTH_FAILED:
      return null;
    default:
      return state;
  }
}

const gidReducer = (state = null, action) =>{
  switch(action.type){
    case actions.UPDATE_GID:
      return action.payload;
    case actions.DELETE_GID:
      return null;
    default:
      return null;
  }
}

const errorReducer = (state = false, action) => {
  //TODO. Update error state
  return state;
};

const queueReducer = (state = null, action) => {
  //TODO. Send message to Flask with the new queue
  switch(action.type){
    case actions.UPDATE_QUEUE:
    if(!([action.payload] in state)){
      state[action.payload] = 0;
    }
      state[action.payload] = state[action.payload] +1 
      
      let newq = state
      console.log(newq)
      return {...state}
    default:
      return state
    }
};

const linkReducer = (state = null, action)=>{
  switch(action.type){
    case actions.SLAVE_LINK:
    console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
}

const playerReducer = (state = null, action) => {
  //TODO
  switch (action.type) {
    case actions.PLAYER_FAILED:
      return state;
    case actions.PLAYER_STARTED:
      return state;
    case actions.PLAYER_SUCCEEDED:
      return action.payload||null;
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    // songInfo: songInfoReducer,
    player: playerReducer,
    link:linkReducer,
    gid: gidReducer,
    queue: queueReducer,
    token: tokenReducer
  });
