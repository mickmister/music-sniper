import React from 'react'

import styles from '../styles/page.module.scss'

import Dashboard from '../components/dashboard/dashboard'

export default function DashboardPage() {
    return (
        <div className={styles.container}>
            <Dashboard/>
        </div>
    )
}
