import Layout from "../app/layout/layout"

const PageAbout = (props) => {
    return (
        <Layout>

            <div className="wr">
                <div className="content">
                    О проекте
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {
        }
    }
}

export default PageAbout