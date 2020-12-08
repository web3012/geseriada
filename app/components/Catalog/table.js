import React from 'react'
import styles from './table.module.scss'

const CatalogTable = (props) => {

    return (
        <div className={styles.wr}>
            <div className={styles.grid}>

                <section className={styles.section} id="authors">
                    <h4>ПО АВТОРАМ</h4>
                </section>
                <section className={styles.section} id="dates">
                    <h4>ПО ДАТАМ</h4>
                </section>
                <section className={styles.section} id="techno">
                    <h4>ПО ТЕХНИКЕ</h4>
                </section>

            </div>
        </div>
    )
}

export default CatalogTable
