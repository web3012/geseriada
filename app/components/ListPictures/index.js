import React from 'react'
import Link from "next/link"
import styles from "./index.module.scss"

const ListPictures = ({ pictures }) => {
    return (
        <React.Fragment>
            <div className={`items ${styles.items}`}>
                {pictures && pictures.map((el, i) => {
                    return (
                        <div key={i} className={`item ${styles.item}`}>
                            <div className={`item-img ${styles.img}`}>
                                <a
                                    href={`/_data/w1200/${el._img}.jpg`}
                                    target="_blank"
                                    data-caption={el.meta.название}
                                    data-lightbox="lightbox1" data-title={el.meta.название}
                                ><img src={`/_data/w240/${el._img}.png`} width="240" title={el.meta.название} alt={el.meta.название} /></a>
                            </div>
                            <div className={`item-txt ${styles.txt}`}>
                                <p>Автор: <Link href={`/author/${el.author.dir}`}><a>{el.author.fio}</a></Link></p>
                                <p>Название: <Link href={`/author/${el.author.dir}/${el._img}`}><a>{el.meta.название}</a></Link></p>
                                <p>Год: {el.meta.год}</p>
                                <p>Техника: {el.meta.техника}</p>
                                <p>Размер: {el.meta.размер}</p>
                                <p>Подписи на изображении: {el.meta['подписи на изображении']}</p>
                                <p>Поступление: {el.meta.поступление}</p>
                                <p>Инв. N: Г-{el.meta.код}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default ListPictures