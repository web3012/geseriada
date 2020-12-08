import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'

const PageCatalog = (props) => {

    return (
        <Layout title="Каталог авторов" keywords="" description="">

            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <h1>Каталог</h1>

                        <div className="page-catalog">
                            <div className="authors">
                                {props.authors && props.authors.map((el, i) => {
                                    let dir = el.dir || ""
                                    let foto450 = el.foto450 || ""
                                    let foto900 = el.foto900 || ""
                                    let fio = el.meta.фио || ""
                                    let year = el.meta.год || ""
                                    let titul = el.meta.титул || ""
                                    let count = el.pictures.length
                                    
                                    return (
                                        <div key={i} className={`a a${i+1}`}>
                                            <img src={foto450}/>
                                            <div className="desc">
                                                <h2>{fio}</h2>
                                                <p>{year}</p>
                                                <p>{titul}</p>
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