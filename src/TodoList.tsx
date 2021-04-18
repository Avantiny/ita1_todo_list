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

const ContainerWrapper = styled.div`
  padding-top: 4rem;
`
const MidContainer = styled.div`
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background: white;
  width: 70%;
  overflow-y: auto;
`
const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  overflow-y: auto;
  font-family: 'Trebuchet MS';
`

const SideContainer = styled.div`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  width: 15%;
  box-shadow: inset 0px 0px 15px 10px #c0536b;
  height: auto;
  overflow-y: auto;
`

type FilterStatus = 'all' | 'active' | 'completed'
type Todo = {
  id: string
  check: boolean
  todoText: string
}

type Props = {}
type State = {
  inputText: string
  list: Todo[]
  filterStatus: FilterStatus
  showTodos: boolean
}

const createID = () => Math.random().toString(36).substring(2, 7)

const getLocalStorageJSON = (key: string) => {
  const localState = localStorage.getItem(key)
  if (typeof localState !== 'string') return null
  if (!localState) return null
  try {
    return JSON.parse(localState)
  } catch (error) {
    console.error(error)
    return null
  }
}

class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const defaultState = {
      inputText: '',
      list: [
        { id: createID(), check: false, todoText: 'ukol1' },
        { id: createID(), check: true, todoText: 'ukol2' },
      ],
      filterStatus: 'all' as const,
      showTodos: true,
    }
    this.state = getLocalStorageJSON('state') ?? defaultState
  }

  onDeleteButton = (todo: Todo) => {
    this.mySetState(prevState => ({
      list: prevState.list.filter(todoToUpdate => todoToUpdate.id !== todo.id),
    }))
  }

  mySetState = (arg1: ((a: State) => any) | Partial<State>, arg2?: any) => {
    this.setState(arg1 as any, () => {
      localStorage.setItem('state', JSON.stringify(this.state))
      arg2?.()
    })
  }

  onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    const newText = e.target.value
    this.mySetState(prevState => ({
      list: prevState.list.map(todoToUpdate =>
        todoToUpdate.id === todo.id ? { ...todoToUpdate, todoText: newText } : todoToUpdate
      ),
    }))
  }

  onCompleted = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    const isActive = e.target.checked

    this.mySetState(prevState => ({
      list: prevState.list.map(stateTodo => {
        if (stateTodo.id === todo.id) {
          return {
            ...stateTodo,
            check: isActive,
          }
        }
        return stateTodo
      }),
    }))
  }

  render() {
    return (
      <RootContainer>
        <SideContainer />
        <MidContainer>
          <Grid container direction='column' justify='flex-start' alignItems='center'>
            <Typography color='secondary' variant='h1'>
              <div style={{ fontFamily: 'Brush Script MT' }}>TODO</div>
            </Typography>
            <ContainerWrapper>
              <Grid container direction='row' justify='center' alignItems='center' item xs={12}>
                <TextField
                  color='secondary'
                  label='New TODO'
                  background-color='white'
                  id='outlined-size-small'
                  defaultValue='Small'
                  variant='outlined'
                  size='small'
                  value={this.state.inputText}
                  onChange={e => {
                    this.mySetState({ inputText: e.target.value })
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
                    this.mySetState(prevState => ({
                      list: [
                        { id: createID(), todoText: prevState.inputText, check: false },
                        ...prevState.list,
                      ],
                      inputText: '',
                    }))
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
                onChangeFilterStatus={newFilterStatus =>
                  this.mySetState({ filterStatus: newFilterStatus })
                }
              />
              <Grid container direction='row' justify='center' alignItems='center' item xs={12}>
                <Button
                  variant={!this.state.showTodos ? 'contained' : 'outlined'}
                  color='default'
                  size='small'
                  onClick={() => {
                    this.mySetState(prevState => ({ showTodos: !prevState.showTodos }))
                  }}
                >
                  Toggle Todos
                </Button>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => this.mySetState({ list: [] })}
                >
                  clear all
                </Button>
              </Grid>
            </ContainerWrapper>
            <h4>items: {this.state.list.length}</h4>
          </Grid>
        </MidContainer>
        <SideContainer />
      </RootContainer>
    )
  }
}

export default TodoList
