import React, { Component, PropTypes} from 'react'
import ReactDOM , { render } from 'react-dom'


export default class Index extends Component {


    componentDidMount() {

    }

    componentWillUnmount() {
 
    }
    
   
    render() {
        let { name }= this.props.demo
        return (
           <h1>{name}</h1>
        )
    }
}

