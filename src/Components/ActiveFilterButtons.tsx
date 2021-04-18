import Button from '@material-ui/core/Button'
import React from 'react'

type FilterStatus = 'all' | 'active' | 'completed'
type Props = {
  filterStatus: FilterStatus
  onChangeFilterStatus: (newFilterStatus: FilterStatus) => void
}

const ActiveFilterButtons = (props: Props) => {
  return (
    <div>
      <Button
        variant={props.filterStatus === 'all' ? 'contained' : 'outlined'}
        color='secondary'
        onClick={() => props.onChangeFilterStatus('all')}
      >
        All
      </Button>
      <Button
        variant={props.filterStatus === 'active' ? 'contained' : 'outlined'}
        color='secondary'
        onClick={() => props.onChangeFilterStatus('active')}
      >
        Active
      </Button>
      <Button
        variant={props.filterStatus === 'completed' ? 'contained' : 'outlined'}
        color='secondary'
        onClick={() => props.onChangeFilterStatus('completed')}
      >
        Completed
      </Button>
    </div>
  )
}

export default ActiveFilterButtons
