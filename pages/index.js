import Layout from "../app/layout/layout"
import { getAllAutors, getAutor } from '../app/api'
import Image from 'next/image'

const Page = (props) => {

    let autors = props.autors || []
    //console.log("data", autors[0].data)

    return (
        <Layout>
            <div className="wr">
                <div className="content">
                    
                </div>
            </div>

            <div className="screen">
                <img src="/img/screen.jpg" />
            </div>

            <div className="wr">
                <div className="content">
                    <p>Злое чудовище хочет уничтожить на земле все живое:</p>
                    <p>
                        Пусть умрет человеческий плод<br />
                        Станет мальчиком? Пусть умрет<br />
                        Станет девочкой? Пусть умрет<br />
                        Пусть людской прекратиться род
                    </p>
                    <p>
                        Чтобы спасти человеческий род от поголовной гибели, на борьбу с чудовищем отправляется Гэсэр.<br />
                        Кто же этот богатырь?<br />
                        Это, оказывается небожитель, Бухэ- Бэлигтэ, и, когда он с неба спускается на землю, чтобы совершить подвиг добра, он превращается в человека.<br />
                        Он заново рождается на земле в нищей пастушеской хижине, ибо только «человеческое дитя», рожденное в семье бедняков, может, по мысли слагателей эпоса, понять горе и чаянья народа.<br />
                        В этом эпизоде – истинная поэзия и истинная народность, потому что основа поэзии, как и народности, - человечность.
                    </p>
                    <p>
                        А.И. Уланов, доктор филологических наук
                    </p>
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