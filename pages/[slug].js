import Layout from "../app/layout/layout"
import { getMD } from "../app/api"

const Page = (props) => {
    let meta = props.meta || {}
    let content = props.content || ""

    let pageTitle = meta.title || ""
    let pageKeywords = meta.keywords || ""
    let pageDescription = meta.description || ""

    return (
        <Layout title={pageTitle} keywords={pageKeywords} description={pageDescription}  breadcrumbs={[{title:meta.title}]}>
            <div className="wr">
                <div className="content">
                    
                    <div dangerouslySetInnerHTML={{__html: content}} className="txt txt-worded"></div>                    
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps(context) {

    let slug = context.params.slug
    let page = await getMD(`pages/${slug}.md`)

    //console.log("page", page)
    

    return {
        props: {
            meta: page.meta,
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