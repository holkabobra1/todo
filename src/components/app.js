import React from 'react'

import AppHeader from '../components/app-header/app-header'
import SearchPanel from '../components/search-panel/search-panel'
import TodoList from '../components/todo-list/todo-list'
import ItemStatusFilter from '../components/item-status-filter/item-status-filter'
import './app.css'
import ItemAddForm from './item-add-form/item-add-form'

export default class App extends React.Component{
	
	maxId = 100

	state = {
		todoData: [
			{ label: 'Drink Tea', important: false, id: 1 },
			{ label: 'Make Cool App', important: true, id: 2 },
			{ label: 'Have a lunch', important: false, id: 3 },
			{ label: 'Get a job, mzfkr', important: true, id: 4 },
			
		]
	} 

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id) 
			// todoData.splice(idx, 1)

			// const before = todoData.slice(0, idx)
			// const after = todoData.slice(idx+1) // если второй эл не пишем - значит до конца массива
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)]

			return {
				todoData: newArray
			}
		}) 
	}

	addItem = (text) => {
		const newItem = {
			label: text, 
			important: false,
			id: this.maxId++
		}

		this.setState(({ todoData }) => {
			const newArray = [...todoData, newItem]
			return {
				todoData: newArray
			}
		})
	}


	render() {
		return (
			<div className="todo-app">
				<AppHeader toDo={1} done={3} />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>
	
				<TodoList
					todos={this.state.todoData} 
					onDeleted={this.deleteItem} />
					<ItemAddForm onItemAdded={this.addItem}/>
			</div>
		)
	}
}
