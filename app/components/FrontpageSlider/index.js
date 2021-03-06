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
                    <div className={styles.centered}>
                        <p>
                            Пусть умрет человеческий плод<br />
                            Станет мальчиком? Пусть умрет<br />
                            Станет девочкой? Пусть умрет<br />
                            Пусть людской прекратиться род
                        </p>
                    </div>
                    <p>
                        Чтобы спасти человеческий род от поголовной гибели, на борьбу с чудовищем отправляется Гэсэр. 
                        Кто же этот богатырь? Это, оказывается небожитель, Бухэ- Бэлигтэ, и, когда он с неба спускается на землю, чтобы совершить подвиг добра, он превращается в человека. 
                        Он заново рождается на земле в нищей пастушеской хижине, ибо только «человеческое дитя», рожденное в семье бедняков, может, по мысли слагателей эпоса, понять горе и чаянья народа.
                        В этом эпизоде – истинная поэзия и истинная народность, потому что основа поэзии, как и народности, - человечность.
                    </p>
                    <p className={styles.author}>
                        А.И. Уланов, доктор филологических наук
                    </p>
                </div>
            }
            {p === 1 &&
                <div className={styles.txt}>
                    <p>«Гэсэр», крупнейшее произведение бурятского героического эпоса, справедливо считается главным достоянием эпического наследия бурят, а также и других народов Центральной Азии. Обширна и многоязыка география бытования «Гэсэра»: Бурятия, Монголия, Джунгария, Калмыкия, Тибет. Но среди всех разнонациональных вариантов (версий) этого общего эпического памятника народов Центральной Азии бурятский «Гэсэр», занимает особое место, так как в отличие, например монгольских и тибетских версий в наибольшей полноте сохранил своеобразие первозданного духа и взгляда «младенческого периода» эпоса.</p>
                    <p>В силу этого архаичный бурятский эпос дошел до нашего времени в почти нетронутом виде, сохранив исконную форму благодатного времени бытования богатырских сказаний.</p>
                    <p className={styles.author}>
                        В.Ц. Найдаков, доктор филологических наук<br/>
                        С.Ш. Чагдуров, доктор филологических наук
                    </p>
                    
                </div>
            }
            {p === 2 &&
                <div className={styles.txt}>
                    <p>…бурятский эпос «Гэсэр» представляет собой глубоко оригинальное, самодовлеющее эпическое творение, определяющее духовной облик народа, его создавшего. Сама история Гэсэриады подтверждает, насколько органично и всесторонне она связана с сердцевиной народного духа и творческим гением многих и многих поколений. Прошлое и настоящее, особенно двадцать первый век с его признаками тотальной глобализации, убеждают нас в том, что бурятский эпос «Гэсэр» как эпический памятник и этнокультурный феномен, заключающий в себе целый мир традиционных, во многом сакральных, непреходящих ценностей, имеет субстанциональное значение для идентификации национальных основ духовного наследия бурятского народа. Неудивительно, что и сегодня «Гэсэр» находится в центре внимания наших ученых, писателей, художников.</p>
                    <p className={styles.author}>
                        Б.С. Дугаров, доктор филологических наук
                    </p>
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
