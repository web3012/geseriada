import React from 'react'
import Layout from "../../app/layout/layout"
import { getTechniques, getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

const PageCatalog = (props) => {
    const router = useRouter()

    let years = props.picYears || []
    let technics = props.picTechnics || []



    return (
        <Layout title="Каталог" keywords="" description="" breadcrumbs={[{ title: "Каталог" }]}>

            <div className="wr">
                <div className="content">
                    <div className="txt">

                        <div className="page-catalog">



                            <div className="authors">

                                {props.authors && props.authors.map((el, i) => {
                                    let dir = el.dir || ""
                                    let foto450 = el.foto450 || ""
                                    let fio = el.meta.фио || ""
                                    fio = fio.split(" ")
                                    fio = fio[0] + ' ' + fio[1] + '<br/>' + fio[2]
                                    let year = el.meta.год || ""
                                    let titul = el.meta.титул || ""
                                    let count = el.pictures.length

                                    return (
                                        <div key={i} className={`a a${i + 1}`} onTouchStart={() => { }} onClick={() => {
                                            router.push({
                                                pathname: `/author/${dir}`
                                            }).then(() => window.scrollTo(0, 0))
                                        }}>
                                            <div className="flipper">
                                                <div className="front">
                                                    <img src={foto450} />
                                                    <div className="desc">
                                                        <div dangerouslySetInnerHTML={{ __html: fio }} />
                                                    </div>
                                                </div>
                                                <div className="back">
                                                    <div className="fio" dangerouslySetInnerHTML={{ __html: fio }} />
                                                    <div>{year}</div>
                                                    <div>{titul}</div>
                                                    <div>
                                                        <span>Количество работ: {count}</span>
                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    )
                                })}
                            </div>


                            <div className="items">
                                <div className="item"><h4>ПО ГОДАМ</h4></div>
                                <div className="item item-years">
                                    <div className="_wr">
                                        {years.map((el, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <Link href={`/years/${el}`}><a>{el}</a></Link>&nbsp;
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="items">
                                <div className="item"><h4>ПО ТЕХНИКЕ</h4></div>
                                {technics.map((el, i) => {
                                    return (
                                        <div className="item" key={i}><Link href={`/technique/${i}`}><a>{el}</a></Link></div>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    )
}


// <div className="items">
// <div className="item"><h4>ПО АВТОРАМ</h4></div>
// {props.authors && props.authors.map((el, i) => {
//     return (
//         <div key={i} className={`item item${i + 1}`}>
//             <Link href={`/author/${el.dir}`}><a>{el.meta.фио}</a></Link>
//         </div>
//     )
// })}
// </div>

export async function getStaticProps() {

    const authors = await getAllAuthors()

    let pictures = [] //все фото списком
    let list = []   //все авторы списком

    for (let el of authors) {
        let dir = el.dir
        let author = await getAuthor(dir)
        let _pictures = []

        for (let pic of author.pictures) {
            pictures.push(pic)
            _pictures.push(pic)
        }
        author.pictures = _pictures
        list.push(author)
    }


    // ============================================
    let picTechnics = await getTechniques()

    // ============================================
    let picYears = new Set()   //все возможные года
    for (let el of pictures) {
        let year = parseInt(el.meta.год)
        picYears.add(year)
    }
    picYears = [...picYears]
    picYears.sort()

    // ============================================
    let picAuthors = []   //все возможные авторы
    for (let el of authors) {
        picAuthors.push({
            dir: el.dir,
            fio: el.meta.фио
        })
    }

    // ============================================
    return {
        props: {
            authors: list,
            pictures,
            picAuthors,
            picTechnics,
            picYears
        }
    }
}

export default PageCatalog