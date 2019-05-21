import React, { useState } from 'react'
import {useStore, State} from 'easy-peasy'
import {IGlobalStore} from '../../store/store-types'
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'

type Props = {
  apiName: keyof State<IGlobalStore>,
  getName?: (item: any) => string,
  label: string,
}

type Collection = {
  items: any[],
}

export default function BackendSelect(props: Props) {

  const [selected, setSelected] = useState('')

  const items: any[] = useStore((state: State<IGlobalStore>) => {
    const slice = state[props.apiName] as Collection
    return slice.items
  })

  const getName = props.getName || ((item) => item.name)

  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={selected}
        onChange={({target: {value}}) => setSelected(value)}
        // inputProps={{
        //   name: 'age',
        //   id: 'age-simple',
        // }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items.map(item => (
          <MenuItem value={item.id} key={item.id}>
            {getName(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
