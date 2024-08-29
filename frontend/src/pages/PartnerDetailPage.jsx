import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/PartnerDetailPage.css'; // Импортируем стили для страницы

const partners = [
    {
        id: 1,
        name: "ОАО «Пензенский арматурный завод»",
        description: "Многолетний опыт конструирования и производства арматуры позволил завоевать «ПАЗ» высокую репутацию среди потребителей, чьи разнообразные запросы возлагают на предприятие большую ответственность за выпуск качественной, технически совершенной продукции.",
        logo: "/penz.png",
        details: `
            Арматура производства ОАО «ПАЗ» предназначена для химической, нефтяной и газовой промышленности, атомной энергетики ,широко используется в производстве холодильного, компрессорного, медицинского оборудования, в жилищном хозяйстве и коммунальных сетях тепло-, водо- и газоснабжения. Высокое качество продукции и менеджмента на ОАО «ПАЗ» подтверждено сертификатами стандарта ГОСТ ISO 9001:2011, Госстандарта России, наградами и призами международных форумов в Мадриде и Каннах. Концепция работы ОАО «ПАЗ» — создание и вывод на рынок запорной трубопроводной арматуры изделий с максимально конкурентными преимуществами, адаптированных для конкретного заказчика, не снижая привычно высоких характеристик продукции.
        `,
        website: "www.armatura-paz.ru",
        cooperation: "разработка трубопроводной арматуры."
    },
    {
        id: 2,
        name: "АО «Омский завод транспортного машиностроения»",
        description: "Российская машиностроительная компания, дочернее предприятие ОАО «НПК «Уралвагонзавод». Расположено в Омске. Изготавливает технику военного назначения, дорожно-строительные машины, технику для нефтегазодобывающего комплекса, выполняет заказы по производству железнодорожной техники.",
        logo: "/omsk.png",
        details: `
        `,
        website: "www.transmash-omsk.ru",
        cooperation: "разработка и изготовление трубопроводной арматуры для энергетического сектора."
    },
    {
        id: 3,
        name: "ООО «ИНКЛА»",
        description: "Международная компания с сетевой структурой, специализирующаяся на разработке и поставке комплексных промышленных решений, в том числе: оборудования, узлов и запасных частей.",
        logo: "/inkla.png",
        details: `
            <p>INKLA – международная компания с сетевой структурой, специализирующаяся на разработке и поставке комплексных промышленных решений, в том числе: оборудования, узлов и запасных частей.</p>
            
            <h3>Основные отрасли – потребители:</h3>
            <ul>
                <li>Энергетика;</li>
                <li>АЭС;</li>
                <li>ГРЭС и ТЭЦ;</li>
                <li>ГЭС;</li>
                <li>Экологически чистая и возобновляемая энергетика;</li>
                <li>Промышленность;</li>
                <li>Нефтегазовая промышленность;</li>
                <li>Целлюлозно-бумажная промышленность;</li>
                <li>Сталелитейная промышленность;</li>
                <li>Машиностроение.</li>
            </ul>
        `,
        website: "www.inkla.com",
        cooperation: "содействие в развитии сотрудничества с Российскими и зарубежными производителями оборудования, исследования рынков, разработка и согласование исходных технических требований, и. т.д."
    },
    
    {
        id: 4,
        name: "ООО «ГУСАР»",
        description: "Гусевский арматурный завод «Гусар» основан в 2002 году и специализируется на производстве трубопроводной арматуры для нефтегазовой промышленности.В числе приоритетных направлений развития предприятия: постоянное повышение качества выпускаемой продукции, модернизация производства, развитие социальной ответственности и соблюдение экологических норм безопасности.",
        logo: "/gusar.svg",
        details: `
            Высокий технологический уровень и современная производственная база позволили предприятию наладить производство запорной арматуры, отвечающей всем российским и международным стандартам. В настоящий момент завод выпускает задвижки клиновые, задвижки шиберные, задвижки ЗКС, клапаны регулирующие, клапаны запорно-регулирующие и прочую продукцию.

Продукция завода «Гусар» успешно эксплуатируется на трубопроводах, предназначенных для транспортировки нефти, нефтепродуктов, природного газа, агрессивных сред, воды и водяного пара. Клиентами завода являются крупнейшие компании нефтегазового комплекса и химической промышленности РФ.

В числе приоритетных направлений развития предприятия: постоянное повышение качества выпускаемой продукции, модернизация производства, развитие социальной ответственности и соблюдение экологических норм безопасности.
        `,
        website: "www.gusarm.ru",
        cooperation: "проектирование запорной и регулирующей шаровой арматуры, фонтанной арматуры, проведение расчетов напряженно-деформированного состояния литых корпусных деталей, расчетов на сейсмическое воздействие, и т.д."
    },
    {
        id: 5,
        name: "Группа компаний «КОНАР»",
        description: "«КОНАР» является лидером на рынке по производству фланцев и фланцевого крепежа в России. Именно с этой продукции началась история предприятия в 1991 году. С тех пор производственные возможности компании значительно расширились, большой рывок вперед произошел в последние годы.",
        logo: "/konar.png",
        details: `
            Сегодня группа предприятий «КОНАР» прочно заняла свое место на рынке арматуростроительного комплекса нашей страны, осваивая производство новых деталей и узлов трубопроводов, расширяя работу с ведущими компаниями нефтегазового комплекса нашей страны.
        `,
        website: "www.konar.ru",
        cooperation: "проектирование запорной шаровой арматуры для нефти и газа, выполнение работ по импортозамещению."
    },
    {
        id: 6,
        name: "АО «УКАЗ»",
        description: "«Усть-Каменогорский арматурный завод» более 35 лет проектирует, разрабатывает, производит и осуществляет поставку трубопроводной арматуры и нефтегазопромыслового оборудования, которые находят широкое применение на нефтегазовых объектах России, государств СНГ, а также в странах дальнего зарубежья.",
        logo: "/ukaz.png",
        details: `
            Продукция изготавливается в соответствии со стандартами Республики Казахстан и Российской Федерации и, ее качество подтверждено необходимыми разрешениями и сертификатами соответствия.

На предприятии внедрена и сертифицирована система менеджмента, соответствующая международным стандартам ISO 9001:2008, IS014001, OHSAS 18001, ISO/TS 29001:2010 и API Spec Q1.
        `,
        website: "www.ukaz.ru",
        cooperation: "проектирование задвижек клиновых с литым корпусом, проведение расчетов арматуры, проведение исследований современных защитных покрытий"
    },
    {
        id: 7,
        name: "ОАО «НПО ЦКТИ»",
        description: "Проводит исследования, разработки нового, модернизация действующего оборудования ТЭС, АЭС, ГЭС, объектов промышленной и коммунальной энергетики, разработка стандартов и нормативно-технических документов, сертификационные испытания, работы в области промышленной безопасности и ресурса, изготовление нестандартного оборудования.",
        logo: "/ckti.png",
        details: `
            <p>ОАО «Научно-производственное объединение по исследованию и проектированию энергетического оборудования им. И.И. Ползунова»:</p>
            <ul>
                <li>Имеет научно-технический потенциал, который включает высококвалифицированный кадровый состав (85 докторов и кандидатов наук и 540 специалистов), уникальную опытно-экспериментальную базу, в том числе, ТЭЦ и около 100 стендов.</li>
                <li>Является головной, специализированной организацией по вопросам промышленной безопасности котлов, сосудов и трубопроводов, а также анализа техногенных рисков, угрожающих жизни и здоровью людей, и страхования безопасности в соответствии с правилами Ростехнадзора.</li>
                <li>Является аккредитованной базовой организацией по стандартизации.</li>
                <li>Является головной организацией по продлению ресурса тепломеханического оборудования Ленинградской АЭС и выполняет аналогичные работы для Курской, Смоленской, Кольской и Билибинской АЭС.</li>
            </ul>
            <p>Имеет в своем составе:</p>
            <ul>
                <li>Испытательный центр энергетического оборудования.</li>
                <li>НТЦ «Безопасность и ресурс объектов Ростехнадзора.</li>
                <li>НТЦ «Прочность и ресурс тепломеханического оборудования АЭС».</li>
                <li>Лабораторию, аттестованную в качестве лаборатории неразрушающего контроля и диагностики.</li>
                <li>Орган по аттестации лабораторий неразрушающего контроля и диагностики.</li>
            </ul>
        `,
        website: "www.ckti.ru",
        cooperation: "разработки трубопроводной арматуры, поведение испытаний опытных образцов трубопроводной арматуры, и др."
    },
    {
        id: 8,
        name: "ООО «ПРИВОДЫ АУМА»",
        description: "Российское подразделение компании AUMA (ArmaturenUndMaschinenAntriebe нем.). Компания AUMA является ведущим производителем электроприводов для автоматизации промышленной арматуры. С момента основания в 1964 году компания занимается разработкой, производством, продажей электроприводов, а также предоставлением сервисного обслуживания.",
        logo: "/auma.png",
        details: `
            Российское подразделение компании AUMA (ArmaturenUndMaschinenAntriebe нем.). Компания AUMAявляется ведущим производителем электроприводов для автоматизации промышленной арматуры. С момента основания в 1964 году компания занимается разработкой, производством, продажей электроприводов, а также предоставлением сервисного обслуживания. Бренд AUMA — это синоним многолетнего опыта и мировой известности в области производства электроприводов дляэнергетики, водоснабжения, нефтегазовой промышленности.

Компания, как независимый партнер международной отраслиарматуростроения, поставляет специализированную продукцию для электрической автоматизации любой промышленнойарматуры.
        `,
        website: "www.auma.com",
        cooperation: "создание современной высоконадежной приводной арматуры,"
    },
    {
        id: 9,
        name: "ОАО НПО «ЦНИИТМАШ»",
        description: "ЦНИИТМАШ стоял у истоков отечественного машиностроения. Созданные в компании материалы (стали, сплавы, напыления, охлаждающие жидкости и т.п.) технологические процессы машиностроительного производства широко используются на заводах энергетического, тяжелого, транспортного, нефтехимического машиностроения и в других отраслях.",
        logo: "/cniit.png",
        details: `
            <h3>Специалисты ЦНИИТМАШ занимают ведущие позиции в следующих областях:</h3>
            <ul>
                <li>Создание новых конструкционных материалов;</li>
                <li>Технологии металлургии;</li>
                <li>Технологии литейного производства;</li>
                <li>Обработка давлением;</li>
                <li>Сварки;</li>
                <li>Холодной обработки металлов;</li>
                <li>Неразрушающий контроль;</li>
                <li>Расчетов на прочность, остаточного ресурса и т.п.;</li>
                <li>Компьютерное моделирование технологических процессов;</li>
                <li>Конструирование и изготовление нестандартного оборудования;</li>
                <li>Инжиниринг проектов.</li>
            </ul>
    
            <h3>Имеет в своем составе:</h3>
            <ul>
                <li>Институт металлургии и машиностроения;</li>
                <li>Институт материаловедения;</li>
                <li>Институт технологии поверхности и наноматериалов;</li>
                <li>Институт сварки и контроля;</li>
                <li>Институт неразрушающих методов исследования металлов.</li>
            </ul>
        `,
        website: "www.cniitmash.ru",
        cooperation: "создание современной высоконадежной трубопроводной арматуры, использования современных высокотехнологичных методов обработки металлов."
    },
    
    {
        id: 10,
        name: "ЗАО ПИК «Энерготраст»",
        description: "Энерготраст — надежный партнер в области производства энергетического оборудования и поставок на промышленные объекты.",
        logo: "", // Этот партнёр не будет отображаться
        details: `
            Энерготраст занимается производством энергетического оборудования и его поставкой на промышленные объекты по всей России.
        `,
        website: "www.energotrust.ru",
        cooperation: "Производство и поставка энергетического оборудования."
    },
    {
        id: 11,
        name: "ООО «МашТехнология»",
        description: "МашТехнология является комплексным машиностроительным, металлообрабатывающим предприятием, которое специализируется на изготовлении различного энергетического, технологического и нестандартного оборудования.",
        logo: "/mash.png",
        details: `
            ООО «МТ» в партнерстве с группой компаний «Нева турбогаз» и инжиниринговой компанией «Эдвайс-Турбоинжиниринг» проектирует и производит камеры сгорания и другие узлы газовых турбин различного назначения.
        
            Проектирует, изготавливает, ремонтирует и модернизирует технологическое промышленное оборудование для предприятий теплоэнергетики, металлургии, газовой, нефтехимической, пищевой, целлюлозно-бумажной и других отраслей промышленности.
        `,
        website: "www.mashtechnology.ru",
        cooperation: "разработка, производство, поставка и сервисное обслуживание трубопроводной арматуры и трубопроводных систем, анализ технической политики, нормативной документации, исходных технических требований ведущих компаний топливно-энергетического сектора России, и др."
    },
    {
        id: 12,
        name: "НИУ «МЭИ»",
        description: "Московский энергетический институт — один из крупнейших технических университетов России в области энергетики, электротехники, электроники, информатики.Располагает современными учебными корпусами, учебными и научными лабораториями, общежитиями, мощной экспериментальной базой, опытным заводом, учебно-научной теплостанцией, учебно-научным телецентром, мощной сетью до вузовской подготовки и послевузовского образования.",
        logo: "/mei.png",
        details: `
            Оснащен современным технологическим оборудованием, парком мощных, средних и персональных ЭВМ (более 1700 комплектов).
Готовит инженерные и научные кадры для иностранных государств начиная с 1946 года. В настоящее время в МЭИ обучаются студенты и аспиранты из 68 стран мира.

За успехи в подготовке инженеров и научных кадров награжден двумя орденами России и шестью орденами зарубежных государств.
        `,
        website: "www.mpei.ru",
        cooperation: "исследование защитных покрытий, создание современной высоконадежной трубопроводной арматуры, использования современных высокотехнологичных методов обработки металлов."
    },
    {
        id: 13,
        name: "Saint-Gobain Performance Plastics",
        description: "Saint-Gobain Performance Plastics дочерняя компания корпорации Saint-Gobain, входящая в топ-100 промышленных компаний, является мировым лидером в проектировании и производстве высокопроизводительных уплотнений и полимерных компонентов, обслуживающая практически все основные отрасли по всему миру.",
        logo: "/saint.png",
        details: `
            Штат – более 4000 сотрудников в 16 странах Северной Америки, Европы и Азии, компания имеет 45 производственных площадок, является лидером в области разработки и производства высокоэффективных пластиков и обладает внушительным портфелем продуктов и услуг, выгодно отличаясь этим от своих ближайших конкурентов.
        `,
        website: "www.plastics.saint-gobain.com",
        cooperation: "создание современной высоконадежной трубопроводной арматуры, разработка и внедрение уплотнительных элементов^"
    },
    {
        id: 14,
        name: "«Hawavalves» Индия",
        description: "«Hawa valves» является крупным производителем трубопроводной арматуры для нефтегазовой (разведки, добычи, переработки) отрасли в Индии. Компания обладает всеми разрешительными документами и поставляет арматуру в соответствии с стандартами API.",
        logo: "/hawalves.png",
        details: `
        `,
        website: "www.hawavalves.com",
        cooperation: "локализация производства арматуры."
    },
    {
        id: 15,
        name: "ЗАО «Институт новых углеродных материалов и технологий» при МГУ",
        description: "ЗАО «ИНУМиТ» — компания, специализирующаяся на проведении научных и прикладных исследований, разработке технологий производства и поставке оборудования в области углеродных и полимерных композиционных материалов.",
        logo: "/inumit.png",
        details: `
            <p>Институт одним из первых в России реализует на практике идею партнерства крупнейшего научно-образовательного центра, государства и частного бизнеса в области науки и инноваций. Такое объединение усилий позволяет реализовать полностью инновационный цикл от фундаментальных исследований до производства и внедрения наукоемкой продукции, решая на современном уровне задачи создания, сертификации и продвижения на рынок новых материалов, технологий ресурсосбережения и безопасности, подготовки специалистов в области материаловедения и управления высокотехнологичными проектами.</p>
    
            <br>
    
            <p>ЗАО «ИНУМиТ» является инициатором и участником ряда крупных инновационных и образовательных проектов государственного значения в области создания в России производства нового поколения конструкционных и теплоогнезащитных материалов (журналы «Инновации» 2009 г., «Атомная стратегия» 2010 г.). Успешное развитие института основано на фундаментальном образовании и научной базе МГУ, тесном контакте и партнерстве с НПО УНИХИМТЕК.</p>
    
            <br>
    
            <p>В настоящий момент в институте работает более 60 сотрудников, причем более 30% сотрудников имеют ученые степени кандидатов и докторов наук. С момента основания, в институте активно ведутся прикладные исследовательские работы в области современных высокопрочных полимерных композиционных материалов, углерод-углеродных композиционных материалов и углеродных волокон и огнезащитных материалов. Сотрудники института являются авторами многочисленных публикаций, патентов и «ноу-хау».</p>
    
            <br>
    
            <p>За это время успешно выполнены исследовательские и технологические работы в интересах таких организаций как ЗАО «Аэрокомпозит», ОАО «ВАСО», ОАО «АК «Рубин», Федерального агентства по науке и инновациям, ОАО «Авиадвигатель», ОАО «Роснано» ОАО «Химпроминжиниринг».</p>
        `,
        website: "www.inumit.ru",
        cooperation: "Новые уплотнительные материалы и технологии."
    }
    
];


const PartnerDetailPage = () => {
    const { id } = useParams();
    const partner = partners.find(p => p.id === parseInt(id));

    if (!partner) {
        return <div>Партнёр не найден</div>;
    }

    return (
        <div className="partner-detail-page">
            <header className="partner-page-header-container">
                <img src="/back4.png" alt="Header Background" className="header-image" />
                <h1>Партнёр</h1>
                <div className="breadcrumb-partners-b">
                    <Link to="/partners" className="breadcrumb-partners-link-b">
                        <span className="breadcrumb-partners-icon-b">&larr;</span>
                        <span className="breadcrumb-partners-text-b">Партнёры</span>
                    </Link>
                </div>
            </header>
            <div className="partner-detail-content">
                <h2>{partner.name}</h2>
                <p>{partner.description}</p>
                <div className="partner-details" dangerouslySetInnerHTML={{ __html: partner.details }} /> {/* Вставляем HTML-контент */}
                <p><strong>Официальный сайт:</strong> <a href={`http://${partner.website}`} target="_blank" rel="noopener noreferrer">{partner.website}</a></p>
                <p><strong>Направление сотрудничества:</strong> {partner.cooperation}</p>
            </div>
        </div>
    );
};

export default PartnerDetailPage;