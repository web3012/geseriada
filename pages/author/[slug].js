import React from 'react'
import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'

import ListPictures from "../../app/components/ListPictures"
import ListPicturesGallery from "../../app/components/ListPicturesGallery"

import Display1 from '../../public/img/border-all-solid.svg'
import Display2 from '../../public/img/list-solid.svg'

const PageAuthor = (props) => {

    const router = useRouter()
    let author = props.author || {}
    let [display, setDisplay] = React.useState(1)

    React.useEffect(() => {

    })

    let fio = author.fio || ""
    fio = fio.split(" ")
    fio = fio[0] + ' ' + fio[1] + '<br/>' + fio[2]

    const setDisplay1 = ()=>{setDisplay(1)}
    const setDisplay2 = ()=>{setDisplay(2)}

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
                                <div className="switch">
                                {display === 1 ? 
                                    <a className="active" onClick={setDisplay1} ><Display1/></a>:
                                    <a onClick={setDisplay1}><Display1/></a>}&nbsp;
                                {display === 2 ? 
                                    <a className="active" onClick={setDisplay2}><Display2/></a>:
                                    <a onClick={setDisplay2}><Display2/></a>}&nbsp;
                                </div>
                                {display === 1 && <ListPicturesGallery pictures={author.pictures}/>}
                                {display === 2 && <ListPictures pictures={author.pictures}/>}

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