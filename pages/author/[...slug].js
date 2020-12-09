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
        <Layout>
            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <div className="page-pic">
                            <h2>Работа</h2>
                            <p>Автор: <Link href={`/author/${pic.author.dir}`}><a>{pic.author.fio}</a></Link></p>
                            <p>Название: {pic.meta.название}</p>
                            <p>Год: {pic.meta.год}</p>
                            <p>Поступление: {pic.meta.поступление}</p>
                            <p>Размер: {pic.meta.размер}</p>
                            <p>Техника: {pic.meta.техника}</p>
                            <p>Литература: {pic.meta.литература}</p>
                            <img src={`/_data/w1200/${pic._img}.jpg`}/>
                            <h4>Описание</h4>
                            <div dangerouslySetInnerHTML={{ __html: pic.content }} />
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

    for(let el of author.pictures){
        if(el._img === slug[1]){
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
        for (let pic of author.pictures) {
            paths.push({ params: { slug: [el.dir, pic._img] } })
        }        
    }

    return {
        paths: paths,
        fallback: false
    }
}

export default PageAuthor