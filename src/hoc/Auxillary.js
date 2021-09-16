//This is a higher order component and, we can use this higher order component (HOC)
//to render adjacent html elements which is by default not provided by react.
//we can't name it aux in windows

const auxiliary = (props) => props.children;

export default auxiliary;