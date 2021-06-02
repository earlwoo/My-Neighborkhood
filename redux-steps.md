# Walkthrough & redux refactor
1. Delete the .git folder, initialize a new git repo, commit, and then push to an empty repo
    - if you have files in your repo already, just clone the repo and copy all of the files except the .git folder into your existing repo.
2. Go through steps in README




## Redux Refactor
1. install redux, redux-thunk, react-redux, redux-logger
2. set up your store
    - make store folder
    - in index.js, create your root reducer and set up redux middleware
    - export your configure store function
3. create your store
    - top level index.js file, create store and wrap the provider around your app
4. create a reducer for auth
5. create constants
6. create action-creators
7. create thunks (replace each of the functions in the "services" folder with a thunk version)
8. replace all my state based logic for auth with the use of my redux store
    - anytime i use a value from a useState, i will want to use useSelector 
    - anytime i use the function to change the state, i will want to use a dispatch

```javascript
// if i am refactoring some piece of state to use redux...
const [ myState, setMyState ] = useState(null);

// any time i see that i'm using the "myState" value, i want to use a selector instead to get the value from my redux store
const myState = useSelector( state => state.stateSlice.myState )

// any time i see that i'm using "setMyState" to change the value of myState
// I will need to dispatch a redux thunk or action creator instead
dispatch(updateMyState(newState));

// anytime i see that i am ONLY using the value to pass it as a prop
// i should just remove it from that component all together
```
