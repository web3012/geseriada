import React from 'react'
import Layout from "../app/layout/layout"
import { getAllAutors, getAutor } from '../app/api'
import FrontpageSlider from '../app/components/FrontpageSlider'

import Muzic from "../app/components/Muzic"
import { StoreContext } from '../app/store/context'

const Page = (props) => {

    let autors = props.autors || []
    let ref = React.useRef(null)
    const { state, dispatch } = React.useContext(StoreContext)

    const replay = () => {
        ref.current.pause()
        ref.current.currentTime = '0'
        ref.current.play()
    }

    return (
        <Layout title="Электронный каталог Гэсэриада" keywords="" description="">

            <div className="wr">
                <div className="content">
                    <div className="screen">

                        <video ref={ref} width="100%" height="auto" poster="/img/screen.jpg" autoPlay muted onClick={replay}>
                            <source src="/mp4/DrujinaGeser.mp4" type="video/mp4" />
                        </video>
                        <Muzic/>

                    </div>
                    <FrontpageSlider />
                </div>
            </div>

        </Layout>
    )
}

export default Page

export async function getStaticProps() {

    return {
        props: {
        }
    }
}