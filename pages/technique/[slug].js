import React from 'react'
import Layout from "../../app/layout/layout"
import {getTechniques, getAllAuthors, getAuthor } from '../../app/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ListPictures from "../../app/components/ListPictures"

const PageYears = (props) => {

    const router = useRouter()

    let technique = props.technique || ""
    let pictures = props.pictures || []

    return (
        <Layout title="По технике" keywords="" description="" breadcrumbs={[{ title: "По технике" }]}>

            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <h2>"{technique}" / {pictures.length}</h2>
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
    let techniques = await getTechniques()
    let technique = techniques[slug] || null

    // ============================================
    // все авторы
    const authors = await getAllAuthors()

    // ============================================
    let list = [] //все работы нужной техники

    for (let author of authors) {
        author = await getAuthor(author.dir)

        for (let pic of author.pictures) {
            
            const reg = new RegExp(`${technique}`, 'i')
            if (reg.test(pic.meta.техника)) {
                list.push(pic)
            }

        }
    }
    
    // ============================================
    return {
        props: {
            slug,
            technique,
            pictures: list
        }
    }
}
export async function getStaticPaths() {
    let paths = []

    let techniques = await getTechniques()

    for(let [key, value] in techniques){
        paths.push({ params: { slug: key } })
    }

    return {
        paths: paths,
        fallback: false
    }
}

export default PageYears




