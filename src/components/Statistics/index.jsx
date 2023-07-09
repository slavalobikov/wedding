import Statistic from './Statistic';
import styles from './Statistics.module.scss';

const Statistics = ({ statisticsData }) => {
  return (
    <div className={styles.container}>
      {statisticsData.map((statistic) => (
        <Statistic key={statistic.questionTitle} questionTitle={statistic.questionTitle} answers={statistic.answers} />
      ))}
    </div>
  );
};

export default Statistics;
