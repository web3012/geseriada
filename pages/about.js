import Layout from "../app/layout/layout"
import Image from 'next/image'

const Page = (props) => {
    return (
        <Layout>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {
        }
    }
}

export default Page