import { join } from 'path'

const datadir = join(process.cwd(), 'public', '_data')

function matter(source){
    let a = source.split('\n')
    let isParam = null
    
    let param = []
    let content = []

    for(let s of a){
        s = s.trim()
        if(s){
            if(s === '---'){
                if(isParam === null) {
                    isParam = true
                    continue
                }
                if(isParam === true) {
                    isParam = false
                    continue
                }
            }
            if(isParam === true){
                let name = s.substring(0, s.search(':')).trim()
                let value = s.substring(s.search(':') + 1).trim()
                if(name){
                    param.push([name, value])
                }
                continue
            }
            if(isParam === false){
                content.push(s)
                continue
            }
        }
    }
    return {
        data: param
        //content
    }
}

export function getAllAutors() {

    const fs = require('fs')
    const glob = require("glob")
    const iconv = require('iconv-lite')

    let files = glob.sync(`${datadir}/*/bio.md`, {})
    let list = []

    files.map(filename => {
        try {
            let data = fs.readFileSync(filename)
            data = iconv.decode(data, "win1251")
            data = matter(data)

            let found = filename.match(/_data\/(.*)\//i)
            if(found){
                data.dir = found[1]
                data.foto450 = `/_data/${found[1]}/foto_450.png`
                data.foto900 = `/_data/${found[1]}/foto_900.png`
            }
            list.push(data)

        } catch (e) {
            console.log("Error>>>>>>>>", e)
        }
    })

    return list
}

export function getAutor(slug) {
    const fs = require('fs')
    const glob = require("glob")
    const iconv = require('iconv-lite')

    let data = fs.readFileSync(`${datadir}/${slug}/bio.md`)
    data = iconv.decode(data, "win1251")
    data = matter(data)

    data.dir = slug
    data.foto450 = `/_data/${slug}/foto_450.png`
    data.foto900 = `/_data/${slug}/foto_900.png`

    let list = []
    let fotos = glob.sync(`${datadir}/${slug}/img/*.txt`, {})

    fotos.map(filename => {
        try {
            let foto = fs.readFileSync(filename)
            foto = iconv.decode(foto, "win1251")
            foto = matter(foto)

            let found = filename.match(/\/img\/(.*)\.txt/i)
            let img = ""
            let _img = ""
            if(found){
                img = `/_data/${slug}/img/${found[1]}.jpg`
                _img = `${found[1]}`
            }
            list.push({
                img,
                _img,
                data: foto.data,
                //content: foto.content
            })

        } catch (e) {
            console.log("Error>>>>>>>>", e)
        }
    })

    return {
        dir: data.dir,
        foto450: data.foto450,
        foto900: data.foto900,
        data: data.data,
        fotos: list
    }

}