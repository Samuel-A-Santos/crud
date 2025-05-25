import styles from '../../styles/components/addEmployee.module.css';

interface HealthCertificateUploadProps {}

export const HealthCertificateUpload: React.FC<
  HealthCertificateUploadProps
> = ({}) => {
  return (
    <div className={styles.fileUpload}>
      <h3>Adicione Atestado de Saúde (opcional):</h3>
      <label htmlFor="file-upload" className={styles.fileUploadLabel}>
        Selecionar arquivo
      </label>
      <input id="file-upload" type="file" />
    </div>
  );
};
