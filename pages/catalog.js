import Layout from "../app/layout/layout"

const PageCatalog = (props) => {
    return (
        <Layout title="Каталог авторов" keywords="" description="">

            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <h1>Каталог авторов</h1>
                    </div>
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