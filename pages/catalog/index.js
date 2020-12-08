import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'

const PageCatalog = (props) => {

    return (
        <Layout title="Каталог авторов" keywords="" description="">

            <div className="wr">
                <div className="content">
                    <div className="txt">
                        <h1>Каталог работ</h1>

                        
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

        for(let pic of author.pictures){
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
    picTechnics = picTechnics.map(s=>s.trim())
    picTechnics.sort()
    // console.log("picTechnics", picTechnics)
    // for (let el of pictures) {
    //     let tech = el.meta.техника || ""
    //     tech = tech.split(',')
    //     tech = tech.map(s=>s.trim())
    //     tech = new Set(tech)
    //     console.log("Tech", tech, el.img)
    // }

    // ============================================
    let picYears = new Set()   //все возможные года
    for (let el of pictures) {
        let year = parseInt(el.meta.год)
        picYears.add(year)
    }
    picYears = [...picYears]
    picYears.sort()
    //console.log("Years", picYears)

    // ============================================
    let picAuthors = []   //все возможные авторы
    for (let el of authors) {
        picAuthors.push({
            dir: el.dir,
            fio: el.meta.фио
        })
    }
    // console.log("picAuthors", picAuthors)

    // ============================================

    //console.log("%%%%%", list[0])
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