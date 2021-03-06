import React from 'react'
import Layout from "../../app/layout/layout"
import { getAllAuthors, getAuthor } from '../../app/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ListPictures from "../../app/components/ListPictures"

const PageCatalog = (props) => {

    const router = useRouter()

    let pictures = props.pictures || []
    let authors = props.picAuthors || []
    let years = props.picYears || []
    let technics = props.picTechnics || []

    const [list, setList] = React.useState([])
    const [type, setType] = React.useState(null)
    const [value, setValue] = React.useState(null)
    const [sts, setSTS] = React.useState(0) // Start title search  or orChange input

    React.useEffect(() => {
        let t = router.query.type || null
        let v = router.query.value || null
        let s = router.query.sts || false

        setType(t)
        setValue(v)
        setSTS(s)
    }, [router])

    React.useEffect(() => {
        search()
    }, [type, value, sts])

    const search = () => {
        let res = []

        if (sts === false) {
            // Набираем текст
        } else

            if (type === "year") {

                //console.log("Поиск YEAR", value)
                //console.log(">>", pictures[0].meta.год)
                for (let el of pictures) {
                    let year = el.meta.год || ""

                    year = year.split("-")
                    if (year.length === 1) {
                        year = year[0]
                    }
                    if (year.length === 2) {
                        let n = 0
                        let years = []
                        for (let y = year[0]; y <= year[1]; y++) {
                            n++; if (n > 10) break;
                            years.push(y)
                        }
                        year = years.join(',')
                    }

                    const reg = new RegExp(`${value}`, 'i')
                    if (reg.test(year)) {
                        //console.log(">>>", el.meta.год)
                        res.push(el)
                    }
                }
                setList(res)
            } else
                if (type === "techno") {
                    //console.log(">>", pictures[0].meta.техника)
                    for (let el of pictures) {
                        let currTechnic = el.meta.техника || ""
                        const reg = new RegExp(`${value}`, 'i')

                        if (reg.test(currTechnic)) {
                            //console.log(">>>", el.meta.техника)
                            res.push(el)
                        }
                    }
                    setList(res)

                } else
                    if (type === "author") {
                        //console.log(">>", pictures[0].author)
                        for (let el of pictures) {
                            let currDir = el.author.fio || ""
                            //console.log(">>>", value, currDir)

                            if (currDir === value) {

                                res.push(el)
                            }
                        }
                        setList(res)

                    } else
                        if (type === "title" && sts) {
                            //console.log(">>", pictures[0].meta)
                            for (let el of pictures) {
                                let currTitle = el.meta.название || ""
                                const reg = new RegExp(`${value}`, 'i')

                                if (reg.test(currTitle)) {
                                    //console.log(">>>", el.meta.название)
                                    res.push(el)
                                }
                            }
                            setList(res)

                        } else {
                            setList([])
                        }

    }

    const fire = (t, v) => {
        router.push({
            pathname: "/search",
            query: { type: t, value: v, sts: 1 }
        }).then(() => window.scrollTo(0, 0))
    }

    let inputValue = type === "title" ? value : ""

    return (
        <Layout title="Поиск" keywords="" description="" breadcrumbs={[{ title: "Поиск" }]}>

            <div className="wr">
                <div className="content">
                    <div className="txt">

                        <div className="searchResults">
                            <h2>РЕЗУЛЬТАТ ВЫБОРКИ {value && <span>"{value}"</span>}</h2>

                            <ListPictures pictures={list} />

                        </div>

                        <div className="searchForm">
                            <div className="grid">

                                <section className="title">
                                    <div className="items">
                                        <div className="item"><h4>ПО НАЗВАНИЮ КАРТИНЫ</h4></div>
                                        <div className="item">
                                            <p>
                                                <input type="text" placeholder="Название картины содержит"
                                                    onChange={(e) => {
                                                        setSTS(false)
                                                        setType("title")
                                                        setValue(e.target.value)
                                                    }}
                                                    value={inputValue} />
                                            </p>
                                            <p>
                                                <button onClick={() => fire("title", inputValue)}>Поиск</button>
                                            </p>

                                        </div>
                                    </div>
                                </section>

                                <section className="authors">
                                    <div className="items">
                                        <div className="item"><h4>ПО АВТОРАМ</h4></div>
                                            {authors.map(el => {
                                                return (
                                                    <div key={el.dir} className="item"><a onClick={() => fire("author", el.fio)}>{el.fio}</a></div>
                                                )
                                            })}
                                    </div>
                                </section>

                                <section className="dates">
                                    <div className="items">
                                        <div className="item"><h4>ПО ДАТАМ</h4></div>
                                        <div className="item">
                                        <ul>
                                            {years.map(el => {
                                                return (
                                                    <li key={el}><a onClick={() => fire("year", el)}>{el}</a></li>
                                                )
                                            })}
                                        </ul>
                                        </div>
                                    </div>

                                </section>

                                <section className="techno">
                                    <div className="items">
                                        <div className="item"><h4>ПО ТЕХНИКЕ</h4></div>
                                        {technics.map(el => {
                                            return (
                                                <div key={el} className="item"><a onClick={() => fire("techno", el)}>{el}</a></div>
                                            )
                                        })}
                                    </div>
                                </section>

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
        //let year = parseInt(el.meta.год)
        let year = el.meta.год
        year = year.split("-")
        if (year.length === 1) {
            picYears.add(parseInt(year[0]))
        }
        if (year.length === 2) {
            let n = 0
            //let allYears = []
            for (let y = year[0]; y <= year[1]; y++) {
                n++; if (n > 10) break;
                //allYears.push(y)
                picYears.add(parseInt(y))
            }
            //console.log(">", year, allYears, el.img)    
        }
    }
    picYears = [...picYears]
    picYears.sort()

    //console.log("picYears", picYears)


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