import React from 'react'
import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ListPictures from "../../app/components/ListPictures"

const PageYears = (props) => {

    const router = useRouter()
    let year = props.slug || null
    let pictures = props.pictures || []

    return (
        <Layout title="По годам" keywords="" description="" breadcrumbs={[{ title: "По годам" }]}>

            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <h2>{year} / {pictures.length}</h2>
                        <ListPictures pictures={pictures}/>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps(context) {

    let slug = context.params.slug
    // ============================================
    // все авторы
    const authors = await getAllAuthors()

    // ============================================
    let list = [] //все работы нужного года

    for (let author of authors) {
        author = await getAuthor(author.dir)

        for (let pic of author.pictures) {
            
            let year = pic.meta.год
            year = year.split("-")

            if (year.length === 1) {
                if(parseInt(slug) === parseInt(year[0])){
                    list.push(pic)
                }
            }

            if (year.length === 2) {
                let n = 0
                for (let y = year[0]; y <= year[1]; y++) {
                    n++; if (n > 10) break;
                    if(parseInt(slug) === parseInt(y)){
                        list.push(pic)
                    }
                }
            }
        }
    }
    
    // ============================================
    return {
        props: {
            slug,
            pictures: list
        }
    }
}
export async function getStaticPaths() {
    let paths = []

    // ============================================
    // все авторы
    const authors = await getAllAuthors()

    // ============================================
    let pictures = [] //все фото списком
    for (let el of authors) {
        let dir = el.dir
        let author = await getAuthor(dir)
        for (let pic of author.pictures) {
            pictures.push(pic)
        }
    }

    // ============================================
    let picYears = new Set()   //все возможные года
    for (let el of pictures) {
        let year = el.meta.год
        year = year.split("-")
        if (year.length === 1) {
            picYears.add(parseInt(year[0]))
        }
        if (year.length === 2) {
            let n = 0
            for (let y = year[0]; y <= year[1]; y++) {
                n++; if (n > 10) break;
                picYears.add(parseInt(y))
            }
        }
    }
    picYears = [...picYears]
    picYears.sort()

    picYears.map(year=>{
        paths.push({ params: { slug: year.toString() } })
    })

    return {
        paths: paths,
        fallback: false
    }
}

export default PageYears




