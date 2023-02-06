import React, {useReducer, useState} from 'react';
import './App.css';
import './styles.css'

const intialState = {};
const evaluate = (prev, cur, op) => {
    console.log ("Evaluate")
    prev = parseInt(prev)
    cur = parseInt (cur)
    switch (op) {
        case '+':
            return prev + cur;
        case '-':
            return prev - cur;
        case '*':
            return prev * cur;
        case '/':
            return prev / cur;
        default:
            alert('error') 
    }
}
const checkIsEmpty = (val) => {
    return val === null || val === undefined;
}
const reducer = (state, {action, payload}) => {
    switch (action) {
        case 'digit':
            if (state.cur === 0 && payload === 0){
                return {...state, cur:0};
            }
            if (state.cur === undefined || state.cur === null){
                return {...state, cur:payload};
            }
            if (state.cur === 0 && payload !== 0){
                return {...state, cur:payload};
            }

            return {...state, cur:`${state.cur}${payload}`};

        case 'op':
            if (checkIsEmpty(state.cur) === false && checkIsEmpty(state.prev) === false) {
                const val = evaluate (state.prev, state.cur, state.op);
                return {...state, prev:val, op:payload, cur:null}
            }
                return {...state, op:payload, prev:state.cur, cur:null}
        case 'evaluate':
            if (payload == '=') {
                const val = evaluate (state.prev, state.cur, state.op);
                console.log ("checking", val)
                return {...state, op:null, prev:null, cur:val}
            }
        case 'AC':
            return {...state, op:null, prev:null, cur:null}
        case 'DEL':
            if (state.cur !== null && state.cur !== undefined)
                return {...state, cur:state.cur.substring (0,state.cur.length - 1)}
        default:
            return {};
    }
}

function Calci() {
  const [{cur, prev, op}, dispatcher] = useReducer (reducer, intialState); 
  return (
    <>
    <div className='heading'>Calculator - React</div>
    <div className='grid'>
    <div className='prev-class output'>{prev}</div>
    <div className='operand output'>{op}</div>
    <div className='cur-class output'>{cur}</div>
    <button onClick={() => dispatcher({action:'AC', payload:null})} className="span-two">AC</button>
    <button onClick={() => dispatcher({action:'DEL', payload:null})} className="span-two">DEL</button>
    <button onClick={() => dispatcher({action:'digit', payload:1})}>1</button>
    <button onClick={() => dispatcher({action:'digit', payload:2})}>2</button>
    <button onClick={() => dispatcher({action:'digit', payload:3})}>3</button>
    <button onClick={() => dispatcher({action:'op', payload:'+'})}>+</button>
    <button onClick={() => dispatcher({action:'digit', payload:4})}>4</button>
    <button onClick={() => dispatcher({action:'digit', payload:5})}>5</button>
    <button onClick={() => dispatcher({action:'digit', payload:6})}>6</button>
    <button onClick={() => dispatcher({action:'op', payload:'-'})}>_</button>
    <button onClick={() => dispatcher({action:'digit', payload:7})}>7</button>
    <button onClick={() => dispatcher({action:'digit', payload:8})}>8</button>
    <button onClick={() => dispatcher({action:'digit', payload:9})}>9</button>
    <button onClick={() => dispatcher({action:'op', payload:'*'})}>*</button>
    <button onClick={() => dispatcher({action:'digit', payload:0})}>0</button>
    <button onClick={() => dispatcher({action:'op', payload:'/'})}>/</button>
    <button onClick={() => dispatcher({action:'evaluate', payload:'='})}>=</button>
    </div>
    </>
  )
}

export default Calci;