import Layout from "../app/layout/layout"
import { getMD } from "../app/api"

const Page = (props) => {
    let data = props.data || []
    let content = props.content || ""

    let meta = new Map(data)
    let pageTitle = meta.get('title')
    let pageKeywords = meta.get('keywords')
    let pageDescription = meta.get('description')

    return (
        <Layout title={pageTitle} keywords={pageKeywords} description={pageDescription}>
            <div className="wr">
                <div className="content">
                    <div dangerouslySetInnerHTML={{__html: content}} className="txt"></div>                    
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps(context) {

    let slug = context.params.slug
    let page = await getMD(`pages/${slug}.md`)

    let content = page.content

    return {
        props: {
            data: page.data,
            content: page.content
        }
    }
}

export async function getStaticPaths() {
    let paths = []
    paths.push({ params: { slug: "about" } })
    paths.push({ params: { slug: "history" } })
    return {
        paths: paths,
        fallback: false
    }
}

export default Page