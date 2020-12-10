import React from 'react'
import styles from './index.module.scss'
import Link from "next/link"

const Breadcrumbs = (props) => {

    let path = props.path || []

    //console.log("path", path)
    return (
        <React.Fragment>
        {path.length > 0 && <div className={`breadcrumbs ${styles.wr}`}>
            <ul>
                <li><Link href="/"><a>Главная</a></Link></li>
                {path.map((el,i)=>{
                    return (
                        <React.Fragment key={i}>
                            {el.url && <li><Link href={el.url}><a>{el.title}</a></Link></li>}
                            {!el.url && <li><span>{el.title}</span></li>}
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>}
        </React.Fragment>
    )
}

export default Breadcrumbs
