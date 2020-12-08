import { join } from 'path'
import showdown from 'showdown'

const datadir = join(process.cwd(), 'public', '_data')

const matter = async (source) => {
    let a = source.split('\n')
    let isParam = null

    let param = []
    let content = []

    for (let s of a) {

        if (s.trim() === '---') {
            if (isParam === null) {
                isParam = true
                continue
            }
            if (isParam === true) {
                isParam = false
                continue
            }
        }
        if (isParam === true) {
            let name = s.substring(0, s.search(':')).trim().toLowerCase()
            let value = s.substring(s.search(':') + 1).trim()
            if (name) {
                param.push([name, value])
            }
            continue
        }

        if (isParam === false) {
            content.push(s)
            continue
        }

    }


    const converter = new showdown.Converter({
        noHeaderId: true
    })


    content = content.join("\n")
    content = converter.makeHtml(content)

    return {
        data: Object.fromEntries(new Map(param)) || {},
        content
    }
}

export async function getAllAuthors() {

    const fs = require('fs')
    const glob = require("glob")
    const iconv = require('iconv-lite')

    let files = glob.sync(`${datadir}/authors/*/bio.md`, {})
    let list = []

    let res = await Promise.all(files.map(async (filename) => {
        try {
            let data = fs.readFileSync(filename)
            data = iconv.decode(data, "win1251")
            data = await matter(data)

            let found = filename.match(/_data\/authors\/(.*)\//i)
            if (found) {
                data.dir = found[1]
                data.foto450 = `/_data/authors/${found[1]}/foto_450.png`
                data.foto900 = `/_data/authors/${found[1]}/foto_900.png`
            }
            return data

        } catch (e) {
            console.log("Error>>>>>>>>", e)
        }
    }))

    return {
        dir: data.dir,
        foto450: data.foto450,
        foto900: data.foto900,
        meta: data.data,
        content: data.content
    }
}

export async function getAuthor(slug) {
    const fs = require('fs')
    const glob = require("glob")
    const iconv = require('iconv-lite')

    let txt = fs.readFileSync(`${datadir}/authors/${slug}/bio.md`)
    txt = iconv.decode(txt, "win1251")
    
    let data = {}

    data = await matter(txt)
    data.dir = slug
    data.foto450 = `/_data/authors/${slug}/foto_450.png`
    data.foto900 = `/_data/authors/${slug}/foto_900.png`

    let fotos = glob.sync(`${datadir}/authors/${slug}/img/*.txt`, {})
    let list = await Promise.all(fotos.map(async (filename) => {
        try {
            let txt = fs.readFileSync(filename)
            txt = iconv.decode(txt, "win1251")
            let foto = await matter(txt)


            let found = filename.match(/\/img\/(.*)\.txt/i)
            let img = ""
            let _img = ""
            if (found) {
                img = `/_data/authors/${slug}/img/${found[1]}.jpg`
                _img = `${found[1]}`
            }
            return {
                dir: slug,
                img,
                _img,
                meta: foto.data,
                content: foto.content
            }

        } catch (e) {
            console.log("Error>>>>>>>>", e)
        }
    }))

    //console.log("list", list)
    return {
        dir: data.dir,
        foto450: data.foto450,
        foto900: data.foto900,
        meta: data.data,
        content: data.content,
        pictures: list
    }
}

export async function getMD(filename) {
    const fs = require('fs')
    const iconv = require('iconv-lite')
    let data = fs.readFileSync(`${datadir}/${filename}`)
    data = iconv.decode(data, "win1251")
    data = await matter(data)
    return data
}

