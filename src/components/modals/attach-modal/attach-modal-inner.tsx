import React from 'react'
import ReactSelect from 'react-select'

import {AttachProps} from '../../../types/props'

type Props = AttachProps

const sortItems = (a, b) => {
    const aName = a.name || a.file_name
    const bName = b.name || b.file_name

    if (aName < bName) {
        return -1
    }
    if (aName > bName) {
        return 1
    }
    return 0
}

export default function AttachModalInner(props: Props) {
    const [selectedItem, setSelectedItem] = React.useState([])

    const onSubmit = async () => {
        if (!selectedItem) {
            return
        }
        const item = props.items.find((i) => i.id === selectedItem)
        props.onSubmit(item)
    }

    const setItem = (items) => {
        setSelectedItem(items.map((i) => i.value))
    }

    const options = [...props.items].sort(sortItems).map((item) => ({
        label: item.name || item.file_name,
        value: item.id,
    }))

    const selectedOption = options.find(({value}) => value === selectedItem)

    return (
        <div>
            <h3>{props.title}</h3>
            <ReactSelect
                isMulti={true}
                options={options}
                value={selectedOption}
                onChange={setItem}
            />
            <button disabled={!selectedItem} onClick={onSubmit}>{'Attach'}</button>
        </div>
    )
}
