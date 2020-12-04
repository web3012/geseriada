import Layout from "../app/layout/layout"

const PageHistory = (props) => {
    return (
        <Layout>

            <div className="wr">
                <div className="content">
                    История каталога
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

export default PageHistory