import styles from './style.module.css';

function Loader({ size }: { size?: number }) {
  return (
    <div
      className={styles.loader}
      style={{
        width: size || 40,
        height: size || 40,
      }}
    />
  );
}

export default Loader;
