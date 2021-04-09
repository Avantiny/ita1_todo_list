import Button from '@material-ui/core/Button'
import React from 'react'

type Props = {
  filterStatus: string
  onChangeFilterStatus: (newFilterStatus: string) => void
}

const ActiveFilterButtons = ({ filterStatus, onChangeFilterStatus }: Props) => {
  return (
    <div>
      <Button
        variant={filterStatus === 'all' ? 'contained' : 'outlined'}
        color='secondary'
        onClick={() => onChangeFilterStatus('all')}
      >
        All
      </Button>
      <Button
        variant={filterStatus === 'active' ? 'contained' : 'outlined'}
        color='secondary'
        onClick={() => onChangeFilterStatus('active')}
      >
        Active
      </Button>
      <Button
        variant={filterStatus === 'completed' ? 'contained' : 'outlined'}
        color='secondary'
        onClick={() => onChangeFilterStatus('completed')}
      >
        Completed
      </Button>
    </div>
  )
}

export default ActiveFilterButtons
