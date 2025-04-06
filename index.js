import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

const localState = {
    count: 0,
    actions:[]
}

function reducer(state=localState,action){
    if(action.type == 'Increase'){
        return {count:state.count+action.payload, actions:[...state.actions,action]};
    }
    else if(action.type == 'Decrease'){
        return {count:state.count-action.payload, actions:[...state.actions,action]};
    }
    else if(action.type == 'Reset'){
        return {count:0, actions:[...state.actions,action]};
    }
    return state;

}

const store = createStore(reducer, applyMiddleware(thunk,logger.default));

store.subscribe(()=>{
    console.log(store.getState());
})

const Increase = (val)=>{return {type:'Increase',payload:val}}
const Decrease = (val)=>{return {type:'Decrease',payload:val}};

// const AsyncDecrease = async (val)=>{return {type:'Decrease',payload:val}}

function AsyncIncrease(val){
    return async (dispatch,getState)=>{return dispatch({type:'Increase',payload:val})}
}

function AsyncDecrease(val){
    return async (dispatch, getState)=>{return dispatch({type:'Decrease', payload:val})}
}

store.dispatch(Increase(100));
store.dispatch(Increase(500));
store.dispatch(Increase(1000));
store.dispatch(Decrease(500));

store.dispatch(AsyncIncrease(5000));
store.dispatch({type:''});