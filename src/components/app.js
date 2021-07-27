import React from 'react'

import AppHeader from '../components/app-header/app-header'
import SearchPanel from '../components/search-panel/search-panel'
import TodoList from '../components/todo-list/todo-list'
import ItemStatusFilter from '../components/item-status-filter/item-status-filter'
import './app.css'
import ItemAddForm from './item-add-form/item-add-form'

export default class App extends React.Component {

	maxId = 100

	state = {
		todoData: [
			this.createTodoItem('Drink tea'),
			this.createTodoItem('Make awesome App'),
			this.createTodoItem('Have a lunch'),
			this.createTodoItem('Get a job')
		]
	}

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			// todoData.splice(idx, 1) - нельзя менять стейт

			// const before = todoData.slice(0, idx)
			// const after = todoData.slice(idx+1) // если второй эл не пишем - значит до конца массива
			const idx = todoData.findIndex((el) => el.id === id)
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

			return {
				todoData: newArray
			}
		})
	}

	addItem = (text) => {
		const newItem = this.createTodoItem(text)

		this.setState(({ todoData }) => {
			const newArray = [...todoData, newItem]
			return {
				todoData: newArray
			}
		})
	}

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id)
		const oldItem = arr[idx]
		const newItem = { ...oldItem, [propName]: !oldItem[propName] }
		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
	}

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		})
	}

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		})
	}

	render() {
		const { todoData } = this.state

		const doneCount = todoData.filter((el) => el.done).length
		const todoCount = todoData.length - doneCount

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>

				<TodoList todos={todoData} onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone} />
				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		)
	}
}
