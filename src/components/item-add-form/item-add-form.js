import React from 'react'
import './item-add-form.css'

export default class ItemAddForm extends React.Component {

   render() {
      return (
         <div className="add-item">
            <button className="btn btn-outline-secondary"
               onClick={() => this.props.onItemAdded('New thing')} >+</button>
         </div>
      )
   }
}