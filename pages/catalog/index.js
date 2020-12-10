import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import { useRouter } from 'next/router'

const PageCatalog = (props) => {
    const router = useRouter()

    return (
        <Layout title="Каталог" keywords="" description="" breadcrumbs={[{title:"Каталог"}]}>

            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <h1>Каталог</h1>

                        <div className="page-catalog">
                            <div className="authors">
                                {props.authors && props.authors.map((el, i) => {
                                    let dir = el.dir || ""
                                    let foto450 = el.foto450 || ""
                                    let fio = el.meta.фио || ""
                                    fio = fio.split(" ")
                                    fio = fio[0] + ' ' + fio[1] + '<br/>' + fio[2]
                                    let year = el.meta.год || ""
                                    let titul = el.meta.титул || ""
                                    let count = el.pictures.length

                                    return (
                                        <div key={i} className={`a a${i + 1}`} onTouchStart={()=>{}} onClick={()=>{
                                            router.push({
                                                pathname: `/author/${dir}`
                                            }).then(() => window.scrollTo(0, 0))                                    
                                        }}>
                                            <div class="flipper">
                                                <div class="front">
                                                    <img src={foto450} />
                                                    <div className="desc">
                                                        <div dangerouslySetInnerHTML={{ __html: fio }} />
                                                    </div>
                                                </div>
                                                <div class="back">
                                                    <div className="fio" dangerouslySetInnerHTML={{ __html: fio }} />
                                                    <div>{year}</div>
                                                    <div>{titul}</div>
                                                    <div>
                                                        <span>Количество работ: {count}</span>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            

                                        </div>
                                    )
                                })}
                            </div>


                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps() {

    const authors = await getAllAuthors()

    let pictures = [] //все фото списком
    let list = []   //все авторы списком

    for (let el of authors) {
        let dir = el.dir
        let author = await getAuthor(dir)
        let _pictures = []

        for (let pic of author.pictures) {
            pictures.push(pic)
            _pictures.push(pic)
        }
        author.pictures = _pictures
        list.push(author)
    }


    // ============================================
    let picTechnics = 'Акварель, акватинта, гравюра на пластике, гуашь, карандаш, линогравюра, офсет, смешанная техника, тушь'   //все возможные техники
    picTechnics = picTechnics.toLowerCase()
    picTechnics = picTechnics.split(',')
    picTechnics = picTechnics.map(s => s.trim())
    picTechnics.sort()

    // ============================================
    let picYears = new Set()   //все возможные года
    for (let el of pictures) {
        let year = parseInt(el.meta.год)
        picYears.add(year)
    }
    picYears = [...picYears]
    picYears.sort()

    // ============================================
    let picAuthors = []   //все возможные авторы
    for (let el of authors) {
        picAuthors.push({
            dir: el.dir,
            fio: el.meta.фио
        })
    }

    // ============================================
    return {
        props: {
            authors: list,
            pictures,
            picAuthors,
            picTechnics,
            picYears
        }
    }
}

export default PageCatalog