import ActiveFilterButtons from './Components/ActiveFilterButtons'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Todo from './Components/TodoComp'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import uniqid from 'uniqid'

const ContainerWrapper = styled.div`
  padding-top: 2rem;
`

type Todo = {
  id: string
  check: boolean
  todoText: string
}

type Props = {}
type State = {
  inputText: string
  list: Todo[]
  filterStatus: string
  showTodos: boolean
}
class TodoList extends React.Component<Props, State> {
  state: State = {
    inputText: '',
    list: [
      { id: uniqid(), check: false, todoText: 'ukol1' },
      { id: uniqid(), check: true, todoText: 'ukol2' },
    ],
    filterStatus: 'all',
    showTodos: true,
  }

  onDeleteButton = (todo: Todo) => {
    this.setState({
      list: this.state.list.filter(todoToUpdate => todoToUpdate.id !== todo.id),
    })
  }

  onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    const newText = e.target.value
    this.setState({
      list: this.state.list.map(todoToUpdate =>
        todoToUpdate.id === todo.id ? { ...todoToUpdate, todoText: newText } : todoToUpdate
      ),
    })
  }

  onCompleted = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    const isActive = e.target.checked
    const updatedTodos = this.state.list.map(stateTodo => {
      if (stateTodo.id === todo.id) {
        return {
          ...stateTodo,
          check: isActive,
        }
      }
      return stateTodo
    })
    this.setState({
      list: updatedTodos,
    })
  }

  render() {
    return (
      <Grid container direction='column' justify='flex-start' alignItems='center'>
        <Typography variant='h2' gutterBottom>
          Todo app
        </Typography>
        <ContainerWrapper>
          <Grid container direction='row' justify='center' alignItems='center' item xs={12}>
            <TextField
              color='secondary'
              label='New TODO'
              id='outlined-size-small'
              defaultValue='Small'
              variant='outlined'
              size='small'
              value={this.state.inputText}
              onChange={e => {
                this.setState({ inputText: e.target.value })
              }}
            ></TextField>
            <Button
              variant='outlined'
              color='default'
              onClick={() => {
                const newText = this.state.inputText
                if (newText === '') {
                  alert('You have to fill input')
                  return
                }
                this.setState({
                  list: [
                    { id: uniqid(), todoText: this.state.inputText, check: false },
                    ...this.state.list,
                  ],
                  inputText: '',
                })
              }}
            >
              add
            </Button>
          </Grid>
        </ContainerWrapper>
        <ContainerWrapper>
          <Card>
            <List style={{ display: this.state.showTodos ? 'block' : 'none' }}>
              {this.state.list
                .filter(todo => {
                  if (this.state.filterStatus === 'all') {
                    return true
                  } else if (this.state.filterStatus === 'active') {
                    return todo.check ? false : true
                  } else if (this.state.filterStatus === 'completed') {
                    return todo.check ? true : false
                  } else {
                    return false
                  }
                })
                .map(todo => (
                  <Todo
                    key={todo.id}
                    isCompleted={todo.check}
                    onCompleted={e => this.onCompleted(e, todo)}
                    todoText={todo.todoText}
                    onChangeTodoText={e => this.onChangeTodoText(e, todo)}
                    onDeleteButton={() => this.onDeleteButton(todo)}
                  />
                ))}
            </List>
          </Card>
        </ContainerWrapper>
        <ContainerWrapper>
          <ActiveFilterButtons
            filterStatus={this.state.filterStatus}
            onChangeFilterStatus={(newFilterStatus: string) =>
              this.setState({ filterStatus: newFilterStatus })
            }
          />
          <Grid container direction='row' justify='center' alignItems='center' item xs={12}>
            <Button
              variant={!this.state.showTodos ? 'contained' : 'outlined'}
              color='default'
              size='small'
              onClick={() => {
                this.setState({ showTodos: !this.state.showTodos })
              }}
            >
              Toggle Todos
            </Button>
            <Button size='small' variant='outlined' onClick={() => this.setState({ list: [] })}>
              clear all
            </Button>
          </Grid>
        </ContainerWrapper>
        <h4>items: {this.state.list.length}</h4>
      </Grid>
    )
  }
}

export default TodoList
