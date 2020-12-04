import Layout from "../app/layout/layout"

const PageCatalog = (props) => {
    return (
        <Layout>

            <div className="wr">
                <div className="content">
                    Каталог
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

export default PageCatalog