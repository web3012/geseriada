import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'
import Link from "next/link"

const PageAuthor = (props) => {

    const router = useRouter()
    let author = props.author || {}

    return (
        <Layout breadcrumbs={[{ url: "/catalog", title: "Каталог" }, { title: author.fio }]}>
            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <div className="page-author">

                            <div className="title"><h1>{author.fio}</h1></div>

                            <div className="foto">
                                <div className="pic">
                                    <img src={author.foto450} />
                                </div>
                            </div>

                            <div className="bio">
                                <div className="meta">
                                    <p>{author.meta.год}</p>
                                    <p>{author.meta.титул}</p>
                                </div>

                                <div dangerouslySetInnerHTML={{ __html: author.content }} />
                            </div>

                            <div className="pics">
                                <div className="items">
                                    {author.pictures && author.pictures.map((el, i) => {
                                        return (
                                            <div key={i} className="item">
                                                <div className="item-img">
                                                    <img src={`/_data/w240/${el._img}.png`} width="240" title={el.meta.название} />
                                                </div>
                                                <div className="item-txt">
                                                    <p>Название: <Link href={`/author/${el.author.dir}/${el._img}`}><a>{el.meta.название}</a></Link></p>
                                                    <p>Год: {el.meta.год}</p>
                                                    <p>Инв. N: Г-{el.meta.код}</p>
                                                    <p>Подписи на изображении: {el.meta['подписи на изображении']}</p>
                                                    <p>Поступление: {el.meta.поступление}</p>
                                                    <p>Размер: {el.meta.размер}</p>
                                                    <p>Техника: {el.meta.техника}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps(context) {

    let slug = context.params.slug
    let author = await getAuthor(slug)

    return {
        props: {
            author
        }
    }
}

export async function getStaticPaths() {
    let paths = []

    const authors = await getAllAuthors()
    for (let el of authors) {
        paths.push({ params: { slug: el.dir } })
    }

    return {
        paths: paths,
        fallback: false
    }
}

export default PageAuthor