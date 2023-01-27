import styles from './style.module.css';

function Loader({ className }: { className?: string }) {
  return <div className={className + ' ' + styles.loader} />;
}

export default Loader;
