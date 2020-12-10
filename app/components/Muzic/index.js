import React from 'react'
import styles from "./index.module.scss"
import {Howl, Howler} from 'howler'

import SVGmute from '../../../public/img/volume-mute-solid.svg'
import SVGup from '../../../public/img/volume-up-solid.svg'
import SVGdown from '../../../public/img/volume-down-solid.svg'
import { StoreContext } from '../../../app/store/context'

const Muzic = () => {
    
    let ref = React.useRef(null)
    const { state, dispatch } = React.useContext(StoreContext)

    const [audio, setAudio] = React.useState(null)
    const [play, setPlay] = React.useState(false)

    React.useState(()=>{
        setAudio(
            new Howl({src: ['/mp4/muzic.mp3'], volume: 0.8})
        )
        return ()=>{
            if(audio !== null){
                audio.stop(state.soundID)
            }
        }
    }, [])

    const hand = () => {
        setPlay(!play)

        if(audio !== null){
            setTimeout(()=>{
                if(!play){
                    let _id = audio.play()
                    dispatch({type:"SET_SOUND_ID", id: _id})
                 }else{
                    audio.stop(state.soundID)
                 } 
                console.log(">>", play)
            }, 500)
        }
    }

    return (
        <div className={styles.wr} onClick={hand}>
            {play && <SVGup/>}
            {!play && <SVGmute/>}
        
        </div>
    )
}
export default Muzic

