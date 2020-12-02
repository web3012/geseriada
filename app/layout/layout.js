
import React from 'react'
import SvgSitename from '../../public/img/sitename.svg'
import SvgSearch from '../../public/img/search.svg'

const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <div id="logo"><img src="/logo.png" /></div>
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

            </header>


            <main>
                {props.children}
            </main>

            <footer>
                <div className="wr">
                    <div className="txt">
                        <p>Copyright, 2020</p>
                        <p>
                            (3012) 21-43-93 — научные сотрудники<br />
                            (3012) 21-44-88<br />
                            (3012) 21-98-14 — вахта
                        </p>
                    </div>
                    <div className="txt">
                        <p>Мы находимся</p>
                        <p>
                            670000, Республика Бурятия, Улан-Удэ<br/>
                            ул.Куйбышева, 29
                        </p>
                    </div>
                    <div className="txt">
                        <p>
                            muzeyrb@mail.ru
                        </p>
                    </div>

                </div>
            </footer>

        </React.Fragment>
    )
}

export default Layout