import foto from '../../assets/Foto.svg';
import styles from '../../styles/pages/edit.module.css';

interface PageDescriptionProps {}

export const PageDescription: React.FC<PageDescriptionProps> = () => {
  return (
    <div className={styles.description}>
      <span>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        repellendus velit soluta magnam optio in quos sed, beatae exercitationem
        sequi facilis ducimus quas omnis dolorem, voluptas nulla est molestiae
        enim. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        quasi distinctio tempore, quos ullam at nemo, assumenda illo iure odit
        cumque laboriosam error et optio ducimus. Nemo esse aut minima!
      </span>
      <img src={foto} alt="Descrição da página" />
    </div>
  );
};
