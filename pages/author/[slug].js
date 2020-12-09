import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'

const PageAuthor = (props) => {

    const router = useRouter()
    console.log("author", props.author)
    let author = props.author || {}

    return (
        <Layout>
            <div className="wr">
                <div className="content">
                    <div className="txt">

                        <div className="page-author">
                            <div className="foto">
                                <div className="pic">
                                    <img src={author.foto450}/>
                                </div>
                                <div className="meta">
                                    <p>{author.meta.год}</p>
                                    <p>{author.meta.титул}</p>
                                </div>

                            </div>
                            <div className="bio">
                                <h1>{author.fio}</h1>
                                <div dangerouslySetInnerHTML={{ __html: author.content }} />
                            </div>
                            <div className="pics">
                                <h4>Работы автора</h4>

                                <div className="items">
                                {author.pictures && author.pictures.map((el,i)=>{
                                    return (
                                        <div className="item">
                                            <img src={`/_data/w120/${el._img}.jpg`}  onClick={()=>{
                                                router.push({
                                                    pathname: `/author/${el.author.dir}/${el._img}`
                                                }).then(() => window.scrollTo(0, 0))                                    
                                            }}/>
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