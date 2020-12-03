import React from 'react'
import Layout from "../app/layout/layout"
import { getAllAutors, getAutor } from '../app/api'
import FrontpageSlider from '../app/components/FrontpageSlider'

const Page = (props) => {

    let autors = props.autors || []

    return (
        <Layout>

            <div className="screen">
                <img src="/img/screen.jpg" />
            </div>

            <div className="wr">
                <div className="content">
                    <FrontpageSlider/>
                </div>
            </div>

            {autors && autors.map((el) => {

                // let data = new Map(el.data)
                // let cod = data.get('Код')
                // let fio = data.get('ФИО')

                // return (
                //     <div className="item" key={cod}>
                //         <div className="div1">
                //             <Image src={el.foto450} alt={fio} width={225} height={300} />
                //         </div>
                //         <div className="div2">
                //             {el.data.map((el) => {
                //                 if(el[0] !== "Код")
                //                 return (
                //                     <p key={el[0]}>{el[0]}: {el[1]}</p>
                //                 )
                //             })}

                //             <div className="fotos">
                //                 {el.fotos.map((el) => {
                //                     let data = new Map(el.data)
                //                     let cod = data.get('Код')
                //                     let title = data.get('Название')
                //                     return (
                //                         <img key={cod} alt={title} src={`/_data/w120/${el._img}.jpg`} width={120}/>
                //                     )
                //                 })}
                //             </div>


                //         </div>
                //     </div>
                // )

            })}


        </Layout>
    )
}

export default Page


// <div style={{
//     height: "400px",
//     background:"#9C9486 url(/fon1.png)",
//     backgroundSize: "cover"
// }}></div>

export async function getStaticProps() {

    const autors = getAllAutors()

    let list = []
    for (let el of autors) {
        let dir = el.dir
        let autor = getAutor(dir)
        list.push(autor)
    }

    // console.log("list", list)
    // console.log("list", autors)

    return {
        props: {
            autors: list
        }
    }
}