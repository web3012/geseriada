import { join } from 'path'
import showdown from 'showdown'

const datadir = join(process.cwd(), 'public', '_data')

const matter = async (source, newline = false) => { // newline - заменять \n на абзац
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
            
            
            let aa = s.split(":")
            let name = aa[0].trim().toLowerCase()
            let value = aa[1] || "" ; value = value.trim()
            if (name) {
                param.push([name, value])
            }
            continue
        }

        if (isParam === false) {
            if(newline){
                content.push(s + "   ")
            } else {
                content.push(s)
            }
            continue
        }

    }

    const converter = new showdown.Converter({
        noHeaderId: true
    })

    content = content.join("\n")
    try {
        content = converter.makeHtml(content)
    }catch(err){
        console.log("Error", err)        
    }

    return {
        meta: Object.fromEntries(new Map(param)) || {},
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
            let txt = fs.readFileSync(filename)
            txt = iconv.decode(txt, "win1251")
            let r = await matter(txt)
            let data = {}
            data.meta = r.meta
            data.content = r.content
            
            let found = filename.match(/_data\/authors\/(.*)\//i)
            if (found) {
                data.dir = found[1]
                data.foto450 = `/_data/authors/${found[1]}/_foto_450.png`
            }
            return data

        } catch (e) {
            console.log("Error>>>>>>>>", e)
            return {}            
        }
    }))

    return res
}

export async function getAuthor(slug) {
    const fs = require('fs')
    const glob = require("glob")
    const iconv = require('iconv-lite')

    let txt = fs.readFileSync(`${datadir}/authors/${slug}/bio.md`)
    txt = iconv.decode(txt, "win1251")
    
    let data = {}

    data = await matter(txt)
    data.fio = data.meta.фио || ""
    data.dir = slug
    data.foto450 = `/_data/authors/${slug}/_foto_450.png`

    let fotos = glob.sync(`${datadir}/authors/${slug}/img/*.txt`, {})
    let list = await Promise.all(fotos.map(async (filename) => {
        try {
            let txt = fs.readFileSync(filename)
            txt = iconv.decode(txt, "win1251")
            let foto = await matter(txt, true)

            //console.log("foto.meta", foto.meta)
            // Обработка различного написания подписей
            const reg = new RegExp('подпис', 'i')
            const reg2 = new RegExp('подпис.* нет', 'i')
            for(let prop in foto.meta){
                if(reg.test(prop)){
                    if(reg2.test(prop)){
                        foto.meta.podp_title = prop
                        foto.meta.podp_value = null
                    }else{
                        foto.meta.podp_title = prop
                        foto.meta.podp_value = foto.meta[prop]
                    }
    
                }
            }

            
            
            let found = filename.match(/\/img\/(.*)\.txt/i)
            let img = ""
            let _img = ""
            if (found) {
                img = `/_data/authors/${slug}/img/${found[1]}.jpg`
                _img = `${found[1]}`
            }

            return {
                author: { 
                    dir: slug,
                    fio: data.fio
                },
                img,
                _img,
                meta: foto.meta,
                content: foto.content
            }

        } catch (e) {
            console.log("Error>>>>>>>>", e)
        }
    }))

    //console.log("list", list)
    data.pictures = list
    return data
}

export async function getMD(filename) {
    const fs = require('fs')
    const iconv = require('iconv-lite')
    let data = fs.readFileSync(`${datadir}/${filename}`)
    data = iconv.decode(data, "win1251")
    data = await matter(data)
    return data
}

export async function getTechniques() {
    // ============================================
    let list = 'Акварель, акватинта, гравюра на пластике, гуашь, карандаш, линогравюра, офсет, смешанная техника, тушь'   //все возможные техники
    list = list.toLowerCase()
    list = list.split(',')
    list = await Promise.all(list.map(s => s.trim()))
    list.sort()
    return list
}


