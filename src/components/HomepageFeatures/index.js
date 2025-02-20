import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: <a href='docs/calendars/'>Calendarios</a>,
    Svg: require('@site/static/img/calendar.svg').default,
    description: (
      <>
        La información de los calendarios ortodoxos provienen de < a href='https://orthocal.info/api/'>OrthoCal API</a> 
        y traducido al español por Gemini AI.
      </>
    ),
  },
  {
    title: <a href='docs/books/'>Textos Griegos Antiguos</a>,
    Svg: require('@site/static/img/book.svg').default,
    description: (
      <>
        Los textos griegos antiguos provienen de diversas fuentes y han sido traducidos al español por Gemini AI. 
        Si te gustaría ver alguna obra en especial traducida al español, por favor contáctanos.

      </>
    ),
  },
  {
    title: 'Desarrollo Continuo',
    Svg: require('@site/static/img/code.svg').default,
    description: (
      <>
        Estamos en continuo desarrollo y actualización de la página. 
        Si tienes alguna sugerencia o te gustaría colaborar, por favor contáctanos.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
