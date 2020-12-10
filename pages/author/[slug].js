import React from 'react'
import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'

import ListPictures from "../../app/components/ListPictures"

const PageAuthor = (props) => {

    const router = useRouter()
    let author = props.author || {}

    React.useEffect(() => {

    })

    let fio = author.fio || ""
    fio = fio.split(" ")
    fio = fio[0] + ' ' + fio[1] + '<br/>' + fio[2]

    return (
        <Layout breadcrumbs={[{ url: "/catalog", title: "Каталог" }, { title: author.fio }]}>
            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <div className="page-author">


                            <div className="foto">
                                <div className="pic">
                                    <a href={author.foto450} data-lightbox="lightbox1" data-title={author.meta.фио}>
                                        <img src={author.foto450} />
                                    </a>
                                </div>
                                <div className="meta">
                                    <h4 dangerouslySetInnerHTML={{ __html: fio }} />
                                    <p>{author.meta.год}</p>
                                    <p>{author.meta.титул}</p>
                                </div>

                            </div>

                            <div className="bio">
                                <div dangerouslySetInnerHTML={{ __html: author.content }} />
                            </div>

                            <div className="pics">
                                <ListPictures pictures={author.pictures}/>
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