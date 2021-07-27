import React from 'react'
import './item-add-form.css'

export default class ItemAddForm extends React.Component {

   state = {
      label: ''
   }

   onLabelChange = (event) => {
      this.setState({
         label: event.target.value
      })
   }

   onSubmit = (e) => {
      e.preventDefault()
      this.props.onItemAdded(this.state.label)
      this.setState({
         label: ''
      })
   }

   render() {
      return (
         <form className="add-item d-flex" 
               onSubmit={this.onSubmit}>
            <input type="text" className="form-control" 
                   onChange={this.onLabelChange}
                   placeholder="Что важно сделать?"
                   value={this.state.label}/>
            <button className="btn btn-outline-secondary">+</button>
         </form>
      )
   }
}
