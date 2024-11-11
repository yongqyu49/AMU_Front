import styles from '../../css/music/Contents.module.css';

const Contents = () => {
    return (
        <div className={styles.search_result}>
            <div className={styles.container}>
                <div className={styles.results_info}>
                    <span>결과</span>
                    <span className={styles.result_count}>1</span>
                </div>
                <div className={styles.category_holder}>
                    <div className={styles.row_cats}>
                        <div className={styles.result_items_holder}>
                            <div className={styles.item_container}>
                                <div className={styles.item}>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contents;