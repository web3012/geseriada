import React from 'react'

import Left from '../../../public/img/chevron-left-solid.svg'
import Right from '../../../public/img/chevron-right-solid.svg'
import Dot0 from '../../../public/img/circle-regular.svg'
import Dot1 from '../../../public/img/circle-solid.svg'

import styles from './index.module.scss'

const FrontpageSlider = (props) => {

    let [p, setP] = React.useState(0)

    const right = () => {
        if (p < 2) setP(p + 1)
        if (p === 2) setP(0)
    }
    const left = () => {
        if (p > 0) setP(p - 1)
        if (p === 0) setP(2)
    }
    return (
        <div className={styles.wr}>
            
            <a className={styles.toLeft} onClick={left}><Left /></a>
            <a className={styles.toRight} onClick={right}><Right /></a>

            {p === 0 &&
                <div className={styles.txt}>
                    <p>Злое чудовище хочет уничтожить на земле все живое:</p>
                    <p>
                        Пусть умрет человеческий плод<br />
                        Станет мальчиком? Пусть умрет<br />
                        Станет девочкой? Пусть умрет<br />
                        Пусть людской прекратиться род
                    </p>
                    <p>
                        Чтобы спасти человеческий род от поголовной гибели, на борьбу с чудовищем отправляется Гэсэр.<br />
                        Кто же этот богатырь?<br />
                        Это, оказывается небожитель, Бухэ- Бэлигтэ, и, когда он с неба спускается на землю, чтобы совершить подвиг добра, он превращается в человека.<br />
                        Он заново рождается на земле в нищей пастушеской хижине, ибо только «человеческое дитя», рожденное в семье бедняков, может, по мысли слагателей эпоса, понять горе и чаянья народа.<br />
                        В этом эпизоде – истинная поэзия и истинная народность, потому что основа поэзии, как и народности, - человечность.
                    </p>
                    <p className={styles.author}>
                        А.И. Уланов, доктор филологических наук
                    </p>
                </div>
            }
            {p === 1 &&
                <div className={styles.txt}>
                    <p>Page {p+1}</p>
                </div>
            }
            {p === 2 &&
                <div className={styles.txt}>
                    <p>Page {p+1}</p>
                </div>
            }

            <ul className={styles.dots}>
            <li><a onClick={()=>{setP(0)}}>{p === 0 ? <Dot1/> : <Dot0/>}</a></li>
            <li><a onClick={()=>{setP(1)}}>{p === 1 ? <Dot1/> : <Dot0/>}</a></li>
            <li><a onClick={()=>{setP(2)}}>{p === 2 ? <Dot1/> : <Dot0/>}</a></li>
            </ul>

        </div>


    )
}
export default FrontpageSlider
