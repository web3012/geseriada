import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

const PageAuthor = (props) => {

    const router = useRouter()

    // console.log("slug", props.slug)
    // console.log("pic", props.pic)

    let pic = props.pic || {}

    return (
        <Layout breadcrumbs={[{ url: "/catalog", title: "Каталог" }, { url: `/author/${pic.author.dir}`, title: pic.author.fio }, { title: pic.meta.название }]}>
            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <div className="page-pic">
                            <section className="img"><img src={`/_data/w1200/${pic._img}.jpg`} /></section>
                            <section className="desc">
                                <div className="meta">
                                    <p>Автор: <Link href={`/author/${pic.author.dir}`}><a>{pic.author.fio}</a></Link></p>
                                    <p>Название: <Link href={`/author/${pic.author.dir}/${pic._img}`}><a>{pic.meta.название}</a></Link></p>
                                    <p>Год: {pic.meta.год}</p>
                                    <p>Инв. N: Г-{pic.meta.код}</p>
                                    <p>Подписи на изображении: {pic.meta['подписи на изображении']}</p>
                                    <p>Поступление: {pic.meta.поступление}</p>
                                    <p>Размер: {pic.meta.размер}</p>
                                    <p>Техника: {pic.meta.техника}</p>
                                </div>
                                <h4>Описание</h4>
                                <div className="desc-txt" dangerouslySetInnerHTML={{ __html: pic.content }} />
                                <div className="litra">Литература: {pic.meta.литература}</div>
                            </section>

                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps(context) {

    let slug = context.params.slug
    let author = await getAuthor(slug[0])
    let pic = null

    for (let el of author.pictures) {
        if (el._img === slug[1]) {
            pic = el
            break
        }
    }
    
    return {
        props: {
            slug,
            author,
            pic
        }
    }
}

export async function getStaticPaths() {
    let paths = []

    const authors = await getAllAuthors()
    for (let el of authors) {
        let author = await getAuthor(el.dir)
        //console.log("author", author)
        for (let pic of author.pictures) {
            //console.log("paths", pic.author.dir, pic._img)
            paths.push({ params: { slug: [pic.author.dir, pic._img] } })
        }
    }

    
    
    return {
        paths: paths,
        fallback: false
    }
}

export default PageAuthor