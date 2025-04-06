import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const localState = {
    count: 0,
    actions:[],
    dataReq: {status:false,data:null,error:''}
}

function reducer(state=localState,action){
    if(action.type == 'Increase'){
        return {count:state.count+action.payload, actions:[...state.actions,action]};
    }
    else if(action.type == 'Decrease'){
        return {count:state.count-action.payload, actions:[...state.actions,action]};
    }
    else if(action.type == 'Request_Started'){
        return {dataReq:{...state.dataReq,status:true}, actions:[...state.actions,action]};
    }
    else if(action.type == 'Data_Received'){
        return {dataReq:{...state.dataReq, status:false, data:action.payload},actions:[...state.actions,action]};
    }
    else if(action.type == 'Data_Error'){
        return {dataReq:{...state.dataReq, status:false, error:action.payload},actions:[...state.actions,action]};
    }
    return state;

}

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(()=>{
    console.log(store.getState().dataReq);
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

function AsyncApiCall(val){
    return async (dispatch,getState)=>{
        dispatch({type:'Request_Started'})
        try{
            const fetchurl = `https://localhost:7009/api/Students/${val}`;
            const response = await fetch(fetchurl, { method: 'GET' });

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            dispatch({type:'Data_Received',payload:data})
        }
        catch(ex){
            dispatch({type:'Data_Error',payload:ex})
        }
    }
}

store.dispatch(Increase(100));
store.dispatch(Increase(500));
store.dispatch(Increase(1000));
store.dispatch(Decrease(500));

store.dispatch(AsyncIncrease(5000));
store.dispatch({type:''});

store.dispatch(AsyncApiCall(1));