
import React from 'react'
import SvgSitename from '../../public/img/sitename.svg'
import SvgSearch from '../../public/img/search.svg'

import Sabaka from '../../public/img/at-solid.svg'
import Facebook from '../../public/img/facebook-f-brands.svg'
import Twitter from '../../public/img/twitter-brands.svg'
import VK from '../../public/img/vk-brands.svg'
import OK from '../../public/img/odnoklassniki-brands.svg'
import Youtube from '../../public/img/youtube-brands.svg'
import Adr from '../../public/img/map-marked-alt-solid.svg'



const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <div id="logo"><img src="/img/logotype.png" /></div>
                <div id="sitename"><SvgSitename /></div>
                <div id="search">
                    <span>ПОИСК</span>
                    <SvgSearch />
                </div>
                <div id="menu">
                    <ul className="menu">
                        <li>ГЛАВНАЯ</li>
                        <li>КАТАЛОГ</li>
                        <li>ИСТОРИЯ КОЛЛЕКЦИИ</li>
                        <li>О ПРОЕКТЕ</li>
                    </ul>
                </div>
                <div id="breadcrumbs">
                </div>
            </header>


            <main>
                {props.children}
            </main>

            <footer>
                <div className="wr">
                    <div className="content">
                        <div className="txt">
                            <p><b>Copyright, 2020</b></p>
                            <p>
                                Национальный музей<br />
                                Республики Бурятия
                            </p>
                            <p>
                                <b>Научные сотрудники:</b><br />
                                (3012) 21-43-93<br />
                                (3012) 21-44-88<br />
                            </p>
                            <p>
                                <b>Вахта</b><br />
                                (3012) 21-98-14
                            </p>

                        </div>

                        <div className="txt">
                            <p><b>Мы находимся</b></p>
                            <p>
                                <Adr/>
                            </p>
                            <p>
                                670000, Республика Бурятия<br />
                                Улан-Удэ, Куйбышева 29
                            </p>
                            <p>
                                <a href="mailto:muzeyrb@mail.ru"><b>muzeyrb@mail.ru</b></a>
                            </p>
                        </div>
                        <div className="txt">
                            <p><b>Мы в социальных сетях</b></p>
                            <ul>
                            <li><a href="#"><Facebook/></a></li>
                            <li><a href="#"><Twitter/></a></li>
                            <li><a href="#"><VK/></a></li>
                            <li><a href="#"><OK/></a></li>
                            <li><a href="#"><Youtube/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </React.Fragment>
    )
}

export default Layout