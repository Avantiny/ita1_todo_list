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

const TodoComp = ({
  isCompleted,
  todoText,
  onCompleted,
  onChangeTodoText,
  onDeleteButton,
}: Props) => (
  <ListItem>
    <Checkbox checked={isCompleted} onChange={onCompleted} />
    <TextField color='secondary' value={todoText} type='text' onChange={onChangeTodoText} />
    <Button onClick={onDeleteButton}>x</Button>
  </ListItem>
)

export default TodoComp
