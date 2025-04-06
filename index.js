import { createStore } from "redux";

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

const store = createStore(reducer);

store.subscribe(()=>{
    console.log(store.getState());
})

const Increase = (val)=>{return {type:'Increase',payload:val}}
const Decrease = (val)=>{return {type:'Decrease',payload:val}};

store.dispatch(Increase(100));
store.dispatch(Increase(500));
store.dispatch(Increase(1000));
store.dispatch(Decrease(500));
store.dispatch({type:''});