import React from 'react'
import Link from "next/link"
import styles from "./index.module.scss"

const ListPicturesGallery = (props) => {

    let pictures = props.pictures || []
    let skip = props.skip || "" // пропуск картинки

    return (
        <React.Fragment>
            <div className={`items ${styles.items}`}>
                {pictures && pictures.map((el, i) => {
                    let s = el.meta.podp_title || ""
                    let podp_title = s.charAt(0).toUpperCase() + s.slice(1) // first char to uppercase
                    let podp_value = el.meta.podp_value
                    //console.log("el.meta", el.meta)
                    if (skip !== el.meta.код) {
                        return (
                            <div key={i} className={`item ${styles.item}`}>
                                <div className={`item-img ${styles.img}`}>
                                    <a
                                        href={`/_data/w1200/${el._img}.jpg`}
                                        target="_blank"
                                        data-caption={el.meta.название}
                                        data-lightbox="lightbox1" data-title={el.meta.название}
                                    ><img src={`/_data/w240/${el._img}.jpg`} width="240" title={el.meta.название} alt={el.meta.название} /></a>
                                </div>
                                <div className={`item-txt ${styles.txt}`}>
                                    <Link href={`/author/${el.author.dir}/${el._img}`}><a>{el.meta.название}</a></Link>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </React.Fragment>
    )
}

export default ListPicturesGallery