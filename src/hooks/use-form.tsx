import React, {useState} from 'react'

export type FormActions = {
    setInputFieldValue: (e: React.ChangeEvent <HTMLInputElement>) => void
}

export function useForm < T > (initialState: T): [T, FormActions] {
    const [state, setState] = useState(initialState)

    const actions: FormActions = {
        setInputFieldValue: (e) => {
            const {target: {name, value}} = e

            setState({
                ...state,
                [name]: value
            })
        },
    }
    return [state, actions]
}
