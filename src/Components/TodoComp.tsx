import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import React from 'react'
import TextField from '@material-ui/core/TextField'

type Props = {
  isCompleted: boolean
  todoText: string
  onCompleted: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTodoText: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDeleteButton: () => void
}

const TodoComp = (props: Props) => (
  <ListItem>
    <Checkbox checked={props.isCompleted} onChange={props.onCompleted} />
    <TextField
      color='secondary'
      value={props.todoText}
      type='text'
      onChange={props.onChangeTodoText}
    />
    <Button onClick={props.onDeleteButton}>x</Button>
  </ListItem>
)

export default TodoComp
