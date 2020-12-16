import React from 'react'
import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ListPictures from "../../app/components/ListPictures"
import ListPicturesGallery from "../../app/components/ListPicturesGallery"

import Display1 from '../../public/img/border-all-solid.svg'
import Display2 from '../../public/img/list-solid.svg'


const PageAuthor = (props) => {

    const router = useRouter()

    // console.log("slug", props.slug)
    // console.log("pic", props.pic)

    let author = props.author || {}
    //console.log(">>>>>>>>>>", author)
    
    let pic = props.pic || {}

    let s = pic.meta.podp_title || ""
    let podp_title = s.charAt(0).toUpperCase() + s.slice(1) // first char to uppercase
    let podp_value = pic.meta.podp_value

    let [display, setDisplay] = React.useState(1)
    const setDisplay1 = ()=>{setDisplay(1)}
    const setDisplay2 = ()=>{setDisplay(2)}

    return (
        <Layout breadcrumbs={[{ url: "/catalog", title: "Каталог" }, { url: `/author/${pic.author.dir}`, title: pic.author.fio }, { title: pic.meta.название }]}>
            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <div className="page-pic">
                            <section className="img">
                                <a href={`/_data/w1200/${pic._img}.jpg`} data-lightbox="lightbox1" data-title={pic.meta.название}>
                                    <img src={`/_data/w1200/${pic._img}.jpg`} />
                                </a>
                            </section>
                            <section className="desc">
                                <div className="meta">
                                    <p>Автор: <Link href={`/author/${pic.author.dir}`}><a>{pic.author.fio}</a></Link></p>
                                    <p>Название: <Link href={`/author/${pic.author.dir}/${pic._img}`}><a>{pic.meta.название}</a></Link></p>
                                    <p>Год: {pic.meta.год}</p>
                                    <p>Техника: {pic.meta.техника}</p>
                                    <p>Размер: {pic.meta.размер}</p>
                                    {podp_value ? <p>{podp_title}: {podp_value}</p> : <p>{podp_title}</p>}
                                    <p>Поступление: {pic.meta.поступление}</p>
                                    <p>Инв. N: Г-{pic.meta.код}</p>
                                </div>
                                <h4>Описание</h4>
                                <div className="desc-txt" dangerouslySetInnerHTML={{ __html: pic.content }} />
                                <div className="litra">Литература: {pic.meta.литература}</div>
                            </section>

                        </div>

                        <div className="page-author">
                        <div className="pics">
                        <div className="switch">
                            {display === 1 ? 
                                <a className="active" onClick={setDisplay1} ><Display1/></a>:
                                <a onClick={setDisplay1}><Display1/></a>}&nbsp;
                            {display === 2 ? 
                                <a className="active" onClick={setDisplay2}><Display2/></a>:
                                <a onClick={setDisplay2}><Display2/></a>}&nbsp;
                            </div>
                            {display === 1 && <ListPicturesGallery pictures={author.pictures} skip={pic.meta.код}/>}
                            {display === 2 && <ListPictures pictures={author.pictures} skip={pic.meta.код}/>}
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